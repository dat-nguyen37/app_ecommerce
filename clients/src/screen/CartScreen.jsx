import { StyleSheet, Text, View,Image, Button, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome'
import api from '../axios'
import CartCard from '../components/CartCard'
import { useFocusEffect } from '@react-navigation/native'
import numeral from 'numeral'


const CartScreen = ({navigation}) => {
  const [data,setData]=useState([])
  const [totalAmount,setAmountAmout]=useState(0)
  const [checkedItems, setCheckedItems] = useState([]);
  const handleCheckboxChange = (item, isChecked) => {
    if (isChecked) {
      setCheckedItems(prevState => [...prevState, item]);
    } else {
      setCheckedItems(prevState => prevState.filter(i => i !== item));
    }
  };

  const getCart=async()=>{
    try {
      const res=await api.get('/cart/findByUser')
      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    const total=checkedItems.reduce((amount,item)=>amount+item.cart.totalAmount,0)
    setAmountAmout(total)
  },[checkedItems])
  useFocusEffect(
    React.useCallback(() => {
      getCart();
      setAmountAmout(0);
      setCheckedItems([])
    }, [])
  );
  const handleOrder=()=>{
    if(totalAmount==0){
      Alert.alert("Bạn chưa chọn đơn hàng thanh toán")
    }else{
      navigation.navigate('Payment',{checkedItems})
    }
  }
  return (
    <View style={styles.Container}>
        <View style={styles.Header}>
            <AntDesign name="arrowleft" style={styles.icon} onPress={()=>navigation.goBack()}/>
            <Text style={styles.Title}>Giỏ hàng</Text>
        </View>
        <View style={styles.ListCart}>
          {!data.length>0
          ?(<Text style={{fontSize:20,color:'red',alignSelf:'center'}}>Giỏ hàng trống</Text>)
          :(<FlatList
          data={data}
          renderItem={({item})=>(
          <CartCard 
          item={item} 
          getCart={getCart} 
          checked={checkedItems.includes(item)} 
          onCheckboxChange={handleCheckboxChange} />)}
          keyExtractor={item=>item.cart._id}
          showsVerticalScrollIndicator={false}
          />)}
        </View>
      <View style={styles.payment}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:20,color:'black',fontWeight:'bold'}}>Tổng tiền : </Text>
            <Text style={{fontSize:20,color:'red'}}>{numeral(totalAmount).format(0.0)} VND</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleOrder}><Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>Thanh toán</Text></TouchableOpacity>
      </View>
    </View>
  )
}

export default CartScreen

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
  ListCart:{
    flex:1,
    marginTop:10,
    borderBottomWidth:2,
    borderColor:'red'
  },
  payment:{
    paddingHorizontal:10,
    paddingVertical:20,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'white',
    
  },
  button:{
    backgroundColor:'green',
    padding:10,
    borderRadius:10
  }
})