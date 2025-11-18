import {del} from "../../api/api.js";

export const onDeleteCard = (id) => {
    const requestOptions = {
        method: 'DELETE'
    };
    return (del(id, requestOptions))
}