import { RequestHandler } from "express";
import { productService } from "../../services/product";
// import { IProductDetails } from "../../models/productDetails";



export const getProductsController: RequestHandler = async (req, res, next) => {

    const data = await productService.getProducts();

    return res.status(200).json({ data })
}

