import React, {useState} from 'react';
import styles from './AddTodo.module.scss'
import {createTodo} from "../../api/api.js";
import {validation} from '../../utils/validation.js'

function AddTodo({ getTodos }) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const onAddTodo = (e) => {
        e.preventDefault();
        {
            if (validation(title, setError)) {
                createTodo({title, isDone: false})
                    .then(() => getTodos())
                    .then(() => setTitle(''))
                    .catch((error) => {
                        alert("Произошла ошибка при создании задачи: " + error.message);
                    })
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
            <form className={styles.addTask} onSubmit={onAddTodo}>
                <input className={styles.input} onChange={onChangeTextTodo} value={title} placeholder="Задача для выполнения..." />
                <button className={styles.button} type="submit">Добавить</button>
            </form>
            {error && <div className={styles.error}>{error}</div>}
        </>
    )
}

export default AddTodo;