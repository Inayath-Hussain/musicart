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
