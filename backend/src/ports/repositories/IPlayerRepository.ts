import { Player } from '../../core/domain/entities/Player';

export interface IPlayerRepository {
  /**
   * Save a player (create or update)
   */
  save(player: Player): Promise<Player>;

  /**
   * Find a player by ID
   */
  findById(id: number): Promise<Player | null>;

  /**
   * Find a player by username
   */
  findByUsername(username: string): Promise<Player | null>;

  /**
   * Find a player by email
   */
  findByEmail(email: string): Promise<Player | null>;

  /**
   * Update player statistics
   */
  updateStats(id: number, wins: number, losses: number): Promise<boolean>;

  /**
   * Get all players
   */
  findAll(): Promise<Player[]>;

  /**
   * Count total players
   */
  count(): Promise<number>;

  /**
   * Delete a player
   */
  delete(id: number): Promise<boolean>;
}
