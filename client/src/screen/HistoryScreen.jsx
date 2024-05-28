import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import api from '../axios'
import { FlatList } from 'react-native-gesture-handler'
import Historyitem from '../components/Historyitem'

const HistoryScreen = ({navigation}) => {
    const [data,setData]=useState([])

    useEffect(()=>{
        const getData=async()=>{
            try {
                const res=await api.get('/order/orderByUser')
                setData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    },[])
  return (
    <View style={styles.Container}>
        <View style={styles.Header}>
            <AntDesign name="arrowleft" style={styles.icon} onPress={()=>navigation.goBack()}/>
            <Text style={styles.Title}>Đơn hàng</Text>
        </View>
        <View style={styles.listOrder}>
            {!data.length>0
            ?(<Text style={{fontSize:20,color:'red',alignSelf:'center'}}>Bạn không có đơn hàng nào</Text>)
            :(<FlatList
            data={data}
            keyExtractor={item=>item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=>(<Historyitem items={item}/>)}/>)}
        </View>
    </View>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
    Container:{
        flex:1,
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
    listOrder:{
        flex:1
    }
})