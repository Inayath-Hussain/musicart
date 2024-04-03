import { RequestHandler } from "express"
import { productIdValidator, quantityValidator, sanitizeAll } from "./validator"
import { AddToCartBodyError } from "./errors"

export interface IAddToCartBody {
    product_id: string
    quantity?: number
}


export const validateAddToCartBody: RequestHandler<{}, {}, IAddToCartBody> = (req, res, next) => {

    sanitizeAll(req.body);

    const { product_id, quantity } = req.body;

    const errorObj = new AddToCartBodyError("Invalid body");

    const productIdValidationResult = productIdValidator(product_id);
    if (productIdValidationResult.valid === false) errorObj.addFieldError("product_id", productIdValidationResult.errorMessage)


    const quantityValidationResult = quantityValidator(quantity);
    if (quantityValidationResult.valid === false) errorObj.addFieldError("quantity", quantityValidationResult.errorMessage)



    if (Object.keys(errorObj.errors).length > 0) return res.status(422).json(errorObj)


    return next()
}