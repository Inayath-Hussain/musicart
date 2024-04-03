import { RequestHandler } from "express";
import { userService } from "../../services/user";

export const getUserInfoController: RequestHandler = async (req, res, next) => {
    const email = req.email as string;


    const userDoc = await userService.getUserByEmailorNumber(email)

    if (userDoc === null) return res.status(401).json({ message: "user doesn't exist" })


    return res.status(200).json({ name: userDoc.name })
}
