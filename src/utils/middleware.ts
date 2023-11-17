import { NextFunction, Request, Response } from 'express';

import { envOrFail } from '@/utils/env';

const checkAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        // return next();
        const token = req.headers['x-auth-token'];
        if (!token) throw new Error('Token not found');
        if (token !== envOrFail('X_AUTH_TOKEN'))
            throw new Error('Token mismatch');
        return next();
    } catch (error) {
        // return next();
        // console.log(error);
        res.status(403).json({ error: 'Unauthorized.' });
    }
};

export { checkAuthToken };
