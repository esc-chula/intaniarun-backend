import express from 'express';

import userControllers from '@/app/controllers/user.controllers';
import { checkAuthToken } from '@/utils/middleware';
import { userSchema, userUpdateSchema } from '@/utils/user.validator';
import { validate } from '@/utils/validate';
import { checkUserSchema } from '@/utils/checkUser.validator';

const router = express.Router();

router.get('/', checkAuthToken, userControllers.getUsers);

router.get('/email/:email', userControllers.getUsersByEmail);

router.get('/:userId', checkAuthToken, userControllers.getUser);

router.post(
    '/',
    validate(userSchema),
    userControllers.createUser
);

router.post(
    '/check',
    validate(checkUserSchema),
    userControllers.checkUsers
);

router.put(
    '/:userId',
    checkAuthToken,
    validate(userUpdateSchema),
    userControllers.updateUser
);

router.delete('/:userId', checkAuthToken, userControllers.deleteUser);

export default router;
