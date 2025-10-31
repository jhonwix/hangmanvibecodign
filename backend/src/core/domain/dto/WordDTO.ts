import { WordCategory, WordDifficulty } from '../entities/Word';

export interface WordDTO {
  id: number;
  category: WordCategory;
  difficulty: WordDifficulty;
  difficultyLabel: string;
  categoryLabel: string;
  length: number;
  usageCount: number;
}

export interface WordCategoryDTO {
  category: string;
  count: number;
}
