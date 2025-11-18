function CardTabs({setStatus, all, inWork, done}) {
    return (
        <nav>
            <button className="nav__button" onClick={() => setStatus('all')}>Все({all})</button>
            <button className="nav__button" onClick={() => setStatus('inWork')}>В работе({inWork})</button>
            <button className="nav__button" onClick={() => setStatus('completed')}>Сделано({done})</button>
        </nav>
    )
}
export default CardTabs;