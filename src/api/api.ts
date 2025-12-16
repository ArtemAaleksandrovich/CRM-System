const BASE_URL = 'https://easydev.club/api/v1/todos';

export const getTodosByFilter = async (status: string) => {
    try {
        return await (fetch(`${BASE_URL}?filter=${status}`)
            .then(res => res.json()));
    } catch {
        throw new Error("Ошибка в GET-запросе при получении задач с БД");
    }
}

export const createTodo = async (title: string, isDone: boolean) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, isDone})
    };
    try {
        return await (fetch(`${BASE_URL}`, requestOptions)
            .then(res => res.json()));
    } catch {
        throw new Error("Ошибка в POST-запросе при создании задачи");
    }
}

export const updateTodo = async (id: number, title: string, isDone: boolean) => {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, isDone})
    }
    try {
        return await (fetch(`${BASE_URL}/${id}`, requestOptions)
            .then(res => res.json()));
    } catch {
        throw new Error("Ошибка в PUT-запросе при обновлении задачи");
    }
}

export const deleteTodo = async (id: number) => {
    try {
        return await (fetch(`${BASE_URL}/${id}`, {method: 'DELETE'}));
    } catch {
        throw new Error("Ошибка в DELETE-запросе при удалении задачи");
    }
}

