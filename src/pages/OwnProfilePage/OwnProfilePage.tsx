import {
    Button,
    ConfigProvider,
    Layout,
    notification,
    Space,
    Spin,
    Typography,
} from "antd";
import {useEffect, useState} from "react";
import {logOut} from "../../api/auth/api.ts";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/slices/authSlice/authSlice.ts";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {type NavigateFunction, useNavigate} from "react-router-dom";
import type {Profile} from "../../types/auth/types.ts";
import {fetchProfile} from "../../utils/fetchProfile.ts";

const { Title } = Typography;

const theme = {
    token: {
        fontSizeHeading1: 50,
        fontFamily: 'Roboto sans, sans-serif',
    },
};

const layoutStyle = {
    backgroundColor: '#f1f7f9',
    width: '600px',
    height: '100vh',
    overflow: 'auto',
};
function OwnProfilePage() {
    const [isExitLoading, setIsExitLoading] = useState<boolean>(false);
    const [profile, setProfile] = useState<Profile | null>(null)
    const dispatch: AppDispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();
    const isAuthenticated: boolean = useSelector((state:RootState) => state.auth.isAuthenticated);
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            fetchProfile(setProfile, api)
        } else {
            navigate("/auth");
        }
    }, [isAuthenticated]);

    const handleLogout = async () => {
        setIsExitLoading(true)
        try {
            await logOut()
        } catch (error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: "Ошибка при выходе с аккаунта! " + error.message,
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Неизвестная ошибка при выходе с аккаунта! " + error,
                });
            }
        }

        dispatch(authActions.logout())
    }

    return (
        <Layout style={layoutStyle}>
            {contextHolder}
            <ConfigProvider theme={theme}>
                <Space
                    style={{ display: 'flex', alignItems: 'center'}}
                    size={200}
                    orientation="vertical"
                >
                    <Title level={1}> Profile </Title>
                    {
                        profile ?
                        <Space
                            style={{ display: 'flex', alignItems: 'center'}}
                            orientation="vertical"
                        >
                            <Title level={2}>Привет, {profile.username}!</Title>
                            <Title level={3}>Email: {profile.email}</Title>
                            <Title level={3}>Телефон: {profile.phoneNumber ? profile.phoneNumber : "не введён"}</Title>
                        </Space>
                    :

                        <Layout style={{height: "250px", justifyContent: "center"}}>
                            <Spin size="large"/>
                        </Layout>
                    }
                    <Title level={2}>
                        <Space
                            size={5}
                            orientation="vertical"
                        >
                            <Button danger style={{width: 300}} loading={isExitLoading} onClick={handleLogout}>
                                Выход
                            </Button>
                        </Space>
                    </Title>
                </Space>

            </ConfigProvider>
        </Layout>
    )
}
export default OwnProfilePage;