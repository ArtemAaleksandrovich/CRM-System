import TodoCard from '../TodoCard/TodoCard.tsx'
import type { Todo } from "../../types/todos/types.ts";
import {Card, Flex, Space, Spin} from "antd";
import {memo} from "react";


interface TodoListProps {
    getTodos(): void;
    todos: Todo[];
    loading: boolean;
}

const TodoList = memo(({todos, getTodos, loading}: TodoListProps) => {
    return (
        <Space
            orientation="vertical"
            size={10}
        >
            {loading &&
                <Flex justify={"center"} align={"center"} style={{height: "500px"}}>
                    <Spin size="large"/>
                </Flex>
            }
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