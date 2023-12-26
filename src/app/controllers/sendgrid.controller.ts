import sgMail from '@sendgrid/mail';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { envOrFail } from '@/utils/env';
import { emailHtml, emailTitle } from '@/utils/template';
import logger from '@/utils/logger';

sgMail.setApiKey(envOrFail('SENDGRID_API_KEY'));

async function sendFirstEmail(req: Request, res: Response) {
    try {
        const { firstName, lastName } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                firstName: firstName,
                lastName: lastName,
            },
        });
        if (!user) throw new Error('User not found');
        const msg = {
            to: user.email,
            from: {
                email: 'no-reply@chulaintaniarun2024.com',
                name: 'Chula Intania Run 2024',
            },
            subject: emailTitle(),
            html: emailHtml(user),
        };
        await sgMail.send(msg);
        res.json({ message: 'Email sent' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Could not send email.' });
    }
}
export { sendFirstEmail };