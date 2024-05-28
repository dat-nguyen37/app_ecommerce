import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

const Category = ({item,getProduct,selectCategoryId,setSelectCategoryId}) => {
  const handleSelect=(id)=>{
    getProduct()
    setSelectCategoryId(id)
  }
  return (
    <TouchableOpacity onPress={()=>handleSelect(item._id)}>
        <Text style={[styles.Text,selectCategoryId===item._id&&{backgroundColor:'green',color:'white'}]}>{item.name}</Text>
    </TouchableOpacity>
  )
}

export default Category

const styles = StyleSheet.create({
    Text:{
        marginTop:10,
        fontSize:16,
        fontWeight:"600",
        color:'#938F8F',
        textAlign:'center',
        backgroundColor:'#DFDCDC',
        borderRadius:16,
        marginHorizontal:10,
        paddingHorizontal:20,
        paddingVertical:10
    }
})