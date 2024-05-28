import { StyleSheet, Text, TouchableOpacity, View,Image, Alert } from 'react-native'
import React from 'react'
import numeral from 'numeral'
import api from '../axios'
import { useNavigation } from '@react-navigation/native'

const Historyitem = ({items}) => {
    const navigation=useNavigation()
    const handleAddToCart=async()=>{
        try {
            const promises = items.product.map(item => {
                const payload = {
                    productId:item._id,
                    quantity:1,
                    totalAmount:item.price
                };
                return api.post('/cart/create', payload);
            });
    
            const responses = await Promise.all(promises);
            Alert.alert('Add to cart success')
            navigation.navigate("Cart")
        } catch (err) {
            console.log(err);
        }
    };
  return (
    <View style={styles.itemOrder}>
        {items?.product.map(item=>(
            <View style={styles.item} key={item?._id}>
                <Image source={{uri:item.image}} style={{width:70,height:70}}/>
                <View style={styles.info}>
                    <Text style={styles.text}>{item.name} x{item.quantity}</Text>
                    <Text style={[styles.price,{color:'red'}]}>{numeral(item.total).format(0.0)} đ</Text>
                </View>
            </View>
        ))}
        <View style={styles.itemfooter}>
            <Text style={styles.price}>{items.product.length} sản phẩm</Text>
            <Text style={styles.price}>Thành tiền : {items.price} đ</Text>
        </View>
        <TouchableOpacity onPress={handleAddToCart}>
            <Text style={{alignSelf:'flex-end',marginVertical:5,fontSize:16,fontWeight:'bold',padding:10,backgroundColor:'green',color:"white"}}>Mua lại</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Historyitem

const styles = StyleSheet.create({
    itemOrder:{
        flex:1,
        backgroundColor:'white',
        padding:10,
        marginBottom:2
    },
    item:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderColor:'#b1b1b1',
        paddingVertical:10
    },
    info:{
        paddingHorizontal:20
    },
    itemfooter:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor:'#b3b3b3',
        paddingVertical:10
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        color:'black'
    },
    price:{
        fontSize:16
    }
})