import AddTodo from '../../components/AddTodo/AddTodo.tsx'
import TodoTabs from '../../components/TodoTabs/TodoTabs.tsx'
import TodoList from '../../components/TodoList/TodoList.tsx'
import {useCallback, useEffect, useRef, useState} from "react";
import {getTodosByFilter} from '../../api/todos/api.ts'
import {type Todo, type TodoInfo, TodosFilter} from '../../types/todos/types.ts'
import {Layout, notification, Typography} from "antd";
import {useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import {type NavigateFunction, useNavigate} from "react-router-dom";

const { Title } = Typography;


function TodoListPage() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [todoFilter, setTodoFilter] = useState<TodosFilter>(TodosFilter.ALL)
    const [todoInfo, setTodoInfo] = useState<TodoInfo>({all: 0, inWork: 0, completed: 0})
    const [api, contextHolder] = notification.useNotification();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isAuthenticated: boolean = useSelector((state:RootState) => state.auth.isAuthenticated);
    const navigate: NavigateFunction = useNavigate();
    const todosRef = useRef<Todo[]>([])

    useEffect(() => {
        todosRef.current = todos;
    }, [todos]);

    useEffect(() => {
        if (isAuthenticated) {
            getTodos()
        } else {
            navigate("/auth");
        }
        const interval = setInterval(getTodos, 5000);
        return () => {clearInterval(interval)}
    }, [todoFilter, isAuthenticated]);

    function compare(a: Todo[], b: Todo[]) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    const getTodos: () => Promise<void> = useCallback(async () => {
        try {
            const response = await getTodosByFilter(todoFilter)
            if (!compare(todosRef.current, response.data)) {
                setTodos(response.data);
            }
            setTodoInfo(response.info);
        } catch(error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: "Ошибка при обновлении страницы! " + error.message,
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Неизвестная ошибка при обновлении страницы! " + error,
                });
            }
        } finally {
            setIsLoading(false);
        }
    }, [todoFilter])

    const layoutStyle = {
        backgroundColor: '#f1f7f9',
        width: '600px',
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <>
            {contextHolder}
            <Layout style={layoutStyle}>
                <Title style={{fontSize: 50, fontFamily: 'Roboto sans, sans-serif'}}> TODO List </Title>
                <AddTodo getTodos={getTodos} />
                <TodoTabs setTodoFilter={setTodoFilter} todoInfo={todoInfo} />
                <TodoList todos={todos} getTodos={getTodos} loading={isLoading} />
            </Layout>
        </>
    )
}

export default TodoListPage;