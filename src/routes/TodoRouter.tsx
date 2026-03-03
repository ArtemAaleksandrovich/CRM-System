import TodoListPage from '../pages/TodoListPage/TodoListPage.tsx'
import {Route, Routes} from "react-router-dom";
import ProfilePage from "../pages/ProfilePage/ProfilePage.tsx";
import Registration from "../Authorization/Registration.tsx";
import Auth from "../Authorization/Auth.tsx";

export function TodoRouter() {
    return (
        <Routes>
            <Route path="/" element={<TodoListPage/>} />
            <Route path="/profile" element={<ProfilePage/>} />
        </Routes>
    )
}

export function AuthRouter() {
    return (
        <Routes>
            <Route path="/" element={<Auth/>} />
            <Route path="/signup" element={<Registration/>} />
            <Route path="*" element={<Auth/>} />
        </Routes>
    )
}


