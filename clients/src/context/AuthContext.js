import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import api from "../axios";

export const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const [isLoading,setIsLoading]=useState(false)
    const [userInfo,setUserInfo]=useState(null)

    const login=(user)=>{
        setIsLoading(true),
        setUserInfo(user)
        AsyncStorage.setItem('userInfo',JSON.stringify(user))
        setIsLoading(false)
    }
    const logout=()=>{
        setIsLoading(true)
        setUserInfo(null)
        AsyncStorage.removeItem('userInfo')
        setIsLoading(false)
    }

    const isLoggedIn=async()=>{
        try {
            setIsLoading(true)
            let userToken=await AsyncStorage.getItem('userInfo')
            if (userToken) {
                setUserInfo(JSON.parse(userToken));
            }
            setIsLoading(false)
        } catch (err) {
            console.log(err.response.data)
        }
    }
    useEffect(()=>{
        isLoggedIn()
    },[])

    return(
        <AuthContext.Provider value={{login,logout,isLoading,userInfo}}>
            {children}
        </AuthContext.Provider>
    )
}