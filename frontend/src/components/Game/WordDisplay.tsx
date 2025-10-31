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
    <div className="flex flex-col items-center gap-4 mb-8">
      <h2 className="text-lg font-semibold text-gray-700">
        {t('game.guessTheWord')}
      </h2>

      <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
        {letters.map((letter, index) => (
          <div
            key={index}
            className={`
              w-12 h-16 flex items-center justify-center
              border-b-4 text-3xl font-bold
              transition-all duration-300
              ${
                letter === '_'
                  ? 'border-gray-300 text-gray-300'
                  : isGameOver
                  ? isWon
                    ? 'border-success text-success animate-bounce'
                    : 'border-danger text-danger'
                  : 'border-primary text-primary animate-slideUp'
              }
            `}
          >
            {letter}
          </div>
        ))}
      </div>

      {isGameOver && (
        <div
          className={`
            mt-4 px-6 py-3 rounded-lg font-bold text-lg
            animate-fadeIn
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
