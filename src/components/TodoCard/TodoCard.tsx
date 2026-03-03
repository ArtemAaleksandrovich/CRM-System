import {Flex, type FormProps, Form, Input, notification} from 'antd';
import {
    CloseOutlined,
    FormOutlined,
    DeleteOutlined,
    CheckOutlined,
} from '@ant-design/icons';
import {type FormEvent, memo, useState} from 'react';
import styles from './TodoCard.module.scss'
import {deleteTodo, updateTodo} from "../../api/api.ts";
import CheckBox from "../../ui/CheckBox/CheckBox.tsx";
import type {Todo} from "../../api/types.ts";
import IconButton from "../../ui/IconButton/IconButton.tsx";
import {MAX_LENGTH_TODOS, MIN_LENGTH_TODOS} from "../../constants/constants.ts";

interface TodoProps extends Todo {
    getTodos(): void,
}

interface FieldType {
    todoTitle: string;
}

const TodoCard = memo ((props: TodoProps) => {
    const [form] = Form.useForm();
    const [isDone, setIsDone] = useState<boolean>(props.isDone);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
        try {
            await updateTodo({id: props.id, title: values.todoTitle, isDone: isDone})
            props.getTodos()
            setIsEditing(false)
        } catch(error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: "Произошла ошибка при обновлении всей задачи: " + error.message,
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Неизвестная ошибка при обновлении всей задачи! " + error,
                });
            }
            form.setFieldsValue({ todoTitle: props.title });
        }
    };

    const onCheckStatusTodo = async () => {
        if (!isEditing) {
            const currentTitle = form.getFieldValue('todoTitle');
            try {
                await updateTodo({id: props.id, title: currentTitle, isDone: !isDone})
                props.getTodos()
                setIsDone((done) => !done)
            } catch(error) {
                if (error instanceof Error) {
                    api['error']({
                        title: 'Ошибка!',
                        description: "Произошла ошибка при обновлении статуса задачи: " + error.message,
                    });
                } else {
                    api['error']({
                        title: 'Ошибка!',
                        description: "Неизвестная ошибка при обновлении статуса задачи! " + error,
                    });
                }
            }
        }
    }

    const onDeleteTodo = async () => {
        try {
            await deleteTodo(props.id);
            props.getTodos();
        } catch (error) {
            if (error instanceof Error) {
                api['error']({
                    title: 'Ошибка!',
                    description: "Произошла ошибка при удалении задачи: " + error.message,
                });
            } else {
                api['error']({
                    title: 'Ошибка!',
                    description: "Произошла неизвестная ошибка при удалении задачи: " + error,
                });
            }
        }
    }

    const onEditTodo = (e: FormEvent) => {
        e.preventDefault();
        setIsEditing(true);
    }

    const onCancelTodoChanges = () => {
        setIsEditing(false);
        form.setFieldsValue({ todoTitle: props.title });
        setIsDone(props.isDone);
    }

    return (
        <>
            {contextHolder}
            <Form
                layout={'inline'}
                form={form}
                initialValues={{ todoTitle: props.title }}
                onFinish={onFinish}
            >
                <Flex align={'flex-start'}>
                    <Flex align={'center'}>
                        <CheckBox onChange={onCheckStatusTodo} isChecked={isDone} isHidden={isEditing}/>
                        <Form.Item<FieldType>
                            name="todoTitle"
                            rules={[
                                { validator: (_, value) => {
                                    if (!value || value.trim().length === 0) {
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
                            <Input className={`${styles.input} ${isDone ? styles.checked: ""} ${!isEditing ? styles.pointerNone : styles.inputEditing}`}/>
                        </Form.Item>
                    </Flex>
                    <Form.Item >
                        {!isEditing ? (
                            <Flex className={styles.buttonList}>
                                <IconButton color="primary" type="button" action={onEditTodo}>
                                    <FormOutlined />
                                </IconButton>
                                <IconButton color="danger" type="button" action={onDeleteTodo}>
                                    <DeleteOutlined />
                                </IconButton>
                            </Flex>
                        ) : (
                            <Flex className={styles.buttonList}>
                                <IconButton color="success" type="submit">
                                    <CheckOutlined />
                                </IconButton>
                                <IconButton color="secondary" type="button" action={onCancelTodoChanges}>
                                    <CloseOutlined />
                                </IconButton>
                            </Flex>
                        )}
                    </Form.Item>
                </Flex>
            </Form>
        </>
    );
});

export default TodoCard;