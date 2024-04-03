import { AxiosError, HttpStatusCode } from "axios"
import { apiURLs } from "../URLs"
import { axiosInstance } from "../instance"
import { UnauthorizedError } from "../errors"

interface Ipayload {
    product_id: string
    quantity?: number
}

export interface IAddToCartResult {
    cart_id: string
    quantity: string
}


export const addToCartService = async (payload: Ipayload) =>
    new Promise<IAddToCartResult>(async (resolve, reject) => {

        try {
            const result = await axiosInstance.post(apiURLs.addToCart, payload, { withCredentials: true })

            resolve(result.data.data)
        }
        catch (ex) {

            if (ex instanceof AxiosError) {

                switch (true) {
                    case (ex.response?.status === HttpStatusCode.UnprocessableEntity):
                        return reject(new AddToCartBodyError(ex.response.data.message, ex.response.data.errors));


                    case (ex.response?.status === HttpStatusCode.Unauthorized):
                        return reject(new UnauthorizedError());

                    case (ex.response?.status === HttpStatusCode.BadRequest):
                        return reject({ message: ex.response.data })
                }
            }

            console.log(ex)
            reject({ message: "Please try again later" })
        }
    })




export class AddToCartBodyError {
    message: string;
    errors: Ipayload;

    constructor(message: string, errors: AddToCartBodyError["errors"]) {
        this.message = message;
        this.errors = errors;
    }
}