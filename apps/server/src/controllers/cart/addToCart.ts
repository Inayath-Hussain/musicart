import { RequestHandler } from "express";
import { IAddToCartBody } from "../../middlewares/cart/validateAddToCartBody";
import { userService } from "../../services/user";
import { cartService } from "../../services/cart";


export const addToCartController: RequestHandler<{}, {}, IAddToCartBody> = async (req, res, next) => {
    const email = req.email as string;

    const { product_id, quantity } = req.body;

    const userDoc = await userService.getUserByEmailorNumber(email)

    if (userDoc === null) return res.status(401).json({ message: "user doesn't exist" })

    const doc = await cartService.addToCart(userDoc._id, product_id, quantity)


    // return new quantity
    return res.status(200).json({ message: "success", data: { quantity: doc.quantity, product_id: doc.product } })
}