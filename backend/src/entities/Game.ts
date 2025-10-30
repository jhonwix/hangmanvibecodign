import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { Word } from './Word';
import { GameHistory } from './GameHistory';

export enum GameStatus {
  ACTIVE = 'active',
  WON = 'won',
  LOST = 'lost',
  SURRENDERED = 'surrendered',
}

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', name: 'user_id', nullable: true })
  userId?: number;

  @Column({ type: 'int', name: 'word_id' })
  wordId!: number;

  @Column({
    type: 'enum',
    enum: GameStatus,
    default: GameStatus.ACTIVE,
  })
  status!: GameStatus;

  @Column({ type: 'varchar', length: 26, default: '', name: 'guessed_letters' })
  guessedLetters!: string;

  @Column({ type: 'int', default: 0, name: 'incorrect_count' })
  incorrectCount!: number;

  @Column({ type: 'int', default: 6, name: 'attempts_remaining' })
  attemptsRemaining!: number;

  @Column({ type: 'varchar', length: 2, default: 'en' })
  language!: string;

  @CreateDateColumn({ name: 'started_at' })
  startedAt!: Date;

  @UpdateDateColumn({ name: 'ended_at', nullable: true })
  endedAt?: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.games, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => Word, (word) => word.games)
  @JoinColumn({ name: 'word_id' })
  word!: Word;

  @OneToMany(() => GameHistory, (history) => history.game)
  history!: GameHistory[];

  // Methods
  guessLetter(letter: string): boolean {
    const upperLetter = letter.toUpperCase();

    if (this.guessedLetters.includes(upperLetter)) {
      return false; // Already guessed
    }

    this.guessedLetters += upperLetter;
    return true;
  }

  isLetterCorrect(letter: string, word: string): boolean {
    return word.toUpperCase().includes(letter.toUpperCase());
  }

  recordIncorrectGuess(): void {
    this.incorrectCount += 1;
    this.attemptsRemaining -= 1;
  }

  getGuessedLettersArray(): string[] {
    return this.guessedLetters.split('');
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

  hasAttemptsRemaining(): boolean {
    return this.attemptsRemaining > 0;
  }

  getHiddenWord(word: string): string {
    return word
      .toUpperCase()
      .split('')
      .map((letter) => (this.guessedLetters.includes(letter) ? letter : '_'))
      .join(' ');
  }

  isWordComplete(word: string): boolean {
    const wordLetters = [...new Set(word.toUpperCase().split(''))];
    return wordLetters.every((letter) => this.guessedLetters.includes(letter));
  }

  getDuration(): number | null {
    if (!this.endedAt) return null;
    return this.endedAt.getTime() - this.startedAt.getTime();
  }
}
