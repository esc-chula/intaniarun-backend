import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
    res.json({
        message: 'Server is running',
    });
});

export default router;
