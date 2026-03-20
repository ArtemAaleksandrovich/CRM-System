import axios from "axios";
import type {
    Todo,
    TodoRequest,
    MetaResponse,
    TodoInfo,
    TodosFilter,
} from '../../types/todos/types.ts'

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