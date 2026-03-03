import Sidebar from "./components/Sidebar/Sidebar.tsx";
import {Flex, Spin} from "antd";
import {AuthRouter} from "./routes/TodoRouter.tsx";
import {useDispatch, useSelector} from "react-redux";
import {TodoRouter} from "./routes/TodoRouter.tsx";
import {type RootState, authActions} from './store/store.tsx'
import {useEffect, useState} from "react";
import {refreshToken} from "./api/api.ts";



function App() {
    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();


    useEffect(() => {
        checkAuth()
    }, []);

    const checkAuth = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('refresh_token');
            if (token) {
                await refreshToken({refreshToken: token});
                console.log("success");
                dispatch(authActions.setAuth(true))
            }
        } catch (error) {
            console.log("error");
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
          {isAuthenticated ?
              <Flex>
                  <Sidebar/>
                  <TodoRouter/>
              </Flex>
               : <AuthRouter/>
          }
      </Flex>
  )
}

export default App
