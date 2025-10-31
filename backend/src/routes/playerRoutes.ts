import { Router } from 'express';
import { PlayerController } from '../adapters/controllers/PlayerController';
import { validate, schemas } from '../middleware/validation';

const router = Router();
const playerController = new PlayerController();

// POST /api/players - Create a new player
router.post(
  '/',
  validate(schemas.createPlayer, 'body'),
  playerController.createPlayer.bind(playerController)
);

// GET /api/players - Get all players (leaderboard)
router.get('/', playerController.getAllPlayers.bind(playerController));

// GET /api/players/:id - Get player by ID
router.get(
  '/:id',
  validate(schemas.playerId, 'params'),
  playerController.getPlayer.bind(playerController)
);

// GET /api/players/:id/stats - Get player statistics
router.get(
  '/:id/stats',
  validate(schemas.playerId, 'params'),
  playerController.getPlayerStats.bind(playerController)
);

export default router;
