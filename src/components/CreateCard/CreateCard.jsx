import {post} from "../../api/api.js";

export const onCreateCard = ({ title, isDone }) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, isDone })
    };
    return (post(requestOptions))
}
