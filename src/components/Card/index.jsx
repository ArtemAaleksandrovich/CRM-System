import React from 'react';
import './Card.scss'

function Index({id, title, onUpdate, onDelete, isDone}) {
    const [isChecked, setIsChecked] = React.useState(isDone);
    const [value, setValue] = React.useState(title);
    const [isEditing, setIsEditing] = React.useState(false);

    const successCreate = () => {
        onUpdate({id, title: value, isDone: isChecked});
        setIsEditing(false);
    }
    const errorCreate = (error) => {
        alert(error)
        setValue(title);
    }

    const onCheck = () => {
        setIsChecked(!isChecked);
        {!isEditing && onUpdate({id, title: title, isDone: !isChecked});}
    }

    const onSave = () => {
        {
            value.trim().length > 0 ?
                1 < value.length && value.length < 65 ?
                    successCreate() : errorCreate("Текст задачи должен быть от 2 до 64 символов") : errorCreate("Поле обязательно для заполнения (пробелы не учитываются)")
        }
    }

    const onDel = () => {
        onDelete(id);
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

            <div className="card__btns">
                {!isEditing ? (
                    <>
                        <button className={"card__btns__btn"} style={{backgroundColor: '#4ca3ec'}} onClick={edit}>🖊️️</button>
                        <button className={"card__btns__btn"} style={{backgroundColor: '#ef4242'}} onClick={onDel}>🗑️</button>
                    </>
                ) : (
                    <>
                        <button className={"card__btns__btn"} style={{backgroundColor: '#4ca3ec'}} onClick={onSave}>💾️️</button>
                        <button className={"card__btns__btn"} style={{backgroundColor: '#ef4242'}} onClick={cancel}>❌️</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Index;