import React, {useState} from 'react';
import styles from './Todo.module.scss'
import {updateTodo, deleteTodo} from "../../api/api.js";
import IconButton from "../../ui/IconButton/IconButton.jsx";
import CheckBox from "../../ui/CheckBox/CheckBox.jsx";
import {validation} from '../../utils/validation.js'

function Todo({id, getTodos, ...props}) {
    const [isDone, setIsDone] = useState(props.isDone);
    const [title, setTitle] = useState(props.title);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');


    const onCheckStatusTodo = () => {
        if (!isEditing) {
            updateTodo(id, title, !isDone)
                .then(() => getTodos())
                .then(() => setIsDone(done => !done))
                .catch((error) => {
                    alert("Произошла ошибка при обновлении статуса задачи: " + error.message);
                })
        }
    }

    const onSaveTodoChanges = (e) => {
        e.preventDefault();

        if (validation(title, setError)) {
            updateTodo(id, title, isDone)
                .then(() => getTodos())
                .then(() => setIsEditing(false))
                .catch((error) => {
                    alert("Произошла ошибка при обновлении всей задачи: " + error.message);
                    setTitle(props.title);
                })
            setError("")
        } else {
            setTitle(props.title);
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
        setIsDone(props.isDone);
        setError("")
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
        setError("")
    }

    return (
        <>
            <form className={styles.card} onSubmit={onSaveTodoChanges}>
                <CheckBox onChange={onCheckStatusTodo} isChecked={isDone} isHidden={isEditing}/>
                <input
                    className={`${styles.input} ${isDone ? styles.checked : ""} ${!isEditing ? styles.pointerNone : ""}`}
                    value={title}
                    onChange={onChangeTitle}
                />

                <div className={styles.buttonList}>
                    {!isEditing ? (
                        <>
                            <IconButton color="primary" type="button" action={onEditTodo}>
                                <img width={20} height={20} src="src/assets/edit_todo.svg" alt="Edit" />
                            </IconButton>
                            <IconButton color="danger" type="button" action={onDeleteTodo}>
                                <img width={25} height={25} src="src/assets/delete_todo.svg" alt="Delete" />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <IconButton color="success" type="submit">
                                <img width={17} height={17} src="src/assets/save.svg" alt="Save" />
                            </IconButton>
                            <IconButton color="secondary" type="button" action={onCancelTodoChanges}>
                                <img width={25} height={25} src="src/assets/cancel.svg" alt="Cancel" />
                            </IconButton>
                        </>
                    )}
                </div>
            </form>
            {error && <div className={styles.error}>{error}</div>}
        </>
    )
}

export default Todo;