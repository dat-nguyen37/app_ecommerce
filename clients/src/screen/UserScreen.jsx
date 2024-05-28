import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

import api from '../axios'
import UserItem from '../components/User/UserItem'

const UserScreen = ({navigation}) => {
    const [data,setData]=useState([])
    const getUser=async()=>{
        try {
          const res=await api.get(`/user/getAll`)
          setData(res.data)
        } catch (err) {
          console.log(err)
        }
      }
      useEffect(()=>{
        getUser()
      },[])
    return (
        <View style={styles.Container}>
            <View style={styles.Header}>
                <AntDesign name="arrowleft" style={styles.icon} onPress={()=>navigation.navigate("Admin")}/>
                <Text style={styles.Title}>Quản lý người dùng</Text>
            </View>
            <View style={styles.Content}>
                <FlatList 
                data={data}
                keyExtractor={item=>item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>(<UserItem item={item} getUser={getUser}/>)}
                />
            </View>
        </View>
      )
    }

export default UserScreen

const styles = StyleSheet.create({
    Container:{
        flex:1
    },
    Header:{
        height:70,
        backgroundColor:'red',
        alignItems:'center',
        flexDirection:'row',
    },
    icon:{
        fontSize:40,
        paddingHorizontal:10,
        color:'white'
    },
    Title:{
        fontSize:30,
        color:'white',
    },
    Content:{
        padding:10,
        flex:1
    }
})