import {Flex, type FormProps, Alert, Form, Input, Image} from 'antd';
import {type FormEvent, useState} from 'react';
import styles from './Todo.module.scss'
import {deleteTodo, updateTodo} from "../../api/api.ts";
import CheckBox from "../../ui/CheckBox/CheckBox.tsx";
import type {TodoInterface} from "../../api/types.ts";
import IconButton from "../../ui/IconButton/IconButton.tsx";

import edit_svg from "../../assets/edit_todo.svg"
import delete_svg from "../../assets/delete_todo.svg"
import save_svg from "../../assets/save.svg"
import cancel_svg from "../../assets/cancel.svg"

interface TodoProps extends TodoInterface {
    getTodos(): void,
}

interface FieldType {
    todoTitle: string;
}

const Todo = (props: TodoProps) => {
    const [form] = Form.useForm();
    const [isDone, setIsDone] = useState<boolean>(props.isDone);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const newTitle = values.todoTitle;

        updateTodo({id: props.id, title: newTitle, isDone: isDone})
            .then(() => props.getTodos())
            .then(() => setIsEditing(false))
            .catch((error) => {
                setError("Произошла ошибка при обновлении всей задачи: " + error.message);
                form.setFieldsValue({ todoTitle: props.title });
            })
    };

    const onCheckStatusTodo = () => {
        if (!isEditing) {
            const currentTitle = form.getFieldValue('todoTitle');

            updateTodo({id: props.id, title: currentTitle, isDone: !isDone})
                .then(() => props.getTodos())
                .then(() => setIsDone((done) => !done))
                .catch((error) => {
                    setError("Произошла ошибка при обновлении статуса задачи: " + error.message);
                })
        }
    }

    const onDeleteTodo = async () => {
        try {
            await deleteTodo(props.id);
            return props.getTodos();
        } catch (error) {
            if (error instanceof Error) {
                setError("Произошла ошибка при удалении задачи: " + error.message);
            } else {
                setError("Произошла неизвестная ошибка при удалении задачи: " + error);
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
                                        } else if (value.length < 2 || value.length > 65) {
                                            return Promise.reject(new Error('Текст должен быть от 2 до 64 символов'))
                                        }
                                        return Promise.resolve()
                                    }}
                            ]}
                        >
                            <Input className={`${styles.input} ${isDone ? styles.checked: ""} ${!isEditing ? styles.pointerNone : styles.inputEditing}`}/>
                        </Form.Item>
                    </Flex>
                    <Form.Item >
                        {!isEditing ? (
                            <Flex className={styles.buttonList}>
                                <IconButton color="primary" type="button" action={onEditTodo}>
                                    <Image style={{width: '20px', height: '20px'}} preview={false} src={edit_svg} alt="Edit"/>
                                </IconButton>
                                <IconButton color="danger" type="button" action={onDeleteTodo}>
                                    <Image style={{width: '25px', height: '25px'}} preview={false} src={delete_svg} alt="Delete"/>
                                </IconButton>
                            </Flex>
                        ) : (
                            <Flex className={styles.buttonList}>
                                <IconButton color="success" type="submit">
                                    <Image style={{width: '17px', height: '17px'}} preview={false} src={save_svg} alt="Save"/>
                                </IconButton>
                                <IconButton color="secondary" type="button" action={onCancelTodoChanges}>
                                    <Image style={{width: '25px', height: '25px'}} preview={false} src={cancel_svg} alt="Cancel"/>
                                </IconButton>
                            </Flex>
                        )}
                    </Form.Item>
                </Flex>
            </Form>
            {error && <Alert title={error} type='error' closable={{ closeIcon: true, 'aria-label': 'close' }} style={{width: '400px'}} onClick={() => setError(null)}/>}
        </>
    );
};

export default Todo;