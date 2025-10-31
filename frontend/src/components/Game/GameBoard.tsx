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
  const [lastGuessCorrect, setLastGuessCorrect] = useState<boolean | null>(null)

  // Start a new game
  const startNewGame = async () => {
    try {
      setLoading(true)
      setError(null)
      setShowGameOver(false)

      // Normalize language to 'en' or 'es' (handle cases like 'es-US', 'en-GB')
      const browserLang = localStorage.getItem('i18nextLng') || 'en'
      const normalizedLang = browserLang.startsWith('es') ? 'es' : 'en'

      const gameData = await apiService.startGame({
        language: normalizedLang,
      })

      console.log('🎮 Game object received:', gameData)
      console.log('🎮 Game ID:', gameData?.id)
      console.log('🎮 Game status:', gameData?.status)
      console.log('🎮 Game status type:', typeof gameData?.status)
      console.log('🎮 GameStatus.ACTIVE value:', GameStatus.ACTIVE)

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
    console.log('🔤 Letter clicked:', letter)
    console.log('🔤 Game state:', game)
    console.log('🔤 Game status:', game?.status)
    console.log('🔤 Guard check - game exists:', !!game)
    console.log('🔤 Guard check - status is ACTIVE:', game?.status === GameStatus.ACTIVE)

    if (!game || game.status !== GameStatus.ACTIVE) {
      console.log('❌ Guard clause blocked execution')
      return
    }

    console.log('✅ Proceeding with guess...')

    try {
      setLoading(true)
      setError(null)

      const result: GuessResult = await apiService.guessLetter(game.id, letter)

      console.log('📥 Guess result from backend:', result)

      // Set animation feedback
      setLastGuessCorrect(result.correct)
      setTimeout(() => setLastGuessCorrect(null), 600)

      // Update game state with the result from backend
      const updatedGame: GameState = {
        ...game,
        hiddenWord: result.hiddenWord,
        guessedLetters: result.guessedLetters,
        incorrectCount: result.incorrectCount,
        attemptsRemaining: result.attemptsRemaining,
        status: result.status,
        word: result.word || game.word,
      }

      console.log('🔄 Updated game state:', updatedGame)

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
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
      {/* Header with New Game button */}
      <div className="flex justify-between items-center mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          {t('game.title')}
        </h1>
        <button
          onClick={startNewGame}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base
                   hover:bg-primary/90 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-primary/50
                   active:scale-95 touch-manipulation shadow-sm"
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

      {/* Word Display with feedback animation */}
      <div
        className={`
          transition-all duration-300 rounded-2xl
          ${lastGuessCorrect === true ? 'animation-flash-correct' : ''}
          ${lastGuessCorrect === false ? 'animation-flash-wrong' : ''}
        `}
      >
        <WordDisplay
          hiddenWord={game.hiddenWord}
          isGameOver={isGameOver}
          isWon={isWon}
        />
      </div>

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
