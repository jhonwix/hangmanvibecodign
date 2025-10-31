import { Game } from '../../core/domain/entities/Game';
import { Word } from '../../core/domain/entities/Word';
import { GameDTO } from '../../core/domain/dto/GameDTO';

export class GameMapper {
  /**
   * Convert domain Game entity to DTO
   */
  static toDTO(game: Game, word: Word): GameDTO {
    const wordText = word.getWordByLanguage(game.language as 'en' | 'es');
    const hiddenWord = game.getHiddenWord(wordText);

    return {
      id: game.id,
      userId: game.userId,
      wordId: game.wordId,
      status: game.status,
      hiddenWord,
      guessedLetters: game.guessedLetters,
      incorrectCount: game.incorrectCount,
      attemptsRemaining: game.attemptsRemaining,
      language: game.language,
      category: word.getCategoryLabel(),
      difficulty: word.getDifficultyLabel(),
      startedAt: game.startedAt,
      endedAt: game.endedAt,
      word: game.isGameOver() ? wordText : undefined,
      duration: game.getDuration() ?? undefined,
    };
  }

  /**
   * Convert domain Game entity to simplified state DTO
   */
  static toStateDTO(game: Game, word: Word) {
    const wordText = word.getWordByLanguage(game.language as 'en' | 'es');
    const hiddenWord = game.getHiddenWord(wordText);

    return {
      gameId: game.id,
      status: game.status,
      hiddenWord,
      guessedLetters: game.guessedLetters,
      incorrectCount: game.incorrectCount,
      attemptsRemaining: game.attemptsRemaining,
      isGameOver: game.isGameOver(),
      isWon: game.isWon(),
      word: game.isGameOver() ? wordText : undefined,
    };
  }
}
