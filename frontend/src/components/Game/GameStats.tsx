import React from 'react'
import { useTranslation } from 'react-i18next'

interface GameStatsProps {
  attemptsRemaining: number
  incorrectCount: number
  guessedLetters: string[]
}

export const GameStats: React.FC<GameStatsProps> = ({
  attemptsRemaining,
  incorrectCount,
  guessedLetters,
}) => {
  const { t } = useTranslation()

  const maxAttempts = 6

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {/* Attempts Remaining */}
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-primary">
        <div className="text-sm text-gray-600 mb-1">
          {t('game.attemptsLeft')}
        </div>
        <div className="text-3xl font-bold text-primary">
          {attemptsRemaining}
          <span className="text-lg text-gray-400">/{maxAttempts}</span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              attemptsRemaining > 3
                ? 'bg-success'
                : attemptsRemaining > 1
                ? 'bg-warning'
                : 'bg-danger'
            }`}
            style={{ width: `${(attemptsRemaining / maxAttempts) * 100}%` }}
          />
        </div>
      </div>

      {/* Incorrect Guesses */}
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-danger">
        <div className="text-sm text-gray-600 mb-1">
          {t('game.incorrectGuesses')}
        </div>
        <div className="text-3xl font-bold text-danger">
          {incorrectCount}
        </div>
      </div>

      {/* Letters Guessed */}
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-gray-400">
        <div className="text-sm text-gray-600 mb-1">
          {t('game.lettersGuessed')}
        </div>
        <div className="text-3xl font-bold text-gray-700">
          {guessedLetters.length}
        </div>
        {guessedLetters.length > 0 && (
          <div className="mt-2 text-xs text-gray-500 font-mono">
            {guessedLetters.join(', ')}
          </div>
        )}
      </div>
    </div>
  )
}
