import { TouchableOpacity, StyleSheet, Text, View ,Image, TextInput, ImageBackground, Alert} from 'react-native'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import api from '../axios'



const LoginScreen = ({navigation}) => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {login}=useContext(AuthContext)

  const handleLogin=async()=>{
    try {
      const res=await api.post('/user/auth/signin',{email,password})
      login(res.data)
      navigation.navigate("Home_Stack")
    } catch (err) {
      Alert.alert("failure")
    }
  }
  return (
    <ImageBackground style={styles.container} source={require('../assets/bg.jpg')}>
      <Text style={styles.title}>My Acount</Text>
      <View style={styles.formContainer}>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/avata.jpg')} style={styles.image}/>
          </View>
          <View style={styles.InputContainer}>
            <View style={styles.input}>
              <TextInput placeholder='Email' onChangeText={email=>setEmail(email)} style={styles.textInput}/>
            </View>
            <View style={styles.input}>
              <TextInput placeholder='Password' onChangeText={password=>setPassword(password)} style={styles.textInput}/>
            </View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <Text >Forgot password?</Text>
              <Text onPress={()=>navigation.navigate('SignUp')}>Register?</Text>
            </View>
            <TouchableOpacity style={styles.login} onPress={()=>handleLogin()}>
              <Text style={styles.textButton}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.google}>
              <Text style={styles.textButton}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.facebook}>
              <Text style={styles.textButton}>Facebook</Text>
            </TouchableOpacity>
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
    height:400,
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
  login:{
    marginTop:40,
    paddingVertical:5,
    backgroundColor:"black",
  },
  google:{
    marginTop:10,
    paddingVertical:5,
    backgroundColor:"red",
  },
  facebook:{
    marginTop:10,
    paddingVertical:5,
    backgroundColor:"blue",
  },
  textButton:{
    fontSize:20,
    color:'white',
    fontWeight:'bold',
    alignSelf:'center'
  }
})