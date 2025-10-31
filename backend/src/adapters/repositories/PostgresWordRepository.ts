import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/database';
import { Word as WordEntity, WordCategory as WordCategoryEntity, WordDifficulty as WordDifficultyEntity } from '../../entities/Word';
import { Word, WordCategory, WordDifficulty } from '../../core/domain/entities/Word';
import { IWordRepository } from '../../ports/repositories/IWordRepository';

export class PostgresWordRepository implements IWordRepository {
  private repository: Repository<WordEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(WordEntity);
  }

  async findById(id: number): Promise<Word | null> {
    const wordEntity = await this.repository.findOne({
      where: { id },
    });

    if (!wordEntity) {
      return null;
    }

    return this.toDomainEntity(wordEntity);
  }

  async findRandom(): Promise<Word | null> {
    // Get total count
    const count = await this.repository.count();
    if (count === 0) {
      return null;
    }

    // Get random offset
    const randomOffset = Math.floor(Math.random() * count);

    // Get random word
    const words = await this.repository.find({
      skip: randomOffset,
      take: 1,
    });

    if (words.length === 0) {
      return null;
    }

    return this.toDomainEntity(words[0]);
  }

  async findRandomByCategory(category: WordCategory): Promise<Word | null> {
    // Get count by category
    const count = await this.repository.count({
      where: { category: this.mapCategoryToOrm(category) },
    });

    if (count === 0) {
      return null;
    }

    // Get random offset
    const randomOffset = Math.floor(Math.random() * count);

    // Get random word by category
    const words = await this.repository.find({
      where: { category: this.mapCategoryToOrm(category) },
      skip: randomOffset,
      take: 1,
    });

    if (words.length === 0) {
      return null;
    }

    return this.toDomainEntity(words[0]);
  }

  async findByCategory(category: WordCategory): Promise<Word[]> {
    const words = await this.repository.find({
      where: { category: this.mapCategoryToOrm(category) },
      order: { usageCount: 'ASC' },
    });

    return words.map((word) => this.toDomainEntity(word));
  }

  async findAll(): Promise<Word[]> {
    const words = await this.repository.find({
      order: { category: 'ASC', difficulty: 'ASC' },
    });

    return words.map((word) => this.toDomainEntity(word));
  }

  async getCategories(): Promise<Array<{ category: string; count: number }>> {
    const result = await this.repository
      .createQueryBuilder('word')
      .select('word.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .groupBy('word.category')
      .getRawMany();

    return result.map((row) => ({
      category: row.category,
      count: parseInt(row.count, 10),
    }));
  }

  async save(word: Word): Promise<Word> {
    const wordEntity = this.toOrmEntity(word);
    const saved = await this.repository.save(wordEntity);
    return this.toDomainEntity(saved);
  }

  async count(): Promise<number> {
    return await this.repository.count();
  }

  // Mapper methods
  private toDomainEntity(ormEntity: WordEntity): Word {
    return new Word(
      ormEntity.id,
      ormEntity.wordEn,
      ormEntity.wordEs,
      this.mapCategory(ormEntity.category),
      this.mapDifficulty(ormEntity.difficulty),
      ormEntity.usageCount
    );
  }

  private toOrmEntity(domainEntity: Word): WordEntity {
    const wordEntity = new WordEntity();

    if (domainEntity.id > 0) {
      wordEntity.id = domainEntity.id;
    }

    wordEntity.wordEn = domainEntity.wordEn;
    wordEntity.wordEs = domainEntity.wordEs;
    wordEntity.category = this.mapCategoryToOrm(domainEntity.category);
    wordEntity.difficulty = this.mapDifficultyToOrm(domainEntity.difficulty);
    wordEntity.usageCount = domainEntity.usageCount;

    return wordEntity;
  }

  private mapCategory(ormCategory: WordCategoryEntity): WordCategory {
    switch (ormCategory) {
      case WordCategoryEntity.ANIMALS:
        return WordCategory.ANIMALS;
      case WordCategoryEntity.OBJECTS:
        return WordCategory.OBJECTS;
      case WordCategoryEntity.FRUITS:
        return WordCategory.FRUITS;
      case WordCategoryEntity.COUNTRIES:
        return WordCategory.COUNTRIES;
      case WordCategoryEntity.MOVIES:
        return WordCategory.MOVIES;
      default:
        return WordCategory.OBJECTS;
    }
  }

  private mapCategoryToOrm(domainCategory: WordCategory): WordCategoryEntity {
    switch (domainCategory) {
      case WordCategory.ANIMALS:
        return WordCategoryEntity.ANIMALS;
      case WordCategory.OBJECTS:
        return WordCategoryEntity.OBJECTS;
      case WordCategory.FRUITS:
        return WordCategoryEntity.FRUITS;
      case WordCategory.COUNTRIES:
        return WordCategoryEntity.COUNTRIES;
      case WordCategory.MOVIES:
        return WordCategoryEntity.MOVIES;
      default:
        return WordCategoryEntity.OBJECTS;
    }
  }

  private mapDifficulty(ormDifficulty: number): WordDifficulty {
    switch (ormDifficulty) {
      case 1:
        return WordDifficulty.EASY;
      case 2:
        return WordDifficulty.MEDIUM;
      case 3:
        return WordDifficulty.HARD;
      default:
        return WordDifficulty.MEDIUM;
    }
  }

  private mapDifficultyToOrm(domainDifficulty: WordDifficulty): number {
    switch (domainDifficulty) {
      case WordDifficulty.EASY:
        return 1;
      case WordDifficulty.MEDIUM:
        return 2;
      case WordDifficulty.HARD:
        return 3;
      default:
        return 2;
    }
  }
}
