import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser(req: Request, res: Response) {
    try {
        const newUser = req.body;
        const user = await prisma.user.create({
            data: newUser,
        });
        res.json(user);
    } catch (error) {
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
