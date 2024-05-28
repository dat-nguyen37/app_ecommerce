import { StyleSheet, Text, View,TextInput, TouchableOpacity ,Image, Modal, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { FlatList } from 'react-native'
import numeral from 'numeral'
import OrderItem from '../components/OrderItem'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import api from '../axios'
import { WebView } from 'react-native-webview';

const PaymentScreen = ({route,navigation}) => {
    const [totalAmount,setTotalAmount]=useState(0)
    const [modal,setModal]=useState(false)
    const [location, setLocation] = useState(null);
    const [product,setProduct]=useState([])
    const [error, setError] = useState(null);
    const [paymentUrl, setPaymentUrl] = useState('');
    const checkedItems=route.params?.checkedItems

    useEffect(()=>{
      const total=checkedItems.reduce((amount,item)=>amount+item.cart.totalAmount,0)
      setTotalAmount(total)
      const products=checkedItems.map(item=>({
        productId: item.cart.productId,
        quantity: item.cart.quantity,
        total: item.cart.totalAmount
    }))
      setProduct(products)
    },[checkedItems])
    // location
    useEffect(() => {
      // Lấy vị trí hiện tại khi component được mount
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          try {
            Geocoder.from(latitude, longitude)
              .then(json => {
                const addressComponent = json.results[0].formatted_address;
                setLocation(addressComponent);
              })
              .catch(error => {
                setError('Error getting address: ' + error.message);
              });
          } catch (error) {
            setError('Error getting address: ' + error.message);
          }
        },
        error => setError(error.message)
      );
    }, []);

    // orrder
    const handleOrder=async()=>{
      try {
        const res=await api.post('/payment/create_payment_url',{amount:totalAmount})
        setPaymentUrl(res.data.paymentUrl);

      } catch (err) {
        console.log(err)
        Alert.alert('Thông báo', 'Thanh toán thất bại');
      }
    }
    const handleReturnUrl = async(url) => {
      if (url) {
        const queryString = url.split('?')[1]; // Tách lấy phần query string
        if (queryString) {
          const params = {};
          queryString.split('&').forEach(pair => {
            const [key, value] = pair.split('=');
            params[key] = value;
          });
          const status = params['status']; // Lấy giá trị của tham số 'status'
          if (status) {
            setTimeout(async () => {
              if (status === 'Success') {
                try {
                  const res = await api.post('/order/create', {
                    product: product,
                    name: "datnguyen",
                    phone: "03884903",
                    address: "nghe an",
                    price: totalAmount
                  });
                  Alert.alert("Order success");
                  navigation.navigate("Cart");
                } catch (err) {
                  console.log(err);
                }
              }
              navigation.navigate('Cart');
              setPaymentUrl(null);
            }, 3000);
          }
        }
      }
    };
    
    
       

  return (
    <View style={styles.Container}>
      {!paymentUrl ?(
        <>
      <View style={styles.Header}>
            <AntDesign name="arrowleft" style={{ fontSize:40,paddingHorizontal:10,color:'white'}} onPress={()=>navigation.navigate("Cart")}/>
            <Text style={styles.Title}>Thanh toán</Text>
        </View>
        <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
          <TouchableOpacity style={styles.address} onPress={()=>setModal(true)}>
          <EvilIcons name='location' style={{fontSize:30,color:'red',alignSelf:'flex-start'}}/>
          <View style={{paddingHorizontal:10,flex:1}}>
              <Text style={{fontSize:16, color:'black',pointerEvents:5}}>Địa chỉ nhận hàng</Text>
              <Text style={{fontSize:16}}>Dien chau, nghe an</Text>
          </View>
          <MaterialIcons name='arrow-forward-ios' style={{fontSize:20,alignSelf:'center',paddingHorizontal:10}}/>
        </TouchableOpacity>
         <View style={styles.ListItem}>
           {checkedItems&&checkedItems.map(item=>(<OrderItem item={item} key={item.cart._id}/>))}
         </View>
         <View style={styles.row}>
            <View style={[styles.col,{justifyContent:'flex-start'}]}>
              <AntDesign name="filetext1" style={{fontSize:20,color:'orange'}}/>
              <Text style={{fontSize:20,color:'black'}}>Chi tiết thanh toán</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.text}>Tổng tiền hàng</Text>
              <Text style={styles.price}>{numeral(totalAmount).format(0.0)} đ</Text>
            </View>
            <View style={styles.col}>
            <Text style={styles.text}>Tổng chi phí vận chuyển</Text>
              <Text style={styles.price}>0 đ</Text>
            </View>
            <View style={styles.col}>
            <Text style={styles.text}>Tổng thanh toán</Text>
              <Text style={styles.price}>{numeral(totalAmount).format(0.0)} đ</Text>
            </View>
         </View>
          </>
        }
        />
        <View style={styles.payment}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:20,color:'black',fontWeight:'bold'}}>Tổng tiền : </Text>
            <Text style={{fontSize:20,color:'red'}}>{numeral(totalAmount).format(0.0)} VND</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleOrder}><Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>Đặt hàng</Text></TouchableOpacity>
      </View>
      <Modal
      animationType='fade'
      transparent={true}
      visible={modal}
      onRequestClose={()=>{setModal(!modal);}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text>Liên hệ</Text>
              <TextInput placeholder='Họ và Tên'/>
              <TextInput placeholder='Số điện thoại'/>
            </View>
            <View style={{flex:1}}>
            {location ? (
        <Text>Vị trí hiện tại: {JSON.stringify(location)}</Text>
      ) : (
        <Text>Lấy vị trí...</Text>
      )}
      {error && <Text style={{ color: 'red' }}>Lỗi: {error}</Text>}
            </View>
          </View>
        </View>
      </Modal></>):
       (
        <WebView
          source={{ uri: paymentUrl }}
          onLoadStart={(event) => handleReturnUrl(event.nativeEvent.url)}
        />
      )}
    </View>
  )
}

export default PaymentScreen

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
Title:{
    fontSize:30,
    color:'white',
},
  address:{
    backgroundColor:'white',
    marginVertical:10,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:10,
    height:60,
    height:'auto',
    minHeight:60,
    borderBottomWidth:1,
  },
  ListItem:{
    flex:1,
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
  },
  row:{
    flex:1,
    backgroundColor:'white'
  },
  col:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:10,
    paddingVertical:10
  },
  text:{
    color:'black',
    fontSize:16
  },
  price:{
    color:'red'
  },
  modalContainer:{
    flex: 1,
    justifyContent:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
 modalContent:{
  backgroundColor:'white',
  height:500,
  padding:10,
 },

})