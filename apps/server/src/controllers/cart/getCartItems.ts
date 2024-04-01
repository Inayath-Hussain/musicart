import { RequestHandler } from "express";
import { userService } from "../../services/user";
import { cartService } from "../../services/cart";

export const getCartItemsController: RequestHandler = async (req, res, next) => {
    const email = req.email as string;

    const userDoc = await userService.getUserByEmailorNumber(email);

    if (userDoc === null) return res.status(401).json({ message: "user doesnot exist" })

    const data = await cartService.getCartItems(userDoc._id)

    return res.status(200).json({ data, username: userDoc.name })
}