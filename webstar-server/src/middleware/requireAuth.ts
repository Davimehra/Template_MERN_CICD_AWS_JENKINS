import { NextFunction, Request, Response } from "express";
import { UnAutheticationError } from "../statusCode/networkErrors";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req?.currentUser) {
        return next(new UnAutheticationError())
    }
    next();
}