import http from 'node:http';

import { app } from './app';
import { env } from './config/env';
import { logger } from './config/logger';

const server = http.createServer(app);

const start = async () => {
  server.listen(env.PORT, () => {
    logger.info(`Server listening on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });
};

start().catch((error) => {
  logger.error('Failed to start server', error as Error);
  process.exit(1);
});
