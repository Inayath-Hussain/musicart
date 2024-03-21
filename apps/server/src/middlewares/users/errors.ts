import { ILoginBody } from "./validateLogin";
import { IRegisterBody } from "./validateRegister";


interface IBodyErrorBase<T> {
    message: string
    errors: {
        [P in keyof Partial<T>]: string
    }
}




type ILoginBodyError = IBodyErrorBase<ILoginBody>

/**
 * class to create error info for login api endpoint
 */
export class LoginBodyError implements ILoginBodyError {
    message: string;
    errors: ILoginBodyError["errors"];

    constructor(message: string, errors = {}) {
        this.message = message
        this.errors = errors
    }


    addFieldErrors(key: keyof LoginBodyError["errors"], errorMessage: string) {
        this.errors[key] = errorMessage
    }
}





type IRegisterBodyError = IBodyErrorBase<IRegisterBody>
/**
 * class to create error info for register api endpoint
 */
export class RegisterBodyError implements IRegisterBodyError {
    message: string;
    errors: IRegisterBodyError["errors"];

    constructor(message: string, errors = {}) {
        this.message = message
        this.errors = errors
    }

    addFieldErrors(key: keyof RegisterBodyError["errors"], errorMessage: string) {
        this.errors[key] = errorMessage
    }
}