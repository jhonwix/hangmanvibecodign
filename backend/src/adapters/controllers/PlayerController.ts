import { Request, Response, NextFunction } from 'express';
import { PostgresPlayerRepository } from '../repositories/PostgresPlayerRepository';
import { PlayerMapper } from '../mappers/PlayerMapper';
import { Player } from '../../core/domain/entities/Player';
import { NotFoundError, DuplicateError, ValidationError } from '../errors/CustomErrors';

export class PlayerController {
  private playerRepository: PostgresPlayerRepository;

  constructor() {
    this.playerRepository = new PostgresPlayerRepository();
  }

  /**
   * POST /api/players
   * Create a new player
   */
  async createPlayer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, email } = req.body;

      if (!username || username.length < 3) {
        throw new ValidationError('Username must be at least 3 characters');
      }

      // Check if username already exists
      const existingPlayer = await this.playerRepository.findByUsername(username);
      if (existingPlayer) {
        throw new DuplicateError('Player', 'username', username);
      }

      // Check if email already exists
      if (email) {
        const existingEmail = await this.playerRepository.findByEmail(email);
        if (existingEmail) {
          throw new DuplicateError('Player', 'email', email);
        }
      }

      // Create new player
      const newPlayer = new Player(
        0,
        username,
        email || null,
        0,
        0,
        new Date()
      );

      const savedPlayer = await this.playerRepository.save(newPlayer);
      const playerDTO = PlayerMapper.toDTO(savedPlayer);

      res.status(201).json({
        success: true,
        data: playerDTO,
        message: 'Player created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/players/:id
   * Get player by ID
   */
  async getPlayer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const playerId = parseInt(req.params.id);

      if (isNaN(playerId)) {
        throw new ValidationError('Invalid player ID');
      }

      const player = await this.playerRepository.findById(playerId);

      if (!player) {
        throw new NotFoundError('Player', playerId);
      }

      const playerDTO = PlayerMapper.toDTO(player);

      res.status(200).json({
        success: true,
        data: playerDTO,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/players/:id/stats
   * Get player statistics
   */
  async getPlayerStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const playerId = parseInt(req.params.id);

      if (isNaN(playerId)) {
        throw new ValidationError('Invalid player ID');
      }

      const player = await this.playerRepository.findById(playerId);

      if (!player) {
        throw new NotFoundError('Player', playerId);
      }

      const stats = PlayerMapper.toStatsDTO(player);

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/players
   * Get all players (leaderboard)
   */
  async getAllPlayers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const players = await this.playerRepository.findAll();
      const playerDTOs = PlayerMapper.toDTOList(players);

      res.status(200).json({
        success: true,
        data: playerDTOs,
        count: playerDTOs.length,
      });
    } catch (error) {
      next(error);
    }
  }
}
