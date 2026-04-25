import type {TabsProps} from 'antd';
import {Tabs} from 'antd';
import {type Dispatch, type SetStateAction} from 'react';
import {type TodoInfo, TodosFilter} from "../../api/types.ts";

interface TodoTabsProps {
    setTodoFilter: Dispatch<SetStateAction<TodosFilter>>
    todoInfo: TodoInfo;
}

const TodoTabs = ({setTodoFilter, todoInfo}: TodoTabsProps) => {

    const items: TabsProps['items'] = [
        {
            key: TodosFilter.ALL,
            label: `Все(${todoInfo.all})`,
        },
        {
            key: TodosFilter.IN_WORK,
            label: `В работе(${todoInfo.inWork})`,
        },
        {
            key: TodosFilter.COMPLETED,
            label: `Сделано(${todoInfo.completed})`,
        },
    ];

    const onChange = (key: string) => {
        if (key === TodosFilter.COMPLETED || key === TodosFilter.IN_WORK || key === TodosFilter.ALL) {
            setTodoFilter(key);
        }
    }

    return <Tabs style={{marginTop: '0.5rem'}} defaultActiveKey={TodosFilter.ALL} items={items} onChange={onChange}/>
};

export default TodoTabs;