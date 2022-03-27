export type TResponseApi<T> = {
    error: boolean,
    message: string | null,
    data?: T | null,
}