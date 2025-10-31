import React from 'react'
import { useTranslation } from 'react-i18next'

interface GameOverProps {
  isWon: boolean
  word: string
  onPlayAgain: () => void
  onChangeDifficulty?: () => void
}

export const GameOver: React.FC<GameOverProps> = ({
  isWon,
  word,
  onPlayAgain,
  onChangeDifficulty,
}) => {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-slideUp">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          {isWon ? (
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center animate-bounce">
              <svg
                className="w-12 h-12 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-danger/10 flex items-center justify-center animate-shake">
              <svg
                className="w-12 h-12 text-danger"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Title */}
        <h2
          className={`text-3xl font-bold text-center mb-4 ${
            isWon ? 'text-success' : 'text-danger'
          }`}
        >
          {isWon ? t('game.gameWon') : t('game.gameLost')}
        </h2>

        {/* Message */}
        <p className="text-center text-gray-600 mb-2">
          {isWon
            ? t('game.congratulations')
            : t('game.betterLuckNextTime')}
        </p>

        {/* Word reveal */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500 text-center mb-2">
            {isWon ? t('game.theWordWas') : t('game.correctWordWas')}
          </p>
          <p className="text-2xl font-bold text-center text-primary uppercase tracking-wider">
            {word}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onPlayAgain}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold
                     hover:bg-primary/90 transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-primary/50
                     hover:scale-105 active:scale-95 shadow-lg"
          >
            {t('game.playAgain')}
          </button>

          {onChangeDifficulty && (
            <button
              onClick={onChangeDifficulty}
              className="w-full bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold
                       border-2 border-gray-300 hover:border-primary hover:text-primary
                       transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {t('game.changeDifficulty')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
