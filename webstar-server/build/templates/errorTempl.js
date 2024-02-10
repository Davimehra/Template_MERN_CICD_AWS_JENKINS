"use strict";
class ErrorTempl extends Error {
    constructor({ message, statusCode }) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}
module.exports = ErrorTempl;
