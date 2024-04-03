import { RequestHandler } from "express";
import { userService } from "../../services/user";
import { cartService } from "../../services/cart";
import { orderService } from "../../services/order";
import { env } from "../../config/env";

export const placeOrderController: RequestHandler = async (req, res, next) => {
    const email = req.email as string;

    const userDoc = await userService.getUserByEmailorNumber(email);

    if (userDoc === null) return res.status(401).json({ message: "user doesn't exist" });


    const { items, total_item_prices } = await cartService.getUserCart(userDoc._id)

    const { CONVENIENCE_FEE } = env;

    await orderService.addOrder({ user: userDoc._id, deliveryFee: CONVENIENCE_FEE, products: items, total_item_prices })


    const cartIds = items.map(i => i.id)

    // delete carts here
    await cartService.deleteCarts(cartIds)

    res.status(200).json({ message: "success" })
}