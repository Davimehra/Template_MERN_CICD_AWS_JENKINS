import express, { Router } from "express";
import { body } from "express-validator";
import { signInController, signupController, CurrentUser, SignOutController, RefreshAccessTokenController } from "../controllers/authController";
import { getCurrentUser } from "../middleware/currentUser";
import { requireAuth } from "../middleware/requireAuth";

const { validateRequest } = require('../middleware/validateRequest');

const authRouter: Router = express.Router();

// User Auth Router
authRouter.post
    ("/signup",
        [
            body('email')
                .isEmail()
                .withMessage("Email is Invalid"),
            body('password')
                .trim()
                .matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
                .withMessage("Password length 8-16 must contain atleast \n one SpecialCharacter,one Upper and Small Case Letter,one digit ")],
        validateRequest,
        signupController
    )
authRouter.post('/signin',
    [
        body('email')
            .isEmail().notEmpty()
            .withMessage("Email Must Be Valid and NOT-EMPTY"),
        body('password')
            .trim()
            .matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
            .withMessage("Password length 8-16 must contain atleast \n one SpecialCharacter,one Upper and Small Case Letter,one digit ")
    ],
    validateRequest,
    signInController)

authRouter.get('/currentuser', getCurrentUser, requireAuth, CurrentUser);
authRouter.get('/refreshtoken', RefreshAccessTokenController);
authRouter.post('/signout', SignOutController)


module.exports = { authRouter }