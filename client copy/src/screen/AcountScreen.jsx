import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/FontAwesome5'

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from '../context/AuthContext'



const AcountScreen = ({navigation}) => {
  const {userInfo,logout} =useContext(AuthContext)
  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Text style={styles.Title}>Tài khoản</Text>
      </View>
      <View style={styles.Info}>
          <Image style={styles.InfoImg} source={require('../assets/avata.jpg')}/>
          <Text style={styles.InfoText}>{userInfo?.user?.email}</Text>
          {userInfo?.user.admin&&<TouchableOpacity onPress={()=>navigation.navigate('Admin')}>
            <Text style={{color:'white',padding:5,fontSize:20,backgroundColor:'green'}}>Trang quản trị</Text>
          </TouchableOpacity>}
      </View>
      <View style={styles.buttonContainer}>
        {userInfo?(
          <>
        <TouchableOpacity style={styles.button}  onPress={()=>navigation.navigate("History")}>
          <AntDesign style={styles.iconButton} name="wallet"/>
          <Text style={styles.CartText}>Lịch sử đơn hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}   onPress={()=>navigation.navigate("Login")}>
          <Icon5 style={styles.iconButton} name="user-edit"/>
          <Text style={styles.CartText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={()=>logout()}>
          <MaterialIcons style={styles.iconButton} name="logout"/>
          <Text style={styles.CartText}>Đăng xuất</Text>
        </TouchableOpacity></>):
        (<><TouchableOpacity style={styles.button}   onPress={()=>navigation.navigate("Login")}>
            <MaterialIcons style={styles.iconButton} name="login"/>
            <Text style={styles.CartText}>Đăng nhập</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={()=>navigation.navigate("SignUp")}>
          <Icon style={styles.iconButton} name="registered"/>
          <Text style={styles.CartText}>Đăng ký</Text>
        </TouchableOpacity></>)}
      </View>
    </View>
  )
}

export default AcountScreen

const styles = StyleSheet.create({
  Container:{
    flex:1,
  },
  Header:{
    height:70,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center'
  },
  Title:{
    color:'white',
    fontWeight:'bold',
    fontSize:40
  },
  Info:{
    height:200,
    borderBottomColor:'black',
    borderBottomWidth:3,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  InfoImg:{
    width:100,
    height:100,
    borderRadius:50,
  },
  InfoText:{
    paddingVertical:10,
    fontSize:20,
    color:'red'
  },
  CartContainer:{
    width:100,
    height:100,
    position:'relative'
  },
  CartIcon:{
    fontSize:100,
    color:'black'
  },
  CartText:{
    fontWeight:'bold',
    fontSize:20,
    color:'black'
  },
  buttonContainer:{
    padding:10,
  },
  button:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    borderBottomColor:'gray',
    borderBottomWidth:1
  },
  iconButton:{
    fontSize:30,
    paddingRight:10,
    color:'black'
  }
})