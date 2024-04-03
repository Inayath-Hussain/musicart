import { Router } from "express";
import { tryCatchWrapper } from "../utilities/requestHandlers/tryCatchWrapper";
import { authMiddleware } from "../middlewares/auth/checkRequestAuthentication";
import { placeOrderController } from "../controllers/order/placeOrder";


const router = Router();


router.post("/", tryCatchWrapper(authMiddleware))   // middleware
router.post("/", tryCatchWrapper(placeOrderController))  // controller


export { router as orderRouter }