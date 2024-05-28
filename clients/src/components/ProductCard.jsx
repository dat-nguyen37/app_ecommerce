import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import numeral from 'numeral'

export default function ProductCard({item}) {
    const navigation=useNavigation()
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate("ProductDetail",{item})}} style={styles.container}>
      <Image source={{uri:item.image}}
      style={styles.coverImage}/>
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>{numeral(item.price).format(0.0)} VND</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
        position:'relative',
    },
    coverImage:{
        height:256,
        borderRadius:20,
        width:'90%',
        marginVertical:10,
        marginLeft:10,
        objectFit:'contain'
    },
    title:{
        fontSize:18,
        color:"#444444",
        fontWeight:"600"
    },
    price:{
        fontSize:18,
        color:"#9C9C9C",
        fontWeight:"600"   
    },
    content:{
        paddingLeft:15
    },
})

