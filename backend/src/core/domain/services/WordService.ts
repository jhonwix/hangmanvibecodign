import { Word, WordCategory, WordDifficulty } from '../entities/Word';

export class WordService {
  /**
   * Validate if a word meets the game requirements
   */
  validateWord(word: Word): boolean {
    return word.isValid();
  }

  /**
   * Get word for specific language
   */
  getWordText(word: Word, language: 'en' | 'es'): string {
    return word.getWordByLanguage(language);
  }

  /**
   * Check if letter exists in word
   */
  containsLetter(word: Word, letter: string, language: 'en' | 'es'): boolean {
    return word.containsLetter(letter, language);
  }

  /**
   * Get all unique letters in the word
   */
  getUniqueLetters(word: Word, language: 'en' | 'es'): string[] {
    return word.getUniqueLetters(language);
  }

  /**
   * Calculate word difficulty score
   */
  calculateDifficultyScore(word: Word, language: 'en' | 'es'): number {
    const length = word.getLength(language);
    const uniqueLetters = word.getUniqueLetters(language).length;
    const baseDifficulty = word.difficulty * 20;

    // More unique letters = easier (more chances to guess)
    // Longer words = harder
    const uniquenessFactor = (uniqueLetters / length) * 10;
    const lengthFactor = length * 3;

    return Math.min(100, baseDifficulty + lengthFactor - uniquenessFactor);
  }

  /**
   * Get hint for the word (first letter)
   */
  getHint(word: Word, language: 'en' | 'es'): string {
    const wordText = word.getWordByLanguage(language);
    return wordText.charAt(0);
  }

  /**
   * Count occurrences of a letter in word
   */
  countLetterOccurrences(word: Word, letter: string, language: 'en' | 'es'): number {
    const wordText = word.getWordByLanguage(language);
    return wordText.split('').filter((l) => l === letter.toUpperCase()).length;
  }

  /**
   * Get all positions of a letter in the word
   */
  getLetterPositions(word: Word, letter: string, language: 'en' | 'es'): number[] {
    const wordText = word.getWordByLanguage(language);
    const positions: number[] = [];

    wordText.split('').forEach((l, index) => {
      if (l === letter.toUpperCase()) {
        positions.push(index);
      }
    });

    return positions;
  }

  /**
   * Check if word contains vowels
   */
  hasVowels(word: Word, language: 'en' | 'es'): boolean {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const wordText = word.getWordByLanguage(language);
    return vowels.some((vowel) => wordText.includes(vowel));
  }

  /**
   * Get category display name
   */
  getCategoryName(category: WordCategory, language: 'en' | 'es'): string {
    const categoryNames: Record<WordCategory, { en: string; es: string }> = {
      [WordCategory.ANIMALS]: { en: 'Animals', es: 'Animales' },
      [WordCategory.OBJECTS]: { en: 'Objects', es: 'Objetos' },
      [WordCategory.FRUITS]: { en: 'Fruits', es: 'Frutas' },
      [WordCategory.COUNTRIES]: { en: 'Countries', es: 'Países' },
      [WordCategory.MOVIES]: { en: 'Movies', es: 'Películas' },
    };

    return categoryNames[category][language];
  }

  /**
   * Get difficulty display name
   */
  getDifficultyName(difficulty: WordDifficulty, language: 'en' | 'es'): string {
    const difficultyNames: Record<WordDifficulty, { en: string; es: string }> = {
      [WordDifficulty.EASY]: { en: 'Easy', es: 'Fácil' },
      [WordDifficulty.MEDIUM]: { en: 'Medium', es: 'Medio' },
      [WordDifficulty.HARD]: { en: 'Hard', es: 'Difícil' },
    };

    return difficultyNames[difficulty][language];
  }
}
