import cron from 'node-cron';

import server from '@/app/server';

import { sendMultipleBibNumberEmail, sendMultipleFirstEmail } from './cron/sendEmail';

process.env.TZ = 'Asia/Bangkok';

server.serve();

cron.schedule('*/30 * * * *', () => {
    sendMultipleBibNumberEmail();
});

// cron.schedule('36 8 */1 * *', () => {
//     sendMultipleFirstEmail();
// });
