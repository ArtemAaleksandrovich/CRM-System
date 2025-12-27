import Todo from '../Todo/Todo.tsx'
import styles from './TodoList.module.scss'
import type { TodoInterface } from "../../api/types.ts";

interface TodoListProps {
    getTodos(): void;
    todos: TodoInterface[];
}

function TodoList({todos, getTodos}: TodoListProps) {
    return (
        <ul className={styles.ul}>
            {todos?.map((item: TodoInterface) => (
                <li className={styles.li} key={item.id}>
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