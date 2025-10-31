import { StartGameUseCase } from '../../../src/core/usecases/StartGameUseCase';
import { IGameRepository } from '../../../src/ports/repositories/IGameRepository';
import { IWordRepository } from '../../../src/ports/repositories/IWordRepository';
import { IPlayerRepository } from '../../../src/ports/repositories/IPlayerRepository';
import { WordService } from '../../../src/core/domain/services/WordService';
import { Game, GameStatus } from '../../../src/core/domain/entities/Game';
import { Word, WordCategory, WordDifficulty } from '../../../src/core/domain/entities/Word';
import { Player } from '../../../src/core/domain/entities/Player';

describe('StartGameUseCase', () => {
  let useCase: StartGameUseCase;
  let mockGameRepository: jest.Mocked<IGameRepository>;
  let mockWordRepository: jest.Mocked<IWordRepository>;
  let mockPlayerRepository: jest.Mocked<IPlayerRepository>;
  let wordService: WordService;

  beforeEach(() => {
    // Create mock repositories
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

    wordService = new WordService();

    useCase = new StartGameUseCase(
      mockGameRepository,
      mockWordRepository,
      mockPlayerRepository,
      wordService
    );
  });

  describe('execute', () => {
    it('should start a new game successfully', async () => {
      // Arrange
      const mockWord = new Word(1, 'LION', 'LEON', WordCategory.ANIMALS, WordDifficulty.EASY, 0);
      const mockGame = Game.create(1, mockWord.id, null, 'en');

      mockWordRepository.findRandom.mockResolvedValue(mockWord);
      mockWordRepository.save.mockResolvedValue(mockWord);
      mockGameRepository.save.mockResolvedValue(mockGame);

      // Act
      const result = await useCase.execute({ language: 'en' });

      // Assert
      expect(result).toBeDefined();
      expect(result.hiddenWord).toBe('_ _ _ _');
      expect(result.status).toBe(GameStatus.ACTIVE);
      expect(result.attemptsRemaining).toBe(6);
      expect(mockWordRepository.findRandom).toHaveBeenCalled();
      expect(mockGameRepository.save).toHaveBeenCalled();
    });

    it('should start game with specific category', async () => {
      // Arrange
      const mockWord = new Word(2, 'APPLE', 'MANZANA', WordCategory.FRUITS, WordDifficulty.EASY, 0);
      const mockGame = Game.create(1, mockWord.id, null, 'en');

      mockWordRepository.findRandomByCategory.mockResolvedValue(mockWord);
      mockWordRepository.save.mockResolvedValue(mockWord);
      mockGameRepository.save.mockResolvedValue(mockGame);

      // Act
      const result = await useCase.execute({ wordCategory: 'fruits', language: 'en' });

      // Assert
      expect(result).toBeDefined();
      expect(result.category).toBe('Fruits');
      expect(mockWordRepository.findRandomByCategory).toHaveBeenCalledWith(WordCategory.FRUITS);
    });

    it('should start game for specific user', async () => {
      // Arrange
      const mockPlayer = new Player(1, 'player1', 'player1@test.com', 0, 0, new Date());
      const mockWord = new Word(1, 'CATS', 'GATO', WordCategory.ANIMALS, WordDifficulty.EASY, 0);
      const mockGame = Game.create(1, mockWord.id, 1, 'en');

      mockPlayerRepository.findById.mockResolvedValue(mockPlayer);
      mockWordRepository.findRandom.mockResolvedValue(mockWord);
      mockWordRepository.save.mockResolvedValue(mockWord);
      mockGameRepository.save.mockResolvedValue(mockGame);

      // Act
      const result = await useCase.execute({ userId: 1, language: 'en' });

      // Assert
      expect(result).toBeDefined();
      expect(result.userId).toBe(1);
      expect(mockPlayerRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw error if player not found', async () => {
      // Arrange
      mockPlayerRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(useCase.execute({ userId: 999 })).rejects.toThrow('Player with ID 999 not found');
    });

    it('should throw error if no words available', async () => {
      // Arrange
      mockWordRepository.findRandom.mockResolvedValue(null);

      // Act & Assert
      await expect(useCase.execute({})).rejects.toThrow('No words available in the database');
    });

    it('should increment word usage count', async () => {
      // Arrange
      const mockWord = new Word(1, 'DOGS', 'PERRO', WordCategory.ANIMALS, WordDifficulty.EASY, 5);
      const mockGame = Game.create(1, mockWord.id, null, 'en');

      mockWordRepository.findRandom.mockResolvedValue(mockWord);
      mockWordRepository.save.mockResolvedValue(mockWord);
      mockGameRepository.save.mockResolvedValue(mockGame);

      // Act
      await useCase.execute({ language: 'en' });

      // Assert
      expect(mockWordRepository.save).toHaveBeenCalled();
      const savedWord = mockWordRepository.save.mock.calls[0][0];
      expect(savedWord.usageCount).toBe(6);
    });
  });
});
