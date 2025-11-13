import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
)
