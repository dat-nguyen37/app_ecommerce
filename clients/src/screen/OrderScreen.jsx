import { StyleSheet, Text, View,TouchableOpacity, Alert,Dimensions,Modal, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import api from '../axios'
import { FlatList } from 'react-native-gesture-handler'
import Historyitem from '../components/Historyitem'
import numeral from 'numeral'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'

const OrderScreen = ({navigation}) => {
    const [data,setData]=useState([])
    const [modalView,setModalView]=useState(false)
    const [dataView,setDataView]=useState('')

    
    const handleDelete=async(id)=>{
        try {
            const res=await api.delete(`/order/delete/${id}`)
            Alert.alert('Delete success')
            getData()
        } catch (err) {
            console.log(err)
        }
    }

    const getData=async()=>{
        try {
            const res=await api.get('/order/orderAll')
            setData(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    const handleModalView=async(id)=>{
        try {
            const res=await api.get(`/order/orderView/${id}`)
            setDataView(res.data)
            setModalView(true)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getData()
        if(modalView){
            
        }
    },[modalView])
  return (
    <View style={styles.Container}>
        <View style={styles.Header}>
            <AntDesign name="arrowleft" style={styles.icon} onPress={()=>navigation.navigate("Admin")}/>
            <Text style={styles.Title}>Quản lý đơn hàng</Text>
        </View>
        <View style={styles.listOrder}>
            {!data.length>0
            ?(<Text style={{fontSize:20,color:'red',alignSelf:'center'}}>Chưa có đơn hàng nào được đặt</Text>)
            :(<FlatList
            ListEmptyComponent={
                <>
                <View style={{flex:1}}>
                    <View style={styles.row}>
                        <Text style={styles.headerCell}>User</Text>
                        <Text style={styles.headerCell}>Price</Text>
                        <Text style={styles.headerCell}>Date</Text>
                        <Text style={styles.headerCell}>Action</Text>
                    </View>
                    {data.map(item=>(
                        <View style={styles.row} key={item._id}>
                            <Text style={styles.headerCell}>{item.name}</Text>
                            <Text style={styles.headerCell}>{numeral(item.price).format(0.0)}</Text>
                            <Text style={styles.headerCell}>{moment(item.createdAt).format('DD/MM/YY')}</Text>
                            <Text style={styles.headerCell}>
                            <TouchableOpacity onPress={()=>handleModalView(item._id)}>
                                <AntDesign name="eye" style={{fontSize:30,color:'blue',alignSelf:'flex-start'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>handleDelete(item._id)}>
                                <Icon name="trash" style={{fontSize:30,color:'red',alignSelf:'flex-end'}}/>
                            </TouchableOpacity>
                            </Text>
                        </View>
                    ))}
                </View>
                </>
            }
            />)}
        </View>
        <Modal animationType='fade'
            transparent={true}
            visible={modalView}
            onRequestClose={()=>{setModalView(!modalView);}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <View style={styles.itemOrder}>
                    {dataView&&dataView?.product.map(item=>(
                        <View style={styles.item} key={item?._id}>
                            <Image source={{uri:item.image}} style={{width:70,height:70}}/>
                            <View style={styles.info}>
                                <Text style={styles.text}>{item.name} x{item.quantity}</Text>
                                <Text style={[styles.price,{color:'red'}]}>{numeral(item.total).format(0.0)} đ</Text>
                            </View>
                        </View>
                    ))}
                    <Text style={styles.text}>Tên người nhận: {dataView.name}</Text>
                    <Text style={styles.text}>Số điện thoại: {dataView.phone}</Text>
                    <Text style={styles.text}>Địa chỉ: {dataView.address}</Text>
                </View>
                </View>
                <TouchableOpacity onPress={()=>setModalView(!modalView)} style={{position:'absolute',top:150}}>
                    <Icon name="close" style={[styles.icon,{color:'black'}]}/>
                </TouchableOpacity>
            </View>
        </Modal>
    </View>
  )
}

export default OrderScreen
const {width}=Dimensions.get('window')
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
    row: {
    flexDirection: 'row',
    },
    headerCell: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f1f1f1',
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    fontWeight: 'bold',
    },
    cell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    },
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
      padding:10,
      position:'relative',
     },
     itemOrder:{
        flex:1,
        backgroundColor:'white',
        padding:10,
        marginVertical:40
    },
    item:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderColor:'#b1b1b1',
        paddingVertical:10
    },
    info:{
        paddingHorizontal:20
    },
    itemfooter:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor:'#b3b3b3',
        paddingVertical:10
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        color:'black'
    },
    price:{
        fontSize:16
    }
    
})