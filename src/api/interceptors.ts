import {accessToken} from "../utils/accessToken.ts";
import {type AxiosInstance} from 'axios';
import {refreshToken} from "./auth/api.ts";
import {authActions} from "../store/slices/authSlice/authSlice.ts";
import store from "../store/store.ts";

export const setupCommonInterceptors = (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${accessToken.getToken()}`
        return config;
    })

    axiosInstance.interceptors.response.use(async config  => {
        return config;
    }, async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const token = localStorage.getItem('refresh_token');
                if (token) {
                    await refreshToken({refreshToken: token});
                    return axiosInstance.request(originalRequest);
                }
            } catch (error) {
                store.dispatch(authActions.logout())
                throw error;
            }
        }
    })
}