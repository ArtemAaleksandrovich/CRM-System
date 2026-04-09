import axios from "axios";
import type {MetaResponse, User, UserFilters, UserRequest, UserRolesRequest} from "../../types/admin/types.ts";
import {setupCommonInterceptors} from "../interceptors.ts";

const BASE_URL = 'https://easydev.club/api/v1/admin/users';

const adminApi = axios.create(
    {
        baseURL: BASE_URL
    }
);

setupCommonInterceptors(adminApi);

export const getUsersByFilter = async (userFilters: UserFilters): Promise<MetaResponse<User>> => {
    try {
        const response = await adminApi.get('', {
            params: userFilters,
        });
        return await response.data;
    } catch {
        throw new Error("Ошибка при получении списка пользователей с БД");
    }
}

export const getUserById = async (id: number): Promise<User> => {
    try {
        const response = await adminApi.get(`/${id}`)
        return await response.data;
    } catch {
        throw new Error("Ошибка при получении пользователя с БД");
    }
}

export const updateUserRights = async (id: number, roles: UserRolesRequest): Promise<User> => {
    try {
        const response = await adminApi.post(`/${id}/rights`, roles)
        return await response.data;
    } catch {
        throw new Error("Ошибка при обновлении прав пользователя");
    }
}

export const updateUserData = async (id: number, data: UserRequest): Promise<User> => {
    try {
        const response = await adminApi.put(`/${id}`, data)
        return await response.data;
    } catch {
        throw new Error("Ошибка при обновлении данных пользователя");
    }
}

export const blockUser = async (id: number): Promise<User> => {
    try {
        const response = await adminApi.post(`/${id}/block`)
        return await response.data;
    } catch {
        throw new Error("Ошибка при блокировке пользователя");
    }
}

export const unblockUser = async (id: number): Promise<User> => {
    try {
        const response = await adminApi.post(`/${id}/unblock`)
        return await response.data;
    } catch {
        throw new Error("Ошибка при разблокировке пользователя");
    }
}

export const deleteUser = async (id: number): Promise<void> => {
    try {
        await adminApi.delete(`/${id}`)
    } catch {
        throw new Error("Ошибка при удалении пользователя");
    }
}