import { TouchableOpacity, Dimensions, Image, Modal, StyleSheet, Text, TextInput, View,Alert, FlatList } from 'react-native'
import React, { useState,useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'
import ImagePicker from 'react-native-image-crop-picker';
import api from '../../axios';

const Add = ({modalAdd,setModalAdd,getProduct}) => {
    const [image, setImage] = useState('');
    const [listCategory,setListCategory]=useState([])
    const [category,setCategory]=useState('')
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [quantity,setQuantity]=useState('')
    const [description,setDescription]=useState('')


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
        const getCategory=async()=>{
          try {
            const res=await api.get('/category/findAll')
            setListCategory(res.data)
          } catch (err) {
            console.log(err)
          }
        }
    
        getCategory()
      },[])

      const handleAdd=async()=>{
        try {
            const res=await api.post('/product/create',{
                name:name,
                categoryId:category,
                price:price,
                quantity:quantity,
                description:description,
                image:image
            })
            getProduct()
            Alert.alert('Add new product success')
        } catch (err) {
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
            <Text style={styles.title}>New Product</Text>
            <View>
              <TextInput placeholder='Name' style={styles.inputText} onChangeText={text=>setName(text)}/>
              <View style={styles.inputText}>
                <Picker selectedValue={category} onValueChange={(itemValue)=>setCategory(itemValue)}>
                  <Picker.Item label="Chọn thể loại" value=""/>
                  {listCategory.map((item) => (
                      <Picker.Item key={item._id} label={item.name} value={item._id} />
                    ))}
                </Picker>
              </View>
              <TextInput placeholder='Price'  onChangeText={text=>setPrice(text)} keyboardType='numeric' style={styles.inputText}/>
              <TextInput placeholder='Quantity'  onChangeText={text=>setQuantity(text)} keyboardType='numeric' style={styles.inputText}/>
              <TextInput multiline numberOfLines={4} onChangeText={text=>setDescription(text)} placeholder='writing...' style={styles.inputText}/>
              <TouchableOpacity onPress={handleChoosePhoto}>
                <Text style={{fontSize:16,padding:5,backgroundColor:'green',width:120,marginBottom:10,color:'white'}}>Choose Photo</Text>
              </TouchableOpacity>
              {image && <Image source={{uri:image}} style={{ width: 100, height: 100 }} />}
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity onPress={()=>setModalAdd(false)}>
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
      height:600,
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