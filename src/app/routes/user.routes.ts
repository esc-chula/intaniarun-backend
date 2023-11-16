import express from 'express';

import userControllers from '@/app/controllers/user.controllers';
import { userSchema, userUpdateSchema } from '@/utils/user.validator';
import { validate } from '@/utils/validate';

const router = express.Router();

router.get('/', userControllers.getUsers);

router.get('/:userId', userControllers.getUser);

router.post('/', validate(userSchema), userControllers.createUser);

router.put('/:userId', validate(userUpdateSchema), userControllers.updateUser);

router.delete('/:userId', userControllers.deleteUser);

export default router;
