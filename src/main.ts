import server from '@/app/server';
import { sendEmail } from './cron/sendEmail';
import cron from 'node-cron';

server.serve();

cron.schedule('0 12 */1 * *', () => {
    sendEmail()
});