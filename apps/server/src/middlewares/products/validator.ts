import { isNumeric, trim } from "validator"
import { headphoneTypeEnum } from "../../models/productDetails"

export const sanitize = (value: any) => {
    if (typeof value === "string") return trim(value)
    return value
}


export const sanitizeAll = (rest: any) => {
    for (let index in rest) {
        const sanitizedValue = sanitize(rest[index])
        rest[index] = sanitizedValue
    }

    return rest
}


interface Valid {
    valid: true
}

interface InValid {
    valid: false
    errorMessage: string
}



/**
 * validator for name brand fullTitle and color field of a product
 * @param value 
 * @returns 
 */
export const commonValidator = (value: any, field: "name" | "brand" | "fullTitle" | "color"): Valid | InValid => {
    switch (true) {
        case (!value):
            return { valid: false, errorMessage: `${field} is required` }

        case (typeof value !== "string"):
            return { valid: false, errorMessage: `${field} should be of type string` }

        case (isNumeric(value)):
            return { valid: false, errorMessage: `${field} should contain atleast 1 letter` }

        default:
            return { valid: true }
    }
}




export const priceValidator = (value: any): Valid | InValid => {
    switch (true) {
        case (!value):
            return { valid: false, errorMessage: "price is required" }

        case (typeof value !== "string"):
            return { valid: false, errorMessage: "should be of type string" }

        case (isNumeric(value) === false):
            return { valid: false, errorMessage: "should contain only numbers" }

        default:
            return { valid: true }
    }
}



const _descriptionPointValidator = (value: any): Valid | InValid => {
    switch (true) {
        case (!value):
            return { valid: false, errorMessage: "descrption point cannot be empty string" }

        case (typeof value !== "string"):
            return { valid: false, errorMessage: "description point should be of type string" }

        default:
            return { valid: true }
    }
}

export const descriptionValidator = (value: any): Valid | InValid => {
    switch (true) {
        case (!value):
            return { valid: false, errorMessage: "description is required" }

        case (Array.isArray(value) === false):
            return { valid: false, errorMessage: "description should be an array of string" }

        case (value.length < 1):
            return { valid: false, errorMessage: "should have atleast 1 description point" }

        default:

            // validate each description point
            for (let point of value) {
                const sanitizedValue = sanitize(point)
                const result = _descriptionPointValidator(sanitizedValue)

                if (result.valid === false) return result
            }
            return { valid: true }
    }
}




export const headphoneTypeValidator = (value: any): Valid | InValid => {
    switch (true) {
        case (!value):
            return { valid: false, errorMessage: "headphoneType is required" }

        case (typeof value !== "string"):
            return { valid: false, errorMessage: "should be of type string" }

        case (headphoneTypeEnum.includes(value) === false):

            return { valid: false, errorMessage: `should be one of the value ${headphoneTypeEnum.join(", ")}` }

        default:
            return { valid: true }
    }
}