import express from 'express';

import { sendEmail } from '@/app/controllers/sendgrid.controller';
import { checkAuthToken } from '@/utils/middleware';

const router = express.Router();

router.post('/send-email', checkAuthToken, sendEmail);

export default router;
