export type TResponseApi<T> = {
    error: boolean,
    message: string | null,
    data?: T | null,
    errors?: ErrorInputMessage[],
    statusCode?: number,
}

export type ErrorInputMessage = {
    id: string,
    message: string,
}