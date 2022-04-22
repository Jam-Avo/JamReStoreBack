export type TResponseApi<T> = {
    error: boolean,
    message: string | null,
    data?: T | null,
    errors?: ErrorInputMessage[],
}

export type ErrorInputMessage = {
    id: string,
    message?: string,
}