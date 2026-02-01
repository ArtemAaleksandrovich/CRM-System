export interface TodoRequest {
    title?: string;
    isDone?: boolean;
}

export interface Todo {
    id: number;
    title: string;
    created?: string; // ISO date string
    isDone: boolean;
}

export interface TodoInfo {
    all: number
    completed: number
    inWork: number
}

export interface MetaResponse<T, N> {
    data: T[]
    info: N // изменил с info? на info (он по идее всегда должен быть)
    meta: {
        totalAmount: number
    }
}

export interface TodosByFilter {
    status: 'all' | 'completed' | 'inWork'
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error';