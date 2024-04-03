import { IPlaceOrderBody } from "./validatePlaceOrderBody"
import { IBodyErrorBase } from "../errorsBase";


type IPlaceOrderBodyError = IBodyErrorBase<IPlaceOrderBody>

export class PlaceOrderBodyError implements IPlaceOrderBodyError {
    message: string;
    errors: IPlaceOrderBodyError["errors"];

    constructor(message: string, errors: PlaceOrderBodyError["errors"] = {}) {
        this.message = message
        this.errors = errors
    }


    addFieldError(key: keyof PlaceOrderBodyError["errors"], errorMessage: string) {
        this.errors[key] = errorMessage;
    }
}