import { ValidationError } from "express-validator";


export default abstract class ErrorTempl extends Error {
    abstract statusCode: number;
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, ErrorTempl.prototype)
    }
    abstract serializeErrors(): Array<{ message: string }>
}



export class BadRequestError extends ErrorTempl {
    statusCode = 400; // Default Status Code
    constructor(public errorMessage: string = "Bad Request Error") {
        super(errorMessage)
        this.errorMessage = errorMessage;

        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
    serializeErrors(): { message: string; feilds?: string | undefined }[] {
        return [{ message: this.errorMessage }]
    }
}


export class RequestValidationError extends ErrorTempl {
    statusCode = 400;

    // Example ValidationError
    // [
    //   {
    //     type: 'field',
    //     value: '8HadeI@',
    //     msg: 'Password length 8-16 must contain atleast',
    //     path: 'password',
    //     location: 'body'
    //   }
    // ]
    constructor(public errors: ValidationError[]) {
        super("Request Validation Error Occured");
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map((errorItem) => {
            return { message: errorItem.msg, feild: errorItem.type };
        });
    }
}

// Email Not Found
export class UnAutheticationError extends ErrorTempl {
    statusCode: number = 401;
    constructor() {
        super("Un-Authenticated Request Error");

        Object.setPrototypeOf(this, UnAutheticationError.prototype)
    }
    serializeErrors(): { message: string; }[] {
        return ([{ message: "Un-Authenticated Request Error" }])
    }
}

// Role Not Suited to send Request
export class UnAuthorizedError extends ErrorTempl {
    statusCode: number = 403;
    constructor() {
        super("Un-Authorized Request Error");

        Object.setPrototypeOf(this, UnAutheticationError.prototype)
    }
    serializeErrors(): { message: string; }[] {
        return ([{ message: "Un-Authorized Request Error" }])
    }
}

export class NotFoundError extends ErrorTempl {
    statusCode: number = 404;
    constructor(message: string = 'Not Found') {
        super(message);
        Object.setPrototypeOf(this, PageNotFoundError.prototype);
    }
    serializeErrors(): { message: string; }[] {
        return [{ message: "Not Found" }]
    }
}

export class PageNotFoundError extends ErrorTempl {
    statusCode: number = 404;
    constructor() {
        super("Page Not Found");
        Object.setPrototypeOf(this, PageNotFoundError.prototype);
    }
    serializeErrors(): { message: string; }[] {
        return [{ message: "Page Not Found" }]
    }
}

export class UnKnownError extends ErrorTempl {
    statusCode: number = 500;
    constructor(message: string = "Unknown Error Occured") {
        super(message);
        Object.setPrototypeOf(this, UnKnownError.prototype);
    }
    serializeErrors(): { message: string; }[] {
        return [{ message: this.message }]
    }
}