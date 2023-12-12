import { PrismaClient } from '@prisma/client';
import sgMail from '@sendgrid/mail';

import { envOrFail } from '@/utils/env';
import logger from '@/utils/logger';
import { emailHtml, emailTitle } from '@/utils/template';
import { SENDING_EMAIL_OFFSET } from '@/config/constants';

const prisma = new PrismaClient();
sgMail.setApiKey(envOrFail('SENDGRID_API_KEY'));

export const sendEmail = async () => {
    const usersNotReceivingEmail = await prisma.user.findMany({
        where: {
            emailSent: false,
            createdAt: {
                lte: new Date(new Date().getTime() - SENDING_EMAIL_OFFSET),
            },
        },
        take: 100,
    });

    const emailSent: string[] = [];

    for (const user of usersNotReceivingEmail) {
        try {
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

            emailSent.push(user.id);
            logger.info(`Email sent to ${user.email} (${user.id})`);
        } catch (error) {
            logger.error(`Error sending email to ${user.email} (${user.id})`);
        }
    }

    const updatedData = await prisma.user.updateMany({
        where: {
            id: {
                in: emailSent,
            },
        },
        data: {
            emailSent: true,
        },
    });

    logger.info(
        `Email sent to ${updatedData.count} users from ${usersNotReceivingEmail.length} users who should've received.`
    );
};
