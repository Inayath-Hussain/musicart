import { RequestHandler } from "express";
import { commonValidator, descriptionValidator, headphoneTypeValidator, priceValidator, sanitizeAll } from "./validator";
import { AddProductBodyError } from "./errors";


export interface IAddProductBody {
    name: string
    brand: string
    price: string
    fullTitle: string
    color: string
    description: string[]
    headphoneType: string
}

export const validateAddProductBody: RequestHandler<{}, {}, IAddProductBody> = (req, res, next) => {
    sanitizeAll(req.body)

    let { name, brand, color, fullTitle, price, description, headphoneType } = req.body;

    const errorObj = new AddProductBodyError("Invalid body");

    const nameValidationResult = commonValidator(name, "name")
    if (nameValidationResult.valid === false) errorObj.addFieldError("name", nameValidationResult.errorMessage)


    const brandValidationResult = commonValidator(brand, "brand");
    if (brandValidationResult.valid === false) errorObj.addFieldError("brand", brandValidationResult.errorMessage)


    const colorValidationResult = commonValidator(color, "color")
    if (colorValidationResult.valid === false) errorObj.addFieldError("color", colorValidationResult.errorMessage)


    const fullTitleValidationResult = commonValidator(fullTitle, "fullTitle");
    if (fullTitleValidationResult.valid === false) errorObj.addFieldError("fullTitle", fullTitleValidationResult.errorMessage)


    const priceValidationResult = priceValidator(price)
    if (priceValidationResult.valid === false) errorObj.addFieldError("price", priceValidationResult.errorMessage)


    const descriptionValidationResult = descriptionValidator(description)
    if (descriptionValidationResult.valid === false) errorObj.addFieldError("description", descriptionValidationResult.errorMessage)


    const headphoneTypeValidationResult = headphoneTypeValidator(headphoneType)
    if (headphoneTypeValidationResult.valid === false) errorObj.addFieldError("headphoneType", headphoneTypeValidationResult.errorMessage)


    const { mainImage, images } = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (!mainImage) errorObj.addFieldError("mainImage", "main image is required");

    if (!images) errorObj.addFieldError("images", "images field is required");
    else if (images.length !== 3) errorObj.addFieldError("images", "images field must contain 3 files")


    if (Object.keys(errorObj.errors).length > 0) return res.status(422).json(errorObj)


    return next();
}