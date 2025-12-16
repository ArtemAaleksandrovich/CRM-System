import {type FormEvent, type ChangeEvent, useState} from 'react';
import styles from './AddTodo.module.scss'
import {createTodo} from "../../api/api.ts";
import {validation} from '../../utils/validation.ts'

interface AddTodoProps {
    getTodos(): void;
}

function AddTodo({getTodos}: AddTodoProps ) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const onAddTodo = (e: FormEvent) => {
        e.preventDefault();
        {
            if (validation(title, setError)) {
                createTodo(title, false)
                    .then(() => getTodos())
                    .then(() => setTitle(''))
                    .catch((error) => {
                        alert("Произошла ошибка при создании задачи: " + error.message);
                    })
                setError("")
            }
        }
    }

    const onChangeTextTodo = (event: ChangeEvent<HTMLInputElement>) => {
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