import { Types } from "mongoose";
import { IAddFeedbackBody } from "../middlewares/feedback/validateAddFeedbackBody";
import { FeedBack } from "../models/feedback";

class FeedbackService {
    async addFeedback(user_id: Types.ObjectId, payload: IAddFeedbackBody) {
        const doc = new FeedBack({
            user: user_id,
            feedback: payload.feedback,
            feedback_type: payload.feedbackType
        })

        return doc.save()
    }
}



export const feedbackService = new FeedbackService();