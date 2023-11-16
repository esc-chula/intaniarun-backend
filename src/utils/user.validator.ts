import joi from 'joi';
const validateThaiID = require('thai-id-validator');

const user = {
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    gender: joi.string().valid('MALE', 'FEMALE', 'OTHER').required(),
    birthDate: joi.date().required(),
    citizenId: joi
        .string()
        .custom((value, helper) => {
            if (!validateThaiID(value))
                return helper.message({ custom: 'Invalid citizen ID' });
            return value;
        })
        .required(),
    nationality: joi.string().required(),
    shirtSizeArr: joi
        .array()
        .items(
            joi
                .string()
                .valid('XS', 'S', 'M', 'L', 'XL', '2L', '3L', '5L', '7L')
        )
        .required(),
    province: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi
        .string()
        .regex(/^[0-9]{10}$/)
        .required(),
    disease: joi.string().required(),
    bloodType: joi
        .string()
        .valid(
            'A_PLUS',
            'A_MINUS',
            'B_PLUS',
            'B_MINUS',
            'O_PLUS',
            'O_MINUS',
            'AB_PLUS',
            'AB_MINUS'
        )
        .required(),
    emergencyName: joi.string().required(),
    emergencyPhone: joi
        .string()
        .regex(/^[0-9]{10}$/)
        .required(),
    relationship: joi.string().required(),
    gmail: joi
        .string()
        .regex(/^(66|65|64|63)3\d{5}21@student.chula.ac.th$/)
        .message('Invalid Gmail'),
    type: joi.string().valid('STUDENT', 'ALUMNI', 'PUBLIC').required(),
    selectedPackage: joi.string().valid('F', 'T').required(),
    paymentId: joi.string().required(),
    receiverName: joi.string(),
    receiverPhone: joi.string().regex(/^[0-9]{10}$/),
    receiverAddress: joi.string(),
    receiverPostalCode: joi.string().regex(/^[0-9]{5}$/),
};

export const userSchema = joi.object(user);

export const userUpdateSchema = joi
    .object(user)
    .fork(Object.keys(user), (schema) => schema.optional());
