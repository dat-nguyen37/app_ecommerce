import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

import api from '../axios'
import Productitem from '../components/Product/Productitem'
import Add from '../components/Product/Add'

const ProductScreen = ({navigation}) => {
    const [data,setData]=useState([])
    const [modalAdd,setModalAdd]=useState(false)
    const getProduct=async()=>{
        try {
          const res=await api.get(`/product/findAll`)
          setData(res.data)
        } catch (err) {
          console.log(err)
        }
      }
      useEffect(()=>{
        getProduct()
      },[])
  return (
    <View style={styles.Container}>
        <View style={styles.Header}>
            <AntDesign name="arrowleft" style={styles.icon} onPress={()=>navigation.navigate("Admin")}/>
            <Text style={styles.Title}>Quản lý sản phẩm</Text>
            <TouchableOpacity style={{marginLeft:50}} onPress={()=>setModalAdd(true)}>
                <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>New</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.Content}>
            <FlatList 
            data={data}
            keyExtractor={item=>item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=>(<Productitem item={item} getProduct={getProduct}/>)}
            />
        </View>
        <Add modalAdd={modalAdd} setModalAdd={setModalAdd} getProduct={getProduct}/>
    </View>
  )
}

export default ProductScreen

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
    Content:{
        padding:10,
        flex:1
    }
})