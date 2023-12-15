import cron from 'node-cron';

import server from '@/app/server';

// import { sendEmail } from './cron/sendEmail';

process.env.TZ = 'Asia/Bangkok';

server.serve();

cron.schedule('*/30 * * * *', () => {
    // sendEmail();
});

// cron.schedule('36 8 */1 * *', () => {
//     sendEmail();
// });
