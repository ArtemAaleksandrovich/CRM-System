import React from 'react';
import './Card.scss'
import {onUpdateCard} from '../UpdateCard/UpdateCard.jsx'
import {onDeleteCard} from '../DeleteCard/DeleteCard.jsx'
import ButtonList from '../ButtonList/ButtonList.jsx';

function Card({id, title, isDone, setItems, render}) {
    const [isChecked, setIsChecked] = React.useState(isDone);
    const [value, setValue] = React.useState(title);
    const [isEditing, setIsEditing] = React.useState(false);

    const successCreate = () => {
        onUpdateCard({id, title: value, isDone: isChecked})
            .then(() => render())
        setIsEditing(false);
    }
    const errorCreate = (error) => {
        alert(error)
        setValue(title);
    }

    const onCheck = () => {
        setIsChecked(!isChecked);
        {!isEditing && onUpdateCard({id, title: title, isDone: !isChecked}).then(() => render())}
    }

    const onSave = () => {
        value.trim().length > 0 ?
            1 < value.length && value.length < 65 ?
                successCreate() : errorCreate("Текст задачи должен быть от 2 до 64 символов") : errorCreate("Поле обязательно для заполнения (пробелы не учитываются)")
    }

    const onDel = () => {
        onDeleteCard(id, setItems, render)
            .then(() => setItems(prev => prev.filter(item => item.id !== id)))
            .then(() => render())
    }

    const edit = () => {
        setIsEditing(true);
    }

    const cancel = () => {
        setIsEditing(false);
        setValue(title);
        setIsChecked(isDone);
    }

    const onChangeValue = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className="card">
            <input className={"card__checkbox"} onChange={onCheck} type={'checkbox'} checked={isChecked}/>
            <input
                className={`card__input ${isChecked ? "checked" : ""} ${!isEditing ? "pointer-none" : ""}`}
                value={value}
                onChange={onChangeValue}
            />
            <ButtonList
                isEditing={isEditing}
                onSave={onSave}
                onDel={onDel}
                edit={edit}
                cancel={cancel}
            />
        </div>
    )
}

export default Card;