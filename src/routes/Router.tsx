import TodoListPage from '../pages/TodoListPage/TodoListPage.tsx'
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import OwnProfilePage from "../pages/OwnProfilePage/OwnProfilePage.tsx";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage.tsx";
import UserListPage from "../pages/UserListPage/UserListPage.tsx";
import AuthPage from "../pages/AuthPage/AuthPage.tsx";
import Sidebar from "../components/Sidebar/Sidebar.tsx";
import authImage from "../assets/auth.png"
import {Flex, Space, Image} from "antd";
import type {JSX} from "react";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage.tsx";

interface RouterProps {
    isAuth: boolean;
}

const layoutStyle = {
    backgroundColor: '#f1f7f9',
    width: '1000px',
    height: '550px',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export function Router({isAuth}: RouterProps): JSX.Element {

    const AuthRoute = ({isAuth}: RouterProps): JSX.Element => {
        if (!isAuth) {
            return <Navigate to={"/auth"} />
        }
        return (
            <Flex>
                <Sidebar/>
                <Outlet/>
            </Flex>
        )
    }
    const NoAuthRoute = ({isAuth}: RouterProps): JSX.Element => {
        if (isAuth) {
            return <Navigate to={"/"} />
        }
        return (
            <Space style={layoutStyle} orientation="horizontal" size={-10}>
                <Image preview={false} style={{width: '540px', height: '540px'}} src={authImage} />
                <Outlet/>
            </Space>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<AuthRoute isAuth={isAuth}/>}>
                <Route index element={<TodoListPage/>} />
                <Route path="profile" element={<OwnProfilePage/>} />
                <Route path="users" element={<UserListPage/>} />
                <Route path="users/user/:id" element={<UserProfilePage/>} />
            </Route>

            <Route path="/auth" element={<NoAuthRoute isAuth={isAuth} />}>
                <Route index element={<AuthPage/>} />
                <Route path="signup" element={<RegistrationPage/>} />
            </Route>
        </Routes>
    )
}


