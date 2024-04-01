import { apiURLs } from "../URLs"
import { axiosInstance } from "../instance"

interface ICartItem {
    product_id: string
    user_id: string
    quantity: string
}

interface Idata {
    data: ICartItem[]
    username: string
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