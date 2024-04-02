import { RequestHandler } from "express";
import { userService } from "../../services/user";
import { cartService } from "../../services/cart";


export const getCartItemsController: RequestHandler = async (req, res, next) => {
    const email = req.email as string;

    const userDoc = await userService.getUserByEmailorNumber(email);

    if (userDoc === null) return res.status(401).json({ message: "user doesnot exist" })

    const cart = await cartService.getCartItems(userDoc._id)

    const convenienceFee = 45;

    const totalAmount = cart.total_amount + convenienceFee;


    return res.status(200).json({ data: cart.items, username: userDoc.name, convenienceFee, totalAmount })
}