import { ErrorRequestHandler } from "express"

export interface Ierror {
    statusCode: number
    message: string
    // email?: string
    // logout_user?: boolean
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const { statusCode = 500,
        message
    } = err

    console.log("errorHandler .... ", err)
    res.status(statusCode).json({ message: message || "Internal server error" })
}