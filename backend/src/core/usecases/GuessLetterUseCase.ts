import { IGameRepository } from '../../ports/repositories/IGameRepository';
import { IWordRepository } from '../../ports/repositories/IWordRepository';
import { IPlayerRepository } from '../../ports/repositories/IPlayerRepository';
import { GuessResultDTO, GuessLetterRequestDTO } from '../domain/dto/GuessResultDTO';
import { GameService } from '../domain/services/GameService';
import { WordService } from '../domain/services/WordService';

export class GuessLetterUseCase {
  constructor(
    private readonly gameRepository: IGameRepository,
    private readonly wordRepository: IWordRepository,
    private readonly playerRepository: IPlayerRepository,
    private readonly gameService: GameService,
    private readonly wordService: WordService
  ) {}

  async execute(request: GuessLetterRequestDTO): Promise<GuessResultDTO> {
    const { gameId, letter } = request;

    // Validate letter format
    if (!this.gameService.validateLetter(letter)) {
      throw new Error('Invalid letter format. Must be a single letter A-Z');
    }

    // Find game
    const game = await this.gameRepository.findById(gameId);
    if (!game) {
      throw new Error(`Game with ID ${gameId} not found`);
    }

    // Check if game is active
    if (!game.isActive()) {
      throw new Error('Game is not active');
    }

    // Find word
    const word = await this.wordRepository.findById(game.wordId);
    if (!word) {
      throw new Error(`Word with ID ${game.wordId} not found`);
    }

    // Process the guess
    const result = this.gameService.processGuess(game, letter, word);

    // Save updated game
    await this.gameRepository.save(game);

    // Update player stats if game is over
    if (result.gameOver && game.userId) {
      const player = await this.playerRepository.findById(game.userId);
      if (player) {
        if (result.won) {
          player.incrementWins();
        } else {
          player.incrementLosses();
        }
        await this.playerRepository.save(player);
      }
    }

    // Get word text
    const wordText = word.getWordByLanguage(game.language as 'en' | 'es');
    const hiddenWord = this.gameService.getHiddenWord(game, word);

    // Create message
    const message = this.gameService.createGameMessage(
      result.correct,
      result.gameOver,
      result.won,
      game.language
    );

    // Build result DTO
    return {
      letter: letter.toUpperCase(),
      correct: result.correct,
      hiddenWord,
      guessedLetters: game.guessedLetters,
      incorrectCount: game.incorrectCount,
      attemptsRemaining: game.attemptsRemaining,
      status: game.status,
      isGameOver: result.gameOver,
      isWon: result.won,
      message,
      word: result.gameOver ? wordText : undefined,
    };
  }
}
