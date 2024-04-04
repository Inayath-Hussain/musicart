import { RequestHandler } from "express";
import { env } from "../../config/env";
import { IPlaceOrderBody } from "../../middlewares/order/validatePlaceOrderBody";
import { paymentMethodEnum } from "../../models/order";
import { userService } from "../../services/user";
import { cartService } from "../../services/cart";
import { orderService } from "../../services/order";


type IPaymentMethodType = typeof paymentMethodEnum[number]

export const placeOrderController: RequestHandler<{}, {}, IPlaceOrderBody> = async (req, res, next) => {
    const email = req.email as string;
    const { address, paymentMethod } = req.body;

    const userDoc = await userService.getUserByEmailorNumber(email);

    if (userDoc === null) return res.status(401).json({ message: "user doesn't exist" });

    // get user's cart
    const cartData = await cartService.getUserCart(userDoc._id)


    // if there are no items in cart then send 400 response
    if (cartData === null) return res.status(400).json({ message: "no items in cart" })


    const { items, total_items_price } = cartData;

    const { CONVENIENCE_FEE } = env;

    // create order record
    await orderService.addOrder({
        user: userDoc._id,
        deliveryFee: CONVENIENCE_FEE,
        products: items,
        total_items_price,
        address,
        paymentMethod: paymentMethod as IPaymentMethodType
    })


    // extract all cart id's
    const cartIds = items.map(i => i.id)


    // delete cart records
    await cartService.deleteCarts(cartIds)

    res.status(201).json({ message: "success" })
}