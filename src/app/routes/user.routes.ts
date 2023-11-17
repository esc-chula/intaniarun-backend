import express from 'express';

import userControllers from '@/app/controllers/user.controllers';
import { checkAuthToken } from '@/utils/middleware';
import { userSchema, userUpdateSchema } from '@/utils/user.validator';
import { validate } from '@/utils/validate';

const router = express.Router();

router.get('/', checkAuthToken, userControllers.getUsers);

router.get('/:userId', userControllers.getUser);

router.post(
    '/',
    checkAuthToken,
    validate(userSchema),
    userControllers.createUser
);

router.put(
    '/:userId',
    checkAuthToken,
    validate(userUpdateSchema),
    userControllers.updateUser
);

router.delete('/:userId', checkAuthToken, userControllers.deleteUser);

export default router;
