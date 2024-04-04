import { feedbackTypeEnum } from "../../models/feedback"

interface Valid {
    valid: true
}

interface InValid {
    valid: false
    errorMessage: string
}


export const feedbackTypeValidator = (value: any): Valid | InValid => {
    switch (true) {
        case (typeof value !== "string"):
            return { valid: false, errorMessage: "feedback type should be of type string" }

        case (value === ""):
            return { valid: false, errorMessage: "required" }

        case (feedbackTypeEnum.includes(value) === false):
            return { valid: false, errorMessage: `should be one of the values - ${feedbackTypeEnum.join(", ")}` }

        default:
            return { valid: true }
    }
}



export const feedbackValidator = (value: any): Valid | InValid => {
    switch (true) {
        case (typeof value !== "string"):
            return { valid: false, errorMessage: "feedback type should be of type string" }

        case (value === ""):
            return { valid: false, errorMessage: "required" }

        default:
            return { valid: true }
    }
}