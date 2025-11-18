import Header from '../components/Header/Header.jsx'
import CardTabs from '../components/CardTabs/CardTabs.jsx'
import CardList from '../components/CardList/CardList.jsx'
import {useEffect, useState} from "react";
import { get } from '../api/api.js'

function TodoListPage() {
    const [items, setItems] = useState([])
    const [status, setStatus] = useState('all')
    const [all, setAll] = useState(0)
    const [inWork, setInWork] = useState(0)
    const [done, setDone] = useState(0)

    useEffect(() => {
        render()
    }, [status]);

    const render = () => {
        try {
            get(status)
                .then((response) => {
                    setItems(response.data);
                    setAll(response.info.all);
                    setInWork(response.info.inWork);
                    setDone(response.info.completed);
                })
        } catch {
            throw new Error("Ошибка в рендере страницы!");
        }
    }

    return (
        <>
            <Header setItems={setItems} render={render} />
            <CardTabs setStatus={setStatus} all={all} inWork={inWork} done={done} />
            <CardList items={items} setItems={setItems} render={render}/>
        </>
    )
}
export default TodoListPage;