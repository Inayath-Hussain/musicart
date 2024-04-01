import { Router } from "express";
import { tryCatchWrapper } from "../utilities/requestHandlers/tryCatchWrapper";
import { authMiddleware } from "../middlewares/auth/checkRequestAuthentication";

import { addToCartController } from "../controllers/cart/addToCart";
import { validateAddToCartBody } from "../middlewares/cart/validateAddToCartBody";

import { getCartItemsController } from "../controllers/cart/getCartItems";


const router = Router();


router.post("/", tryCatchWrapper(authMiddleware), validateAddToCartBody)    // middleware
router.post("/", tryCatchWrapper(addToCartController))  // controller


router.get("/", tryCatchWrapper(authMiddleware))    // middleware
router.get("/", tryCatchWrapper(getCartItemsController))    // controller


export { router as cartRouter }