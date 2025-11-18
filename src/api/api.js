
export const get = (status) => {
    try {
        return (fetch(`https://easydev.club/api/v1/todos?filter=${status}`)
            .then(res => res.json()))
    } catch {
        throw new Error("Ошибка в GET-запросе!");
    }
}

export const post = (requestOptions) => {
    try {
        return (fetch(`https://easydev.club/api/v1/todos`, requestOptions)
            .then(res => res.json()))
    } catch {
        throw new Error("Ошибка в POST-запросе!");
    }

}

export const put = (id, requestOptions) => {
    try {
        return (fetch(`https://easydev.club/api/v1/todos/${id}`, requestOptions)
            .then(res => res.json()))
    } catch {
        throw new Error("Ошибка в PUT-запросе!");
    }
}

export const del = (id, requestOptions) => {
    try {
        return (fetch(`https://easydev.club/api/v1/todos/${id}`, requestOptions))
    } catch {
        throw new Error("Ошибка в DELETE-запросе!");
    }
}

