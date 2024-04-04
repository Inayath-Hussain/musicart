import { AxiosError, HttpStatusCode } from "axios"
import { apiURLs } from "../URLs"
import { axiosInstance } from "../instance"
import { UnauthorizedError } from "../errors"


export interface IOrderList {
    _id: string
    user: string
    products: {
        name: string
        image: string
        color: string
        quantity: number
        price: number
    }[]

    address: string
    paymentMethod: string

    deliveryFee: number
    total_items_price: number
}



export const getOrderListService = () =>
    new Promise<IOrderList[]>(async (resolve, reject) => {
        try {
            const result = await axiosInstance.get<{ data: IOrderList[] }>(apiURLs.getOrderList, { withCredentials: true })

            return resolve(result.data.data)
        }
        catch (ex) {
            if (ex instanceof AxiosError) {
                if (ex.response?.status === HttpStatusCode.Unauthorized) {
                    return reject(new UnauthorizedError());
                }

                return reject(ex.response?.data.message || "Please try again later")
            }


            console.log(ex)
            return reject("Please try again later")
        }
    })