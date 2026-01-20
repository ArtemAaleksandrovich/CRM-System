const BASE_URL = 'https://easydev.club/api/v1/todos';
import type {TodoInterface, TodoRequest} from './types.ts'

export const getTodosByFilter = async (status: string) => {
    try {
        const response = await fetch(`${BASE_URL}?filter=${status}`);
        if (!response.ok) {
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error("Ошибка в GET-запросе при получении задач с БД");
    }
}

export const createTodo = async (params: TodoRequest) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
    };
    try {
        const response = await fetch(`${BASE_URL}`, requestOptions)
        if (!response.ok) {
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }
        return await response.json();
    } catch {
        throw new Error("Ошибка в POST-запросе при создании задачи");
    }
}

export const updateTodo = async ({id, title, isDone}: TodoInterface) => {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, isDone})
    }
    try {
        const response = await fetch(`${BASE_URL}/${id}`, requestOptions)
        if (!response.ok) {
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }
        return await response.json();
    } catch {
        throw new Error("Ошибка в PUT-запросе при обновлении задачи");
    }
}

export const deleteTodo = async (id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {method: 'DELETE'})
        if (!response.ok) {
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }
    } catch {
        throw new Error("Ошибка в DELETE-запросе при удалении задачи");
    }
}

