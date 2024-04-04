import { AxiosError, HttpStatusCode } from "axios"
import { apiURLs } from "../URLs"
import { axiosInstance } from "../instance"
import { ApiError, UnauthorizedError } from "../errors"


interface IPlaceOrderBody {
    address: string
    paymentMethod: string
}


export const placeOrderService = (payload: IPlaceOrderBody) =>
    new Promise(async (resolve, reject) => {
        try {
            const result = await axiosInstance.post(apiURLs.placeOrder, payload, { withCredentials: true })

            resolve(result.data)
        }
        catch (ex) {

            if (ex instanceof AxiosError) {

                switch (true) {
                    case (ex.response?.status === HttpStatusCode.UnprocessableEntity):
                        const bodyErrorObj = new PlaceOrderBodyError(ex.response.data.message, ex.response.data.errors)
                        return reject(bodyErrorObj)


                    case (ex.response?.status === HttpStatusCode.BadRequest):
                        const noCartItemsError = new NoCartItems()
                        return reject(noCartItemsError)

                    case (ex.response?.status === HttpStatusCode.Unauthorized):
                        const errorObj = new UnauthorizedError();
                        return reject(errorObj)
                }

            }

            console.log(ex)
            return reject("Please try again later")
        }
    })




export class PlaceOrderBodyError {
    message: string;
    errors: IPlaceOrderBody;

    constructor(message: string, errors: PlaceOrderBodyError["errors"]) {
        this.message = message;
        this.errors = errors;
    }
}



export class NoCartItems extends ApiError {
    constructor() {
        super("No cart items found");
    }
}