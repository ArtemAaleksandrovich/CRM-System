import type {Dispatch, SetStateAction} from "react";

export const validation = (title: string, setError: Dispatch<SetStateAction<string>>) => {
    if (title.trim().length === 0) {
        setError("Поле обязательно для заполнения (пробелы не учитываются)")
        return false;
    } else if (title.length < 2 || title.length > 65) {
        setError("Текст задачи должен быть от 2 до 64 символов")
        return false;
    }
    return true;
}
