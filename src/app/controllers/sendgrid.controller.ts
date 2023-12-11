import sgMail from '@sendgrid/mail';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { envOrFail } from '@/utils/env';
import { emailHtml, emailTitle } from '@/utils/template';

sgMail.setApiKey(envOrFail('SENDGRID_API_KEY'));

async function sendEmail(req: Request, res: Response) {
    try {
        const { to, subject, text } = req.body;
        const msg = {
            to,
            from: { email: 'intaniarun@gmail.com', name: 'Intania Run 2024' },
            subject,
            text,
        };
        await sgMail.send(msg);
        res.json({ message: 'Email sent' });
    } catch (error) {
        res.status(500).json({ error: 'Could not send email.' });
    }
}
export { sendEmail };

async function sendConfirmationEmail(req: Request, res: Response) {
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
                email: 'intaniarun@gmail.com',
                name: 'Intania Run 2024',
            },
            subject: emailTitle(),
            html: emailHtml(user),
        };
        await sgMail.send(msg);
        res.json({ message: 'Email sent' });
    } catch (error) {
        res.status(500).json({ error: 'Could not send email.' });
    }
}
export { sendConfirmationEmail };