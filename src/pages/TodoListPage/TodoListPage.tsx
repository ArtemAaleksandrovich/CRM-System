import AddTodo from '../../components/AddTodo/AddTodo.tsx'
import TodoTabs from '../../components/TodoTabs/TodoTabs.tsx'
import TodoList from '../../components/TodoList/TodoList.tsx'
import {useCallback, useEffect, useMemo, useState} from "react";
import { getTodosByFilter } from '../../api/api.ts'
import type { TodoInterface, TodoInfo } from '../../api/types.ts'
import {Alert, ConfigProvider, Layout, Typography} from "antd";


const { Title } = Typography;


function TodoListPage() {
    const [todos, setTodos] = useState<TodoInterface[]>([])
    const [todoFilter, setTodoFilter] = useState<string>('all')
    const [todoInfo, setTodoInfo] = useState<TodoInfo>({all: 0, inWork: 0, completed: 0})
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getTodos()
        const interval = setInterval(getTodos, 5000);
        return () => {clearInterval(interval)}
    }, [todoFilter]);

    const getTodos: () => Promise<void> = useCallback(async () => {
        try {
            const response = await getTodosByFilter(todoFilter)
            setTodos(response.data);
            setTodoInfo(response.info);
        } catch(error) {
            if (error instanceof Error) {
                setError("Ошибка в рендере страницы! " + error.message);
            } else {
                setError("Неизвестная ошибка в рендере страницы! " + error);
            }
        }
    }, [todoFilter])

    const theme = {
        token: {
            fontSizeHeading1: 50,
            fontFamily: 'Roboto',
        },
    };

    const layoutStyle = {
        backgroundColor: '#f1f7f9',
        width: '600px',
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
        alignItems: 'center',
    };

    const memoizedTodoInfo = useMemo(() => todoInfo, [todoInfo]);
    const memoizedTodos = useMemo(() => todos, [todos]);

    return (
        <Layout style={layoutStyle}>
            {error && <Alert title={error} type='error' closable={{ closeIcon: true, 'aria-label': 'close' }} onClick={() => setError(null)}/>}
            <ConfigProvider theme={theme}>
                <Title> TODO List </Title>
            </ConfigProvider>
            <AddTodo getTodos={getTodos} />
            <TodoTabs setTodoFilter={setTodoFilter} todoInfo={memoizedTodoInfo} />
            <TodoList todos={memoizedTodos} getTodos={getTodos}/>
        </Layout>
    )
}

export default TodoListPage;