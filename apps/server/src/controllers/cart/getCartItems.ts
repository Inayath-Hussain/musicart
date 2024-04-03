import { RequestHandler } from "express";
import { userService } from "../../services/user";
import { cartService } from "../../services/cart";
import { env } from "../../config/env";


export const getCartItemsController: RequestHandler = async (req, res, next) => {
    const email = req.email as string;

    const userDoc = await userService.getUserByEmailorNumber(email);

    if (userDoc === null) return res.status(401).json({ message: "user doesnot exist" })

    const cartData = await cartService.getUserCart(userDoc._id)

    if (cartData === null) return res.status(200).json({ message: "no cart items found" });


    const convenienceFee = env.CONVENIENCE_FEE;

    const totalAmount = cartData.total_item_prices + convenienceFee;


    return res.status(200).json({
        data: cartData.items,
        username: userDoc.name,
        total_items_price: cartData.total_item_prices,
        total_items: cartData.total_items,
        convenienceFee,
        totalAmount
    })
}