import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.100.6:8080/api';
// 192.168.100.6 ip casa o 226 monchis

const cafeApi = axios.create({
  baseURL,
});

// middlewhere de axios
cafeApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token; // todas las peticiones van a tener el token por headers
  }
  return config;
});

export default cafeApi;
