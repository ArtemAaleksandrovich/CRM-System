import Todo from '../Todo/Todo.tsx'
import { type TodoType } from '../../pages/TodoListPage.tsx'

interface TodoListProps {
    getTodos(): void;
    todos: TodoType[];
}

function TodoList({todos, getTodos}: TodoListProps) {
    return (
        <ul style={{marginTop: 0, paddingLeft: 0}}>
            {todos?.map((item: TodoType) => (
                <li style={{listStyleType: "none"}} key={item.id}>
                    <Todo
                        id={item.id}
                        title={item.title}
                        isDone={item.isDone}
                        getTodos={getTodos}
                    />
                </li>
            ))}
        </ul>
    )
}

export default TodoList;