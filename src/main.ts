import cron from 'node-cron';

import server from '@/app/server';

import { sendFirstEmail } from './cron/sendFirstEmail';

process.env.TZ = 'Asia/Bangkok';

server.serve();

cron.schedule('*/30 * * * *', () => {
    sendFirstEmail();
});

// cron.schedule('36 8 */1 * *', () => {
//     sendFirstEmail();
// });
