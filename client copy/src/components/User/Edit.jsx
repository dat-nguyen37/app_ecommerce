import { TouchableOpacity, Dimensions, Image, Modal, StyleSheet, Text, TextInput, View,Alert, FlatList } from 'react-native'
import React, { useState,useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'
import ImagePicker from 'react-native-image-crop-picker';
import api from '../../axios';

const Edit = ({setModalUpdate,modalUpdate,selectedId,getUser}) => {
    const [data,setData]=useState('')
    const [image, setImage] = useState('');
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState(0)
    const [address,setAddress]=useState('')


  // load img
  const handleChoosePhoto = () => {
    Alert.alert(
      'Choose photo',
      'Select from gallery or take a new photo?',
      [
        {
          text: 'Gallery',
          onPress: () => choosePhotoFromGallery(),
        },
        {
          text: 'Camera',
          onPress: () => takePhotoWithCamera(),
        },
      ],
      { cancelable: true }
    );
  };
  const choosePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      const source = image.path;
      setImage(source);
    }).catch(error => {
      console.log('ImagePicker Error: ', error);
    });
  };
  
  const takePhotoWithCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      const source = image.path ;
      setImage(source);
    }).catch(error => {
      console.log('ImagePicker Error: ', error);
    });
  };

  useEffect(()=>{
    const getData=async()=>{
      try {
        const res=await api.get(`/user/getOne/${selectedId}`)
        setData(res.data)
        setImage(res.data?.image)
        setName(res.data?.name)
        setEmail(res.data?.email)
        setAddress(res.data?.address)
        setPhone(res.data?.phone)
      } catch (err) {
        console.log(err)
      }
    }
    if(selectedId&&modalUpdate){
      getData()
    }
  },[selectedId,modalUpdate])
  const handleUpdate=async()=>{
    try {
      await api.put(`/user/update/${data._id}`,{
        name:name,
        email:email,
        phone:phone,
        address:address,
        image:image
      })
      getUser()
      Alert.alert("Update success")
      setModalUpdate(false)
    } catch (err) {
      Alert.alert('failure')
      console.log(err)
    }
  }

  return (
    <Modal animationType='fade'
        transparent={true}
        visible={modalUpdate}
        onRequestClose={()=>{setModalUpdate(!modalUpdate);}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit User</Text>
            <View>
              <TextInput placeholder='Name' style={styles.inputText} value={name || ""} onChangeText={text=>setName(text)}/>
              <TextInput placeholder='Email' value={email} onChangeText={text=>setEmail(text)} style={styles.inputText}/>
              <TextInput placeholder='phone' value={phone?.toString() || ""} onChangeText={text=>setPhone(text)} keyboardType='numeric' style={styles.inputText}/>
              <TextInput placeholder='address' value={address || ""} onChangeText={text=>setAddress(text)} style={styles.inputText}/>

              <TouchableOpacity onPress={handleChoosePhoto}>
                <Text style={{fontSize:16,padding:5,backgroundColor:'green',width:120,marginBottom:10,color:'white'}}>Choose Photo</Text>
              </TouchableOpacity>
              {image && <Image source={{uri:image}} style={{ width: 100, height: 100 }} />}
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity onPress={()=>setModalUpdate(false)}>
                <Text style={[styles.textButton,{backgroundColor:'gray'}]}>Hủy bỏ</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdate}>
                <Text style={styles.textButton}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  )
}

export default Edit
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
      height:500,
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