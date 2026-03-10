import {Checkbox, Flex, type FormProps, Layout, notification, Space, Typography} from 'antd';
import { Button, Form, Input } from 'antd';
import {Link} from "react-router-dom";
import {signIn} from "../api/api.ts";
import {
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons';
import {useState} from "react";
import {authActions} from "../store/store.ts";
import {useDispatch} from "react-redux";
const { Title } = Typography;

type FieldType = {
    login: string;
    password: string;
    remember?: string;
};

const layoutStyle = {
    backgroundColor: '#f1f7f9',
    width: '450px',
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};


const Auth = () => {
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setLoading(true);
        try {
            await signIn({login: values.login, password: values.password});
            dispatch(authActions.login())
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
            setLoading(false);
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
                        onFinish={onFinish}
                    >
                        <Form.Item<FieldType>
                            name="login"
                            rules={[{required: true, message: 'Введите логин!'}]}
                        >
                            <Input placeholder="Логин" addonBefore={<UserOutlined style={{ color: 'gray' }}/>}/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="password"
                            rules={[{required: true, message: 'Введите пароль!'}]}
                        >
                            <Input.Password placeholder="Пароль" addonBefore={<LockOutlined  style={{ color: 'gray' }}/>}/>
                        </Form.Item>

                        <Flex gap={60}>
                            <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}
                                                  style={{marginTop: '-4px'}}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <Link to="/#">Forgot password?</Link>
                        </Flex>

                        <Space size={40} orientation="horizontal">
                            <Button type="primary" style={{width: 300}} loading={loading} htmlType="submit">
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

export default Auth;