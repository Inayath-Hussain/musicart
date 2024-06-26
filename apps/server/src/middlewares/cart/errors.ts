import { IBodyErrorBase } from "../errorsBase";
import { IAddToCartBody } from "./validateAddToCartBody"


type IAddToCartBodyError = IBodyErrorBase<IAddToCartBody>

export class AddToCartBodyError implements IAddToCartBodyError {
    message: string;
    errors: IAddToCartBodyError["errors"];

    constructor(message: string, errors: AddToCartBodyError["errors"] = {}) {
        this.message = message
        this.errors = errors
    }


    addFieldError(key: keyof AddToCartBodyError["errors"], errorMessage: string) {
        this.errors[key] = errorMessage;
    }
}