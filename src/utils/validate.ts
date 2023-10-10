import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

export const validate =
    (schema: joi.ObjectSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body);

        if (error) {
            res.status(400).send({ success: false, message: error.message });
        } else {
            res.locals.body = value;
            next();
        }
    };
