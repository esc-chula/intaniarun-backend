import express from 'express';

import { sendFirstEmail, sendFirstEmail } from '@/app/controllers/sendgrid.controller';
import { checkAuthToken } from '@/utils/middleware';

const router = express.Router();

router.post('/send-email', checkAuthToken, sendFirstEmail);

export default router;
