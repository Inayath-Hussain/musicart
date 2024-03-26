import { RequestHandler } from "express";
import { userService } from "../../services/user";
import { IAddProductBody } from "../../middlewares/products/validateAddProductBody";
import { productService } from "../../services/product";



export const addProductController: RequestHandler<{}, {}, IAddProductBody> = async (req, res, next) => {

    console.log("file .... ", req.file)
    console.log("files .... ", req.files)
    console.log("body .... ", req.body)


    const email = req.email as string;

    const userDoc = await userService.getUserByEmailorNumber(email)

    if (userDoc === null) return res.status(401).json({ message: "user doesn't exist" })

    if (userDoc.role !== "admin") return res.status(403).json({ message: "user is unauthorized to use this endpoint" })


    const { mainImage, images } = req.files as { [fieldname: string]: Express.Multer.File[] };
    const mainImageURL = mainImage[0].path

    const imageURLs: string[] = []

    images.forEach(i => imageURLs.push(i.path))

    await productService.addProduct(req.body, mainImageURL, imageURLs)

    res.status(200).json({ message: "success" })
}