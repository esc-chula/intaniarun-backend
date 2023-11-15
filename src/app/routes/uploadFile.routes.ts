import express from 'express';

import { uploadFile, getFile } from '@/app/controllers/uploadFile.controller';

const router = express.Router();

router.post('/upload', uploadFile);

router.get('/:key', getFile);

export default router;
