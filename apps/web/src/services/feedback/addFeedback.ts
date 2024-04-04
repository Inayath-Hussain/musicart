import { AxiosError, HttpStatusCode } from "axios"
import { apiURLs } from "../URLs"
import { UnauthorizedError } from "../errors"
import { axiosInstance } from "../instance"


interface IAddFeedbackBody {
    feedbackType: string
    feedback: string
}

export const addFeedbackService = (payload: IAddFeedbackBody) =>
    new Promise(async (resolve, reject) => {
        try {
            const result = await axiosInstance.post(apiURLs.addfeedback, payload, { withCredentials: true })

            return resolve(result)
        }
        catch (ex) {
            if (ex instanceof AxiosError) {

                switch (true) {
                    case (ex.response?.status === HttpStatusCode.UnprocessableEntity):
                        const bodyErrorObj = new AddFeedbackBodyError(ex.response.data.message, ex.response.data.errors)
                        return reject(bodyErrorObj)


                    case (ex.response?.status === HttpStatusCode.Unauthorized):
                        const errorObj = new UnauthorizedError();
                        return reject(errorObj)

                    default:
                        return reject({ message: ex.response?.data.message || "Please try again later" })
                }

            }

            console.log(ex)
            return reject({ message: "Please try again later" })
        }
    })



export class AddFeedbackBodyError {
    message: string;
    errors: IAddFeedbackBody;

    constructor(message: string, errors: AddFeedbackBodyError["errors"]) {
        this.message = message;
        this.errors = errors;
    }
}
