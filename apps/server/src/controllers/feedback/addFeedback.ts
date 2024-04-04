import { RequestHandler } from "express";
import { userService } from "../../services/user";
import { feedbackService } from "../../services/feedback";
import { IAddFeedbackBody } from "../../middlewares/feedback/validateAddFeedbackBody";


export const addFeedbackController: RequestHandler<{}, {}, IAddFeedbackBody> = async (req, res, next) => {
    const email = req.email as string;

    const userDoc = await userService.getUserByEmailorNumber(email)

    if (userDoc === null) return res.status(401).json({ message: "user doesn't exist" })

    await feedbackService.addFeedback(userDoc._id, req.body)

    return res.status(201).json({ message: "success" })
}