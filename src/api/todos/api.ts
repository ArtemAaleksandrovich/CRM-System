import axios from "axios";
import type {
    Todo,
    TodoRequest,
    MetaResponse,
    TodoInfo,
    TodosFilter,
} from '../../types/todos/types.ts'

const BASE_URL = 'https://easydev.club/api/v1/todos';

const api = axios.create(
    {
        baseURL: BASE_URL
    }
);

export const getTodosByFilter = async (status: TodosFilter): Promise<MetaResponse<Todo, TodoInfo>> => {
    try {
        const response = await api.get('', {
            params: {filter: status}
        });
        return response.data;
    } catch (error){
        throw error;
    }
}

export const createTodo = async (params: TodoRequest): Promise<Todo> => {
    try {
        const response = await api.post('', params)
        return response.data;
    } catch (error){
        throw error;
    }
}

export const updateTodo = async ({id, title, isDone}: Todo): Promise<Todo> => {
    try {
        const response = await api.put(`/${id}`, {title, isDone})
        return response.data;
    } catch (error){
        throw error;
    }
}

export const deleteTodo = async (id: number): Promise<void> => {
    try {
        await api.delete(`/${id}`)
    } catch (error) {
        throw error;
    }
}