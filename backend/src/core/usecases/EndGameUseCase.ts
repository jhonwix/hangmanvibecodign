import { IGameRepository } from '../../ports/repositories/IGameRepository';
import { IWordRepository } from '../../ports/repositories/IWordRepository';
import { IPlayerRepository } from '../../ports/repositories/IPlayerRepository';
import { GameService } from '../domain/services/GameService';

export interface EndGameResult {
  gameId: number;
  status: string;
  word: string;
  message: string;
  finalStats: {
    incorrectCount: number;
    attemptsUsed: number;
    guessedLetters: string[];
    duration: number | null;
  };
}

export class EndGameUseCase {
  constructor(
    private readonly gameRepository: IGameRepository,
    private readonly wordRepository: IWordRepository,
    private readonly playerRepository: IPlayerRepository,
    private readonly gameService: GameService
  ) {}

  async execute(gameId: number): Promise<EndGameResult> {
    // Find game
    const game = await this.gameRepository.findById(gameId);
    if (!game) {
      throw new Error(`Game with ID ${gameId} not found`);
    }

    // Check if already ended
    if (game.isGameOver()) {
      throw new Error('Game has already ended');
    }

    // Find word
    const word = await this.wordRepository.findById(game.wordId);
    if (!word) {
      throw new Error(`Word with ID ${game.wordId} not found`);
    }

    // Surrender the game
    this.gameService.surrender(game);

    // Save updated game
    await this.gameRepository.save(game);

    // Update player stats (loss)
    if (game.userId) {
      const player = await this.playerRepository.findById(game.userId);
      if (player) {
        player.incrementLosses();
        await this.playerRepository.save(player);
      }
    }

    // Get word text
    const wordText = word.getWordByLanguage(game.language as 'en' | 'es');

    // Create message
    const message =
      game.language === 'es'
        ? `Te has rendido. La palabra era: ${wordText}`
        : `You surrendered. The word was: ${wordText}`;

    return {
      gameId: game.id,
      status: game.status,
      word: wordText,
      message,
      finalStats: {
        incorrectCount: game.incorrectCount,
        attemptsUsed: 6 - game.attemptsRemaining,
        guessedLetters: game.guessedLetters,
        duration: game.getDuration(),
      },
    };
  }
}
