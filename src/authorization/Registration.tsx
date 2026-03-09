import {type FormProps, Layout, Modal, notification, Space, Typography} from 'antd';
import { Button, Form, Input } from 'antd';
import {Link} from "react-router-dom";
import {signUp} from "../api/api.ts";
import type {UserRegistration} from "../api/types.ts";
import {
    MAX_LENGTH_LOGIN,
    MIN_LENGTH_LOGIN,
    MAX_LENGTH_PASSWORD,
    MIN_LENGTH_PASSWORD,
    MAX_LENGTH_USERNAME,
    MIN_LENGTH_USERNAME
} from "../constants/constants.ts";
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    PhoneOutlined,
    UserAddOutlined,
    UnlockOutlined
} from '@ant-design/icons';
import {useState} from "react";

const { Title } = Typography;

interface FieldType extends UserRegistration{
    verification?: string;
}

const layoutStyle = {
    backgroundColor: '#f1f7f9',
    width: '450px',
    height: '550px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const Registration = () => {
    const [open, setOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setLoading(true);
        try {
            const response = await signUp({username: values.username,login: values.login, password: values.password, email: values.email, phoneNumber: values.phoneNumber});
            if (response){
                setOpen(true);
            }
        } catch (error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: error.message + "Пользователь с таким логином или почтой уже существует!",
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Неизвестная ошибка при регистрации!" + error,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <>
            {contextHolder}
            <Layout style={layoutStyle}>
                <Space
                    style={{display: 'flex', alignItems: 'center'}}
                    size={10}
                    orientation="vertical"
                >
                    <Title level={2}> Create Account </Title>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                    >
                        <Form.Item<FieldType>
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите имя пользователя!'
                                },
                                {
                                    min: MIN_LENGTH_USERNAME,
                                    max: MAX_LENGTH_USERNAME,
                                    message: 'Текст должен быть от 1 до 60 символов!'
                                }
                            ]}
                        >
                            <Input placeholder="Имя пользователя" addonBefore={<UserAddOutlined style={{ color: 'gray' }}/>}/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="login"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите логин!'
                                },
                                {
                                    min: MIN_LENGTH_LOGIN,
                                    max: MAX_LENGTH_LOGIN,
                                    message: 'Текст должен быть от 2 до 60 символов!'
                                },
                                {
                                    pattern: /^[^\d]+$/,
                                    message: 'Текст не должен содержать цифры!'
                                }
                            ]}
                        >
                            <Input placeholder="Логин" addonBefore={<UserOutlined style={{ color: 'gray' }}/>}/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите почту!'
                                },
                                {
                                    type: 'email',
                                    message: 'Почта введена некорректно!'
                                }
                            ]}
                        >
                            <Input placeholder="Почта" addonBefore={<MailOutlined style={{ color: 'gray' }}/>}/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="phoneNumber"
                            rules={[
                                {
                                    pattern: /^\+?[1-9][0-9]{7,14}$/,
                                    message: 'Номер телефона введен некорректно!'
                                }
                            ]}
                        >
                            <Input placeholder="Номер телефона" addonBefore={<PhoneOutlined style={{ color: 'gray' }}/>}/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите пароль!'
                                },
                                {
                                    min: MIN_LENGTH_PASSWORD,
                                    max: MAX_LENGTH_PASSWORD,
                                    message: 'Текст должен быть от 6 до 60 символов!'
                                },
                            ]}
                        >
                            <Input.Password placeholder="Пароль" addonBefore={<LockOutlined  style={{ color: 'gray' }}/>}/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="verification"
                            rules={[
                                {
                                    required: true,
                                    message: 'Повторите пароль!'
                                },
                                ({getFieldValue}) => ({ validator: (_, value) => {
                                        if (!value) {
                                            return Promise.resolve();
                                        }
                                        if (value !== getFieldValue('password')) {
                                            return Promise.reject(new Error('Пароли не совпадают!'))
                                        }
                                        return Promise.resolve()
                                    }
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Повторите пароль" addonBefore={<UnlockOutlined  style={{ color: 'gray' }}/>}/>
                        </Form.Item>

                        <Space size={40} orientation="horizontal">
                            <Button type="primary" style={{width: 300}} loading={loading} htmlType="submit">
                                Sign Up
                            </Button>
                        </Space>
                    </Form>
                    <Title level={5} style={{color: 'gray'}}> Have an account? <Link to="/auth">Log In</Link> </Title>
                </Space>
                <Modal
                    open={open}
                    centered
                    footer={null}
                    onCancel={handleCancel}
                >
                    Вы успешно зарегистрировались! Если хотите перейти к авторизации, нажмите <Link to="/auth">здесь!</Link>
                </Modal>
            </Layout>
        </>
    )
};

export default Registration;