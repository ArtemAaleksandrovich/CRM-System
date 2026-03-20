import TodoListPage from '../pages/TodoListPage/TodoListPage.tsx'
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import ProfilePage from "../pages/ProfilePage/ProfilePage.tsx";
import Registration from "../authorization/Registration.tsx";
import Auth from "../authorization/Auth.tsx";
import Sidebar from "../components/Sidebar/Sidebar.tsx";
import authImage from "../assets/auth.png"
import {Flex, Space, Image} from "antd";
import type {JSX} from "react";

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

    const ProtectedAuthRoute = ({isAuth}: RouterProps): JSX.Element => {
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
    const ProtectedNoAuthRoute = ({isAuth}: RouterProps): JSX.Element => {
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
            <Route path="/" element={<ProtectedAuthRoute isAuth={isAuth}/>}>
                <Route index element={<TodoListPage/>} />
                <Route path="profile" element={<ProfilePage/>} />
            </Route>

            <Route path="/auth" element={<ProtectedNoAuthRoute isAuth={isAuth} />}>
                <Route index element={<Auth/>} />
                <Route path="signup" element={<Registration/>} />
            </Route>
        </Routes>
    )
}


