import { GoogleDistanceResponse } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Location } from './types';
import constants from './contants/contants';


const BASE_URL = '';
const GG_DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json';
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

const post = async <T>(path: string, data: any): Promise<AxiosResponse<T>> => {
    console.log({ path, method: 'POST', params: data });
    const response = await godyClient.post<T>(path, data);
    return response;
}

const get = async <T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    console.log({ path, method: 'GET', params: config ? config.params : undefined });
    const response = await godyClient.get<T>(path, config);
    return response;
}

const patch = async <T>(path: string, data: any): Promise<AxiosResponse> => {
    console.log({ path, method: 'PATCH', params: data });
    const response = await godyClient.patch<T>(path, data);
    return response;
}

const del = async <T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    console.log({ path, method: 'DELETE', params: config ? config.params : undefined });
    const response = await godyClient.delete<T>(path, config);
    return response;
}

//TODO: Type ErrorResponse
const handleServerError = (error: AxiosError): any => {
    console.log({ error });
}

export const getDistanceAndTime = async (origin: Location | undefined, destination: Location | undefined): Promise<GoogleDistanceResponse> => {
    try {
        const response = await get<GoogleDistanceResponse>(GG_DISTANCE_API_URL,
            {
                params:
                {
                    origins: origin?.location.lat + ',' + origin?.location.lng,
                    destinations: destination?.location.lat + ',' + destination?.location.lng,
                    key: constants.distanceMatrixKeyAPI
                }
            });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}