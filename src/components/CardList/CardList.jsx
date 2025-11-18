import Card from '../Card/Card.jsx'

function CardList({items, setItems, render}) {
    return (
        !items ? <div></div>  : items
        .map((item) => (
            <Card
                key={item.id}
                id={item.id}
                title={item.title}
                isDone={item.isDone}
                setItems={setItems}
                render={render}
            />
        ))
    )
}

export default CardList;