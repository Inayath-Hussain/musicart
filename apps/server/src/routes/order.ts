import { Router } from "express";
import { tryCatchWrapper } from "../utilities/requestHandlers/tryCatchWrapper";
import { authMiddleware } from "../middlewares/auth/checkRequestAuthentication";
import { placeOrderController } from "../controllers/order/placeOrder";
import { validatePlaceOrderBody } from "../middlewares/order/validatePlaceOrderBody";


const router = Router();


router.post("/", tryCatchWrapper(authMiddleware), validatePlaceOrderBody)   // middleware
router.post("/", tryCatchWrapper(placeOrderController))  // controller


export { router as orderRouter }