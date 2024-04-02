import { apiURLs } from "../URLs"
import { axiosInstance } from "../instance"

interface ICartItem {
    product: string
    user: string
    quantity: string
}

interface Idata {
    data: ICartItem[]
    username: string
    convenienceFee: string
    totalAmount: string
}


export const getCartService = () =>
    new Promise<Idata>(async (resolve, reject) => {

        try {
            const result = await axiosInstance.get(apiURLs.getCart, { withCredentials: true })

            resolve(result.data)
        }
        catch (ex: any) {
            reject(ex.message || "Please try again later")
        }
    })