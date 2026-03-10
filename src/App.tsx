import {Flex, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {TodoRouter} from "./routes/TodoRouter.tsx";
import {type RootState, authActions} from './store/store.ts'
import {useEffect, useState} from "react";
import {refreshToken} from "./api/api.ts";

function App() {
    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            checkAuth()
        }, 500)
    }, []);

    const checkAuth = async () => {
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
          <TodoRouter isAuth={isAuthenticated}/>
      </Flex>
  )
}

export default App
