import { IAddFeedbackBody } from "./validateAddFeedbackBody"
import { IBodyErrorBase } from "../errorsBase";


type IAddFeedbackBodyError = IBodyErrorBase<IAddFeedbackBody>

export class AddFeedbackBodyError implements IAddFeedbackBodyError {
    message: string;
    errors: IAddFeedbackBodyError["errors"];

    constructor(message: string, errors: AddFeedbackBodyError["errors"] = {}) {
        this.message = message
        this.errors = errors
    }


    addFieldError(key: keyof AddFeedbackBodyError["errors"], errorMessage: string) {
        this.errors[key] = errorMessage;
    }
}