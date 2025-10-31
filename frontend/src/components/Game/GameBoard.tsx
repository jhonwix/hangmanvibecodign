import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { WordDisplay } from './WordDisplay'
import { LetterButtons } from './LetterButtons'
import { HangmanDrawing } from './HangmanDrawing'
import { GameStats } from './GameStats'
import { GameOver } from './GameOver'
import { apiService } from '@services/api'
import { GameState, GuessResult, GameStatus } from '@/types/game.types'

export const GameBoard: React.FC = () => {
  const { t } = useTranslation()
  const [game, setGame] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showGameOver, setShowGameOver] = useState(false)

  // Start a new game
  const startNewGame = async () => {
    try {
      setLoading(true)
      setError(null)
      setShowGameOver(false)

      const gameData = await apiService.startGame({
        language: localStorage.getItem('i18nextLng') as 'en' | 'es' || 'en',
      })

      setGame(gameData)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errors.failedToStartGame'))
      console.error('Failed to start game:', err)
    } finally {
      setLoading(false)
    }
  }

  // Guess a letter
  const handleLetterGuess = async (letter: string) => {
    if (!game || game.status !== GameStatus.ACTIVE) return

    try {
      setLoading(true)
      setError(null)

      const result: GuessResult = await apiService.guessLetter(game.id, letter)

      // Update game state with the result
      const updatedGame: GameState = {
        ...game,
        guessedLetters: [...game.guessedLetters, letter],
        incorrectCount: result.correct ? game.incorrectCount : game.incorrectCount + 1,
        attemptsRemaining: result.correct ? game.attemptsRemaining : game.attemptsRemaining - 1,
        hiddenWord: result.correct
          ? game.hiddenWord.split(' ').map((char, idx) => {
              const wordArray = game.word?.toUpperCase().split('') || []
              return wordArray[idx] === letter ? letter : char
            }).join(' ')
          : game.hiddenWord,
        status: result.isGameOver ? (result.isWon ? GameStatus.WON : GameStatus.LOST) : GameStatus.ACTIVE,
      }

      setGame(updatedGame)

      // Show game over modal if game ended
      if (result.isGameOver) {
        setTimeout(() => setShowGameOver(true), 500)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errors.failedToGuessLetter'))
      console.error('Failed to guess letter:', err)
    } finally {
      setLoading(false)
    }
  }

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!game || game.status !== GameStatus.ACTIVE || loading) return

      const letter = event.key.toUpperCase()
      if (/^[A-Z]$/.test(letter) && !game.guessedLetters.includes(letter)) {
        handleLetterGuess(letter)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [game, loading])

  // Initialize game on mount
  useEffect(() => {
    startNewGame()
  }, [])

  if (error && !game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="bg-danger/10 text-danger px-6 py-4 rounded-lg border-2 border-danger mb-4">
          <p className="font-semibold">{t('errors.error')}</p>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={startNewGame}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          {t('game.tryAgain')}
        </button>
      </div>
    )
  }

  if (!game || loading && !game) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">{t('game.loading')}</p>
        </div>
      </div>
    )
  }

  const isGameOver = game.status === GameStatus.WON || game.status === GameStatus.LOST
  const isWon = game.status === GameStatus.WON

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header with New Game button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {t('game.title')}
        </h1>
        <button
          onClick={startNewGame}
          disabled={loading}
          className="bg-primary text-white px-6 py-2 rounded-lg font-semibold
                   hover:bg-primary/90 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-primary/50
                   hover:scale-105 active:scale-95"
        >
          {t('game.newGame')}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-danger/10 text-danger px-4 py-3 rounded-lg border border-danger mb-4 animate-shake">
          {error}
        </div>
      )}

      {/* Game Stats */}
      <GameStats
        attemptsRemaining={game.attemptsRemaining}
        incorrectCount={game.incorrectCount}
        guessedLetters={game.guessedLetters}
      />

      {/* Hangman Drawing */}
      <HangmanDrawing incorrectCount={game.incorrectCount} />

      {/* Word Display */}
      <WordDisplay
        hiddenWord={game.hiddenWord}
        isGameOver={isGameOver}
        isWon={isWon}
      />

      {/* Letter Buttons */}
      <LetterButtons
        guessedLetters={game.guessedLetters}
        onLetterClick={handleLetterGuess}
        disabled={loading || isGameOver}
      />

      {/* Category badge */}
      {game.category && (
        <div className="text-center mt-4">
          <span className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
            {t(`categories.${game.category.toLowerCase()}`)}
          </span>
        </div>
      )}

      {/* Game Over Modal */}
      {showGameOver && isGameOver && (
        <GameOver
          isWon={isWon}
          word={game.word || ''}
          onPlayAgain={startNewGame}
        />
      )}
    </div>
  )
}
