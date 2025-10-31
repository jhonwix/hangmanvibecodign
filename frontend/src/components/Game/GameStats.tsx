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
    <div className="mb-6 space-y-3">
      {/* Compact Mobile Stats - Horizontal Layout */}
      <div className="flex items-stretch gap-2 sm:gap-4">
        {/* Attempts Remaining - Emphasize most important stat */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-3 sm:p-4 border-t-4 border-primary">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              <div className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1 font-medium">
                {t('game.attemptsLeft')}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary tabular-nums">
                {attemptsRemaining}
                <span className="text-sm sm:text-lg text-gray-400 ml-0.5">/{maxAttempts}</span>
              </div>
            </div>
            {/* Visual heart icons */}
            <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-1">
              {[...Array(maxAttempts)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${
                    i < attemptsRemaining
                      ? attemptsRemaining > 3
                        ? 'bg-success'
                        : attemptsRemaining > 1
                        ? 'bg-warning'
                        : 'bg-danger'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
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

        {/* Incorrect Guesses - Compact */}
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-t-4 border-danger min-w-[80px] sm:min-w-[100px]">
          <div className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1 font-medium">
            {t('game.incorrectGuesses')}
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-danger tabular-nums">
            {incorrectCount}
          </div>
        </div>
      </div>

      {/* Letters Guessed - Full width row for better readability */}
      {guessedLetters.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-t-4 border-gray-300">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="text-xs sm:text-sm text-gray-600 font-medium">
              {t('game.lettersGuessed')}
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-700 tabular-nums">
              {guessedLetters.length}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {guessedLetters.map((letter, idx) => (
              <span
                key={idx}
                className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 text-gray-700 font-bold text-sm sm:text-base rounded-lg border border-gray-300 font-mono"
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
