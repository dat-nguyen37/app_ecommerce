import { Button, Dimensions, Image, Modal, StyleSheet, Text, TextInput, View,Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'

import api from '../../axios'

const CategoryItem = ({item,getCategory}) => {

    const handleDelete=async(id)=>{
        try {
            await api.delete(`/category/delete/${id}`)
            Alert.alert('Delete category success')
            getCategory()
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <View style={styles.itemUser}>
      <View style={styles.itemInfo}>
        <Text style={{color:'black',fontWeight:'bold',fontSize:18}}>{item.name}</Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={()=>handleDelete(item._id)}>
            <Icon name="trash" style={{fontSize:30,color:'red',paddingHorizontal:10}}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
    itemUser:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:10,
        borderColor:'gray',
        borderBottomWidth:1
    },
    itemImg:{
        width:70,
        height:70,
        borderRadius:35,
    },
    itemInfo:{
        flex:2,
        paddingHorizontal:20,
    },
    button:{
      flexDirection:'row',
    },
})