import { Router } from "express";
import { addToCartController } from "../controllers/cart/addToCart";
import { authMiddleware } from "../middlewares/auth/checkRequestAuthentication";
import { validateAddToCartBody } from "../middlewares/cart/validateAddToCartBody";
import { tryCatchWrapper } from "../utilities/requestHandlers/tryCatchWrapper";


const router = Router();


router.post("/", tryCatchWrapper(authMiddleware), validateAddToCartBody)    // middleware
router.post("/", tryCatchWrapper(addToCartController))  // controller



export { router as cartRouter }