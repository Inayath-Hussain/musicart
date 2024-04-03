import { RequestHandler } from "express";
import { sanitizeAll } from "../sanitizeBase";
import { addressValidator, paymentMethodValidator } from "./validator";
import { PlaceOrderBodyError } from "./errors";

export interface IPlaceOrderBody {
    address: string
    paymentMethod: string
}


export const validatePlaceOrderBody: RequestHandler<{}, {}, IPlaceOrderBody> = (req, res, next) => {
    sanitizeAll(req.body);

    const { address, paymentMethod } = req.body;

    const errorObj = new PlaceOrderBodyError("Invalid body");

    const addressValidationResult = addressValidator(address)
    if (addressValidationResult.valid === false) errorObj.addFieldError("address", addressValidationResult.errorMessage)


    const paymentMethodValidationResult = paymentMethodValidator(paymentMethod);
    if (paymentMethodValidationResult.valid === false) errorObj.addFieldError("paymentMethod", paymentMethodValidationResult.errorMessage)



    if (Object.keys(errorObj.errors).length > 0) return res.status(422).json(errorObj)


    return next();
}