import { type FormProps} from 'antd';
import { Button, Form, Input, notification  } from 'antd';

import {createTodo} from "../../api/api.ts";
import {MAX_LENGTH_TODOS, MIN_LENGTH_TODOS} from "../../constants/constants.ts";
import {useState} from "react";

interface AddTodoProps {
    getTodos(): void;
}

interface FieldType {
    title?: string;
}

const AddTodo = ({getTodos}: AddTodoProps) => {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
        setLoading(true);
        try {
            await createTodo({title: values.title, isDone: false})
            getTodos()
            form.resetFields()
        } catch (error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: "Произошла ошибка при создании задачи: " + error.message,
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Неизвестная ошибка при создании задачи! " + error,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Form
                layout={'inline'}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item<FieldType>
                    name="title"
                    rules={[
                        { validator: (_, value) => {
                            if (value.trim().length === 0) {
                                return Promise.reject(new Error('Поле не может быть пустым (пробелы не учитываются)'))
                            }
                            return Promise.resolve()
                        }},
                        {
                            min: MIN_LENGTH_TODOS,
                            max: MAX_LENGTH_TODOS,
                            message: 'Текст должен быть от 2 до 64 символов'
                        }
                    ]}
                >
                    <Input style={{width: '280px', height: '43px'}} placeholder="Задача для выполнения..." />
                </Form.Item>
                <Form.Item>
                    <Button style={{width: '113px', height: '43px', backgroundColor: '#3596e6'}} type="primary" loading={loading} htmlType="submit">Добавить</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddTodo;