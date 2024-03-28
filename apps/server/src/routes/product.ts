import { Router } from "express";
import { addProductController } from "../controllers/products/addProduct";
import { multerUpload } from "../middlewares/products/multerUpload";
import { validateAddProductBody } from "../middlewares/products/validateAddProductBody";
import { authMiddleware } from "../middlewares/auth/checkRequestAuthentication";


const router = Router();


router.post("/", authMiddleware, multerUpload.fields([{ name: "mainImage", maxCount: 1 }, { name: "images[]", maxCount: 3 }]), validateAddProductBody)     // middleware
router.post("/", addProductController)  // controller



export { router as productRouter }