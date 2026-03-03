import {Button, ConfigProvider, Layout, notification, Space, Spin, Typography} from "antd";
import {useEffect, useState} from "react";
import {getProfile, logOut} from "../../api/api.ts";
import {useDispatch} from "react-redux";
import {authActions} from "../../store/store.tsx";

interface IUser {
    username: string;
    email: string;
    phoneNumber: string;
}

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
function ProfilePage() {
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        getUser()
    }, []);

    const getUser: () => Promise<void> = async () => {
        try {
            const response = await getProfile()
            setUser(response);
        } catch(error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: "Ошибка при получении данных профиля! " + error.message,
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Неизвестная ошибка получении данных профиля! " + error,
                });
            }
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = () => {
        logOut()
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
                    {loading && <Spin fullscreen size="large"/>}
                    {!loading && user && (
                        <Space
                            style={{ display: 'flex', alignItems: 'center'}}
                            orientation="vertical"
                        >
                            <Title level={2}>Привет, {user.username}!</Title>
                            <Title level={3}>Email: {user.email}</Title>
                            <Title level={3}>Телефон: {user.phoneNumber}</Title>
                        </Space>
                    )}
                    <Title level={2}>
                        <Button danger style={{width: 300}} onClick={handleLogout}>
                            Log Out
                        </Button>
                    </Title>
                </Space>
            </ConfigProvider>
        </Layout>
    )
}
export default ProfilePage;