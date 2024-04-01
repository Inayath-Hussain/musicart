import { RequestHandler } from "express";
import { userService } from "../../services/user";
import { cartService } from "../../services/cart";
import { productService } from "../../services/product";
import { Types } from "mongoose";

export const getCartItemsController: RequestHandler = async (req, res, next) => {
    const email = req.email as string;

    const userDoc = await userService.getUserByEmailorNumber(email);

    if (userDoc === null) return res.status(401).json({ message: "user doesnot exist" })

    const data = await cartService.getCartItems(userDoc._id)

    const productIds: Types.ObjectId[] = []

    data.forEach(d => productIds.push(d.product))

    const products = await productService.getProductsFromIdArray(productIds)

    const convenienceFee = 45;

    let totalAmount = convenienceFee;

    products.forEach(p => totalAmount = totalAmount + p.price)


    return res.status(200).json({ data, username: userDoc.name, convenienceFee, totalAmount })
}