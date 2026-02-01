import { type FormProps} from 'antd';
import { Button, Form, Input, notification  } from 'antd';
import {type ChangeEvent, useState} from 'react';
import {createTodo} from "../../api/api.ts";
import type {NotificationType} from "../../api/types.ts";

interface AddTodoProps {
    getTodos(): void;
}

interface FieldType {
    todoTitle?: string;
}

const AddTodo = ({getTodos}: AddTodoProps) => {
    const [form] = Form.useForm();
    const [title, setTitle] = useState<string>('');
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, error: string) => {
        api[type]({
            title: 'Ошибка!',
            description: error,
        });
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
        try {
            await createTodo({title: values.todoTitle, isDone: false})
            getTodos()
            setTitle('')
            form.resetFields()
        } catch (error) {
            if (error instanceof Error) {
                openNotificationWithIcon('error', "Произошла ошибка при создании задачи: " + error.message);
            } else {
                openNotificationWithIcon('error', "Неизвестная ошибка при создании задачи! " + error);
            }
        }
    };

    const onChangeTextTodo = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    return (
        <>
            {contextHolder}
            <Form
                layout={'inline'}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item<FieldType>
                    name="todoTitle"
                    rules={[
                        { validator: (_, value = title) => {
                            if (value.trim().length === 0) {
                                return Promise.reject(new Error('Поле не может быть пустым (пробелы не учитываются)'))
                            }
                            return Promise.resolve()
                        }},
                        {
                            min: 2,
                            max: 64,
                            message: 'Текст должен быть от 2 до 64 символов'
                        }
                    ]}
                >
                    <Input style={{width: '280px', height: '43px'}} onChange={onChangeTextTodo} value={title} placeholder="Задача для выполнения..." />
                </Form.Item>
                <Form.Item>
                    <Button style={{width: '113px', height: '43px', backgroundColor: '#3596e6'}} type="primary" htmlType="submit">Добавить</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddTodo;