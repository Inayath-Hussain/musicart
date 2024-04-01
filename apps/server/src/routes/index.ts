import { Router } from "express";
import { userRouter } from "./user";
import { productRouter } from "./product";
import { cartRouter } from "./cart";


const router = Router();

router.use("/user", userRouter)
router.use("/product", productRouter)
router.use("/cart", cartRouter)

export { router as mainRouter }