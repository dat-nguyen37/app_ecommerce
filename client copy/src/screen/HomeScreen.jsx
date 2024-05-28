import { StyleSheet, Text, View ,TextInput, TouchableOpacity,Image, Dimensions, FlatList, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {  SwiperFlatList  } from  'react-native-swiper-flatlist' ;
import Slider from '@react-native-community/slider';
import sl1 from '../assets/slider/sl1.jpg'
import sl2 from '../assets/slider/sl2.jpg'
import sl3 from '../assets/slider/sl3.jpg'
import Category from '../components/Category';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import api from '../axios'
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

const images = [sl1, sl2, sl3];

const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [category,setCategory]=useState([])
  const [min,setMin]=useState(null)
  const [max,setMax]=useState(null)
  const [sort,setSort]=useState("")
  const [q,setQ]=useState(null)
  const [selectCategoryId,setSelectCategoryId]=useState("")
  const [listSearch,setListSearch]=useState([])
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setMin(null)
    setMax(null)
    setSort("")
    setSelectCategoryId("")
  };
  const handlePrice=(min,max)=>{
    setMin(min)
    setMax(max)
  }
  useEffect(()=>{
    const getCategory=async()=>{
      try {
        const res=await api.get("/category/findAll")
        setCategory(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getCategory()
  },[])
  const getProduct=async()=>{
    try {
      const res=await api.get(`/product/findAll?categoryId=${selectCategoryId}`)
      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getProduct()
  },[selectCategoryId])
  const handleFilter=async()=>{
    try {
      const res=await api.get(`/product/findAll?categoryId=${selectCategoryId}&sort=${sort}&min=${min}&max=${max}`)
      setData(res.data)
      setModalVisible(!modalVisible);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    const handleSearch=async()=>{
      try {
        const res=await api.get(`/product/findAll?q=${q}`)
        setListSearch(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    if(q&&q!==""){
      handleSearch()
    }
  },[q])
  useFocusEffect(
    React.useCallback(() => {
      getProduct();
    }, [])
  );
  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <TextInput style={styles.TextInput} onChangeText={q=>setQ(q)} value={q} placeholder='Hôm nay bạn tìm gì ...' keyboardType='default'/>
        <TouchableOpacity onPress={()=>setQ("")}>
          <Icon name="close" style={styles.icon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal} style={{display:'flex',flexDirection:'row',paddingHorizontal:10}}>
          <AntDesign name="filter" style={{fontSize:30,color:'black'}}/>
          <Text style={{alignSelf:'flex-end',color:'black'}}>Lọc</Text>
        </TouchableOpacity>
        {q&&listSearch&&<View style={styles.searchContainer}>
            <View style={styles.listSearch}>
          <FlatList
          data={listSearch}
          keyExtractor={item=>item._id}
          renderItem={({item})=>{
            return(
              <>
              <TouchableOpacity style={styles.itemSearch} onPress={()=>{navigation.navigate("ProductDetail",{item})}}>
                <Image style={styles.searchImg} source={{uri:item.image}}/>
                <View style={{paddingHorizontal:10}}>
                  <Text>{item.name}</Text>
                  <Text>{item.price}VND</Text>
                </View>
              </TouchableOpacity>
              </>
            )
          }}
          />
        </View>
        </View>}
      </View>
      <FlatList
        ListHeaderComponent={
          <>
          <View style={{height:200}}>
            <SwiperFlatList
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={2}
            showPagination
            data={images}
            renderItem={({ item }) => (
            <Image source={item} style={styles.SliderImg}/>
          )}
        />
      </View>
            <FlatList
              data={category}
              renderItem={({item})=>(<Category item={item} getProduct={getProduct} selectCategoryId={selectCategoryId} setSelectCategoryId={setSelectCategoryId}/>)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item=>item._id}
            />
          </>
        }
        numColumns={2}
        data={data}
        renderItem={({item})=>(<ProductCard item={item}/>)}
        showsVerticalScrollIndicator={false}
        keyExtractor={item=>item._id}
      />
      <Modal animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={()=>{setModalVisible(!modalVisible);}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
             ListEmptyComponent={
              <>
                <Text style={{color:'white',fontWeight:'bold',fontSize:25}}>Bộ lọc tìm kiếm</Text>
                <View style={{marginTop:40}}>
                  <Text style={{color:'white',fontSize:20}}>Theo Danh Mục</Text>
                  <View >
                    <FlatList
                    numColumns={2}
                    data={category}
                    keyExtractor={item=>item._id}
                    renderItem={({item})=>{
                      return(
                        <>
                        <View>
                          <TouchableOpacity style={[styles.col,selectCategoryId===item._id&&{backgroundColor:'green'}]} onPress={()=>setSelectCategoryId(item._id)}>
                            <Text style={styles.text}>{item.name}</Text>
                          </TouchableOpacity>
                        </View>
                        </>
                      )
                    }}
                    />
                  </View>
                </View>
                <View style={{marginTop:40}}>
                  <Text style={{color:'white',fontSize:20}}>Theo Thời Gian</Text>
                  <View >
                    <View style={styles.row}>
                      <TouchableOpacity style={[styles.col,sort==='new'&&{backgroundColor:'green'}]} onPress={()=>setSort('new')}><Text style={styles.text}>Mới nhất</Text></TouchableOpacity>
                      <TouchableOpacity style={[styles.col,sort==='old'&&{backgroundColor:'green'}]} onPress={()=>setSort('old')}><Text style={styles.text}>Cũ nhất</Text></TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{marginTop:40}}>
                  <Text style={{color:'white',fontSize:20}}>Khoảng Giá (đ)</Text>
                  <View>
                    <View style={styles.row}>
                        <TextInput placeholder='Tối thiểu' value={min!==null&&min.toString()} placeholderTextColor={"white"} style={[styles.col,styles.text]}/>
                        <Text style={{fontSize:50,color:'white'}}>-</Text>
                        <TextInput placeholder='Tối đa' value={max!==null&&max.toString()} placeholderTextColor={"white"} style={[styles.col,styles.text]}/>                
                    </View>
                    <View style={styles.row}>
                      <TouchableOpacity style={[styles.col,{width:75},max===2000000&&{backgroundColor:'green'}]} onPress={()=>handlePrice(0,2000000)}><Text style={styles.text}>0-2tr</Text></TouchableOpacity>
                      <TouchableOpacity style={[styles.col,{width:75},max===10000000&&{backgroundColor:'green'}]} onPress={()=>handlePrice(2000000,10000000)}><Text style={styles.text}>2tr-10tr</Text></TouchableOpacity>
                      <TouchableOpacity style={[styles.col,{width:75},max===20000000&&{backgroundColor:'green'}]} onPress={()=>handlePrice(10000000,20000000)}><Text style={styles.text}>10tr-20tr</Text></TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
             }
             showsVerticalScrollIndicator={false}
            />
            <View>
              <View style={styles.row}>
                <TouchableOpacity style={styles.col} onPress={toggleModal}><Text style={styles.text}>Thiết lập lại</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.col,{backgroundColor:'green'}]} onPress={handleFilter}><Text style={styles.text}>Áp dụng</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
  </View>
  )
}

export default Home
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  Container:{
    flex:1
  },
  Header:{
    height:100,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    position:'relative'
  },
  TextInput:{
    borderColor:'black',
    borderWidth:1,
    width:'70%',
    height:40,
    paddingHorizontal:20,
    borderBottomLeftRadius:20,
    borderTopLeftRadius:20
  },
  icon:{
    fontSize:30,
    padding:4,
    borderWidth:1,
    borderColor:'black',
    borderBottomRightRadius:20,
    borderTopRightRadius:20
  },
  searchContainer:{
    position:'absolute',
    backgroundColor:'white',
    width:300,
    height:'auto',
    maxHeight:400,
    zIndex:10,
    top:71,
    left:10,
    borderRadius:10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3, 
  },
  listSearch:{
    padding:10
  },
  itemSearch:{
    display:'flex',
    flexDirection:'row',
    borderBottomColor:'gray',
    borderBottomWidth:1,
    paddingBottom:5
  },
  searchImg:{
    width:50,
    height:50
  },
  SliderImg:{
    height:200,
    width
  },
  modalContainer:{
    flex: 1,
    alignItems: 'flex-end',
    justifyContent:'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom:50
  },
  modalContent:{
    backgroundColor:'black',
    width:300,
    height:'100%',
    position:'relative',
    padding:10,
  },
  text:{
    fontSize:16,
    color:"white",
    fontWeight:'bold',
    textAlign:'center'
  },
  row:{
    flexDirection:'row',
  },
  col:{
    margin:10,
    width:120,
    height:40,
    backgroundColor:'gray',
    justifyContent:'center',
    alignItems:'center'
  }

})