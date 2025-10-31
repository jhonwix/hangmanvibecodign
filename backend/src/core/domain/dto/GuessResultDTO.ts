import { GameStatus } from '../entities/Game';

export interface GuessResultDTO {
  letter: string;
  correct: boolean;
  hiddenWord: string;
  guessedLetters: string[];
  incorrectCount: number;
  attemptsRemaining: number;
  status: GameStatus;
  isGameOver: boolean;
  isWon: boolean;
  message: string;
  word?: string; // Only if game is over
}

export interface GuessLetterRequestDTO {
  gameId: number;
  letter: string;
}
