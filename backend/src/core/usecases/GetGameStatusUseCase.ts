import { IGameRepository } from '../../ports/repositories/IGameRepository';
import { IWordRepository } from '../../ports/repositories/IWordRepository';
import { GameStateDTO } from '../domain/dto/GameDTO';
import { GameService } from '../domain/services/GameService';

export class GetGameStatusUseCase {
  constructor(
    private readonly gameRepository: IGameRepository,
    private readonly wordRepository: IWordRepository,
    private readonly gameService: GameService
  ) {}

  async execute(gameId: number): Promise<GameStateDTO> {
    // Find game
    const game = await this.gameRepository.findById(gameId);
    if (!game) {
      throw new Error(`Game with ID ${gameId} not found`);
    }

    // Find word
    const word = await this.wordRepository.findById(game.wordId);
    if (!word) {
      throw new Error(`Word with ID ${game.wordId} not found`);
    }

    // Get word text
    const wordText = word.getWordByLanguage(game.language as 'en' | 'es');

    // Get hidden word
    const hiddenWord = this.gameService.getHiddenWord(game, word);

    // Build state DTO
    return {
      gameId: game.id,
      status: game.status,
      hiddenWord,
      guessedLetters: game.guessedLetters,
      incorrectCount: game.incorrectCount,
      attemptsRemaining: game.attemptsRemaining,
      isGameOver: game.isGameOver(),
      isWon: game.isWon(),
      word: game.isGameOver() ? wordText : undefined,
    };
  }
}
