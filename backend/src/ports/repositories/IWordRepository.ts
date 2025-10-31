import { Word, WordCategory } from '../../core/domain/entities/Word';

export interface IWordRepository {
  /**
   * Find a word by ID
   */
  findById(id: number): Promise<Word | null>;

  /**
   * Get a random word
   */
  findRandom(): Promise<Word | null>;

  /**
   * Get a random word by category
   */
  findRandomByCategory(category: WordCategory): Promise<Word | null>;

  /**
   * Find all words by category
   */
  findByCategory(category: WordCategory): Promise<Word[]>;

  /**
   * Get all words
   */
  findAll(): Promise<Word[]>;

  /**
   * Get all available categories with counts
   */
  getCategories(): Promise<Array<{ category: string; count: number }>>;

  /**
   * Save a word (create or update)
   */
  save(word: Word): Promise<Word>;

  /**
   * Count total words
   */
  count(): Promise<number>;
}
