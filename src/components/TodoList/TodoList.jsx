import Todo from '../Todo/Todo.jsx'

function TodoList({todos, getTodos}) {
    return (
        <ul style={{marginTop: 0, paddingLeft: 0}}>
            {todos?.map((item) => (
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