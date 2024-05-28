import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import numeral from 'numeral'

const OrderItem = ({item}) => {
  return (
    <View style={styles.Item}>
    <Image source={{uri:item.image}} style={{width:60,height:60}}/>
    <View style={{paddingHorizontal:20}}>
        <Text style={styles.ItemName}>{item.name} x{item.cart.quantity}</Text>
        <Text style={styles.ItemPrice}>{numeral(item.cart.totalAmount).format(0.0)} VND</Text>
    </View>
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
    Item:{
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:10,
        marginBottom:2,
        backgroundColor:'white'
      },
      ItemName:{
        color:'black',
        fontSize:20,
        fontWeight:'bold'
      },
      ItemPrice:{
        color:"red",
      },
})