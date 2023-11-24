import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import { nextRunnerNo } from '@/utils/runnerNo';
import logger from '@/utils/logger';

const prisma = new PrismaClient();

async function createUser(req: Request, res: Response) {
    try {
        const newUser = req.body;
        newUser.birthDate = new Date(newUser.birthDate);
        if (newUser.bloodType === 'ไม่ทราบ') newUser.bloodType = 'UNKNOWN';
        // console.log(req.body);

        const counter = await prisma.counter.findUnique({
            where: { packageType: newUser.selectedPackage },
        });

        if (!counter) throw new Error('Counter not found');

        const runnerNo = nextRunnerNo(counter.count);

        await prisma.counter.update({
            where: { packageType: newUser.selectedPackage },
            data: { count: runnerNo, },
        });

        const user = await prisma.user.create({
            data: {
                ...newUser,
                runnerNo:
                    String(runnerNo).padStart(4, '0'),
                emailSent: false,
            },
        })

        res.json(user);
    } catch (error) {
        logger.error(`createUser ${error}`);
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
            logger.error(`getUser ${userId} not found`);
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        logger.error(`getUser ${error}`);
        res.status(500).json({ error: 'Could not fetch user.' });
    }
}

async function getUsers(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch users.' });
    }
}

async function getUsersByEmail(req: Request, res: Response) {
    try {
        const email = req.params.email;
        // console.log(req.params);

        const users = await prisma.user.findMany({
            select: {
                firstName: true,
                lastName: true,
                email: true,
                type: true,
                selectedPackage: true,
                shirtSize: true,
                createdAt: true,
                emailSent: true,
            },
            where: {
                email: {
                    equals: email,
                }
            },
        },);
        if (users.length === 0) return res.status(404).json({ error: 'User not found' });

        res.json(users);
    } catch (error) {
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
    getUsersByEmail
};
