import { Request, Response, NextFunction } from 'express';
import { GetGameRulesUseCase } from '../../core/usecases/GetGameRulesUseCase';

export class RulesController {
  private getGameRulesUseCase: GetGameRulesUseCase;

  constructor() {
    this.getGameRulesUseCase = new GetGameRulesUseCase();
  }

  /**
   * GET /api/rules
   * Get game rules in specified language
   */
  async getRules(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const language = (req.query.lang as string) || 'en';

      if (language !== 'en' && language !== 'es') {
        res.status(400).json({
          success: false,
          message: 'Invalid language. Use "en" or "es"',
        });
        return;
      }

      const rules = this.getGameRulesUseCase.execute(language);

      res.status(200).json({
        success: true,
        data: rules,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/tips
   * Get game tips in specified language
   */
  async getTips(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const language = (req.query.lang as string) || 'en';

      if (language !== 'en' && language !== 'es') {
        res.status(400).json({
          success: false,
          message: 'Invalid language. Use "en" or "es"',
        });
        return;
      }

      const rulesData = this.getGameRulesUseCase.execute(language);

      res.status(200).json({
        success: true,
        data: {
          tips: rulesData.tips,
          categories: rulesData.categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
