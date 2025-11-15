import React, {useEffect, useState} from 'react'
import './App.scss'
import Header from './components/Header/index.jsx'
import Card from './components/Card/index.jsx'

function App() {
    const [items, setItems] = useState([])
    const [status, setStatus] = useState('all')
    const [all, setAll] = useState(0)
    const [inWork, setInWork] = useState(0)
    const [done, setDone] = useState(0)

    useEffect(() => {
        render()
    }, [status]);

    const render = () => {
        fetch(`https://easydev.club/api/v1/todos?filter=${status}`)
            .then(res => res.json())
            .then((response) => {
                setItems(response.data);
                setAll(response.info.all);
                setInWork(response.info.inWork);
                setDone(response.info.completed);
            })
    }
    const onCreateCard = (obj) => {
        const { title, isDone } = obj;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, isDone })
        };
        fetch(`https://easydev.club/api/v1/todos`, requestOptions)
            .then(res => res.json())
            .then(res => setItems(prev => [...prev, res]))
            .then(() => render())
    }

    const onUpdateCard = (obj) => {
        const { title, isDone } = obj;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, isDone })
        };
        fetch(`https://easydev.club/api/v1/todos/${obj.id}`, requestOptions)
            .then(res => res.json())
            .then(() => render())
    }


    const onDeleteCard = (id) => {
        const requestOptions = {
            method: 'DELETE'
        };
        fetch(`https://easydev.club/api/v1/todos/${id}`, requestOptions)
            .then(() => setItems(prev => prev.filter(item => item.id !== id)))
            .then(() => render())
    }


  return (
      <>
          <div className="wrapper">
              <h1> TODO List </h1>
              <Header
                  onCreate={(obj) => onCreateCard(obj)}
              />
              <nav>
                  <button className="nav__button" onClick={() => setStatus('all')}>Все({all})</button>
                  <button className="nav__button" onClick={() => setStatus('inWork')}>В работе({inWork})</button>
                  <button className="nav__button" onClick={() => setStatus('completed')}>Сделано({done})</button>
              </nav>
              {
                  items.map((item) => (
                      <Card
                          key={item.id}
                          id={item.id}
                          title={item.title}
                          onUpdate={(obj) => onUpdateCard(obj)}
                          onDelete={(id) => onDeleteCard(id)}
                          isDone={item.isDone}
                      />
                  ))
              }
          </div>
      </>
  )
}

export default App
