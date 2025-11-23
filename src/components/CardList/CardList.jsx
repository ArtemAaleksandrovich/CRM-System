import Card from '../Card/Card.jsx'

function CardList({todos, setTodos, getTodos}) {
    return (
        todos?.map((item) => (
            <Card
                key={item.id}
                id={item.id}
                title={item.title}
                isDone={item.isDone}
                setTodos={setTodos}
                getTodos={getTodos}
            />
        ))
    )
}

export default CardList;