import axios from "axios";
const api = axios.create(
    {baseURL: 'https://easydev.club/api/v1'}
);
import type {Todo, TodoRequest, MetaResponse, TodoInfo, TodosByFilter} from './types.ts'


export const getTodosByFilter = async (status: TodosByFilter): Promise<MetaResponse<Todo, TodoInfo>> => {
    try {
        const response = await api.get('/todos', {
            params: {filter: status}
        });
        return await response.data;
    } catch (error) {
        throw new Error("Ошибка в GET-запросе при получении задач с БД");
    }
}

export const createTodo: (params: TodoRequest) => Promise<Todo> = async (params: TodoRequest) => {
    try {
        const response = await api.post('/todos', params)
        return await response.data;
    } catch {
        throw new Error("Ошибка в POST-запросе при создании задачи");
    }
}

export const updateTodo: ({id, title, isDone}: Todo) => Promise<Todo> = async ({id, title, isDone}: Todo) => {
    try {
        const response = await api.put(`/todos/${id}`, {title, isDone})
        return await response.data;
    } catch {
        throw new Error("Ошибка в PUT-запросе при обновлении задачи");
    }
}

export const deleteTodo: (id: number) => Promise<void> = async (id: number) => {
    try {
        await api.delete(`/todos/${id}`)
    } catch {
        throw new Error("Ошибка в DELETE-запросе при удалении задачи");
    }
}
