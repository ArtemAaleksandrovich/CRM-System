import axios from "axios";
import type {
    AuthData,
    RefreshToken,
    UserRegistration,
    Token, Profile,
    ProfileRequest,
    PasswordRequest
} from '../../types/auth/types.ts'
import {accessToken} from "../../utils/accessToken.ts"
import {setupCommonInterceptors} from "../interceptors.ts";

const BASE_URL = 'https://easydev.club/api/v1';

const authApi = axios.create(
    {
        baseURL: BASE_URL
    }
);

setupCommonInterceptors(authApi);

export const getProfile = async (): Promise<Profile> => {
    try {
        const response = await authApi.get('/user/profile');
        return response.data;
    } catch (error){
        throw error;
    }
}

export const updateProfile = async (params: ProfileRequest): Promise<Profile> => {
    try {
        const response = await authApi.put('/user/profile', params);
        return response.data;
    } catch (error){
        throw error;
    }
}

export const signIn = async (params: AuthData): Promise<Token>  => {
    try {
        const response = await authApi.post('/auth/signin', params);

        localStorage.setItem('refresh_token', response.data.refreshToken);
        accessToken.setToken(response.data.accessToken);

        return response.data;
    } catch (error){
        throw error;
    }
}

export const signUp = async (params: UserRegistration): Promise<Profile> => {
    try {
        const response = await authApi.post('/auth/signup', params);
        return response.data;
    } catch (error){
        throw error;
    }
}

export const logOut = async (): Promise<void> => {
    try {
        await authApi.post('/user/logout');
        localStorage.removeItem('refresh_token');
        accessToken.setToken(null);
    } catch (error){
        throw error;
    }
}

export const resetPassword = async (params: PasswordRequest): Promise<void> => {
    try {
        const response = await authApi.put('/user/profile/reset-password', params);
        return response.data;
    } catch (error){
        throw error;
    }
}

const refreshApi = axios.create(
    {
        baseURL: BASE_URL
    }
);

export const refreshToken = async (token: RefreshToken): Promise<Token> => {
    try {
        const response = await refreshApi.post('/auth/refresh', token);
        if (response) {
            localStorage.setItem('refresh_token', response.data.refreshToken);
            accessToken.setToken(response.data.accessToken);
        }
        return response.data;
    } catch (error){
        localStorage.removeItem('refresh_token');
        accessToken.setToken(null);
        throw error;
    }
}