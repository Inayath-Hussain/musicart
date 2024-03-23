import { AxiosError, GenericAbortSignal, HttpStatusCode } from "axios";
import { apiURLs } from "../URLs";
import { axiosInstance } from "../instance";
import { ApiError, CancelledError } from "../errors";


interface IRegisterBody {
    name: string
    mobileNumber: string
    email: string
    password: string
}

export const registerService = async (data: IRegisterBody, signal: GenericAbortSignal) =>
    new Promise(async (resolve, reject) => {
        try {
            const result = await axiosInstance.post(apiURLs.registerURL, data, { signal, withCredentials: true })
            resolve(result.data)
        }
        catch (ex) {
            if (ex instanceof AxiosError) {
                switch (true) {
                    case (ex.code === AxiosError.ERR_CANCELED):
                        return reject(new CancelledError("register api cancelled"))

                    case (ex.response?.status === HttpStatusCode.UnprocessableEntity):
                        return reject(new RegisterBodyError(ex.response.data.message, ex.response.data.errors))

                    case (ex.response?.status === HttpStatusCode.BadRequest):
                        return reject(new ApiError(ex.response.data.message))
                }
            }
            console.log(ex)
            return reject(new ApiError("Please try again later"))
        }

    })



export class RegisterBodyError {
    message: string;
    errors: IRegisterBody;

    constructor(message: string, errors: IRegisterBody) {
        this.message = message
        this.errors = errors
    }
}