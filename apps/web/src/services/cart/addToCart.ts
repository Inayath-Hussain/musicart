import { apiURLs } from "../URLs"
import { axiosInstance } from "../instance"

interface Ipayload {
    product_id: string
    quantity: number
}

interface Idata {
    data: {
        product_id: string
        quantity: string
    }
}


export const addToCartService = async (payload: Ipayload) =>
    new Promise<Idata>(async (resolve, reject) => {

        try {
            const result = await axiosInstance.post(apiURLs.addToCart, payload, { withCredentials: true })

            resolve(result.data)
        }
        catch (ex) {
            console.log(ex)
            reject({ message: "Please try again later" })
        }
    })