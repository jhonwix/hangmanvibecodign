import { Router } from 'express';
import { WordController } from '../adapters/controllers/WordController';

const router = Router();
const wordController = new WordController();

// GET /api/words/categories - Get all categories
router.get('/categories', wordController.getCategories.bind(wordController));

// GET /api/words/random - Get a random word
router.get('/random', wordController.getRandom.bind(wordController));

// GET /api/words/count - Get total word count
router.get('/count', wordController.getCount.bind(wordController));

export default router;
