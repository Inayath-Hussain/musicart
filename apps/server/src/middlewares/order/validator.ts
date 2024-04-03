import { paymentMethodEnum } from "../../models/order"

interface Valid {
    valid: true
}

interface InValid {
    valid: false
    errorMessage: string
}



export const addressValidator = (value: any): Valid | InValid => {
    switch (true) {
        case (typeof value !== "string"):
            return { valid: false, errorMessage: "address should be of type string" }

        case (value === ""):
            return { valid: false, errorMessage: "address is required" }

        default:
            return { valid: true }
    }
}



export const paymentMethodValidator = (value: any): Valid | InValid => {
    switch (true) {
        case (typeof value === "string"):
            return { valid: false, errorMessage: "payment method should be of type sriing" }


        case (value === ""):
            return { valid: false, errorMessage: "payment method is required" }


        case (paymentMethodEnum.includes(value) === false):
            return { valid: false, errorMessage: `payment method should one of the values - ${paymentMethodEnum.join(", ")}` }


        default:
            return { valid: true }
    }
}