import { Request, Response, NextFunction } from 'express';
import { StartGameUseCase } from '../../core/usecases/StartGameUseCase';
import { GuessLetterUseCase } from '../../core/usecases/GuessLetterUseCase';
import { GetGameStatusUseCase } from '../../core/usecases/GetGameStatusUseCase';
import { EndGameUseCase } from '../../core/usecases/EndGameUseCase';
import { PostgresGameRepository } from '../repositories/PostgresGameRepository';
import { PostgresWordRepository } from '../repositories/PostgresWordRepository';
import { PostgresPlayerRepository } from '../repositories/PostgresPlayerRepository';
import { GameService } from '../../core/domain/services/GameService';
import { WordService } from '../../core/domain/services/WordService';
import { NotFoundError, ValidationError } from '../errors/CustomErrors';

export class GameController {
  private startGameUseCase: StartGameUseCase;
  private guessLetterUseCase: GuessLetterUseCase;
  private getGameStatusUseCase: GetGameStatusUseCase;
  private endGameUseCase: EndGameUseCase;

  constructor() {
    const gameRepository = new PostgresGameRepository();
    const wordRepository = new PostgresWordRepository();
    const playerRepository = new PostgresPlayerRepository();
    const gameService = new GameService();
    const wordService = new WordService();

    this.startGameUseCase = new StartGameUseCase(
      gameRepository,
      wordRepository,
      playerRepository,
      wordService
    );

    this.guessLetterUseCase = new GuessLetterUseCase(
      gameRepository,
      wordRepository,
      playerRepository,
      gameService,
      wordService
    );

    this.getGameStatusUseCase = new GetGameStatusUseCase(
      gameRepository,
      wordRepository,
      gameService
    );

    this.endGameUseCase = new EndGameUseCase(
      gameRepository,
      wordRepository,
      playerRepository,
      gameService
    );
  }

  /**
   * POST /api/games/start
   * Start a new game
   */
  async startGame(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, wordCategory, language } = req.body;

      const gameDTO = await this.startGameUseCase.execute({
        userId,
        wordCategory,
        language: language || 'en',
      });

      res.status(201).json({
        success: true,
        data: gameDTO,
        message: 'Game started successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/games/:id/guess
   * Guess a letter
   */
  async guessLetter(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const gameId = parseInt(req.params.id);
      const { letter } = req.body;

      if (!letter || typeof letter !== 'string' || letter.length !== 1) {
        throw new ValidationError('Letter must be a single character');
      }

      const result = await this.guessLetterUseCase.execute({
        gameId,
        letter,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/games/:id
   * Get game status
   */
  async getGameStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const gameId = parseInt(req.params.id);

      if (isNaN(gameId)) {
        throw new ValidationError('Invalid game ID');
      }

      const gameState = await this.getGameStatusUseCase.execute(gameId);

      res.status(200).json({
        success: true,
        data: gameState,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/games/:id/surrender
   * Surrender the game
   */
  async surrender(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const gameId = parseInt(req.params.id);

      if (isNaN(gameId)) {
        throw new ValidationError('Invalid game ID');
      }

      const result = await this.endGameUseCase.execute(gameId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/games/:id/history
   * Get game history (placeholder for future implementation)
   */
  async getGameHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const gameId = parseInt(req.params.id);

      if (isNaN(gameId)) {
        throw new ValidationError('Invalid game ID');
      }

      // TODO: Implement game history retrieval
      res.status(200).json({
        success: true,
        data: {
          gameId,
          history: [],
        },
        message: 'Game history endpoint (coming soon)',
      });
    } catch (error) {
      next(error);
    }
  }
}
