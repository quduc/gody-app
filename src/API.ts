//API.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';


const BASE_URL = '';
const TIMEOUT = 10000;

const godyClient = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,

});

//intercept requests or responses before they are handled
godyClient.interceptors.request.use(async (config: any) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token && token !== '') {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

