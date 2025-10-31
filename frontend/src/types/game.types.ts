export enum GameStatus {
  ACTIVE = 'ACTIVE',
  WON = 'WON',
  LOST = 'LOST',
  SURRENDERED = 'SURRENDERED',
}

export interface GameState {
  id: number
  userId: number | null
  wordId: number
  status: GameStatus
  hiddenWord: string
  guessedLetters: string[]
  incorrectCount: number
  attemptsRemaining: number
  language: string
  category?: string
  difficulty?: string
  startedAt: Date
  endedAt?: Date
  word?: string
}

export interface GuessResult {
  letter: string
  correct: boolean
  hiddenWord: string
  guessedLetters: string[]
  incorrectCount: number
  attemptsRemaining: number
  status: GameStatus
  isGameOver: boolean
  isWon: boolean
  message: string
  word?: string
}

export interface PlayerStats {
  wins: number
  losses: number
  totalGames: number
  winRate: number
  lossRate: number
}

export interface WordCategory {
  category: string
  count: number
}

export interface GameRule {
  title: string
  description: string
}

export interface GameRules {
  language: string
  rules: GameRule[]
  tips: string[]
  categories: string[]
  maxAttempts: number
  difficultyLevels: Array<{
    level: string
    description: string
  }>
}
