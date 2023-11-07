import { Request, Response } from 'express';
import sgMail from '@sendgrid/mail';
import { envOrFail } from '@/utils/env';

sgMail.setApiKey(envOrFail('SENDGRID_API_KEY'));

async function sendEmail(req: Request, res: Response) {
    try {
        const { to, subject, text } = req.body;
        const msg = {
            to,
            from: { 'email': 'intaniarun@gmail.com', 'name': 'Intania Run 2024' },
            subject,
            text,
        };
        await sgMail.send(msg).catch((error) => {
            console.log(error.response.body);
            throw new Error('Could not send email')
        });
        res.json({ message: 'Email sent' });
    }
    catch (error) {
        res.status(500).json({ error: 'Could not send email.' });
    }
}
export { sendEmail };

