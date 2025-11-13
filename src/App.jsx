import React, { useState } from 'react'
import './App.scss'
import Header from './components/Header/index.jsx'
import Index from './components/Card/index.jsx'
import { Routes, Route, Link } from 'react-router-dom'

function App() {
    const [items, setItems] = useState([])

    const inWork = items.filter((item) => (item.isDone === false))
    const done = items.filter((item) => (item.isDone === true))

    React.useEffect(() => {
        render()
    }, []);

    const render = () => {
        fetch('https://easydev.club/api/v1/todos')
            .then(res => res.json())
            .then((response) => {
                setItems(response.data);
            });
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
            .then(res => setItems(prev => [...prev, res]));
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
        setItems(prev => prev.filter(item => item.id !== id))

    }

    const AllCards = () => {
        return ((items.map((item) => (
            <Index
                key={item.id}
                id={item.id}
                title={item.title}
                onUpdate={(obj) => onUpdateCard(obj)}
                onDelete={(id) => onDeleteCard(id)}
                isDone={item.isDone}
            />
        ))))
    }
    const InWorkCards = () => {
        return (inWork.map((item) => (
                <Index
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    onUpdate={(obj) => onUpdateCard(obj)}
                    onDelete={(id) => onDeleteCard(id)}
                    isDone={item.isDone}
                />
            ))
        )
    }
    const DoneCards = () => {
        return (done.map((item) => (
                <Index
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    onUpdate={(obj) => onUpdateCard(obj)}
                    onDelete={(id) => onDeleteCard(id)}
                    isDone={item.isDone}
                />
            ))
        )
    }

  return (
      <>
          <div className="wrapper">
              <h1> TODO List </h1>
              <Header
                  onCreate={(obj) => onCreateCard(obj)}
              />
              <nav>
                  <Link className="link" to="/">Все({items.length})</Link>
                  <Link className="link" to="/work">В работе({inWork.length})</Link>
                  <Link className="link" to="/done">Сделано({done.length})</Link>
              </nav>
              <Routes>
                  <Route path="/" element={<AllCards />} />
                  <Route path="/work" element={<InWorkCards />} />
                  <Route path="/done" element={<DoneCards />} />
              </Routes>
          </div>
      </>
  )
}

export default App
