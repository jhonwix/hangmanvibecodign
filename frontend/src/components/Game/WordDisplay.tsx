import React from 'react'
import { useTranslation } from 'react-i18next'

interface WordDisplayProps {
  hiddenWord: string
  isGameOver: boolean
  isWon: boolean
}

export const WordDisplay: React.FC<WordDisplayProps> = ({
  hiddenWord,
  isGameOver,
  isWon,
}) => {
  const { t } = useTranslation()

  const letters = hiddenWord.split(' ')

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
      <h2 className="text-base sm:text-lg font-semibold text-gray-700">
        {t('game.guessTheWord')}
      </h2>

      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-2xl px-2">
        {letters.map((letter, index) => (
          <div
            key={index}
            className={`
              w-9 h-12 sm:w-12 sm:h-16 flex items-center justify-center
              border-b-4 text-2xl sm:text-3xl font-bold
              transition-all duration-300
              ${
                letter === '_'
                  ? 'border-gray-300 text-gray-300'
                  : isGameOver
                  ? isWon
                    ? 'border-success text-success animation-celebration'
                    : 'border-danger text-danger animation-wiggle'
                  : 'border-primary text-primary animation-pop'
              }
            `}
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            {letter}
          </div>
        ))}
      </div>

      {isGameOver && (
        <div
          className={`
            mt-2 sm:mt-4 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-bold text-base sm:text-lg
            animate-fadeIn shadow-md
            ${
              isWon
                ? 'bg-success/10 text-success border-2 border-success'
                : 'bg-danger/10 text-danger border-2 border-danger'
            }
          `}
        >
          {isWon ? t('game.gameWon') : t('game.gameLost')}
        </div>
      )}
    </div>
  )
}
