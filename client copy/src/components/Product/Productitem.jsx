import { Button, Dimensions, Image, Modal, StyleSheet, Text, TextInput, View,Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import numeral from 'numeral';
import { Picker } from '@react-native-picker/picker'
import ImagePicker from 'react-native-image-crop-picker';
import Edit from './Edit'
import api from '../../axios'


const Productitem = ({item,getProduct}) => {
  const [modalUpdate,setModalUpdate]=useState(false)
  const [selectedId,setSelectedId]=useState('')
  const handleModalUpdate=(id)=>{
    setModalUpdate(true)
    setSelectedId(id)
  }
  const handleDelete=async(id)=>{
    try {
      await api.delete(`/product/delete/${id}`)
      Alert.alert("delete success")
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <View style={styles.itemProduct}>
      <Image source={{uri:item.image}} style={styles.itemImg}/>
      <View style={styles.itemInfo}>
        <Text style={{color:'black',fontWeight:'bold',fontSize:18}}>{item.name}</Text>
        <Text style={{color:'red',fontWeight:'bold'}}>{numeral(item.price).format(0.0)} VND</Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={()=>handleModalUpdate(item._id)}>
            <AntDesign name="edit" style={{fontSize:30,color:'blue',paddingHorizontal:10}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleDelete(item._id)}>
            <Icon name="trash" style={{fontSize:30,color:'red',paddingHorizontal:10}}/>
        </TouchableOpacity>
      </View>
     <Edit setModalUpdate={setModalUpdate} modalUpdate={modalUpdate} selectedId={selectedId} getProduct={getProduct}/>
    </View>
  )
}

export default Productitem

const styles = StyleSheet.create({
    itemProduct:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:10,
        borderColor:'gray',
        borderBottomWidth:1
    },
    itemImg:{
        width:70,
        height:70
    },
    itemInfo:{
        flex:2,
        paddingHorizontal:20,
    },
    button:{
      flexDirection:'row',
    },
    
})