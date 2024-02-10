"use strict";
const AllowedOrigins = require("../config/allowedOrigins");
const credentialControl = (req, res, next) => {
    console.log("Working Credentials");
    const reqOrigin = req.headers.origin;
    if (AllowedOrigins.includes(reqOrigin)) {
        res.header("Access-Control-Allow-Credentials", true); // Custom response in pre-flight verification for origin
    }
    next();
};
module.exports = credentialControl;
