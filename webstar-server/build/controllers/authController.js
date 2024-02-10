"use strict";
const signupController = (req, res, next) => {
    const { message } = req.body;
    console.log("working");
    res.status(200);
    res.json({ message: message });
};
module.exports = { signupController };
