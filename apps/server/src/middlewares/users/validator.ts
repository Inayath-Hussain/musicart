import { isEmail, isLength, isNumeric, isStrongPassword, trim } from "validator";


export const sanitize = (value: any) => {
    if (typeof value === "string") return trim(value)
    return value
}


interface Valid {
    valid: true
}

interface InValid {
    valid: false
    errorMessage: string
}


/**
 * function to validate email value
 */
export const emailValidator = (email: any): Valid | InValid => {
    switch (true) {

        // if email is falsy (undefined, null or empty string)
        case (!email):
            return { valid: false, errorMessage: "email is required" }

        case (typeof email !== "string"):
            return { valid: false, errorMessage: "email should be of type string" }


        case (isEmail(email) === false):
            return { valid: false, errorMessage: "email is invalid" }

        default:
            return { valid: true }
    }
}






/**
 * function to validate password.
 */
export const passwordValidator = (password: any): Valid | InValid => {

    switch (true) {
        case (!password):
            return { valid: false, errorMessage: "password is required" }

        case (typeof password !== "string"):
            return { valid: false, errorMessage: 'password should be of type string' }

        // checks if password meets length requirement
        case (isLength(password, { min: 8 }) === false):
            return { valid: false, errorMessage: "must be 8 letters long" }

        // checks if password meets constraints
        case (isStrongPassword(password, { minNumbers: 1, minSymbols: 1, minUppercase: 1 }) === false):
            return { valid: false, errorMessage: "must contain atleast 1 number, 1 upper case letter and 1 special symbol" }

        default:
            return { valid: true }
    }
}



/**
 * function to validate mobile number
 */
export const mobileNumberValidator = (mobileNumber: any): Valid | InValid => {

    switch (true) {
        case (!mobileNumber):
            return { valid: false, errorMessage: "mobile number is required" }

        case (typeof mobileNumber !== "string"):
            return { valid: false, errorMessage: "should be of type string" }

        case (isNumeric(mobileNumber) === false):
            return { valid: false, errorMessage: "should contain only numbers" }

        default:
            return { valid: true }
    }
}







export const identifierValidator = (value: any): Valid | InValid => {
    switch (true) {

        // if identifier is falsy (undefined, null or empty string)
        case (!value):
            return { valid: false, errorMessage: "email or mobile number is required" }

        case (typeof value !== "string"):
            return { valid: false, errorMessage: "should be of type string" }

        // checks if value is a valid email
        case (emailValidator(value).valid):
            return { valid: true }

        // checks if value is a valid mobile number
        case (mobileNumberValidator(value).valid):
            return { valid: true }


        default:
            return { valid: false, errorMessage: "must be either a email or mobile number" }
    }
}








export const nameValidator = (name: any): Valid | InValid => {
    switch (true) {
        case (!name):
            return { valid: false, errorMessage: "name is required" }

        case (typeof name !== "string"):
            return { valid: false, errorMessage: "name should be of type string" }

        case (isNumeric(name)):
            return { valid: false, errorMessage: "name should contain atleast 1 letter" }

        default:
            return { valid: true }
    }
}