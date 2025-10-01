import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
export const Validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (const validation of validations) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const LoginValidator: ValidationChain[] = [
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("password").trim().isLength({ min: 8 }).withMessage("The password must contain atleast 8 letters."),
];
export const signupValidator: ValidationChain[] = [
    body("name").notEmpty().withMessage("Name is required!"),
    ...LoginValidator,
];
export const chatCompletionValidator: ValidationChain[] = [
    body("message").notEmpty().withMessage("Message is required!")
];
