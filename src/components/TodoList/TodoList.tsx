import TodoCard from '../TodoCard/TodoCard.tsx'
import type { Todo } from "../../api/types.ts";
import { Card, Space } from "antd";
import {memo} from "react";


interface TodoListProps {
    getTodos(): void;
    todos: Todo[];
}

const TodoList = memo(({todos, getTodos}: TodoListProps) => {
    return (
        <Space
            orientation="vertical"
            size={10}
        >
            {todos?.map((item: Todo) => (
                <Card size="small" variant="borderless" key={item.id}>
                    <TodoCard
                        id={item.id}
                        title={item.title}
                        isDone={item.isDone}
                        getTodos={getTodos}
                    />
                </Card>
            ))}
        </Space>
    )
})

export default TodoList;