import {useState, type Dispatch, type SetStateAction} from 'react';
import styles from './TodoTabs.module.scss'
import type {TodoInfo} from "../../api/types.ts";

interface TodoTabsProps {
    setTodoFilter: Dispatch<SetStateAction<string>>
    todoInfo: TodoInfo;
}

function TodoTabs({setTodoFilter, todoInfo}: TodoTabsProps) {
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const onChangeFilter = (filter: string) => {
        setTodoFilter(filter);
        setActiveFilter(filter);
    }
    return (
        <nav>
            <button className={`${styles.button} ${activeFilter === 'all' ? styles.active : ''}`} onClick={() => onChangeFilter('all')}>Все({todoInfo.all})</button>
            <button className={`${styles.button} ${activeFilter === 'inWork' ? styles.active : ''}`} onClick={() => onChangeFilter('inWork')}>В работе({todoInfo.inWork})</button>
            <button className={`${styles.button} ${activeFilter === 'completed' ? styles.active : ''}`} onClick={() => onChangeFilter('completed')}>Сделано({todoInfo.completed})</button>
        </nav>
    )
}
export default TodoTabs;