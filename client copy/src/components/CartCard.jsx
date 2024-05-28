import { Image, StyleSheet, Text, View,TouchableOpacity ,TextInput, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { useState } from 'react'
import api from '../axios'
import numeral from 'numeral'
import Checkbox from '@react-native-community/checkbox';

const CartCard = ({item,getCart,checked,onCheckboxChange}) => {

  const handleDelete=async()=>{
    try {
      await api.delete(`/cart/delete/${item.cart._id}`)
      Alert.alert('Delete success')
      getCart()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={styles.ItemCart}>
       <Checkbox
       tintColor='red'
        disabled={false}
        value={checked}
        onValueChange={(newValue) => onCheckboxChange(item,newValue)}
      />
        <Image source={{uri:item?.image}} style={{width:80,height:80}}/>
        <View style={styles.InfoCart}>
        <Text style={{fontSize:18,color:'black',fontWeight:'bold'}}>{item?.name}</Text>
        <Text style={{color:'red', fontSize:16}}>{numeral(item?.cart.totalAmount).format(0.0)} VND</Text>
        <View style={styles.quantity}>
            <TouchableOpacity style={styles.quantityButton}><Text style={{fontSize:30}}>-</Text></TouchableOpacity>
            <TextInput placeholder='1'style={styles.input} value={(item?.cart.quantity).toString()}/>
            <TouchableOpacity style={styles.quantityButton}><Text style={{fontSize:30}}>+</Text></TouchableOpacity>
        </View>
        </View>
        <TouchableOpacity onPress={()=>handleDelete(item.cart._id)}>
        <Icon name="trash-o" style={{fontSize:30,color:'red'}}/>
        </TouchableOpacity>
    </View>
  )
}

export default CartCard

const styles = StyleSheet.create({
    ItemCart:{
        flexDirection:"row",
        alignItems:'center',
        paddingHorizontal:10,
        borderBottomWidth:1,
        borderColor:'gray',
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