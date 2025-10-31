import React, { useState } from 'react'

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
  const [clickedLetter, setClickedLetter] = useState<string | null>(null)

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const isLetterGuessed = (letter: string) => {
    return guessedLetters.includes(letter)
  }

  const handleClick = (letter: string) => {
    setClickedLetter(letter)
    onLetterClick(letter)

    // Reset animation after it completes
    setTimeout(() => setClickedLetter(null), 300)
  }

  // Split alphabet into rows for QWERTY-like mobile keyboard layout
  const row1 = 'QWERTYUIOP'.split('')
  const row2 = 'ASDFGHJKL'.split('')
  const row3 = 'ZXCVBNM'.split('')

  const renderButton = (letter: string) => {
    const guessed = isLetterGuessed(letter)
    const isAnimating = clickedLetter === letter

    return (
      <button
        key={letter}
        onClick={() => handleClick(letter)}
        disabled={disabled || guessed}
        className={`
          flex-1 min-w-[32px] max-w-[48px] h-11 sm:h-12
          rounded-lg font-bold text-sm sm:text-base
          transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-primary/50
          touch-manipulation select-none
          ${isAnimating ? 'animation-pop' : ''}
          ${
            guessed
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60 scale-90'
              : disabled
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-primary text-white active:bg-primary/80 shadow-sm active:shadow-none hover:bg-primary/90'
          }
        `}
        aria-label={`Letter ${letter}`}
        aria-pressed={guessed}
      >
        {letter}
      </button>
    )
  }

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2 mb-6 w-full max-w-2xl mx-auto px-2 sm:px-4">
      {/* Row 1: Q-P */}
      <div className="flex gap-1 sm:gap-1.5 w-full justify-center">
        {row1.map(renderButton)}
      </div>

      {/* Row 2: A-L */}
      <div className="flex gap-1 sm:gap-1.5 w-full justify-center px-2 sm:px-4">
        {row2.map(renderButton)}
      </div>

      {/* Row 3: Z-M */}
      <div className="flex gap-1 sm:gap-1.5 w-full justify-center px-4 sm:px-8">
        {row3.map(renderButton)}
      </div>
    </div>
  )
}
