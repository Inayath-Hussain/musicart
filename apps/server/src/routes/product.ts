import { Router } from "express";
import { addProductController } from "../controllers/products/addProduct";
import { multerUpload } from "../middlewares/products/multerUpload";


const router = Router();


router.post("/", multerUpload.fields([{ name: "mainImage", maxCount: 1 }, { name: "images", maxCount: 3 }]))     // middleware
router.post("/", addProductController)  // controller



export { router as productRouter }