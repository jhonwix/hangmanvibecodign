import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/database';
import { Game as GameEntity, GameStatus as GameStatusEntity } from '../../entities/Game';
import { Game, GameStatus } from '../../core/domain/entities/Game';
import { IGameRepository } from '../../ports/repositories/IGameRepository';

export class PostgresGameRepository implements IGameRepository {
  private repository: Repository<GameEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(GameEntity);
  }

  async save(game: Game): Promise<Game> {
    // Convert domain entity to ORM entity
    const gameEntity = this.toOrmEntity(game);

    // Save to database
    const saved = await this.repository.save(gameEntity);

    // Convert back to domain entity
    return this.toDomainEntity(saved);
  }

  async findById(id: number): Promise<Game | null> {
    const gameEntity = await this.repository.findOne({
      where: { id },
      relations: ['word', 'user'],
    });

    if (!gameEntity) {
      return null;
    }

    return this.toDomainEntity(gameEntity);
  }

  async findActiveByUserId(userId: number): Promise<Game[]> {
    const games = await this.repository.find({
      where: {
        userId,
        status: GameStatusEntity.ACTIVE,
      },
      relations: ['word'],
      order: {
        startedAt: 'DESC',
      },
    });

    return games.map((game) => this.toDomainEntity(game));
  }

  async findByUserId(userId: number): Promise<Game[]> {
    const games = await this.repository.find({
      where: { userId },
      relations: ['word'],
      order: {
        startedAt: 'DESC',
      },
    });

    return games.map((game) => this.toDomainEntity(game));
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async count(): Promise<number> {
    return await this.repository.count();
  }

  async getStatistics(): Promise<{
    totalGames: number;
    activeGames: number;
    wonGames: number;
    lostGames: number;
  }> {
    const totalGames = await this.repository.count();
    const activeGames = await this.repository.count({
      where: { status: GameStatusEntity.ACTIVE },
    });
    const wonGames = await this.repository.count({
      where: { status: GameStatusEntity.WON },
    });
    const lostGames = await this.repository.count({
      where: { status: GameStatusEntity.LOST },
    });

    return {
      totalGames,
      activeGames,
      wonGames,
      lostGames,
    };
  }

  // Mapper methods
  private toDomainEntity(ormEntity: GameEntity): Game {
    return new Game(
      ormEntity.id,
      ormEntity.wordId,
      ormEntity.userId ?? null,
      this.mapStatus(ormEntity.status),
      ormEntity.guessedLetters.split('').filter(l => l), // Convert string to array
      ormEntity.incorrectCount,
      ormEntity.attemptsRemaining,
      ormEntity.language,
      ormEntity.startedAt,
      ormEntity.endedAt
    );
  }

  private toOrmEntity(domainEntity: Game): GameEntity {
    const gameEntity = new GameEntity();

    if (domainEntity.id > 0) {
      gameEntity.id = domainEntity.id;
    }

    gameEntity.wordId = domainEntity.wordId;
    gameEntity.userId = domainEntity.userId ?? undefined;
    gameEntity.status = this.mapStatusToOrm(domainEntity.status);
    gameEntity.guessedLetters = domainEntity.guessedLetters.join(''); // Convert array to string
    gameEntity.incorrectCount = domainEntity.incorrectCount;
    gameEntity.attemptsRemaining = domainEntity.attemptsRemaining;
    gameEntity.language = domainEntity.language;
    gameEntity.startedAt = domainEntity.startedAt;
    gameEntity.endedAt = domainEntity.endedAt;

    return gameEntity;
  }

  private mapStatus(ormStatus: GameStatusEntity): GameStatus {
    switch (ormStatus) {
      case GameStatusEntity.ACTIVE:
        return GameStatus.ACTIVE;
      case GameStatusEntity.WON:
        return GameStatus.WON;
      case GameStatusEntity.LOST:
        return GameStatus.LOST;
      case GameStatusEntity.SURRENDERED:
        return GameStatus.SURRENDERED;
      default:
        return GameStatus.ACTIVE;
    }
  }

  private mapStatusToOrm(domainStatus: GameStatus): GameStatusEntity {
    switch (domainStatus) {
      case GameStatus.ACTIVE:
        return GameStatusEntity.ACTIVE;
      case GameStatus.WON:
        return GameStatusEntity.WON;
      case GameStatus.LOST:
        return GameStatusEntity.LOST;
      case GameStatus.SURRENDERED:
        return GameStatusEntity.SURRENDERED;
      default:
        return GameStatusEntity.ACTIVE;
    }
  }
}
