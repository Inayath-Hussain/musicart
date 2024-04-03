import { RequestHandler } from "express"
import { LoginBodyError } from "./errors"
import { identifierValidator } from "./validator"
import { sanitizeAll } from "../sanitizeBase"


export interface ILoginBody {
    identifier: string

    password: string
}

export const validateLoginBody: RequestHandler<{}, {}, ILoginBody> = (req, res, next) => {

    sanitizeAll(req.body)

    const { password, identifier } = req.body;

    const errorObj = new LoginBodyError("Invalid body");

    const identifierValidationResult = identifierValidator(identifier)
    if (identifierValidationResult.valid === false) errorObj.addFieldErrors("identifier", identifierValidationResult.errorMessage)


    // if password is falsy
    if (!password) errorObj.addFieldErrors("password", "password is required")


    // if request body contains any invalid field then send error response
    if (Object.keys(errorObj.errors).length > 0) return res.status(422).json(errorObj)

    return next();
}