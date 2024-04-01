import { trim } from "validator"

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




export const productIdValidator = (value: any): Valid | InValid => {

    switch (true) {
        case (typeof value !== "string"):
            return { valid: false, errorMessage: "product_id should be of type string" }


        case (value === ""):
            return { valid: false, errorMessage: "product_id is required" }


        default:
            return { valid: true }
    }
}



export const quantityValidator = (value: any): Valid | InValid => {
    switch (true) {
        case (typeof value === "string"):
            return { valid: false, errorMessage: "quantity should be of type string" }


        case (Number.isNaN(value)):
            return { valid: false, errorMessage: "quantity should be numeric" }


        case (Number(value) <= 0):
            return { valid: false, errorMessage: "quantity cannot be negative or zero" }


        default:
            return { valid: true }
    }
}