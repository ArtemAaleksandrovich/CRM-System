import React, {useState} from 'react';
import styles from './AddTodo.module.scss'
import {createTodo} from "../../api/api.js";
import IconButton from "../../ui/IconButton/IconButton.jsx";

function AddTodo({ getTodos }) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const successCreateTodo = () => {
        createTodo({title, isDone: false})
            .then(() => getTodos())
            .then(() => setTitle(''))
            .catch((error) => {
                alert("Произошла ошибка при создании задачи: " + error.message);
            })
    }

    const onAddTodo = () => {
        {
            if (title.trim().length === 0) {
                setError("Поле обязательно для заполнения (пробелы не учитываются)")
            } else if (2 > title.length || title.length > 65) {
                setError("Текст задачи должен быть от 2 до 64 символов")
            } else {
                successCreateTodo()
                setError("")
            }
        }
    }

    const onChangeTextTodo = (event) => {
        setTitle(event.target.value);
        setError("")
    }
    return (
        <>
            <form className={styles.addTask} action={onAddTodo}>
                <input className={styles.input} onChange={onChangeTextTodo} value={title} placeholder="Задача для выполнения..." />
                <button className={styles.button} type="submit">Добавить</button>
            </form>
            {error && <div className={styles.error}>{error}</div>}
        </>
    )
}

export default AddTodo;