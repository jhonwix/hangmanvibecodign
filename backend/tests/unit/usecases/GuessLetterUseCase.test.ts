import { GuessLetterUseCase } from '../../../src/core/usecases/GuessLetterUseCase';
import { IGameRepository } from '../../../src/ports/repositories/IGameRepository';
import { IWordRepository } from '../../../src/ports/repositories/IWordRepository';
import { IPlayerRepository } from '../../../src/ports/repositories/IPlayerRepository';
import { GameService } from '../../../src/core/domain/services/GameService';
import { WordService } from '../../../src/core/domain/services/WordService';
import { Game, GameStatus } from '../../../src/core/domain/entities/Game';
import { Word, WordCategory, WordDifficulty } from '../../../src/core/domain/entities/Word';
import { Player } from '../../../src/core/domain/entities/Player';

describe('GuessLetterUseCase', () => {
  let useCase: GuessLetterUseCase;
  let mockGameRepository: jest.Mocked<IGameRepository>;
  let mockWordRepository: jest.Mocked<IWordRepository>;
  let mockPlayerRepository: jest.Mocked<IPlayerRepository>;
  let gameService: GameService;
  let wordService: WordService;

  beforeEach(() => {
    mockGameRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findActiveByUserId: jest.fn(),
      findByUserId: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      getStatistics: jest.fn(),
    };

    mockWordRepository = {
      findById: jest.fn(),
      findRandom: jest.fn(),
      findRandomByCategory: jest.fn(),
      findByCategory: jest.fn(),
      findAll: jest.fn(),
      getCategories: jest.fn(),
      save: jest.fn(),
      count: jest.fn(),
    };

    mockPlayerRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByUsername: jest.fn(),
      findByEmail: jest.fn(),
      updateStats: jest.fn(),
      findAll: jest.fn(),
      count: jest.fn(),
      delete: jest.fn(),
    };

    gameService = new GameService();
    wordService = new WordService();

    useCase = new GuessLetterUseCase(
      mockGameRepository,
      mockWordRepository,
      mockPlayerRepository,
      gameService,
      wordService
    );
  });

  describe('execute', () => {
    it('should process correct letter guess', async () => {
      // Arrange
      const mockWord = new Word(1, 'LION', 'LEON', WordCategory.ANIMALS, WordDifficulty.EASY, 0);
      const mockGame = Game.create(1, mockWord.id, null, 'en');

      mockGameRepository.findById.mockResolvedValue(mockGame);
      mockWordRepository.findById.mockResolvedValue(mockWord);
      mockGameRepository.save.mockResolvedValue(mockGame);

      // Act
      const result = await useCase.execute({ gameId: 1, letter: 'L' });

      // Assert
      expect(result.correct).toBe(true);
      expect(result.letter).toBe('L');
      expect(result.incorrectCount).toBe(0);
      expect(result.attemptsRemaining).toBe(6);
      expect(result.isGameOver).toBe(false);
    });

    it('should process incorrect letter guess', async () => {
      // Arrange
      const mockWord = new Word(1, 'LION', 'LEON', WordCategory.ANIMALS, WordDifficulty.EASY, 0);
      const mockGame = Game.create(1, mockWord.id, null, 'en');

      mockGameRepository.findById.mockResolvedValue(mockGame);
      mockWordRepository.findById.mockResolvedValue(mockWord);
      mockGameRepository.save.mockResolvedValue(mockGame);

      // Act
      const result = await useCase.execute({ gameId: 1, letter: 'Z' });

      // Assert
      expect(result.correct).toBe(false);
      expect(result.incorrectCount).toBe(1);
      expect(result.attemptsRemaining).toBe(5);
      expect(result.isGameOver).toBe(false);
    });

    it('should detect game won', async () => {
      // Arrange
      const mockWord = new Word(1, 'CAT', 'GATO', WordCategory.ANIMALS, WordDifficulty.EASY, 0);
      const mockGame = Game.create(1, mockWord.id, null, 'en');
      mockGame.guessLetter('C');
      mockGame.guessLetter('A');

      mockGameRepository.findById.mockResolvedValue(mockGame);
      mockWordRepository.findById.mockResolvedValue(mockWord);
      mockGameRepository.save.mockResolvedValue(mockGame);

      // Act
      const result = await useCase.execute({ gameId: 1, letter: 'T' });

      // Assert
      expect(result.isGameOver).toBe(true);
      expect(result.isWon).toBe(true);
      expect(result.status).toBe(GameStatus.WON);
      expect(result.word).toBe('CAT');
    });

    it('should update player stats on win', async () => {
      // Arrange
      const mockPlayer = new Player(1, 'player1', null, 0, 0, new Date());
      const mockWord = new Word(1, 'CAT', 'GATO', WordCategory.ANIMALS, WordDifficulty.EASY, 0);
      const mockGame = Game.create(1, mockWord.id, 1, 'en');
      mockGame.guessLetter('C');
      mockGame.guessLetter('A');

      mockGameRepository.findById.mockResolvedValue(mockGame);
      mockWordRepository.findById.mockResolvedValue(mockWord);
      mockGameRepository.save.mockResolvedValue(mockGame);
      mockPlayerRepository.findById.mockResolvedValue(mockPlayer);
      mockPlayerRepository.save.mockResolvedValue(mockPlayer);

      // Act
      await useCase.execute({ gameId: 1, letter: 'T' });

      // Assert
      expect(mockPlayerRepository.findById).toHaveBeenCalledWith(1);
      expect(mockPlayerRepository.save).toHaveBeenCalled();
    });

    it('should throw error for invalid letter', async () => {
      // Act & Assert
      await expect(useCase.execute({ gameId: 1, letter: '1' })).rejects.toThrow(
        'Invalid letter format'
      );
    });

    it('should throw error if game not found', async () => {
      // Arrange
      mockGameRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(useCase.execute({ gameId: 999, letter: 'A' })).rejects.toThrow(
        'Game with ID 999 not found'
      );
    });

    it('should throw error for inactive game', async () => {
      // Arrange
      const mockWord = new Word(1, 'CAT', 'GATO', WordCategory.ANIMALS, WordDifficulty.EASY, 0);
      const mockGame = Game.create(1, mockWord.id, null, 'en');
      mockGame.markAsWon();

      mockGameRepository.findById.mockResolvedValue(mockGame);

      // Act & Assert
      await expect(useCase.execute({ gameId: 1, letter: 'A' })).rejects.toThrow(
        'Game is not active'
      );
    });
  });
});
