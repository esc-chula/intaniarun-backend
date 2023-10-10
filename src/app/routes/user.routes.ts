import express from 'express';

import userControllers from '@/app/controllers/user.controllers';

const router = express.Router();

router.get('/', userControllers.getUsers);

router.get('/:userId', userControllers.getUser);

router.post('/', userControllers.createUser);

router.put('/:userId', userControllers.updateUser);

router.delete('/:userId', userControllers.deleteUser);

export default router;
