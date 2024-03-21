import { RequestHandler } from "express";

import { IRegisterBody } from "../../middlewares/users/validateRegister";
import { userService } from "../../services/user";
import { signAccessTokenCookie } from "../../utilities/cookies/signAccessToken";
import { signRefreshTokenCookie } from "../../utilities/cookies/signRefreshToken";
import { createAccessToken } from "../../utilities/tokens/accessToken";
import { createRefreshToken } from "../../utilities/tokens/refreshToken";


export const registerController: RequestHandler<{}, {}, IRegisterBody> = async (req, res, next) => {
    const { email, mobileNumber, name, password } = req.body;

    const userDocWithEmail = await userService.getUserByEmailorNumber(email)
    const userDocWithNumber = await userService.getUserByEmailorNumber(mobileNumber)

    switch (true) {
        case (userDocWithEmail !== null):
            return res.status(400).json({ message: "account with email exists" })

        case (userDocWithNumber !== null):
            return res.status(400).json({ message: "account with mobile number exists" })
    }

    await userService.addNewUser({ email, name, password, mobile_number: mobileNumber })

    const accessToken = await createAccessToken({ email })
    const refreshToken = await createRefreshToken({ email })

    signAccessTokenCookie(res, accessToken)
    signRefreshTokenCookie(res, refreshToken)

    return res.status(201).json({ message: "success" })
}