import Todo from '../Todo/Todo.tsx'
import type { TodoInterface } from "../../api/types.ts";
import { Card, Space } from "antd";
import {memo} from "react";

interface TodoListProps {
    getTodos(): void;
    todos: TodoInterface[];
}

const TodoList = memo(function TodoList({todos, getTodos}: TodoListProps) {
    return (
        <Space
            orientation="vertical"
            size={10}
        >
            {todos?.map((item: TodoInterface) => (
                <Card size="small" variant="borderless" key={item.id}>
                    <Todo
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