import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Game } from './Game';

export enum WordCategory {
  ANIMALS = 'animals',
  OBJECTS = 'objects',
  FRUITS = 'fruits',
  COUNTRIES = 'countries',
  MOVIES = 'movies',
}

export enum WordDifficulty {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
}

@Entity('words')
export class Word {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, name: 'word_en' })
  wordEn!: string;

  @Column({ type: 'varchar', length: 50, name: 'word_es' })
  wordEs!: string;

  @Column({
    type: 'enum',
    enum: WordCategory,
    default: WordCategory.OBJECTS,
  })
  category!: WordCategory;

  @Column({
    type: 'int',
    default: WordDifficulty.MEDIUM,
  })
  difficulty!: WordDifficulty;

  @Column({ type: 'int', default: 0, name: 'usage_count' })
  usageCount!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // Relations
  @OneToMany(() => Game, (game) => game.word)
  games!: Game[];

  // Methods
  getWordByLanguage(language: 'en' | 'es'): string {
    return language === 'en' ? this.wordEn.toUpperCase() : this.wordEs.toUpperCase();
  }

  incrementUsage(): void {
    this.usageCount += 1;
  }

  getDifficultyLabel(): string {
    switch (this.difficulty) {
      case WordDifficulty.EASY:
        return 'Easy';
      case WordDifficulty.MEDIUM:
        return 'Medium';
      case WordDifficulty.HARD:
        return 'Hard';
      default:
        return 'Unknown';
    }
  }

  getLength(language: 'en' | 'es'): number {
    return this.getWordByLanguage(language).length;
  }
}
