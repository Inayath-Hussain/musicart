import { RequestHandler } from "express";
import { RegisterBodyError } from "./errors";
import { emailValidator, mobileNumberValidator, nameValidator, passwordValidator, sanitize } from "./validator";


export interface IRegisterBody {
    email: string
    mobileNumber: string
    name: string
    password: string
}

export const validateRegisterBody: RequestHandler<{}, {}, IRegisterBody> = (req, res, next) => {
    let { email, mobileNumber, name, password } = req.body

    email = sanitize(email)
    mobileNumber = sanitize(mobileNumber)
    name = sanitize(name)
    password = sanitize(password)

    const errorObj = new RegisterBodyError("Invalid body");

    const emailValidationResult = emailValidator(email)
    if (emailValidationResult.valid === false) errorObj.addFieldErrors("email", emailValidationResult.errorMessage)


    const mobileNumberValidationResult = mobileNumberValidator(mobileNumber)
    if (mobileNumberValidationResult.valid === false) errorObj.addFieldErrors("mobileNumber", mobileNumberValidationResult.errorMessage)


    const nameValidationResult = nameValidator(name)
    if (nameValidationResult.valid === false) errorObj.addFieldErrors("name", nameValidationResult.errorMessage)


    const passwordValidationResult = passwordValidator(password)
    if (passwordValidationResult.valid === false) errorObj.addFieldErrors("password", passwordValidationResult.errorMessage)




    if (Object.keys(errorObj.errors).length > 0) return res.status(422).json(errorObj)

    return next();
}