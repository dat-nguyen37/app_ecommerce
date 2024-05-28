import { TouchableOpacity, StyleSheet, Text, View ,Image, TextInput, ImageBackground, Alert} from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/FontAwesome"
import axios from 'axios'
import api from '../axios'

const LoginScreen = (props) => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [name,setName]=useState("")

  

  const handleRegister=async()=>{
    try {
      const res=await api.post('/user/auth/register',{name,email,password})
      Alert.alert(res.data)
    } catch (err) {
      Alert.alert(err.response.data)
    }
  }
  return (
    <ImageBackground style={styles.container} source={require('../assets/bg.jpg')}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.formContainer}>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/avata.jpg')} style={styles.image}/>
          </View>
          <View style={styles.InputContainer}>
          <View style={styles.input}>
              <TextInput placeholder='Name' onChangeText={name=>setName(name)} style={styles.textInput}/>
            </View>
            <View style={styles.input}>
              <TextInput placeholder='Email' onChangeText={email=>setEmail(email)} style={styles.textInput}/>
            </View>
            <View style={styles.input}>
              <TextInput placeholder='Password' onChangeText={password=>setPassword(password)} style={styles.textInput}/>
            </View>
            <TouchableOpacity style={styles.signin} onPress={()=>handleRegister()}>
              <Text style={styles.textButton}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.icon}>
              <Icon name="arrow-left" style={{fontSize:20,color:'black'}}  onPress={()=>props.navigation.navigate("Login")}/>
            </View>
          </View>
      </View>
    </ImageBackground>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    position:'relative',
  },
  title:{
    fontSize:40,
    paddingVertical:40,
    color:'white'
  },
  formContainer:{
    borderColor:'gray',
    borderWidth:1,
    width:'70%',
    height:370,
    backgroundColor:'white',
  },
  imageContainer:{
    position:'absolute',
    zIndex:10,
    top:-30,
    alignSelf:'center',
    borderRadius:50,
    borderColor:'red',
    borderWidth:1
  },
  image:{
    height:70,
    width:70,
    borderRadius:35,
  },
  InputContainer:{
    marginTop:40,
    display:"flex",
    paddingHorizontal:20
  },
  input:{
    borderBottomWidth:1,
    borderColor:'gray',
    marginBottom:10
  },
  textInput:{
    fontWeight:"bold",
    fontSize:20
  },
  signin:{
    marginTop:40,
    paddingVertical:5,
    backgroundColor:"black",
  },
  textButton:{
    fontSize:20,
    color:'white',
    fontWeight:'bold',
    alignSelf:'center'
  },
  icon:{
    marginTop:15,
    alignSelf:'center',
    padding:10,
    borderWidth:1,
    borderColor:'black',
    borderRadius:50
  }
})