import { AxiosError, GenericAbortSignal, HttpStatusCode } from "axios";
import { apiURLs } from "../URLs";
import { axiosInstance } from "../instance";
import { ApiError, CancelledError } from "../errors";


interface ILoginBody {
    identifier: string
    password: string
}

export const loginService = async (data: ILoginBody, signal: GenericAbortSignal) =>
    new Promise(async (resolve, reject) => {
        try {
            const result = await axiosInstance.post(apiURLs.loginURL, data, { signal, withCredentials: true })

            return resolve(result.data)
        }
        catch (ex) {
            if (ex instanceof AxiosError) {
                switch (true) {
                    case (ex.code === AxiosError.ERR_CANCELED):
                        return reject(new CancelledError("login api cancelled"))

                    case (ex.response?.status === HttpStatusCode.UnprocessableEntity):
                        return reject(new LoginBodyError(ex.response.data.message, ex.response.data.errors))

                    case (ex.response?.status === HttpStatusCode.BadRequest):
                        return reject(new ApiError(ex.response.data.message))
                }
            }

            console.log(ex)
            return reject(new ApiError("Please try again later"))
        }
    })



export class LoginBodyError {
    message: string;
    errors: ILoginBody;

    constructor(message: string, errors: ILoginBody) {
        this.message = message
        this.errors = errors
    }
}