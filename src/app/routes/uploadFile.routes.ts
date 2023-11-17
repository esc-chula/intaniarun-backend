import express from 'express';

import { getFile, uploadFile } from '@/app/controllers/uploadFile.controller';
import { checkAuthToken } from '@/utils/middleware';

const router = express.Router();

router.post('/upload', checkAuthToken, uploadFile);

router.get('/:key', checkAuthToken, getFile);

export default router;
