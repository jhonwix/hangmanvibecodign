import { GameStatus } from '../entities/Game';

export interface GameDTO {
  id: number;
  userId: number | null;
  wordId: number;
  status: GameStatus;
  hiddenWord: string;
  guessedLetters: string[];
  incorrectCount: number;
  attemptsRemaining: number;
  language: string;
  category?: string;
  difficulty?: string;
  startedAt: Date;
  endedAt?: Date;
  word?: string; // Only revealed when game is over
  duration?: number; // in milliseconds
}

export interface CreateGameDTO {
  userId?: number;
  wordCategory?: string;
  language?: 'en' | 'es';
}

export interface GameStateDTO {
  gameId: number;
  status: GameStatus;
  hiddenWord: string;
  guessedLetters: string[];
  incorrectCount: number;
  attemptsRemaining: number;
  isGameOver: boolean;
  isWon: boolean;
  word?: string;
}
