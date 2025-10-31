import { Router } from 'express';
import { GameController } from '../adapters/controllers/GameController';
import { validate, schemas } from '../middleware/validation';

const router = Router();
const gameController = new GameController();

// POST /api/games/start - Start a new game
router.post(
  '/start',
  validate(schemas.startGame, 'body'),
  gameController.startGame.bind(gameController)
);

// POST /api/games/:id/guess - Guess a letter
router.post(
  '/:id/guess',
  validate(schemas.gameId, 'params'),
  validate(schemas.guessLetter, 'body'),
  gameController.guessLetter.bind(gameController)
);

// GET /api/games/:id - Get game status
router.get(
  '/:id',
  validate(schemas.gameId, 'params'),
  gameController.getGameStatus.bind(gameController)
);

// POST /api/games/:id/surrender - Surrender the game
router.post(
  '/:id/surrender',
  validate(schemas.gameId, 'params'),
  gameController.surrender.bind(gameController)
);

// GET /api/games/:id/history - Get game history
router.get(
  '/:id/history',
  validate(schemas.gameId, 'params'),
  gameController.getGameHistory.bind(gameController)
);

export default router;
