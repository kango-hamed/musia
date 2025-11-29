require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');
const logger = require('./config/logger');

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    logger.info('Database connected');
    
    // Sync models (development only)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      logger.info('Database synced');
    }
    
    // Start server
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
