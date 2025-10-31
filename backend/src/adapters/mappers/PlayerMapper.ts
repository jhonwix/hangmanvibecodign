import { Player } from '../../core/domain/entities/Player';
import { PlayerDTO, PlayerStatsDTO } from '../../core/domain/dto/PlayerDTO';

export class PlayerMapper {
  /**
   * Convert domain Player entity to DTO
   */
  static toDTO(player: Player): PlayerDTO {
    return {
      id: player.id,
      username: player.username,
      email: player.email,
      stats: this.toStatsDTO(player),
      createdAt: player.createdAt,
    };
  }

  /**
   * Convert player stats to DTO
   */
  static toStatsDTO(player: Player): PlayerStatsDTO {
    return {
      wins: player.statsWins,
      losses: player.statsLosses,
      totalGames: player.getTotalGames(),
      winRate: player.getWinRate(),
      lossRate: player.getLossRate(),
    };
  }

  /**
   * Convert multiple players to DTOs
   */
  static toDTOList(players: Player[]): PlayerDTO[] {
    return players.map((player) => this.toDTO(player));
  }
}
