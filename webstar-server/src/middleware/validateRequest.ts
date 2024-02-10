import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { BadRequestError, RequestValidationError } from '../statusCode/networkErrors';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        const serializedErrors = (new RequestValidationError(errors.array())).serializeErrors();

        let ErrorMessage = '';

        serializedErrors.forEach((errorItem) => {
            ErrorMessage = ErrorMessage + "\n" + errorItem.message
        })
        return next(new BadRequestError(ErrorMessage));
    }
    next();
}

module.exports = { validateRequest };
