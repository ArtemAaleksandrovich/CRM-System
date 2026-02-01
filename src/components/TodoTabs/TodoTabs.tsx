import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import {type Dispatch, type SetStateAction} from 'react';
import type {TodoInfo, TodosByFilter} from "../../api/types.ts";

interface TodoTabsProps {
    setTodoFilter: Dispatch<SetStateAction<TodosByFilter>>
    todoInfo: TodoInfo;
}

const TodoTabs = ({setTodoFilter, todoInfo}: TodoTabsProps) => {

    const items: TabsProps['items'] = [
        {
            key: 'all',
            label: `Все(${todoInfo.all})`,
        },
        {
            key: 'inWork',
            label: `В работе(${todoInfo.inWork})`,
        },
        {
            key: 'completed',
            label: `Сделано(${todoInfo.completed})`,
        },
    ];

    const onChange = (key: string) => {
        setTodoFilter(key as unknown as TodosByFilter);
    }

    return <Tabs style={{marginTop: '0.5rem'}} defaultActiveKey="all" items={items} onChange={onChange}/>
};

export default TodoTabs;