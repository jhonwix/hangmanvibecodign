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

export class Word {
  constructor(
    public readonly id: number,
    public readonly wordEn: string,
    public readonly wordEs: string,
    public readonly category: WordCategory,
    public readonly difficulty: WordDifficulty,
    public usageCount: number
  ) {}

  getWordByLanguage(language: 'en' | 'es'): string {
    return (language === 'en' ? this.wordEn : this.wordEs).toUpperCase();
  }

  getLength(language: 'en' | 'es'): number {
    return this.getWordByLanguage(language).length;
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

  getCategoryLabel(): string {
    return this.category.charAt(0).toUpperCase() + this.category.slice(1);
  }

  containsLetter(letter: string, language: 'en' | 'es'): boolean {
    return this.getWordByLanguage(language).includes(letter.toUpperCase());
  }

  getUniqueLetters(language: 'en' | 'es'): string[] {
    return [...new Set(this.getWordByLanguage(language).split(''))];
  }

  // Validation
  isValid(): boolean {
    return (
      this.wordEn.length >= 4 &&
      this.wordEn.length <= 12 &&
      this.wordEs.length >= 4 &&
      this.wordEs.length <= 12
    );
  }
}
