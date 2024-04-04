import { RequestHandler } from "express";
import { userService } from "../../services/user";
import { orderService } from "../../services/order";



export const getOrderController: RequestHandler = async (req, res, next) => {
    const email = req.email as string;

    const userDoc = await userService.getUserByEmailorNumber(email)

    if (userDoc === null) return res.status(401).json({ message: "user doesn't exist" })


    const { id } = req.params;

    const result = await orderService.getUserOrder(userDoc._id, id);

    if (result === null) return res.status(400).json({ message: "Order doesn't exist" });

    return res.status(200).json(result)
}