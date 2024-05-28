import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer, useFocusEffect } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './src/screen/LoginScreen'
import SignUpScreen from './src/screen/SignUpScreen'
import Home from './src/screen/HomeScreen'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import CartScreen from './src/screen/CartScreen'
import Icon from 'react-native-vector-icons/FontAwesome'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import AcountScreen from './src/screen/AcountScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ContactScreen from './src/screen/ContactScreen'
import ProductDetailScreen from './src/screen/ProductDetailScreen'
import { AuthContext, AuthProvider } from './src/context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AdminScreen from './src/screen/AdminScreen'
import ProductScreen from './src/screen/ProductScreen'
import UserScreen from './src/screen/UserScreen'
import CategoryScreen from './src/screen/CategoryScreen'
import PaymentScreen from './src/screen/PaymentScreen'
import HistoryScreen from './src/screen/HistoryScreen'
import OrderScreen from './src/screen/OrderScreen'

const Stack=createNativeStackNavigator()
const Tab=createBottomTabNavigator()



const AcountStack=({route,navigation})=>{
  const {userInfo}=useContext(AuthContext)
  useFocusEffect(
    React.useCallback(() => {
      navigation.navigate("Acount_Stack")
    }, [])
  );
  return(
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Acount_Stack" component={AcountScreen}/>
      <Stack.Screen name="Admin" component={AdminScreen}/>
      <Stack.Screen name="Product" component={ProductScreen}/>
      <Stack.Screen name="User" component={UserScreen}/>
      <Stack.Screen name="Category" component={CategoryScreen}/>
      <Stack.Screen name="History" component={HistoryScreen}/>
      <Stack.Screen name="Order" component={OrderScreen}/>

      {!userInfo&&
      <>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
      </>
      }
    </Stack.Navigator>
  )
}

const HomeStack=({navigation})=>{
  useFocusEffect(
    React.useCallback(() => {
      navigation.navigate("Home")
    }, [])
  );
  
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='ProductDetail' component={ProductDetailScreen}/>
    </Stack.Navigator>
  )
}
const CartStack=({navigation})=>{
  useFocusEffect(
    React.useCallback(() => {
      navigation.navigate("Cart")
    }, [])
  );
  
  return(
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName=''>
      <Stack.Screen name='Cart' component={CartScreen}/>
      <Stack.Screen name='Payment' component={PaymentScreen}/>
    </Stack.Navigator>
  )
}
const AppContent = () => {
  const {userInfo}=useContext(AuthContext)
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator  screenOptions={{headerShown:false, tabBarShowLabel:false}}>            
          <Tab.Screen name="Home_Stack" component={HomeStack} options={{
              tabBarIcon:({color,size})=>(<Icon name="home" color={color} size={size}/>),
            }} />
            {userInfo&&(<Tab.Screen name="CartStack" component={CartStack} options={{
              tabBarIcon:({color,size})=>(<Icon name="shopping-cart" color={color} size={size}/>)
            }} />)}
            <Tab.Screen name="Contact" component={ContactScreen} options={{
              tabBarIcon:({color,size})=>(<Material name="contacts" color={color} size={size}/>)
            }}/>
            <Tab.Screen name="Acount" component={AcountStack} options={{
              tabBarIcon:({color,size})=>(<Icon name="user" color={color} size={size}/>)
            }}/>
          </Tab.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
  )
}
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

const styles = StyleSheet.create({})
