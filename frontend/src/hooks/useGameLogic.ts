import { useState, useCallback } from 'react'
import { apiService } from '@services/api'
import { GameState, GuessResult, GameStatus } from '@/types/game.types'

interface UseGameLogicReturn {
  game: GameState | null
  loading: boolean
  error: string | null
  startNewGame: (options?: {
    userId?: number
    wordCategory?: string
    language?: 'en' | 'es'
  }) => Promise<void>
  guessLetter: (letter: string) => Promise<GuessResult | null>
  surrender: () => Promise<void>
  resetError: () => void
}

export const useGameLogic = (): UseGameLogicReturn => {
  const [game, setGame] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startNewGame = useCallback(
    async (options?: {
      userId?: number
      wordCategory?: string
      language?: 'en' | 'es'
    }) => {
      try {
        setLoading(true)
        setError(null)

        const gameData = await apiService.startGame(options)
        setGame(gameData)
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to start game'
        setError(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const guessLetter = useCallback(
    async (letter: string): Promise<GuessResult | null> => {
      if (!game || game.status !== GameStatus.ACTIVE) {
        setError('Cannot guess letter: game is not active')
        return null
      }

      try {
        setLoading(true)
        setError(null)

        const result = await apiService.guessLetter(game.id, letter)

        // Update local game state
        const wordArray = game.word?.toUpperCase().split('') || []
        const newHiddenWord = game.hiddenWord
          .split(' ')
          .map((char, idx) => {
            if (wordArray[idx] === letter.toUpperCase()) {
              return letter.toUpperCase()
            }
            return char
          })
          .join(' ')

        const updatedGame: GameState = {
          ...game,
          guessedLetters: [...game.guessedLetters, letter.toUpperCase()],
          incorrectCount: result.correct
            ? game.incorrectCount
            : game.incorrectCount + 1,
          attemptsRemaining: result.correct
            ? game.attemptsRemaining
            : game.attemptsRemaining - 1,
          hiddenWord: result.correct ? newHiddenWord : game.hiddenWord,
          status: result.isGameOver
            ? result.isWon
              ? GameStatus.WON
              : GameStatus.LOST
            : GameStatus.ACTIVE,
        }

        setGame(updatedGame)
        return result
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to guess letter'
        setError(errorMessage)
        return null
      } finally {
        setLoading(false)
      }
    },
    [game]
  )

  const surrender = useCallback(async () => {
    if (!game) return

    try {
      setLoading(true)
      setError(null)

      await apiService.surrender(game.id)

      setGame({
        ...game,
        status: GameStatus.LOST,
      })
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to surrender game'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [game])

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  return {
    game,
    loading,
    error,
    startNewGame,
    guessLetter,
    surrender,
    resetError,
  }
}
