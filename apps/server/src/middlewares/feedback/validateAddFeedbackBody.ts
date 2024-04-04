import { RequestHandler } from "express";
import { sanitizeAll } from "../sanitizeBase";
import { feedbackTypeValidator, feedbackValidator } from "./validator";
import { AddFeedbackBodyError } from "./errors";

export interface IAddFeedbackBody {
    feedbackType: string
    feedback: string
}

export const validateAddFeedbackBody: RequestHandler<{}, {}, IAddFeedbackBody> = (req, res, next) => {
    sanitizeAll(req.body);

    const { feedback, feedbackType } = req.body;

    const errorObj = new AddFeedbackBodyError("Invalid body");

    const feedbackTypeValidationResult = feedbackTypeValidator(feedbackType);
    if (feedbackTypeValidationResult.valid === false) errorObj.addFieldError("feedbackType", feedbackTypeValidationResult.errorMessage)


    const feedbackValidationResult = feedbackValidator(feedback);
    if (feedbackValidationResult.valid === false) errorObj.addFieldError("feedback", feedbackValidationResult.errorMessage)


    if (Object.keys(errorObj.errors).length > 0) return res.status(422).json(errorObj);


    return next();
}