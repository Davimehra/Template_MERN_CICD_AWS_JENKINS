"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require("cors");
const credentialControl = require('./middleware/credentialControl');
const dotenv = require("dotenv");
const corsConfig = require('./config/corsConfig');
const { authRouter } = require("./Routers/allRouters");
const ErrorTempl = require('./templates/errorTempl');
dotenv.config();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: '100mb' }));
app.set("trust proxy", true);
// UnderStanding Cookies
// Allowing Origin Credentials
app.use(credentialControl);
// app.use(cors());
app.use(cors(corsConfig));
// Allowing Credentials
app.use("/api/user", authRouter);
app.use((req, res, next) => {
    const newError = new ErrorTempl({
        statusCode: 404,
        message: "No Page found",
    });
    next(newError);
});
// UnExpectected Error Handling
app.use((err, req, res, next) => {
    // if (res.httpSend) {
    //     return next(err);
    // }
    res.status(err.statusCode || 500);
    res.json({
        message: err.message || "UnKnown Error Occured",
        statusCode: err.statusCode || 500,
    });
});
module.exports = app;
