
export const getTodosByFilter = (status) => {
    try {
        return (fetch(`https://easydev.club/api/v1/todos?filter=${status}`)
            .then(res => res.json()))
    } catch {
        throw new Error("Ошибка в GET-запросе при получении задач с БД");
    }
}

export const createTodo = ({title, isDone}) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, isDone })
        };
        return (fetch(`https://easydev.club/api/v1/todos`, requestOptions)
            .then(res => res.json()))
    } catch {
        throw new Error("Ошибка в POST-запросе при создании задачи");
    }

}

export const updateTodo = (id, title, isChecked) => {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, isDone: isChecked})
        }
        return (fetch(`https://easydev.club/api/v1/todos/${id}`, requestOptions)
            .then(res => res.json()))
    } catch {
        throw new Error("Ошибка в PUT-запросе при обновлении задачи");
    }
}

export const deleteTodo = (id, requestOptions) => {
    try {
        return (fetch(`https://easydev.club/api/v1/todos/${id}`, requestOptions))
    } catch {
        throw new Error("Ошибка в DELETE-запросе при удалении задачи");
    }
}

