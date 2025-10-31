import { Game } from '../../core/domain/entities/Game';

export interface IGameRepository {
  /**
   * Save a game (create or update)
   */
  save(game: Game): Promise<Game>;

  /**
   * Find a game by ID
   */
  findById(id: number): Promise<Game | null>;

  /**
   * Find all active games for a user
   */
  findActiveByUserId(userId: number): Promise<Game[]>;

  /**
   * Find all games for a user
   */
  findByUserId(userId: number): Promise<Game[]>;

  /**
   * Delete a game
   */
  delete(id: number): Promise<boolean>;

  /**
   * Count total games
   */
  count(): Promise<number>;

  /**
   * Get game statistics
   */
  getStatistics(): Promise<{
    totalGames: number;
    activeGames: number;
    wonGames: number;
    lostGames: number;
  }>;
}
