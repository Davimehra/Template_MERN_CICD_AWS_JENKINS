import { Request, Response, NextFunction } from "express";
import { UnAutheticationError, UnAuthorizedError } from "../statusCode/networkErrors";
import jwt from "jsonwebtoken";
import jwtAccessTokenPayload from "../interfaces/jwtAccessTokenPayload";


declare global {
    namespace Express {
        interface Request {
            currentUser?: jwtAccessTokenPayload
        }
    }
}
export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req?.headers?.authorization || req?.headers['authorization'];
    const jwtAccessToken = authorization?.split(" ")[1]
    console.log("AccessTokenn -", jwtAccessToken);
    if (!jwtAccessToken) {
        return next(new UnAutheticationError());
    }


    try {
        const payload = jwt.verify(jwtAccessToken, process.env.JWT_ACCESS_TOKEN_SECRET!) as jwtAccessTokenPayload
        req.currentUser = payload;
        console.log("Payload Received", payload)
    } catch (error) {
        return next(new UnAuthorizedError())
    }
    next();
}
