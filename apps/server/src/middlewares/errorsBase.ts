export interface IBodyErrorBase<T> {
    message: string
    errors: {
        [P in keyof Partial<T>]: string
    }
}
