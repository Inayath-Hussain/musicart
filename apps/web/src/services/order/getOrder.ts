import { AxiosError, HttpStatusCode } from "axios"
import { apiURLs } from "../URLs"
import { axiosInstance } from "../instance"
import { UnauthorizedError } from "../errors"

interface Iresult {
    _id: string
    user: string

    products: {
        name: string
        image: string
        color: string
        quantity: number
        price: number
        total_price: number
        _id: string
    }[],

    address: string
    paymentMethod: string

    total_items: number

    deliveryFee: number
    total_items_price: number
}



export const getOrderService = (id: string) =>
    new Promise(async (resolve, reject) => {
        try {
            const result = await axiosInstance.get<Iresult>(apiURLs.getOrder(id), { withCredentials: true })

            return resolve(result)
        }
        catch (ex) {
            if (ex instanceof AxiosError) {

                switch (true) {
                    case (ex.response?.status === HttpStatusCode.Unauthorized):
                        return reject(new UnauthorizedError());


                    case (ex.response?.status === HttpStatusCode.BadRequest):
                        return reject(new OrderNotFound());


                    default:
                        return reject(ex.response?.data.message || 'Please try again later')
                }
            }

            console.log(ex)
            return reject("Please try again later")
        }
    })




export class OrderNotFound {
    message: string;

    constructor() {
        this.message = "Order doesn't exist"
    }
}