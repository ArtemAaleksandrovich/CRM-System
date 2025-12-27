import {type ChangeEvent, type FormEvent, useState} from 'react';
import styles from './Todo.module.scss'
import {updateTodo, deleteTodo} from "../../api/api.ts";
import IconButton from "../../ui/IconButton/IconButton.tsx";
import CheckBox from "../../ui/CheckBox/CheckBox.tsx";
import {validation} from '../../utils/validation.ts'
import type {TodoInterface} from "../../api/types.ts";

import edit_svg from "../../assets/edit_todo.svg"
import delete_svg from "../../assets/delete_todo.svg"
import save_svg from "../../assets/save.svg"
import cancel_svg from "../../assets/cancel.svg"

interface TodoProps extends TodoInterface {
    getTodos(): void,
}


function Todo(props: TodoProps) {
    const [isDone, setIsDone] = useState<boolean>(props.isDone);
    const [title, setTitle] = useState<string>(props.title);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    const onCheckStatusTodo = () => {
        if (!isEditing) {
            updateTodo({id: props.id, title: title, isDone: !isDone})
                .then(() => props.getTodos())
                .then(() => setIsDone((done) => !done))
                .catch((error) => {
                    alert("Произошла ошибка при обновлении статуса задачи: " + error.message);
                })
        }
    }

    const onSaveTodoChanges = (e: FormEvent) => {
        e.preventDefault();

        if (validation(title, setError)) {
            updateTodo({id: props.id, title: title, isDone: isDone})
                .then(() => props.getTodos())
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

    const onDeleteTodo = async () => {
        try {
            await deleteTodo(props.id);
            return props.getTodos();
        } catch (error) {
            if (error instanceof Error) {
                alert("Произошла ошибка при удалении задачи: " + error.message);
            } else {
                alert("Произошла неизвестная ошибка при удалении задачи: " + error);
            }
        }
    }

    const onEditTodo = (e: FormEvent) => {
        e.preventDefault();
        setIsEditing(true);
    }

    const onCancelTodoChanges = () => {
        setIsEditing(false);
        setTitle(props.title);
        setIsDone(props.isDone);
        setError("")
    }

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
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
                                <img width={20} height={20} src={edit_svg} alt="Edit"/>
                            </IconButton>
                            <IconButton color="danger" type="button" action={onDeleteTodo}>
                                <img width={25} height={25} src={delete_svg} alt="Delete"/>
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <IconButton color="success" type="submit">
                                <img width={17} height={17} src={save_svg} alt="Save"/>
                            </IconButton>
                            <IconButton color="secondary" type="button" action={onCancelTodoChanges}>
                                <img width={25} height={25} src={cancel_svg} alt="Cancel"/>
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