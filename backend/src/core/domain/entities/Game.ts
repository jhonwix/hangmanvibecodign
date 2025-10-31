export enum GameStatus {
  ACTIVE = 'active',
  WON = 'won',
  LOST = 'lost',
  SURRENDERED = 'surrendered',
}

export class Game {
  constructor(
    public readonly id: number,
    public readonly wordId: number,
    public readonly userId: number | null,
    public status: GameStatus,
    public guessedLetters: string[],
    public incorrectCount: number,
    public attemptsRemaining: number,
    public readonly language: string,
    public readonly startedAt: Date,
    public endedAt?: Date
  ) {}

  // Business logic methods
  guessLetter(letter: string): boolean {
    const upperLetter = letter.toUpperCase();

    // Validate single letter
    if (!/^[A-Z]$/.test(upperLetter)) {
      throw new Error('Invalid letter. Must be a single letter A-Z');
    }

    // Check if already guessed
    if (this.hasGuessedLetter(upperLetter)) {
      throw new Error('Letter already guessed');
    }

    // Check if game is active
    if (!this.isActive()) {
      throw new Error('Game is not active');
    }

    this.guessedLetters.push(upperLetter);
    return true;
  }

  hasGuessedLetter(letter: string): boolean {
    return this.guessedLetters.includes(letter.toUpperCase());
  }

  recordIncorrectGuess(): void {
    this.incorrectCount += 1;
    this.attemptsRemaining -= 1;
  }

  getHiddenWord(word: string): string {
    return word
      .toUpperCase()
      .split('')
      .map((letter) => (this.hasGuessedLetter(letter) ? letter : '_'))
      .join(' ');
  }

  isWordComplete(word: string): boolean {
    const uniqueLetters = [...new Set(word.toUpperCase().split(''))];
    return uniqueLetters.every((letter) => this.hasGuessedLetter(letter));
  }

  isLetterInWord(letter: string, word: string): boolean {
    return word.toUpperCase().includes(letter.toUpperCase());
  }

  markAsWon(): void {
    this.status = GameStatus.WON;
    this.endedAt = new Date();
  }

  markAsLost(): void {
    this.status = GameStatus.LOST;
    this.endedAt = new Date();
  }

  markAsSurrendered(): void {
    this.status = GameStatus.SURRENDERED;
    this.endedAt = new Date();
  }

  isActive(): boolean {
    return this.status === GameStatus.ACTIVE;
  }

  isGameOver(): boolean {
    return this.status !== GameStatus.ACTIVE;
  }

  isWon(): boolean {
    return this.status === GameStatus.WON;
  }

  isLost(): boolean {
    return this.status === GameStatus.LOST || this.status === GameStatus.SURRENDERED;
  }

  hasAttemptsRemaining(): boolean {
    return this.attemptsRemaining > 0;
  }

  getDuration(): number | null {
    if (!this.endedAt) return null;
    return this.endedAt.getTime() - this.startedAt.getTime();
  }

  // Static factory methods
  static create(
    id: number,
    wordId: number,
    userId: number | null,
    language: string = 'en'
  ): Game {
    return new Game(
      id,
      wordId,
      userId,
      GameStatus.ACTIVE,
      [],
      0,
      6, // MAX_ATTEMPTS
      language,
      new Date()
    );
  }
}
