import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import { nextRunnerNoV2 } from '@/utils/runnerNo';
import logger from '@/utils/logger';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

async function createUser(req: Request, res: Response) {
    try {
        const newUser = req.body;
        newUser.birthDate = new Date(newUser.birthDate);
        if (newUser.bloodType === 'ไม่ทราบ') newUser.bloodType = 'UNKNOWN';
        const counterPackageType = newUser.type === 'ACQUAINTANCE' || newUser.type === 'ALUMNI' ? 'ACQUAINTANCE_ALUMNI' : newUser.type
        // console.log(req.body);
        const counter = await prisma.counter.findUnique({
            where: { packageType: counterPackageType },
        });

        if (!counter) throw new Error('Counter not found');

        const runnerNo = nextRunnerNoV2(counter.count, counterPackageType);

        await prisma.counter.update({
            where: { packageType: counterPackageType },
            data: { count: counter.count + 1, },
        });

        const user = await prisma.user.create({
            data: {
                ...newUser,
                runnerNo: String(runnerNo),
                emailSent: false,
                receiptSent: false,
                bibNumberSent: false,
            },
        })

        res.json(user);
    } catch (error) {
        const errorResponse = {
            success: false,
            message: 'Could not create user.'
        }

        if (error instanceof PrismaClientKnownRequestError) {
            // console.log(error.code, error.meta, error.message);
            const errorMessages = error.message.split('\n')
            errorResponse.message = error.code + ', ' + errorMessages[errorMessages.length - 1];
        }

        logger.error(`createUser ${errorResponse}`);
        res.status(500).json(errorResponse);
    }
}

async function checkUsers(req: Request, res: Response) {
    try {
        const names = req.body.names;
        // console.log(names);

        const users = await prisma.user.findMany({
            select: {
                firstName: true,
                lastName: true,
                email: true,
            },
            where: {
                AND: [
                    { firstName: { in: names.map((name: { firstName: string, lastName: string }) => name.firstName) } },
                    { lastName: { in: names.map((name: { firstName: string, lastName: string }) => name.lastName) } },
                ]
            },
        },);

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch users.' });
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
        console.log(req.params);
        // console.dir(req)
        const users = await prisma.user.findMany({
            select: {
                firstName: true,
                lastName: true,
                email: true,
                type: true,
                selectedPackage: true,
                shirtSize: true,
                runnerNo: true,
                createdAt: true,
                emailSent: true,
            },
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive',
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
    checkUsers,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    getUsersByEmail
};
