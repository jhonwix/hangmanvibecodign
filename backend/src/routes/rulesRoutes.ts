import { Router } from 'express';
import { RulesController } from '../adapters/controllers/RulesController';

const router = Router();
const rulesController = new RulesController();

// GET /api/rules - Get game rules
router.get('/', rulesController.getRules.bind(rulesController));

// GET /api/tips - Get game tips
router.get('/tips', rulesController.getTips.bind(rulesController));

export default router;
