import fs from 'fs';
import path from 'path';
import winston, { createLogger, format, transports } from 'winston';

const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

winston.addColors({
    http: 'magenta',
});

const logger = createLogger({
    level: env === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.label({ label: path.basename(require.main!.filename) }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(
                    (info) =>
                        `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
                )
            ),
        }),
        new transports.File({
            level: 'error',
            filename: path.join(logDir, 'error.log'),
            format: format.combine(
                format.printf(
                    (info) =>
                        `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
                )
            ),
        }),
        new transports.File({
            filename: path.join(logDir, 'results.log'),
            format: format.combine(
                format.printf(
                    (info) =>
                        `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
                )
            ),
        }),
    ],
    exceptionHandlers: [
        new transports.File({
            filename: path.join(logDir, 'exceptions.log'),
        }),
    ],
});

export default logger;

// logger.error('error message');
// logger.warn('warn message');
// logger.info('info message');
// logger.verbose('verbose message');
// logger.debug('debug message');
// logger.silly('silly message');
// logger.http('http message');
