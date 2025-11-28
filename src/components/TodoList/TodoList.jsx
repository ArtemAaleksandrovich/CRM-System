import Todo from '../Todo/Todo.jsx'

function TodoList({todos, setTodos, getTodos}) {
    return (
        todos?.map((item) => (
            <Todo
                key={item.id}
                id={item.id}
                title={item.title}
                isDone={item.isDone}
                getTodos={getTodos}
            />
        ))
    )
}

export default TodoList;