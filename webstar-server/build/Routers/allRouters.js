"use strict";
const express = require("express");
const { signupController } = require("../controllers/authController");
const authRouter = express.Router();
authRouter.post("/signup", signupController);
module.exports = { authRouter };
