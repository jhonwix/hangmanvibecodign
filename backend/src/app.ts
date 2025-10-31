import 'reflect-metadata';
import express, { Application } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { initializeDatabase } from './config/database';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
if (process.env.NODE_ENV !== 'test') {
  app.use(requestLogger);
}

// API routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Hangman Game API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      games: '/api/games',
      words: '/api/words',
      rules: '/api/rules',
      players: '/api/players',
    },
  });
});

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Initialize database
    await initializeDatabase();
    console.log('✅ Database initialized successfully');

    // Start listening on all network interfaces
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Local API: http://localhost:${PORT}/api`);
      console.log(`📍 Network API: http://192.168.58.107:${PORT}/api`);
      console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
