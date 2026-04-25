import {Flex, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Router} from "./routes/Router.tsx";
import {type AppDispatch, type RootState} from './store/store.ts'
import {authActions} from "./store/slices/authSlice/authSlice.ts";
import {useEffect, useState} from "react";
import {refreshToken} from "./api/auth/api.ts";
import {jwtDecode} from 'jwt-decode';
import type {Role} from "./types/auth/types.ts";

function App() {
    const isAuthenticated: boolean = useSelector((state:RootState) => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        checkAuth()
    }, []);

    const checkAuth: () => Promise<void> = async () => {
        try {
            const token = localStorage.getItem('refresh_token');
            if (token) {
                const response = await refreshToken({refreshToken: token})
                if (response) {
                    dispatch(authActions.setAuth(true))
                    const payload = jwtDecode<{ isAdmin?: Role[] }>(response.accessToken);
                    dispatch(authActions.setRoles(payload.isAdmin || []));
                }
            } else {
                dispatch(authActions.setAuth(false))
            }
        } catch {
            dispatch(authActions.setAuth(false))
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <Flex justify={'center'} align={'center'} style={{height: '100vh'}}>
                <Spin fullscreen size="large"/>
            </Flex>
        );
    }

    return (
      <Flex justify={'center'} align={'center'} style={{height:'100vh'}}>
          <Router isAuth={isAuthenticated}/>
      </Flex>
  )
}

export default App
