import express from 'express';

import { sendConfirmationEmail, sendEmail } from '@/app/controllers/sendgrid.controller';
import { checkAuthToken } from '@/utils/middleware';

const router = express.Router();

router.post('/send-email', checkAuthToken, sendConfirmationEmail);

export default router;
