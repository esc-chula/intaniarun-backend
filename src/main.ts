import cron from 'node-cron';

import server from '@/app/server';

import { sendEmail } from './cron/sendEmail';

server.serve();

cron.schedule('0 * * * *', () => {
    sendEmail();
});

// cron.schedule('36 8 */1 * *', () => {
//     sendEmail();
// });
