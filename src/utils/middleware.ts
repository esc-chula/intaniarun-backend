import { Request, Response, NextFunction } from 'express';
import { envOrFail } from '@/utils/env';

const checkAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['x-auth-token'];
        if (!token) throw new Error('Token not found');
        if (token !== envOrFail('X_AUTH_TOKEN')) throw new Error('Token mismatch');
        return next();
    }
    catch (error) {
        // console.log(error);
        res.status(403).json({ error: 'Unauthorized.' });
    }
}

export { checkAuthToken };