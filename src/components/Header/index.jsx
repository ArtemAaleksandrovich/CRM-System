import React from 'react';
import './Header.scss'
function Header({ onCreate }) {
    const [title, setTitle] = React.useState('');
    const isDone = false;

    const successCreate = () => {
        onCreate({title, isDone});
        setTitle('');
    }

    const onAdd = () => {
        {
            title.length > 0 ?
            1 < title.length && title.length < 65 ?
            successCreate() : alert("Текст задачи должен быть от 2 до 64 символов") : alert("Поле обязательно для заполнения")
        }
    }

    const onChangeSearch = (event) => {
        setTitle(event.target.value);
    }
    return (
        <>
            <header className="header">
                <input className={"header__input"} onChange={onChangeSearch} value={title} placeholder="Задача для выполнения..." />
                <button className="header__btn" onClick={onAdd}>Добавить</button>
            </header>
        </>
    )
}

export default Header;