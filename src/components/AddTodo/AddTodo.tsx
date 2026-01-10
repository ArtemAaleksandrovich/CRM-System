import {Alert, type FormProps} from 'antd';
import { Button, Form, Input } from 'antd';
import {type ChangeEvent, useCallback, useState} from 'react';
import {createTodo} from "../../api/api.ts";

interface AddTodoProps {
    getTodos(): void;
}

interface FieldType {
    todoTitle?: string;
}

const AddTodo = ({getTodos}: AddTodoProps) => {
    const [form] = Form.useForm();
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onFinish: FormProps<FieldType>['onFinish'] = useCallback(() => {
        createTodo({title, isDone: false})
            .then(() => getTodos())
            .then(() => setTitle(''))
            .then(() => form.resetFields())
            .catch((error) => {
                setError("Произошла ошибка при создании задачи: " + error.message);
            })
    }, [getTodos(), form]);

    const onChangeTextTodo = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }, [])

    return (
        <>
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
                            } else if (value.length < 2 || value.length > 65) {
                                return Promise.reject(new Error('Текст должен быть от 2 до 64 символов'))
                            }
                            return Promise.resolve()
                        }}
                    ]}
                >
                    <Input style={{width: '280px', height: '43px'}} onChange={onChangeTextTodo} value={title} placeholder="Задача для выполнения..." />
                </Form.Item>
                <Form.Item>
                    <Button style={{width: '113px', height: '43px', backgroundColor: '#3596e6'}} type="primary" htmlType="submit">Добавить</Button>
                </Form.Item>
            </Form>
            {error && <Alert title={error} type='error' closable={{ closeIcon: true, 'aria-label': 'close' }} onClick={() => setError(null)}/>}
        </>
    );
};

export default AddTodo;