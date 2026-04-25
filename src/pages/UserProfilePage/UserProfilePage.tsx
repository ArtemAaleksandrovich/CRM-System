import {
    Button,
    ConfigProvider, Form, type FormProps, Input,
    Layout, Modal,
    notification,
    Space,
    Spin,
    Typography,
} from "antd";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import {type NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {getUserById, updateUserData} from "../../api/admin/api.ts";
import {MAX_LENGTH_USERNAME, MIN_LENGTH_USERNAME} from "../../constants/constants.ts";
import {useForm} from "antd/lib/form/Form";
import type {User} from "../../types/admin/types.ts";

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
    const [user, setUser] = useState<User | null>(null)
    const [api, contextHolder] = notification.useNotification();
    const isAuthenticated: boolean = useSelector((state:RootState) => state.auth.isAuthenticated);
    const navigate: NavigateFunction = useNavigate();
    const { id } = useParams();
    const [form] = useForm();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isAuthenticated) {
            getUser(Number(id))
        } else {
            navigate("/auth");
        }
    }, [isAuthenticated]);

    const getUser: (id: number) => Promise<void> = async (id: number) => {
        try {
            const response = await getUserById(id);
            setUser(response)
        } catch (error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: "Ошибка при получении данных профиля! " + error.message,
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Неизвестная ошибка при получении данных профиля! " + error,
                });
            }
        }
    }

    const onFinishUpdateUserData: FormProps<User>['onFinish'] = async (values) => {
        setIsConfirmLoading(true);
        try {
            await updateUserData(Number(id), { username: values.username, email: values.email, phoneNumber: values.phoneNumber })
            getUser(Number(id))
            setIsOpen(false)
            form.resetFields()
        } catch(error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: 'Вероятно, почта уже используется!' + error.message,
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Неизвестная ошибка при обновлении профиля! " + error,
                });
            }
        } finally {
            setIsConfirmLoading(false)
        }
    }

    const handleCancelUpdateUserData = () => {
        setIsOpen(false)
        form.resetFields()
    };

    return (
        <Layout style={layoutStyle}>
            {contextHolder}
            <ConfigProvider theme={theme}>
                <Space
                    style={{ display: 'flex', alignItems: 'center'}}
                    size={200}
                    orientation="vertical"
                >
                    <Title level={1}> User Profile </Title>
                    {
                        user ?
                            <Space
                                style={{ display: 'flex', alignItems: 'center'}}
                                orientation="vertical"
                            >
                                <Title level={2}>Пользователь: {user.username}!</Title>
                                <Title level={3}>Email: {user.email}</Title>
                                <Title level={3}>Телефон: {user.phoneNumber ? user.phoneNumber : "не введён"}</Title>
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
                            <Button type="primary" style={{width: 300}} onClick={() => setIsOpen(true)}>
                                Редактировать профиль
                            </Button>
                            <Button type="default" style={{width: 300}} onClick={() => navigate("/users")}>
                                Назад
                            </Button>
                        </Space>
                    </Title>
                </Space>
            </ConfigProvider>
            <Modal
                title="Редактирование профиля"
                centered
                open={isOpen}
                footer={
                    <>
                        <Button danger onClick={handleCancelUpdateUserData}>
                            Отмена
                        </Button>
                        <Button type="primary" loading={isConfirmLoading} htmlType="submit" form="profileForm">
                            Подтвердить изменения
                        </Button>
                    </>
                }
                confirmLoading={isConfirmLoading}
                onCancel={handleCancelUpdateUserData}
            >
                <Form
                    form={form}
                    id="profileForm"
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinishUpdateUserData}
                >

                    <Form.Item<User>
                        name="username"
                        rules={[
                            {
                                min: MIN_LENGTH_USERNAME,
                                max: MAX_LENGTH_USERNAME,
                                message: 'Текст должен быть от 1 до 60 символов!'
                            }
                        ]}
                    >
                        <Input placeholder="Имя пользователя..." addonBefore={"Имя пользователя: "}/>
                    </Form.Item>

                    <Form.Item<User>
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Почта введена некорректно!'
                            }
                        ]}
                    >
                        <Input placeholder="Почта..." addonBefore={"Почта: "}/>
                    </Form.Item>

                    <Form.Item<User>
                        name="phoneNumber"
                        rules={[
                            {
                                pattern: /^\+?[1-9][0-9]{7,14}$/,
                                message: 'Номер телефона введен некорректно!'
                            }
                        ]}
                    >
                        <Input placeholder="Номер телефона..." addonBefore={"Номер телефона: "}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    )
}
export default OwnProfilePage;