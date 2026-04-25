import TodoListPage from '../pages/TodoListPage/TodoListPage.tsx'
import {Route, Routes} from "react-router-dom";
import ProfilePage from "../pages/ProfilePage/ProfilePage.tsx";

function TodoRouter() {
    return (
        <Routes>
            <Route path="/" element={<TodoListPage/>} />
            <Route path="/profile" element={<ProfilePage/>} />
        </Routes>
    )
}

export default TodoRouter
