import { PrismaClient } from '@prisma/client';
import sgMail from '@sendgrid/mail';

import { SENDING_EMAIL_OFFSET } from '@/config/constants';
import { envOrFail } from '@/utils/env';
import logger from '@/utils/logger';
import { emailBibNumberHtml, emailHtml, emailTitle } from '@/utils/template';

const prisma = new PrismaClient();

sgMail.setApiKey(envOrFail('SENDGRID_API_KEY'));

export const sendMultipleFirstEmail = async () => {
    logger.info('Sending First Email (Confirmation Email)...');

    const usersNotReceivingEmail = await prisma.user.findMany({
        where: {
            emailSent: false,
            createdAt: {
                lte: new Date(new Date().getTime() - SENDING_EMAIL_OFFSET),
            },
        },
        take: 400,
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

export const sendMultipleBibNumberEmail = async () => {
    logger.info('Sending Second Email (Bib Number Email)...');

    const usersNotReceivingEmail = await prisma.user.findMany({
        where: {
            bibNumberSent: false,
            createdAt: {
                lte: new Date(new Date().getTime() - SENDING_EMAIL_OFFSET),
            },
        },
        take: 800,
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
                html: emailBibNumberHtml(user),
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
            bibNumberSent: true,
        },
    });

    logger.info(
        `Email sent to ${updatedData.count} users from ${usersNotReceivingEmail.length} users who should've received.`
    );
};