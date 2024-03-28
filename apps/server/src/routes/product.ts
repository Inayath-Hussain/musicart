import { Router } from "express";
import { addProductController } from "../controllers/products/addProduct";
import { multerUpload } from "../middlewares/products/multerUpload";
import { validateAddProductBody } from "../middlewares/products/validateAddProductBody";
import { authMiddleware } from "../middlewares/auth/checkRequestAuthentication";
import { getProductsController } from "../controllers/products/getProducts";


const router = Router();


router.post("/", authMiddleware, multerUpload.fields([{ name: "mainImage", maxCount: 1 }, { name: "images[]", maxCount: 3 }]), validateAddProductBody)     // middleware
router.post("/", addProductController)  // controller


router.get("/", getProductsController)  // controller


export { router as productRouter }