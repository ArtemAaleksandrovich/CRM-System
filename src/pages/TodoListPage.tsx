import AddTodo from '../components/AddTodo/AddTodo.tsx'
import TodoTabs from '../components/TodoTabs/TodoTabs.tsx'
import TodoList from '../components/TodoList/TodoList.tsx'
import styles from './TodoListPage.module.scss'
import {useEffect, useState} from "react";
import { getTodosByFilter } from '../api/api.ts'

export interface TodoType {
    id: number;
    title: string;
    isDone: boolean;
}

function TodoListPage() {
    const [todos, setTodos] = useState<TodoType[]>([])
    const [todoFilter, setTodoFilter] = useState('all')
    const [todoInfo, setTodoInfo] = useState({all: 0, inWork: 0, completed: 0})

    useEffect(() => {
        getTodos()
    }, [todoFilter]);

    const getTodos = () => {
        try {
            getTodosByFilter(todoFilter)
                .then((response) => {
                    setTodos(response.data);
                    setTodoInfo(response.info);
                })
        } catch(error) {
            if (error instanceof Error) {
                alert("Ошибка в рендере страницы! " + error.message);
            } else {
                alert("Неизвестная ошибка в рендере страницы! " + error);
            }
        }
    }
    return (
        <>
            <h1 className={styles.h1}> TODO List </h1>
            <AddTodo getTodos={getTodos} />
            <TodoTabs setTodoFilter={setTodoFilter} todoInfo={todoInfo} />
            <TodoList todos={todos} getTodos={getTodos}/>
        </>
    )
}
export default TodoListPage;