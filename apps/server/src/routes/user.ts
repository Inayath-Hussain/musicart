import { Router } from "express";
import { tryCatchWrapper } from "../utilities/requestHandlers/tryCatchWrapper";

import { validateLoginBody } from "../middlewares/users/validateLogin";
import { loginController } from "../controllers/users/login";

import { validateRegisterBody } from "../middlewares/users/validateRegister";
import { registerController } from "../controllers/users/register";
import { authMiddleware } from "../middlewares/auth/checkRequestAuthentication";
import { getUserInfoController } from "../controllers/users/info";

const router = Router();


router.post("/login", validateLoginBody)    // middleware
router.post("/login", tryCatchWrapper(loginController))  //controller


router.post("/register", validateRegisterBody)  // middleware
router.post("/register", tryCatchWrapper(registerController))   // controller


router.get("/info", tryCatchWrapper(authMiddleware))    // middleware
router.get("/info", tryCatchWrapper(getUserInfoController))     // controller


export { router as userRouter }