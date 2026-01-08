import axios from "axios";
const BASE_URL = 'https://easydev.club/api/v1/todos';
import type {TodoInterface, TodoRequest} from './types.ts'

export const getTodosByFilter = async (status: string) => {
    try {
        const response = await axios.get(`${BASE_URL}?filter=${status}`);
        return await response.data;
    } catch (error) {
        throw new Error("Ошибка в GET-запросе при получении задач с БД");
    }
}

export const createTodo = async (params: TodoRequest) => {
    try {
        const response = await axios.post(`${BASE_URL}`, params)
        return await response.data;
    } catch {
        throw new Error("Ошибка в POST-запросе при создании задачи");
    }
}

export const updateTodo = async ({id, title, isDone}: TodoInterface) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, {title, isDone})
        return await response.data;
    } catch {
        throw new Error("Ошибка в PUT-запросе при обновлении задачи");
    }
}

export const deleteTodo = async (id: number) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`)
    } catch {
        throw new Error("Ошибка в DELETE-запросе при удалении задачи");
    }
}
