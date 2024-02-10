import { NextFunction, Request } from "express";
import { NotFoundError } from "../statusCode/networkErrors";

const verifyEnv = (req: Request, res: Response, next: NextFunction) => {

    if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
        return next(new NotFoundError("jwt ACCESS token - ENV NOT FOUND"));
    }
    if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
        return next(new NotFoundError("jwt REFRESH token - ENV NOT FOUND"));
    }
    if (!process.env.MONGO_URI) {
        return next(new NotFoundError("Mongo Uri - ENV NOT FOUND"));
    }
    if (!process.env.NODE_ENV) {
        return next(new NotFoundError("NODE Env - ENV NOT FOUND"));
    }
    next();

}

module.exports = { verifyEnv }