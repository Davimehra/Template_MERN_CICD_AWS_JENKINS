declare class ErrorTempl extends Error {
    constructor({ message, statusCode }: {
        message: any;
        statusCode: any;
    });
}
