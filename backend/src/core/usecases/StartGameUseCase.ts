import { Game } from '../domain/entities/Game';
import { Word, WordCategory } from '../domain/entities/Word';
import { IGameRepository } from '../../ports/repositories/IGameRepository';
import { IWordRepository } from '../../ports/repositories/IWordRepository';
import { IPlayerRepository } from '../../ports/repositories/IPlayerRepository';
import { GameDTO, CreateGameDTO } from '../domain/dto/GameDTO';
import { WordService } from '../domain/services/WordService';

export class StartGameUseCase {
  constructor(
    private readonly gameRepository: IGameRepository,
    private readonly wordRepository: IWordRepository,
    private readonly playerRepository: IPlayerRepository,
    private readonly wordService: WordService
  ) {}

  async execute(request: CreateGameDTO): Promise<GameDTO> {
    // Validate player if userId provided
    if (request.userId) {
      const player = await this.playerRepository.findById(request.userId);
      if (!player) {
        throw new Error(`Player with ID ${request.userId} not found`);
      }
    }

    // Get a random word
    let word: Word | null;
    if (request.wordCategory) {
      const category = request.wordCategory as WordCategory;
      word = await this.wordRepository.findRandomByCategory(category);
    } else {
      word = await this.wordRepository.findRandom();
    }

    if (!word) {
      throw new Error('No words available in the database');
    }

    // Validate word
    if (!this.wordService.validateWord(word)) {
      throw new Error('Selected word is invalid');
    }

    // Increment word usage
    word.incrementUsage();
    await this.wordRepository.save(word);

    // Create new game
    const language = request.language || 'en';
    const newGame = Game.create(0, word.id, request.userId || null, language);

    // Save game
    const savedGame = await this.gameRepository.save(newGame);

    // Return DTO
    return this.toDTO(savedGame, word);
  }

  private toDTO(game: Game, word: Word): GameDTO {
    const wordText = word.getWordByLanguage(game.language as 'en' | 'es');
    const hiddenWord = game.getHiddenWord(wordText);

    return {
      id: game.id,
      userId: game.userId,
      wordId: game.wordId,
      status: game.status,
      hiddenWord,
      guessedLetters: game.guessedLetters,
      incorrectCount: game.incorrectCount,
      attemptsRemaining: game.attemptsRemaining,
      language: game.language,
      category: word.getCategoryLabel(),
      difficulty: word.getDifficultyLabel(),
      startedAt: game.startedAt,
      endedAt: game.endedAt,
    };
  }
}
