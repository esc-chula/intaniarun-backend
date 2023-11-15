import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import defaultRoutes from '@/app/routes/default.routes';
import errorRoutes from '@/app/routes/error.routes';
import userRoutes from '@/app/routes/user.routes';
import sendGridRoutes from '@/app/routes/sendgrid.routes';
import appConfig from '@/config/app';
import corsOptions from '@/config/cors';
import logger from '@/utils/logger';
import morganMiddleware from '@/utils/morgan';
import uploadFileRoutes from './routes/uploadFile.routes';

const app = express();

async function serve() {
    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(morganMiddleware);

    app.use('/', defaultRoutes);
    app.use('/user', userRoutes);
    app.use('/mail', sendGridRoutes);
    app.use('/file', uploadFileRoutes);
    app.use(errorRoutes);

    app.listen(appConfig.port, () => {
        logger.info(
            `${appConfig.name} server started on port ${appConfig.port}`
        );
    });
}

export default {
    serve,
};
