import { RequestHandler } from "express";
import { userService } from "../../services/user";
import { cartService } from "../../services/cart";
import { orderService } from "../../services/order";
import { env } from "../../config/env";
import { IPlaceOrderBody } from "../../middlewares/order/validatePlaceOrderBody";
import { paymentMethodEnum } from "../../models/order";


type IPaymentMethodType = typeof paymentMethodEnum[number]

export const placeOrderController: RequestHandler<{}, {}, IPlaceOrderBody> = async (req, res, next) => {
    const email = req.email as string;
    const { address, paymentMethod } = req.body;

    const userDoc = await userService.getUserByEmailorNumber(email);

    if (userDoc === null) return res.status(401).json({ message: "user doesn't exist" });

    // get user's cart
    const { items, total_item_prices } = await cartService.getUserCart(userDoc._id)

    const { CONVENIENCE_FEE } = env;

    // create order record
    await orderService.addOrder({
        user: userDoc._id,
        deliveryFee: CONVENIENCE_FEE,
        products: items, total_item_prices,
        address,
        paymentMethod: paymentMethod as IPaymentMethodType
    })


    // extract all cart id's
    const cartIds = items.map(i => i.id)


    // delete cart records
    await cartService.deleteCarts(cartIds)

    res.status(200).json({ message: "success" })
}