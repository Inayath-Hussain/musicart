import { AxiosError, HttpStatusCode } from "axios"
import { apiURLs } from "../URLs"
import { axiosInstance } from "../instance"
import { UnauthorizedError } from "../errors"


interface Iresult {
    name: string
}


export const getUserInfoService = () =>
    new Promise<string>(async (resolve, reject) => {

        try {
            const result = await axiosInstance.get<Iresult>(apiURLs.getUserInfo, { withCredentials: true })

            return resolve(result.data.name)
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