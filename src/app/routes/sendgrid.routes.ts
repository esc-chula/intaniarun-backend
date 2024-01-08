import express from 'express';

import { sendSampleFirstEmail, sendSampleBibNumberEmail } from '@/app/controllers/sendgrid.controller';
import { checkAuthToken } from '@/utils/middleware';

const router = express.Router();

router.post('/send-email', checkAuthToken, sendSampleFirstEmail);

router.post('/send-bibnumber-email', checkAuthToken, sendSampleBibNumberEmail);

export default router;
