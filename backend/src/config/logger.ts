import { createLogger, format, transports } from 'winston';

import { env } from './env';

const { combine, timestamp, errors, json, printf, colorize } = format;
const isProduction = env.NODE_ENV === 'production';

const consoleFormat = combine(
  colorize(),
  timestamp(),
  errors({ stack: true }),
  printf(({ level, message, timestamp: time, stack, requestId }) => {
    const rid = requestId ? `[${requestId}]` : '';
    const base = `${time} ${level}: ${message}`;
    return stack ? `${rid} ${base}\n${stack}` : `${rid} ${base}`;
  })
);

export const logger = createLogger({
  level: env.LOG_LEVEL,
  defaultMeta: { service: 'musia-backend' },
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

if (!isProduction) {
  logger.add(new transports.Console({ format: consoleFormat }));
}
