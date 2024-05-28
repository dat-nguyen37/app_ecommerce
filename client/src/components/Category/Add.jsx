import { TouchableOpacity, Dimensions, Image, Modal, StyleSheet, Text, TextInput, View,Alert, FlatList } from 'react-native'
import React, { useState,useEffect } from 'react'
import api from '../../axios';

const Add = ({setModalAdd,modalAdd,getCategory}) => {
    const [name,setName]=useState('')

  const handleAdd=async()=>{
    try {
      await api.post(`/category/create`,{
        name:name,
      })
      getCategory()
      Alert.alert("Add new category success")
      setModalAdd(false)
    } catch (err) {
      Alert.alert('failure')
      console.log(err)
    }
  }

  return (
    <Modal animationType='fade'
        transparent={true}
        visible={modalAdd}
        onRequestClose={()=>{setModalAdd(!modalAdd);}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>New CAtegory</Text>
            <View>
              <TextInput placeholder='Name' style={styles.inputText} onChangeText={text=>setName(text)}/>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity onPress={()=>setModalUpdate(false)}>
                <Text style={[styles.textButton,{backgroundColor:'gray'}]}>Hủy bỏ</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAdd}>
                <Text style={styles.textButton}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  )
}

export default Add
const {width}=Dimensions.get('window')
const styles = StyleSheet.create({
    modalContainer:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
     modalContent:{
      backgroundColor:'white',
      height:200,
      width,
      position:'relative',
      padding:10,
     },
     title:{
      fontSize:30,
      textAlign:'center',
      fontWeight:'bold',
      color:'black'
     },
     inputText:{
      borderColor:'gray',
      borderWidth:1,
      borderRadius:5,
      marginBottom:10
     },
     bottom:{
      position:'absolute',
      bottom:10,
      right:10,
      flexDirection:'row',
      gap:10
     },
     textButton:{
      fontSize:20,
      color:'white',
      fontWeight:'bold',
      backgroundColor:'green',
      padding:10
     }
})