import joi from 'joi';

const body = {
    names: joi.array().items({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
    })
};

export const checkUserSchema = joi.object(body);