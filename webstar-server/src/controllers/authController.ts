import { NextFunction, Response, Request } from "express";
import { BadRequestError, NotFoundError, UnAutheticationError, UnAuthorizedError, UnKnownError } from "../statusCode/networkErrors";
import { Created201, Ok200 } from '../statusCode/SuccessStatus';
import jwt from 'jsonwebtoken';
import jwtAccessTokenPayload from "../interfaces/jwtAccessTokenPayload";
import jwtRefreshTokenPayload from '../interfaces/jwtRefreshTokenPayload';

import { User } from "../modals/usersModal";

import { TacklePassword } from "../services/tacklePassword";
import { UserJwtAccessSignOptions, UserJwtRefreshSignOptions } from "../config/jwtConfig";

export const signupController = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email }).exec();

    if (userExists) {
        next(new BadRequestError('User Already Exists'))
    }

    const userDoc = User.build({ email, password });

    await userDoc.save();


    res.status(Created201.statusCode);
    res.json({ message: 'User Created' })


}

export const signInController = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const ExistingUser = await User.findOne({ email }).exec();

    if (!ExistingUser) {
        return next(new UnAutheticationError())
    }

    if (! await TacklePassword.comparePassword(ExistingUser.password, password)) {
        return next(new UnAutheticationError())
    }

    const accessToken = jwt.sign(
        { email: ExistingUser?.email, id: ExistingUser?.id },
        process.env.JWT_ACCESS_TOKEN_SECRET!,
        UserJwtAccessSignOptions)

    const refreshToken = jwt.sign(
        { email: ExistingUser?.email, id: ExistingUser?.id },
        process.env.JWT_REFRESH_TOKEN_SECRET!,
        UserJwtRefreshSignOptions)

    req.session = { jwtRefresh: refreshToken };

    res.status(Ok200.statusCode);
    res.json({ accessToken });


}

export const CurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req?.currentUser) {
        return next(new NotFoundError());

    }
    res.status(Ok200.statusCode);
    res.json(req.currentUser)
}

export const RefreshAccessTokenController = async (req: Request, res: Response, next: NextFunction) => {
    if (!req?.session?.jwtRefresh) {
        return next(new UnAutheticationError())
    }
    let RefreshTokenDecode: jwtRefreshTokenPayload;
    try {
        RefreshTokenDecode = jwt.verify(req?.session?.jwtRefresh, process.env.JWT_REFRESH_TOKEN_SECRET!) as jwtRefreshTokenPayload

    } catch (err: any) {
        return next(new UnAutheticationError());
    }

    try {
        const fetchUser = await User.findOne({ email: RefreshTokenDecode.email }).exec();
        const newAccessToken = jwt.sign(
            { email: fetchUser?.email, id: fetchUser?.id },
            process.env.JWT_ACCESS_TOKEN_SECRET!,
            UserJwtAccessSignOptions)
        req.session = { jwtRefresh: req?.session?.jwtRefresh }
        res.status(Ok200.statusCode);
        res.json({ accessToken: newAccessToken })
    } catch (error) {
        return next(new UnAutheticationError())
    }
}

export const SignOutController = async (req: Request, res: Response, next: NextFunction) => {
    req.session = null
    res.status(Ok200.statusCode);
    res.json({})
}
