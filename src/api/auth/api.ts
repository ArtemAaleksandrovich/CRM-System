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
import store from '../../store/store.ts'
import {authActions} from "../../store/slices/authSlice/authSlice.ts";

const BASE_URL = 'https://easydev.club/api/v1';

const api = axios.create(
    {
        baseURL: BASE_URL
    }
);

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${accessToken.getToken()}`
    return config;
})

api.interceptors.response.use(async config => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            const token = localStorage.getItem('refresh_token');
            if (token) {
                await refreshToken({refreshToken: token});
                return api.request(originalRequest);
            }
        } catch (error) {
            store.dispatch(authActions.logout())
            throw new Error("Ошибка в интерцепторе!");
        }
    }
})

export const getProfile = async (): Promise<Profile> => {
    try {
        const response = await api.get('/user/profile');
        return await response.data;
    } catch (error){
        throw new Error("Ошибка при получении профиля!");
    }
}

export const updateProfile = async (params: ProfileRequest): Promise<Profile> => {
    try {
        const response = await api.put('/user/profile', params);
        return await response.data;
    } catch {
        throw new Error("Ошибка при обновлении профиля!");
    }
}

export const signIn = async (params: AuthData): Promise<Token>  => {
    try {
        const response = await api.post('/auth/signin', params);

        localStorage.setItem('refresh_token', response.data.refreshToken);
        accessToken.setToken(response.data.accessToken);

        return await response.data;
    } catch (error) {
        throw new Error("Ошибка при авторизации! Неверные учетные данные!");
    }
}

export const signUp = async (params: UserRegistration): Promise<Profile> => {
    try {
        const response = await api.post('/auth/signup', params);
        return await response.data;
    } catch {
        throw new Error("Ошибка при регистрации!");
    }
}

export const logOut = async (): Promise<void> => {
    try {
        await api.post('/user/logout');
        localStorage.removeItem('refresh_token');
        accessToken.setToken(null);
    } catch {
        throw new Error("Ошибка при выходе с аккаунта!");
    }
}

export const resetPassword = async (params: PasswordRequest): Promise<void> => {
    try {
        const response = await api.put('/user/profile/reset-password', params);
        return await response.data;
    } catch {
        throw new Error("Ошибка при сбросе пароля!");
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
        return await response.data;
    } catch {
        localStorage.removeItem('refresh_token');
        accessToken.setToken(null);
        throw new Error("Ошибка при обновлении токена!");
    }
}