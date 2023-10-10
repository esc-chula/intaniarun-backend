import { Request, Response } from 'express';

function createUser(req: Request, res: Response) {
    res.json({
        message: 'Create user',
    });
}

function getUser(req: Request, res: Response) {
    res.json({
        message: 'Get user',
    });
}

function getUsers(req: Request, res: Response) {
    res.json({
        message: 'Get users',
    });
}

function updateUser(req: Request, res: Response) {
    res.json({
        message: 'Update user',
    });
}

function deleteUser(req: Request, res: Response) {
    res.json({
        message: 'Delete user',
    });
}

export default {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
};
