import { Request, Response } from 'express';
import sgMail from '@sendgrid/mail';
import { envOrFail } from '@/utils/env';
import fs from 'fs';

sgMail.setApiKey(envOrFail('SENDGRID_API_KEY'));

async function sendEmail(req: Request, res: Response) {
    try {
        const { to, subject, text, html } = req.body;

        const htmlContent = fs.readFileSync('../emailresponse/emailresponse.html', 'utf8');

        const msg = {
            to,
            from: '',
            subject,
            text,
            html: htmlContent,
        };
        await sgMail.send(msg);
        res.json({ message: 'Email sent' });
    }
    catch (error) {
        res.status(500).json({ error: 'Could not send email.' });
    }
}
export { sendEmail };


