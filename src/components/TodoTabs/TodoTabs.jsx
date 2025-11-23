import {useState} from 'react';
import styles from './TodoTabs.module.scss'

function TodoTabs({setTodoFilter, todoInfo}) {
    const [activeFilter, setActiveFilter] = useState('all');

    const onClickTab = (filter) => {
        setTodoFilter(filter)
        setActiveFilter(filter);
    }
    return (
        <nav>
            <button className={`${styles.button} ${activeFilter === 'all' ? styles.active : ''}`} onClick={() => onClickTab('all')}>Все({todoInfo.all})</button>
            <button className={`${styles.button} ${activeFilter === 'inWork' ? styles.active : ''}`} onClick={() => onClickTab('inWork')}>В работе({todoInfo.inWork})</button>
            <button className={`${styles.button} ${activeFilter === 'completed' ? styles.active : ''}`} onClick={() => onClickTab('completed')}>Сделано({todoInfo.completed})</button>
        </nav>
    )
}
export default TodoTabs;