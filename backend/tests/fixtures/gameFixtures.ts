import { Game, GameStatus } from '../../src/core/domain/entities/Game';
import { Word, WordCategory, WordDifficulty } from '../../src/core/domain/entities/Word';
import { Player } from '../../src/core/domain/entities/Player';

export class GameFixtures {
  static createMockWord(overrides?: Partial<Word>): Word {
    return new Word(
      overrides?.id || 1,
      overrides?.wordEn || 'LION',
      overrides?.wordEs || 'LEON',
      overrides?.category || WordCategory.ANIMALS,
      overrides?.difficulty || WordDifficulty.EASY,
      overrides?.usageCount || 0
    );
  }

  static createMockGame(overrides?: Partial<Game>): Game {
    const game = Game.create(
      overrides?.id || 1,
      overrides?.wordId || 1,
      overrides?.userId || null,
      overrides?.language || 'en'
    );

    if (overrides?.status) {
      switch (overrides.status) {
        case GameStatus.WON:
          game.markAsWon();
          break;
        case GameStatus.LOST:
          game.markAsLost();
          break;
        case GameStatus.SURRENDERED:
          game.markAsSurrendered();
          break;
      }
    }

    return game;
  }

  static createMockPlayer(overrides?: Partial<Player>): Player {
    return new Player(
      overrides?.id || 1,
      overrides?.username || 'testplayer',
      overrides?.email || 'test@example.com',
      overrides?.statsWins || 0,
      overrides?.statsLosses || 0,
      overrides?.createdAt || new Date()
    );
  }
}
