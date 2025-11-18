import React from 'react';
import './Header.scss'
import {onCreateCard} from '../CreateCard/CreateCard.jsx'

function Header({ setItems, render }) {
    const [title, setTitle] = React.useState('');
    const isDone = false;

    const successCreate = () => {
        onCreateCard({title, isDone })
            .then(res => setItems(prev => [...prev, res]))
            .then(() => render())
        setTitle('');
    }

    const onAdd = () => {
        {
            title.trim().length > 0 ?
                1 < title.length && title.length < 65 ?
                    successCreate() : alert("Текст задачи должен быть от 2 до 64 символов") : alert("Поле обязательно для заполнения (пробелы не учитываются)")
        }
    }

    const onChangeSearch = (event) => {
        setTitle(event.target.value);
    }
    return (
        <>
            <h1> TODO List </h1>
            <header className="header">
                <input className={"header__input"} onChange={onChangeSearch} value={title} placeholder="Задача для выполнения..." />
                <button className="header__btn" onClick={onAdd}>Добавить</button>
            </header>
        </>
    )
}

export default Header;