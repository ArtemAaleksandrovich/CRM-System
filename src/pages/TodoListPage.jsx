import AddTodo from '../components/AddTodo/AddTodo.jsx'
import TodoTabs from '../components/TodoTabs/TodoTabs.jsx'
import TodoList from '../components/TodoList/TodoList.jsx'
import './TodoListPage.module.scss'
import {useEffect, useState} from "react";
import { getTodosByFilter } from '../api/api.js'

function TodoListPage() {
    const [todos, setTodos] = useState([])
    const [todoFilter, setTodoFilter] = useState('all')
    const [todoInfo, setTodoInfo] = useState({})

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
            alert("Ошибка в рендере страницы! " + error);
        }
    }

    return (
        <>
            <h1> TODO List </h1>
            <AddTodo getTodos={getTodos} />
            <TodoTabs setTodoFilter={setTodoFilter} todoInfo={todoInfo} />
            <TodoList todos={todos} setTodos={setTodos} getTodos={getTodos}/>
        </>
    )
}
export default TodoListPage;