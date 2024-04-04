import { Router } from "express";
import { tryCatchWrapper } from "../utilities/requestHandlers/tryCatchWrapper";
import { authMiddleware } from "../middlewares/auth/checkRequestAuthentication";

import { validateAddFeedbackBody } from "../middlewares/feedback/validateAddFeedbackBody";
import { addFeedbackController } from "../controllers/feedback/addFeedback";

const router = Router();


router.post("/", tryCatchWrapper(authMiddleware), validateAddFeedbackBody)    // middleware
router.post("/", tryCatchWrapper(addFeedbackController))  // controller


export { router as feedbackRouter }