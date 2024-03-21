import { compare } from "bcrypt"
import { RequestHandler } from "express";

import { ILoginBody } from "../../middlewares/users/validateLogin";
import { userService } from "../../services/user";
import { signAccessTokenCookie } from "../../utilities/cookies/signAccessToken";
import { signRefreshTokenCookie } from "../../utilities/cookies/signRefreshToken";
import { createAccessToken } from "../../utilities/tokens/accessToken";
import { createRefreshToken } from "../../utilities/tokens/refreshToken";




export const loginController: RequestHandler<{}, {}, ILoginBody> = async (req, res, next) => {

    const { identifier, password } = req.body

    const userDoc = await userService.getUserByEmailorNumber(identifier)

    if (userDoc === null) return res.status(400).json({ message: "user doesn't exist" })

    const passwordMatch = await compare(password, userDoc.password)

    if (passwordMatch === false) return res.status(400).json({ message: "password doesnot match" })

    const accessToken = await createAccessToken({ email: userDoc.email })
    const refreshToken = await createRefreshToken({ email: userDoc.email })

    signAccessTokenCookie(res, accessToken)
    signRefreshTokenCookie(res, refreshToken)

    return res.status(200).json({ message: "success" });
}