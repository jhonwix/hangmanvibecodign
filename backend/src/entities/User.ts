import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Game } from './Game';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  email?: string;

  @Column({ type: 'int', default: 0, name: 'stats_wins' })
  statsWins!: number;

  @Column({ type: 'int', default: 0, name: 'stats_losses' })
  statsLosses!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // Relations
  @OneToMany(() => Game, (game) => game.user)
  games!: Game[];

  // Computed properties
  get winRate(): number {
    const totalGames = this.statsWins + this.statsLosses;
    return totalGames > 0 ? (this.statsWins / totalGames) * 100 : 0;
  }

  get totalGames(): number {
    return this.statsWins + this.statsLosses;
  }

  // Methods
  incrementWins(): void {
    this.statsWins += 1;
  }

  incrementLosses(): void {
    this.statsLosses += 1;
  }
}
