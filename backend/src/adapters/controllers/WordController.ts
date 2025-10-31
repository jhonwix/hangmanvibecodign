import { Request, Response, NextFunction } from 'express';
import { PostgresWordRepository } from '../repositories/PostgresWordRepository';
import { WordMapper } from '../mappers/WordMapper';

export class WordController {
  private wordRepository: PostgresWordRepository;

  constructor() {
    this.wordRepository = new PostgresWordRepository();
  }

  /**
   * GET /api/words/categories
   * Get all word categories with counts
   */
  async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await this.wordRepository.getCategories();

      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/words/random
   * Get a random word (without revealing the word itself)
   */
  async getRandom(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const language = (req.query.language as string) || 'en';
      const word = await this.wordRepository.findRandom();

      if (!word) {
        res.status(404).json({
          success: false,
          message: 'No words available',
        });
        return;
      }

      const wordDTO = WordMapper.toDTO(word, language as 'en' | 'es');

      res.status(200).json({
        success: true,
        data: wordDTO,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/words/count
   * Get total word count
   */
  async getCount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const count = await this.wordRepository.count();

      res.status(200).json({
        success: true,
        data: { count },
      });
    } catch (error) {
      next(error);
    }
  }
}
