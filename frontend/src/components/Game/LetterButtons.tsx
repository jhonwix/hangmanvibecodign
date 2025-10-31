import React from 'react'

interface LetterButtonsProps {
  guessedLetters: string[]
  onLetterClick: (letter: string) => void
  disabled: boolean
}

export const LetterButtons: React.FC<LetterButtonsProps> = ({
  guessedLetters,
  onLetterClick,
  disabled,
}) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const isLetterGuessed = (letter: string) => {
    return guessedLetters.includes(letter)
  }

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-13 gap-2 max-w-4xl">
        {alphabet.map((letter) => {
          const guessed = isLetterGuessed(letter)

          return (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              disabled={disabled || guessed}
              className={`
                w-10 h-10 sm:w-12 sm:h-12
                rounded-lg font-bold text-sm sm:text-base
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-primary/50
                ${
                  guessed
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed scale-90'
                    : disabled
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg'
                }
              `}
              aria-label={`Letter ${letter}`}
              aria-pressed={guessed}
            >
              {letter}
            </button>
          )
        })}
      </div>
    </div>
  )
}
