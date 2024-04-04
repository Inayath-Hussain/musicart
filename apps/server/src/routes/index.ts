import { Router } from "express";
import { userRouter } from "./user";
import { productRouter } from "./product";
import { cartRouter } from "./cart";
import { orderRouter } from "./order";


const router = Router();

router.use("/user", userRouter)
router.use("/product", productRouter)
router.use("/cart", cartRouter)
router.use("/orders", orderRouter)

export { router as mainRouter }