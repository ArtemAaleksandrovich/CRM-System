import {type Dispatch, type SetStateAction} from "react";
import {getProfile} from "../api/auth/api.ts";
import type {NotificationInstance} from "antd/es/notification/interface";
import type {Profile} from "../types/auth/types.ts";

export const fetchProfile: (setProfile: Dispatch<SetStateAction<Profile | null>>, api: NotificationInstance) => Promise<void> = async (setProfile: Dispatch<SetStateAction<Profile | null>>, api: NotificationInstance) => {
    try {
        const response = await getProfile()
        setProfile(response);
    } catch(error) {
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