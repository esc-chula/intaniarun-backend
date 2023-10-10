import morgan from 'morgan';
import split from 'split';

import logger from '@/utils/logger';

const stream = split().on('data', (message) => {
    logger.http(message);
});

const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream }
);

export default morganMiddleware;
