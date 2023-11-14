import logger from "@/utils/logger"
import { PrismaClient } from '@prisma/client';
import sgMail from '@sendgrid/mail';
import { envOrFail } from '@/utils/env';
import { emailText, emailTitle } from '@/utils/template';

const prisma = new PrismaClient();
sgMail.setApiKey(envOrFail('SENDGRID_API_KEY'));

export const sendEmail = async () => {
    const usersNotReceivingEmail = await prisma.user.findMany({
        where: {
            emailSent: false,
            createdAt: {
                lte: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
            }
        }
    });

    const emailSent: string[] = []

    for (const user of usersNotReceivingEmail) {
        try {
            const msg = {
                to: user.email,
                from: { 'email': 'intaniarun@gmail.com', 'name': 'Intania Run 2024' },
                subject: emailTitle(),
                text: emailText(user),
            };

            await sgMail.send(msg)

            emailSent.push(user.id);
            // console.log(`Email sent to ${user.email}`);
        }
        catch (error) {
            logger.error(`Error sending email to ${user.email} (${user.id})`);
        }
    }

    const updatedData = await prisma.user.updateMany({
        where: {
            id: {
                in: emailSent
            }
        },
        data: {
            emailSent: true
        }
    })

    logger.info(`Email sent to ${updatedData.count} users from ${usersNotReceivingEmail.length} users who should've received.`)
}