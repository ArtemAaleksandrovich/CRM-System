import Todo from '../Todo/Todo.jsx'

function TodoList({todos, getTodos}) {
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