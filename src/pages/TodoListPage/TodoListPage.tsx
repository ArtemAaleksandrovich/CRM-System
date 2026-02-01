import AddTodo from '../../components/AddTodo/AddTodo.tsx'
import TodoTabs from '../../components/TodoTabs/TodoTabs.tsx'
import TodoList from '../../components/TodoList/TodoList.tsx'
import {useCallback, useEffect, useRef, useState} from "react";
import { getTodosByFilter } from '../../api/api.ts'
import type { Todo, TodoInfo, TodosByFilter } from '../../api/types.ts'
import {Layout, notification, Typography} from "antd";
import type {NotificationType} from "../../api/types.ts";

const { Title } = Typography;


function TodoListPage() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [todoFilter, setTodoFilter] = useState<TodosByFilter>({status: 'all'})
    const [todoInfo, setTodoInfo] = useState<TodoInfo>({all: 0, inWork: 0, completed: 0})
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, error: string) => {
        api[type]({
            title: 'Ошибка!',
            description: error,
        });
    };

    const todosRef = useRef<Todo[]>([])

    useEffect(() => {
        todosRef.current = todos;
    }, [todos]);

    useEffect(() => {
        getTodos()
        const interval = setInterval(getTodos, 5000);
        return () => {clearInterval(interval)}
    }, [todoFilter]);

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
                openNotificationWithIcon('error', "Ошибка при обновлении страницы! " + error.message);
            } else {
                openNotificationWithIcon('error', "Неизвестная ошибка при обновлении страницы! " + error);
            }
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
                <Title style={{fontSize: 50, fontFamily: 'Roboto'}}> TODO List </Title>
                <AddTodo getTodos={getTodos} />
                <TodoTabs setTodoFilter={setTodoFilter} todoInfo={todoInfo} />
                <TodoList todos={todos} getTodos={getTodos}/>
            </Layout>
        </>
    )
}

export default TodoListPage;