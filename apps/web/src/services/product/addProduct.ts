import { AxiosError, GenericAbortSignal, HttpStatusCode } from "axios"
import { apiURLs } from "../URLs"
import { axiosInstance } from "../instance"
import { ApiError, CancelledError } from "../errors"

interface IAddProductBody {
    name: string
    brand: string
    price: string
    fullTitle: string
    color: string
    description: string[]
    headphoneType: string
    mainImage: File
    images: FileList
}

export const addProductService = (payload: IAddProductBody, signal: GenericAbortSignal) =>
    new Promise(async (resolve, reject) => {
        try {
            const result = await axiosInstance.post(apiURLs.addProduct, payload, { signal, withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
            resolve(result)
            console.log(result)
        }
        catch (ex) {
            console.log(ex)
            if (ex instanceof AxiosError) {
                switch (true) {
                    case (ex.code === AxiosError.ERR_CANCELED):
                        return reject(new CancelledError("login api cancelled"))

                    case (ex.response?.status === HttpStatusCode.UnprocessableEntity):
                        return reject(new AddProductBodyError(ex.response.data.message, ex.response.data.errors))

                    case (ex.response?.status === HttpStatusCode.BadRequest):
                        return reject(new ApiError(ex.response.data.message))

                    default:
                        return reject(new ApiError(ex.response?.data.message))

                }
            }

            console.log(ex)
            return reject(new ApiError("Please try again later"))
        }
    })


type Errors = {
    [k in keyof Partial<IAddProductBody>]: string
}

export class AddProductBodyError {
    message: string;
    errors: Errors;

    constructor(message: string, errors: AddProductBodyError["errors"]) {
        this.message = message
        this.errors = errors
    }
}