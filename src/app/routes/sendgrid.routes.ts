import express from 'express';

import { sendEmail } from '@/app/controllers/sendgrid.controller';

const router = express.Router();

router.post('/send-email', sendEmail);

export default router;
