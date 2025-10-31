import { Router } from 'express';
import gameRoutes from './gameRoutes';
import wordRoutes from './wordRoutes';
import rulesRoutes from './rulesRoutes';
import playerRoutes from './playerRoutes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hangman API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
router.use('/games', gameRoutes);
router.use('/words', wordRoutes);
router.use('/rules', rulesRoutes);
router.use('/players', playerRoutes);

export default router;
