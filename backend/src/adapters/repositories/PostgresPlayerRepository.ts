import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/database';
import { User as UserEntity } from '../../entities/User';
import { Player } from '../../core/domain/entities/Player';
import { IPlayerRepository } from '../../ports/repositories/IPlayerRepository';

export class PostgresPlayerRepository implements IPlayerRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async save(player: Player): Promise<Player> {
    const userEntity = this.toOrmEntity(player);
    const saved = await this.repository.save(userEntity);
    return this.toDomainEntity(saved);
  }

  async findById(id: number): Promise<Player | null> {
    const userEntity = await this.repository.findOne({
      where: { id },
    });

    if (!userEntity) {
      return null;
    }

    return this.toDomainEntity(userEntity);
  }

  async findByUsername(username: string): Promise<Player | null> {
    const userEntity = await this.repository.findOne({
      where: { username },
    });

    if (!userEntity) {
      return null;
    }

    return this.toDomainEntity(userEntity);
  }

  async findByEmail(email: string): Promise<Player | null> {
    const userEntity = await this.repository.findOne({
      where: { email },
    });

    if (!userEntity) {
      return null;
    }

    return this.toDomainEntity(userEntity);
  }

  async updateStats(id: number, wins: number, losses: number): Promise<boolean> {
    const result = await this.repository.update(id, {
      statsWins: wins,
      statsLosses: losses,
    });

    return (result.affected ?? 0) > 0;
  }

  async findAll(): Promise<Player[]> {
    const users = await this.repository.find({
      order: {
        statsWins: 'DESC',
        createdAt: 'DESC',
      },
    });

    return users.map((user) => this.toDomainEntity(user));
  }

  async count(): Promise<number> {
    return await this.repository.count();
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  // Mapper methods
  private toDomainEntity(ormEntity: UserEntity): Player {
    return new Player(
      ormEntity.id,
      ormEntity.username,
      ormEntity.email ?? null,
      ormEntity.statsWins,
      ormEntity.statsLosses,
      ormEntity.createdAt
    );
  }

  private toOrmEntity(domainEntity: Player): UserEntity {
    const userEntity = new UserEntity();

    if (domainEntity.id > 0) {
      userEntity.id = domainEntity.id;
    }

    userEntity.username = domainEntity.username;
    userEntity.email = domainEntity.email ?? undefined;
    userEntity.statsWins = domainEntity.statsWins;
    userEntity.statsLosses = domainEntity.statsLosses;
    userEntity.createdAt = domainEntity.createdAt;

    return userEntity;
  }
}
