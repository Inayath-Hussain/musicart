import { Router } from "express";
import { tryCatchWrapper } from "../utilities/requestHandlers/tryCatchWrapper";
import { authMiddleware } from "../middlewares/auth/checkRequestAuthentication";

import { placeOrderController } from "../controllers/order/placeOrder";
import { validatePlaceOrderBody } from "../middlewares/order/validatePlaceOrderBody";

import { getOrderListController } from "../controllers/order/getOrderList";
import { getOrderController } from "../controllers/order/getOrder";


const router = Router();


router.post("/", tryCatchWrapper(authMiddleware), validatePlaceOrderBody)   // middleware
router.post("/", tryCatchWrapper(placeOrderController))  // controller


router.get("/", tryCatchWrapper(authMiddleware))    // middleware
router.get("/", tryCatchWrapper(getOrderListController))    // controller


router.get("/:id", tryCatchWrapper(authMiddleware))     // middleware
router.get("/:id", tryCatchWrapper(getOrderController))     // controller


export { router as orderRouter }