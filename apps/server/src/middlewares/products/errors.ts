import { IAddProductBody } from "./validateAddProductBody"

interface IBodyErrorBase<T> {
    message: string
    errors: {
        [P in keyof Partial<T>]: string
    } & {
        mainImage?: string
        images?: string
    }
}


type IAddProductBodyError = IBodyErrorBase<IAddProductBody>

export class AddProductBodyError implements IAddProductBodyError {
    message: string;
    errors: IAddProductBodyError["errors"];

    constructor(message: string, errors: AddProductBodyError["errors"] = {}) {
        this.message = message
        this.errors = errors
    }


    addFieldError(key: keyof AddProductBodyError["errors"], errorMessage: string) {
        this.errors[key] = errorMessage;
    }
}