import cron from 'node-cron';

import server from '@/app/server';

import { sendEmail } from './cron/sendEmail';

server.serve();

cron.schedule('0 12 */1 * *', () => {
    sendEmail();
});
