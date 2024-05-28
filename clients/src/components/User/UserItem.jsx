import { Button, Dimensions, Image, Modal, StyleSheet, Text, TextInput, View,Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Picker } from '@react-native-picker/picker'
import ImagePicker from 'react-native-image-crop-picker';
import api from '../../axios'
import Edit from './Edit'

const UserItem = ({item,getUser}) => {
    const [modalUpdate,setModalUpdate]=useState(false)
    const [selectedId,setSelectedId]=useState('')

    const handleModalUpdate=async(id)=>{
        setModalUpdate(true)
        setSelectedId(id)
    }
    const handleDelete=async(id)=>{
        try {
            await api.delete(`/user/delete/${id}`)
            Alert.alert('Delete user success')
            getUser()
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <View style={styles.itemUser}>
      <Image source={item?.image ?{uri:item?.image} : require('../../assets/avata.jpg')} style={styles.itemImg}/>
      <View style={styles.itemInfo}>
        <Text style={{color:'black',fontWeight:'bold',fontSize:18}}>{item.name ||item?.email}</Text>
        <Text style={{color:'red',fontWeight:'bold'}}>{item?.address} </Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={()=>handleModalUpdate(item._id)}>
            <AntDesign name="edit" style={{fontSize:30,color:'blue',paddingHorizontal:10}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleDelete(item._id)}>
            <Icon name="trash" style={{fontSize:30,color:'red',paddingHorizontal:10}}/>
        </TouchableOpacity>
      </View>
     <Edit setModalUpdate={setModalUpdate} modalUpdate={modalUpdate} selectedId={selectedId} getUser={getUser}/>
    </View>
  )
}

export default UserItem

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