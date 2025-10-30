import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Game } from './Game';

@Entity('game_history')
export class GameHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', name: 'game_id' })
  gameId!: number;

  @Column({ type: 'varchar', length: 1, name: 'letter_guessed' })
  letterGuessed!: string;

  @Column({ type: 'boolean' })
  correct!: boolean;

  @CreateDateColumn()
  timestamp!: Date;

  // Relations
  @ManyToOne(() => Game, (game) => game.history)
  @JoinColumn({ name: 'game_id' })
  game!: Game;

  // Methods
  getFormattedTime(): string {
    return this.timestamp.toLocaleTimeString();
  }

  getResult(): string {
    return this.correct ? '✓' : '✗';
  }
}
