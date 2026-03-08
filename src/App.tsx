import {Flex, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {TodoRouter} from "./routes/TodoRouter.tsx";
import {type RootState, authActions} from './store/store.tsx'
import {useEffect, useState} from "react";
import {refreshToken} from "./api/api.ts";

function App() {
    // сетаю фолс в изАус
    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    // вызываю юз эффект, функцию чекаус
    useEffect(() => {
        checkAuth()
    }, []);


    //залогиниться ИЛИ найти рефреш токен
    //ШАГ 0: старт приложения
    //ШАГ 1: находим рефреш токен (локал сторедж)
    //авторизоваться ИЛИ из рефреш токена
    //ШАГ 2: если есть, то попытка получить аксесс и рефреш токены
    //получить аксесс токен
    //ШАГ 3: если успех, то аксесс токен есть / не успех, то надо авторизоваться
    //получить профиль
    //ШАГ 4: если есть, то запрос на профиль


    //пытаюсь получить профиль
    const checkAuth = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('refresh_token');
            if (token) {
                const response = await refreshToken({refreshToken: token})
                if (response) {
                    console.log('success');
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
