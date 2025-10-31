import { Word } from '../../core/domain/entities/Word';
import { WordDTO } from '../../core/domain/dto/WordDTO';

export class WordMapper {
  /**
   * Convert domain Word entity to DTO (without revealing the word text)
   */
  static toDTO(word: Word, language: 'en' | 'es' = 'en'): WordDTO {
    return {
      id: word.id,
      category: word.category,
      difficulty: word.difficulty,
      difficultyLabel: word.getDifficultyLabel(),
      categoryLabel: word.getCategoryLabel(),
      length: word.getLength(language),
      usageCount: word.usageCount,
    };
  }

  /**
   * Convert multiple words to DTOs
   */
  static toDTOList(words: Word[], language: 'en' | 'es' = 'en'): WordDTO[] {
    return words.map((word) => this.toDTO(word, language));
  }
}
