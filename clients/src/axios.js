import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.17:5000', 
});
api.interceptors.request.use(async function (config) {
  try {
    const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : '';
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  } catch (error) {
    console.error('Error retrieving user token:', error);
  }
  return config;
});

export default api;