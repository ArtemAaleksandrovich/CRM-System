import React, {useState} from 'react';
import styles from './Todo.module.scss'
import {updateTodo, deleteTodo} from "../../api/api.js";
import IconButton from "../../ui/IconButton/IconButton.jsx";
import CheckBox from "../../ui/CheckBox/CheckBox.jsx";

function Todo({id, isDone, getTodos, ...props}) {
    const [isChecked, setIsChecked] = useState(isDone);
    const [title, setTitle] = useState(props.title);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');

    const abilityToUpdateTodo = () => {
        updateTodo(id, title, isChecked)
            .then(() => getTodos())
            .then(() => setIsEditing(false))
            .catch((error) => {
                alert("Произошла ошибка при обновлении всей задачи: " + error.message);
                setTitle(props.title);
            })
    }

    const onCheckStatusTodo = () => {
        setIsChecked(checked => !checked);
        if (!isEditing) {
            updateTodo(id, title, !isChecked)
                .then(() => getTodos())
                .catch((error) => {
                    alert("Произошла ошибка при обновлении статуса задачи: " + error.message);
                    setIsChecked(checked => checked);
                })
        }
    }

    const onSaveTodoChanges = (e) => {
        e.preventDefault();

        if (title.trim().length === 0) {
            setError("Поле обязательно для заполнения (пробелы не учитываются)")
            setTitle(props.title);
        } else if (title.length < 2 || title.length > 65) {
            setError("Текст задачи должен быть от 2 до 64 символов")
            setTitle(props.title);
        } else {
            abilityToUpdateTodo()
            setError("")
        }
    }

    const onDeleteTodo = () => {
        return (deleteTodo(id))
            .then(() => getTodos())
            .catch((error) => {
                alert("Произошла ошибка при удалении задачи: " + error.message)})
    }

    const onEditTodo = (e) => {
        e.preventDefault();
        setIsEditing(true);
    }

    const onCancelTodoChanges = () => {
        setIsEditing(false);
        setTitle(props.title);
        setIsChecked(isDone);
        setError("")
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
        setError("")
    }

    return (
        <>
            <form className={styles.card} onSubmit={onSaveTodoChanges}>
                <CheckBox onChange={onCheckStatusTodo} isChecked={isChecked} />
                <input
                    className={`${styles.input} ${isChecked ? styles.checked : ""} ${!isEditing ? styles.pointerNone : ""}`}
                    value={title}
                    onChange={onChangeTitle}
                />

                <div className={styles.buttonList}>
                    {!isEditing ? (
                        <>
                            <IconButton color="primary" type="button" action={onEditTodo} text={"🖊️"}/>
                            <IconButton color="danger" type="button" action={onDeleteTodo} text={"🗑️"}/>
                        </>
                    ) : (
                        <>
                            <IconButton color="success" type="submit" text={"💾️"}/>
                            <IconButton color="secondary" type="button" action={onCancelTodoChanges} text={"❌️"}/>
                        </>
                    )}
                </div>
            </form>
            {error && <div className={styles.error}>{error}</div>}
        </>
    )
}

export default Todo;