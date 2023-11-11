import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import sgMail from '@sendgrid/mail';
import { envOrFail } from '@/utils/env';
import { emailText, emailTitle } from '@/utils/template';
import { nextRunnerNo } from '@/utils/runnerNo';

sgMail.setApiKey(envOrFail('SENDGRID_API_KEY'));

const prisma = new PrismaClient();

async function createUser(req: Request, res: Response) {
    try {
        const newUser = req.body;
        const counter = await prisma.counter.findUnique({
            where: { packageType: newUser.selectedPackage }
        });

        if (!counter) throw new Error('Counter not found');

        const runnerNo = nextRunnerNo(counter.count)
        const [user, result] = await Promise.all([
            prisma.user.create({
                data: { ...newUser, runnerNo: newUser.selectedPackage + String(runnerNo).padStart(4, '0') },
            }),
            prisma.counter.update({ where: { packageType: newUser.selectedPackage }, data: { count: runnerNo } })])

        const msg = {
            to: user.email,
            from: { 'email': 'intaniarun@gmail.com', 'name': 'Intania Run 2024' },
            subject: emailTitle(),
            text: emailText(user),
        };
        await sgMail.send(msg);

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create user.' });
    }
}

async function getUser(req: Request, res: Response) {
    try {
        const userId = req.params.userId;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch user.' });
    }
}

async function getUsers(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: 'Could not fetch users.' });
    }
}

async function updateUser(req: Request, res: Response) {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: updatedData,
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Could not update user.' });
    }
}

async function deleteUser(req: Request, res: Response) {
    try {
        const userId = req.params.userId;
        const user = await prisma.user.delete({
            where: {
                id: userId,
            },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Could not delete user.' });
    }
}

export default {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
};
