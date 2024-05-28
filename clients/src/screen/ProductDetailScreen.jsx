import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity,TextInput, FlatList, Modal, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome'

import { useRoute,useNavigation } from '@react-navigation/native'
import api from '../axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../context/AuthContext'
import numeral from 'numeral'
import ProductCard from '../components/ProductCard'

const ProductDetailScreen = ({navigation}) => {
    const route=useRoute()
    const item=route.params.item
    const [modalVisible, setModalVisible] = useState(false);
    const [quantity,setQuantity]=useState(1)
    const [totalPrice,setTotalPrice]=useState(item.price)
    const {userInfo}=useContext(AuthContext)
    const [data,setData]=useState([])

    useEffect(()=>{
        const getData=async()=>{
            try {
                const res=await api.get(`/product/category/${item.categoryId}`)
                setData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    },[item])
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    const handlePrev=()=>{
        if(quantity>1){
            setQuantity(quantity-1)
        }
    }
    const handleIncrease=()=>{
        if(quantity<10){
            setQuantity(quantity+1)
        }
    }
    useEffect(() => {
        setTotalPrice(item.price * quantity);
    }, [quantity, item.price]);

    const handleAddToCart=async(item)=>{
        if(!userInfo){
            navigation.navigate("Acount")
        }else
        {
            try {
            await api.post('/cart/create',{
                productId:item._id,
                quantity:quantity,
                totalAmount:totalPrice
            })
            setModalVisible(false); 
            Alert.alert('add to cart')
            navigation.navigate("Cart")
        } catch (err) {
            console.log(err)
        }
    }
    }
  return (
      <View style={styles.Container}>
        <FlatList
        ListHeaderComponent={
            <>
                <View style={styles.Header}>
                    <AntDesign name="arrowleft" style={styles.icon} onPress={()=>navigation.navigate("Home")}/>
                    <Text style={styles.Title}>Chi tiết sản phẩm</Text>
                </View>
                    <Image source={{uri:item.image}} style={{width:'100%',height:360}}/>
                    <View style={styles.contentContainer}>
                        <Text style={styles.Text}>{item.name}</Text>
                        <View style={{display:'flex',flexDirection:'row',alignItems:'center',borderColor:'black',borderBottomWidth:1}}>
                            <Text style={styles.Text}>Giá :</Text>
                            <Text style={[styles.Text,styles.price]}>{numeral(item.price).format(0.0)} VND</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={styles.Text}>Mô tả :</Text>
                            <Text style={{fontSize:20}}>{item.description}</Text>
                        </View>
                    <TouchableOpacity style={styles.button} onPress={toggleModal}>
                        <Text style={styles.ButtonText}>Thêm vào giỏ hàng</Text>
                    </TouchableOpacity>
                    <Text style={[styles.ButtonText,{textTransform:'uppercase',color:'black',marginTop:20}]}>Sản phẩm tương tự</Text>
                    <View>
                    <FlatList
                    numColumns={2}
                    data={data}
                    renderItem={({item})=>(<ProductCard item={item}/>)}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item=>item._id}/>
                    </View>
                </View>
            </>
        }
        />
    <Modal animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.ItemCart}>
                        <Image source={{uri:item.image}} style={{width:80,height:80}}/>
                        <View style={styles.InfoCart}>
                            <Text style={{fontSize:18,color:'black',fontWeight:'bold'}}>{item.name}</Text>
                            <Text style={{color:'red', fontSize:16}}>{numeral(totalPrice).format(0.0)} VND</Text>
                            <View style={styles.quantity}>
                                <TouchableOpacity style={styles.quantityButton} onPress={handlePrev}><Text style={{fontSize:30}}>-</Text></TouchableOpacity>
                                <TextInput placeholder='1' style={styles.input} value={quantity.toString()}/>
                                <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}><Text style={{fontSize:30}}>+</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",}}>
                        <TouchableOpacity style={{backgroundColor:'gray',width:200,margin:5}} onPress={toggleModal}>
                            <Text style={styles.ButtonText}>Hủy bỏ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:'green',width:200,margin:5}} onPress={()=>handleAddToCart(item)}>
                            <Text style={styles.ButtonText}>Thêm vào giỏ hàng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    Container:{
        flex:1
    },
    Header:{
        height:70,
        backgroundColor:'red',
        alignItems:'center',
        flexDirection:'row',
    },
    icon:{
        fontSize:40,
        paddingHorizontal:10,
        color:'white'
    },
    Title:{
        fontSize:30,
        color:'white',
    },
    contentContainer:{
        paddingHorizontal:10,
        paddingVertical:10
    },
    Text:{
        fontSize:30,
        color:'black',
    },
    price:{
        color:"red",
        paddingHorizontal:20
    },
    button:{
      backgroundColor:"#E96E6E",
      width:"100%",
      marginVertical:10,
      borderRadius:10
    },
    ButtonText:{
    fontSize:20,
      color:'white',
      textAlign:'center',
      padding:10,
      fontWeight:'bold'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginBottom:50
      },
      modalContent: {
        backgroundColor: 'white',
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:10
      },
      ItemCart:{
        flexDirection:"row",
        alignItems:'center',
        paddingHorizontal:10,
        paddingVertical:10
      },
      InfoCart:{
        flex:1,
        paddingHorizontal:10
      },
      quantity:{
        flexDirection:'row',
        marginTop:5
      },
      quantityButton:{
        width:40,
        height:40,
        borderWidth:1,
        borderColor:'black',
        alignItems:'center',
        justifyContent:'center'
      },
      input:{
        width:40,
        height:40,
        borderColor:"black",
        borderWidth:1,
        marginHorizontal:10,
        fontSize:16,
        textAlign:'center'
      },
})