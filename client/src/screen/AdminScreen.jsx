import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Antdesign from 'react-native-vector-icons/AntDesign'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'




const AdminScreen = ({navigation}) => {
  return (
    <View style={styles.Container}>
      <View style={styles.Info}>
        <Image style={styles.InfoImg} source={require('../assets/avata.jpg')}/>
        <Text style={styles.InfoText}>Admin</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Acount_Stack')}>
            <Text style={{fontSize:20,color:'red'}}>Thoát</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContent}>
        <View style={styles.row}>
            <TouchableOpacity style={styles.col} onPress={()=>navigation.navigate("Product")}>
                <Antdesign name="tags" style={styles.icon}/>
                <Text style={styles.text}>Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.col} onPress={()=>navigation.navigate('User')}>
                <Icon5 name="user-edit" style={styles.icon}/>
                <Text style={styles.text}>User</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.col} onPress={()=>navigation.navigate('Category')}>
                <Entypo name="link" style={styles.icon}/>
                <Text style={styles.text}>Category</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.col} onPress={()=>navigation.navigate('Order')}>
                <Antdesign style={styles.icon} name="wallet"/>
                <Text style={styles.text}>Order</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AdminScreen

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'green',
        justifyContent:'space-between'
    },
    listContent:{
        height:500,
        backgroundColor:"white",
        borderTopRightRadius:60,
        borderTopLeftRadius:60,
        alignItems:'center',
        justifyContent:'center'
    },
    Info:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    InfoImg:{
        width:130,
        height:130,
        borderRadius:65
    },
    InfoText:{
        fontSize:40,
        fontWeight:'bold'
    },
    row:{
        flexDirection:'row'
    },
    col:{
        width:150,
        height:150,
        backgroundColor:'brown',
        marginHorizontal:20,
        marginVertical:20,
        display:"flex",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3, 
        elevation: 10, 
    },
    icon:{
        fontSize:60,
        color:'blue'
    },
    text:{
        fontSize:20,
        color:'white',
        fontWeight:'bold',
        borderRadius:10,
    }
})