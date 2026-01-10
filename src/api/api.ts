import axios from "axios";
const api = axios.create(
    {baseURL: 'https://easydev.club/api/v1/todos'}
);
import type {TodoInterface, TodoRequest} from './types.ts'

export const getTodosByFilter = async (status: string) => {
    try {
        const response = await api.get('', {
            params: {filter: status}
        });
        return await response.data;
    } catch (error) {
        throw new Error("Ошибка в GET-запросе при получении задач с БД");
    }
}

export const createTodo = async (params: TodoRequest) => {
    try {
        const response = await api.post('', params)
        return await response.data;
    } catch {
        throw new Error("Ошибка в POST-запросе при создании задачи");
    }
}

export const updateTodo = async ({id, title, isDone}: TodoInterface) => {
    try {
        const response = await api.put(`/${id}`, {title, isDone})
        return await response.data;
    } catch {
        throw new Error("Ошибка в PUT-запросе при обновлении задачи");
    }
}

export const deleteTodo = async (id: number) => {
    try {
        await api.delete(`/${id}`)
    } catch {
        throw new Error("Ошибка в DELETE-запросе при удалении задачи");
    }
}
