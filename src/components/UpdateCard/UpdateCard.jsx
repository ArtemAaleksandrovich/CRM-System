import {put} from "../../api/api.js";

export const onUpdateCard = ({id, title, isDone}) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, isDone })
    };
    return (put(id, requestOptions))
}