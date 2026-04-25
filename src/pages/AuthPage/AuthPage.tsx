import {type FormProps, Layout, notification, Space, Typography} from 'antd';
import { Button, Form, Input } from 'antd';
import {Link} from "react-router-dom";
import {getProfile, signIn} from "../../api/auth/api.ts";
import {
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons';
import {useState} from "react";
import {authActions} from "../../store/slices/authSlice/authSlice.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store/store.ts";
import type {AuthData} from "../../types/auth/types.ts";
const { Title } = Typography;

const layoutStyle = {
    backgroundColor: '#f1f7f9',
    width: '450px',
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const AuthPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onFinishAuth: FormProps<AuthData>['onFinish'] = async (values) => {
        setIsLoading(true);
        try {
            await signIn({login: values.login, password: values.password});
            dispatch(authActions.login())

            const { roles } = await getProfile();
            dispatch(authActions.setRoles(roles));
        } catch (error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: error.message,
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Неизвестная ошибка при авторизации! " + error,
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Layout style={layoutStyle}>
                <Space
                    style={{display: 'flex', alignItems: 'center'}}
                    size={40}
                    orientation="vertical"
                >
                    <Title level={2}> Login to your Account </Title>
                    <Form
                        name="basic"
                        initialValues={{remember: true}}
                        onFinish={onFinishAuth}
                    >
                        <Form.Item<AuthData>
                            name="login"
                            rules={[{required: true, message: 'Введите логин!'}]}
                        >
                            <Input placeholder="Логин" addonBefore={<UserOutlined style={{ color: 'gray' }}/>}/>
                        </Form.Item>

                        <Form.Item<AuthData>
                            name="password"
                            rules={[{required: true, message: 'Введите пароль!'}]}
                        >
                            <Input.Password placeholder="Пароль" addonBefore={<LockOutlined  style={{ color: 'gray' }}/>}/>
                        </Form.Item>

                        <Space size={40} orientation="horizontal">
                            <Button type="primary" style={{width: 300}} loading={isLoading} htmlType="submit">
                                Login
                            </Button>
                        </Space>
                    </Form>
                    <Title level={5} style={{color: 'gray'}}> Not Registered Yet? <Link to="/auth/signup">Create an account</Link>
                    </Title>
                </Space>
            </Layout>
        </>
    )
};

export default AuthPage;