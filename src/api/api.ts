import axios from "axios";
import type {
    Todo,
    TodoRequest,
    MetaResponse,
    TodoInfo,
    TodosFilter,
    AuthData,
    RefreshToken,
    UserRegistration, Token, Profile, ProfileRequest, PasswordRequest
} from './types.ts'
const BASE_URL = 'https://easydev.club/api/v1';

const api = axios.create(
    {
        baseURL: BASE_URL
    }
);

export const getTodosByFilter = async (status: TodosFilter): Promise<MetaResponse<Todo, TodoInfo>> => {
    try {
        const response = await api.get('/todos', {
            params: {filter: status}
        });
        return await response.data;
    } catch {
        throw new Error("Ошибка при получении задач с БД");
    }
}

export const createTodo = async (params: TodoRequest): Promise<Todo> => {
    try {
        const response = await api.post('/todos', params)
        return await response.data;
    } catch {
        throw new Error("Ошибка при создании задачи");
    }
}

export const updateTodo = async ({id, title, isDone}: Todo): Promise<Todo> => {
    try {
        const response = await api.put(`/todos/${id}`, {title, isDone})
        return await response.data;
    } catch {
        throw new Error("Ошибка при обновлении задачи");
    }
}

export const deleteTodo = async (id: number): Promise<void> => {
    try {
        await api.delete(`/todos/${id}`)
    } catch {
        throw new Error("Ошибка при удалении задачи");
    }
}

//---------------------------------------------------------------------------------

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config;
})

api.interceptors.response.use(async config => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        console.log("Ошибка словилась в обработку 401 ошибки");
        originalRequest._retry = true;
        try {
            const token = localStorage.getItem('refresh_token');
            if (token) {
                await refreshToken({refreshToken: token});
                return api.request(originalRequest);
            }
        } catch (error) {
            console.log("interceptor error:", error);
            window.location.href = '/auth';
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
        console.log(params);
        const response = await api.put('/user/profile', params);
        console.log(response);
        return await response.data;
    } catch {
        throw new Error("Ошибка при обновлении профиля!");
    }
}

export const signIn = async (params: AuthData): Promise<Token>  => {
    try {
        const response = await api.post('/auth/signin', params);

        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);

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
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
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
            localStorage.setItem('access_token', response.data.accessToken);
            localStorage.setItem('refresh_token', response.data.refreshToken);
        }
        return await response.data;
    } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        throw new Error("Ошибка при обновлении токена!");
    }
}