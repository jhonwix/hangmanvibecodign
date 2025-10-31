import { GameService } from '../../../src/core/domain/services/GameService';
import { Game, GameStatus } from '../../../src/core/domain/entities/Game';
import { Word, WordCategory, WordDifficulty } from '../../../src/core/domain/entities/Word';

describe('GameService', () => {
  let gameService: GameService;
  let game: Game;
  let word: Word;

  beforeEach(() => {
    gameService = new GameService();

    // Create a test word
    word = new Word(
      1,
      'LION',
      'LEON',
      WordCategory.ANIMALS,
      WordDifficulty.EASY,
      0
    );

    // Create a test game
    game = Game.create(1, word.id, null, 'en');
  });

  describe('processGuess', () => {
    it('should process correct letter guess', () => {
      const result = gameService.processGuess(game, 'L', word);

      expect(result.correct).toBe(true);
      expect(result.gameOver).toBe(false);
      expect(game.guessedLetters).toContain('L');
      expect(game.incorrectCount).toBe(0);
    });

    it('should process incorrect letter guess', () => {
      const result = gameService.processGuess(game, 'Z', word);

      expect(result.correct).toBe(false);
      expect(result.gameOver).toBe(false);
      expect(game.guessedLetters).toContain('Z');
      expect(game.incorrectCount).toBe(1);
      expect(game.attemptsRemaining).toBe(5);
    });

    it('should detect game won', () => {
      // Guess all letters: L, I, O, N
      gameService.processGuess(game, 'L', word);
      gameService.processGuess(game, 'I', word);
      gameService.processGuess(game, 'O', word);
      const result = gameService.processGuess(game, 'N', word);

      expect(result.gameOver).toBe(true);
      expect(result.won).toBe(true);
      expect(game.status).toBe(GameStatus.WON);
    });

    it('should detect game lost after 6 incorrect guesses', () => {
      // Make 6 incorrect guesses
      gameService.processGuess(game, 'A', word);
      gameService.processGuess(game, 'B', word);
      gameService.processGuess(game, 'C', word);
      gameService.processGuess(game, 'D', word);
      gameService.processGuess(game, 'E', word);
      const result = gameService.processGuess(game, 'F', word);

      expect(result.gameOver).toBe(true);
      expect(result.won).toBe(false);
      expect(game.status).toBe(GameStatus.LOST);
      expect(game.attemptsRemaining).toBe(0);
    });

    it('should throw error for inactive game', () => {
      game.markAsWon();

      expect(() => {
        gameService.processGuess(game, 'L', word);
      }).toThrow('Cannot guess on an inactive game');
    });
  });

  describe('validateLetter', () => {
    it('should validate single letter', () => {
      expect(gameService.validateLetter('A')).toBe(true);
      expect(gameService.validateLetter('z')).toBe(true);
    });

    it('should invalidate non-letters', () => {
      expect(gameService.validateLetter('1')).toBe(false);
      expect(gameService.validateLetter('@')).toBe(false);
      expect(gameService.validateLetter('AA')).toBe(false);
      expect(gameService.validateLetter('')).toBe(false);
    });
  });

  describe('getHiddenWord', () => {
    it('should return fully hidden word initially', () => {
      const hidden = gameService.getHiddenWord(game, word);
      expect(hidden).toBe('_ _ _ _');
    });

    it('should reveal guessed letters', () => {
      game.guessLetter('L');
      game.guessLetter('I');

      const hidden = gameService.getHiddenWord(game, word);
      expect(hidden).toBe('L I _ _');
    });

    it('should reveal complete word when all letters guessed', () => {
      game.guessLetter('L');
      game.guessLetter('I');
      game.guessLetter('O');
      game.guessLetter('N');

      const hidden = gameService.getHiddenWord(game, word);
      expect(hidden).toBe('L I O N');
    });
  });

  describe('canContinue', () => {
    it('should allow continuation for active game', () => {
      expect(gameService.canContinue(game)).toBe(true);
    });

    it('should not allow continuation for won game', () => {
      game.markAsWon();
      expect(gameService.canContinue(game)).toBe(false);
    });

    it('should not allow continuation when no attempts remaining', () => {
      // Use all attempts
      for (let i = 0; i < 6; i++) {
        game.recordIncorrectGuess();
      }
      expect(gameService.canContinue(game)).toBe(false);
    });
  });

  describe('surrender', () => {
    it('should mark game as surrendered', () => {
      gameService.surrender(game);
      expect(game.status).toBe(GameStatus.SURRENDERED);
      expect(game.endedAt).toBeDefined();
    });

    it('should throw error for already ended game', () => {
      game.markAsWon();
      expect(() => {
        gameService.surrender(game);
      }).toThrow('Cannot surrender an inactive game');
    });
  });
});
