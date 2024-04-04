import { RequestHandler } from "express";
import { userService } from "../../services/user";
import { orderService } from "../../services/order";

export const getOrderListController: RequestHandler = async (req, res, next) => {
    const email = req.email as string;

    const userDoc = await userService.getUserByEmailorNumber(email);
    if (userDoc === null) return res.status(401).json({ message: "user doesn't exist" });

    const data = await orderService.getUsrOrderList(userDoc._id);

    return res.status(200).json({ data })
}