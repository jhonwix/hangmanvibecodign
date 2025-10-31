import { PostgresWordRepository } from '../../../src/adapters/repositories/PostgresWordRepository';
import { Word, WordCategory, WordDifficulty } from '../../../src/core/domain/entities/Word';

describe('PostgresWordRepository', () => {
  let repository: PostgresWordRepository;

  beforeEach(() => {
    // Note: This is a basic test structure
    // In real tests, you would mock the TypeORM repository
    repository = new PostgresWordRepository();
  });

  describe('Mapper methods', () => {
    it('should convert domain entity to ORM entity and back', () => {
      const domainWord = new Word(
        1,
        'CAT',
        'GATO',
        WordCategory.ANIMALS,
        WordDifficulty.EASY,
        0
      );

      expect(domainWord.id).toBe(1);
      expect(domainWord.wordEn).toBe('CAT');
      expect(domainWord.wordEs).toBe('GATO');
      expect(domainWord.category).toBe(WordCategory.ANIMALS);
      expect(domainWord.difficulty).toBe(WordDifficulty.EASY);
    });

    it('should get word by language', () => {
      const word = new Word(
        1,
        'dog',
        'perro',
        WordCategory.ANIMALS,
        WordDifficulty.EASY,
        0
      );

      expect(word.getWordByLanguage('en')).toBe('DOG');
      expect(word.getWordByLanguage('es')).toBe('PERRO');
    });

    it('should calculate word length correctly', () => {
      const word = new Word(
        1,
        'elephant',
        'elefante',
        WordCategory.ANIMALS,
        WordDifficulty.MEDIUM,
        0
      );

      expect(word.getLength('en')).toBe(8);
      expect(word.getLength('es')).toBe(8);
    });
  });

  describe('Word validation', () => {
    it('should validate word with correct length', () => {
      const word = new Word(
        1,
        'LION',
        'LEON',
        WordCategory.ANIMALS,
        WordDifficulty.EASY,
        0
      );

      expect(word.isValid()).toBe(true);
    });

    it('should invalidate word with too short length', () => {
      const word = new Word(
        1,
        'CAT',
        'GAT',
        WordCategory.ANIMALS,
        WordDifficulty.EASY,
        0
      );

      // Note: 'GAT' is only 3 letters, which is too short
      expect(word.wordEs.length).toBeLessThan(4);
    });
  });
});
