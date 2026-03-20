import {Flex, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Router} from "./routes/Router.tsx";
import {type AppDispatch, type RootState} from './store/store.ts'
import {authActions} from "./store/slices/authSlice/authSlice.ts";
import {useEffect, useState} from "react";
import {refreshToken} from "./api/auth/api.ts";
import {useNavigate} from "react-router-dom";

function App() {
    const isAuthenticated: boolean = useSelector((state:RootState) => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated){
            navigate("/auth");
        }
    }, [isAuthenticated]);

    useEffect(() => {
        setTimeout(() => {
            checkAuth()
        }, 500)
    }, []);

    const checkAuth: () => Promise<void> = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('refresh_token');
            if (token) {
                const response = await refreshToken({refreshToken: token})
                if (response) {
                    dispatch(authActions.setAuth(true))
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
