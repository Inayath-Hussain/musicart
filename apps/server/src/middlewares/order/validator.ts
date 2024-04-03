import { paymentMethodEnum } from "../../models/order"
import { IPlaceOrderBody } from "./validatePlaceOrderBody"

interface Valid {
    valid: true
}

interface InValid {
    valid: false
    errorMessage: string
}


export const sanitizePaymentMethod = (body: IPlaceOrderBody) => {
    if (body.paymentMethod && typeof body.paymentMethod === "string") body.paymentMethod = body.paymentMethod.toUpperCase()
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
        case (typeof value !== "string"):
            return { valid: false, errorMessage: "payment method should be of type string" }


        case (value === ""):
            return { valid: false, errorMessage: "payment method is required" }


        case (paymentMethodEnum.includes(value.toUpperCase()) === false):
            return { valid: false, errorMessage: `payment method should one of the values - ${paymentMethodEnum.join(", ")}` }


        default:
            return { valid: true }
    }
}