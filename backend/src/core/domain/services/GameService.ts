import { Game, GameStatus } from '../entities/Game';
import { Word } from '../entities/Word';

export class GameService {
  private static readonly MAX_ATTEMPTS = 6;

  /**
   * Process a letter guess and update game state
   */
  processGuess(game: Game, letter: string, word: Word): {
    correct: boolean;
    gameOver: boolean;
    won: boolean;
  } {
    // Validate game is active
    if (!game.isActive()) {
      throw new Error('Cannot guess on an inactive game');
    }

    // Add letter to guessed letters
    game.guessLetter(letter);

    // Check if letter is correct
    const wordText = word.getWordByLanguage(game.language as 'en' | 'es');
    const correct = game.isLetterInWord(letter, wordText);

    if (!correct) {
      game.recordIncorrectGuess();
    }

    // Check game over conditions
    const wordComplete = game.isWordComplete(wordText);
    const noAttemptsLeft = !game.hasAttemptsRemaining();

    let gameOver = false;
    let won = false;

    if (wordComplete) {
      game.markAsWon();
      gameOver = true;
      won = true;
    } else if (noAttemptsLeft) {
      game.markAsLost();
      gameOver = true;
      won = false;
    }

    return { correct, gameOver, won };
  }

  /**
   * Get the hidden representation of the word
   */
  getHiddenWord(game: Game, word: Word): string {
    const wordText = word.getWordByLanguage(game.language as 'en' | 'es');
    return game.getHiddenWord(wordText);
  }

  /**
   * Check if game can continue
   */
  canContinue(game: Game): boolean {
    return game.isActive() && game.hasAttemptsRemaining();
  }

  /**
   * Validate a letter guess
   */
  validateLetter(letter: string): boolean {
    return /^[A-Za-z]$/.test(letter);
  }

  /**
   * Calculate game progress percentage
   */
  calculateProgress(game: Game, word: Word): number {
    const wordText = word.getWordByLanguage(game.language as 'en' | 'es');
    const uniqueLetters = [...new Set(wordText.toUpperCase().split(''))];
    const guessedCorrectCount = uniqueLetters.filter((letter) =>
      game.hasGuessedLetter(letter)
    ).length;

    return (guessedCorrectCount / uniqueLetters.length) * 100;
  }

  /**
   * Get game difficulty score (0-100)
   */
  getGameDifficulty(word: Word, attemptsUsed: number): number {
    const difficultyMultiplier = word.difficulty * 10;
    const lengthFactor = word.getLength('en') * 2;
    const attemptsUsedPenalty = attemptsUsed * 5;

    return Math.min(100, difficultyMultiplier + lengthFactor - attemptsUsedPenalty);
  }

  /**
   * Surrender the game
   */
  surrender(game: Game): void {
    if (!game.isActive()) {
      throw new Error('Cannot surrender an inactive game');
    }
    game.markAsSurrendered();
  }

  /**
   * Create game message based on result
   */
  createGameMessage(correct: boolean, gameOver: boolean, won: boolean, language: string): string {
    if (!gameOver) {
      return correct
        ? language === 'es'
          ? '¡Letra correcta!'
          : 'Correct letter!'
        : language === 'es'
        ? 'Letra incorrecta'
        : 'Incorrect letter';
    }

    if (won) {
      return language === 'es' ? '¡Felicitaciones! Has ganado' : 'Congratulations! You won!';
    } else {
      return language === 'es' ? 'Juego terminado. Has perdido' : 'Game over. You lost!';
    }
  }
}
