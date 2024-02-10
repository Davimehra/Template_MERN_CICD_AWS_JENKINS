import { Request, Response, NextFunction } from "express";

const AllowedOrigins = require("../config/allowedOrigins");

const credentialControl: (req: Request, res: Response, next: NextFunction) => void = (req: Request, res: Response, next: NextFunction) => {
    const reqOrigin = req.headers.origin;

    if (AllowedOrigins.includes(reqOrigin)) {
        console.log("Access-Control-Allow-Credentials   ALLOWED")
        res.header("Access-Control-Allow-Credentials", 'true'); // Custom response in pre-flight verification for origin
    } else {
        if (process.env.NODE_ENV !== "test") console.log("Access-Control-Allow-Credentials   DIS_ALLOWED")
    }
    next();
};

module.exports = credentialControl;