import React from 'react'

interface HangmanDrawingProps {
  incorrectCount: number
}

export const HangmanDrawing: React.FC<HangmanDrawingProps> = ({
  incorrectCount,
}) => {
  const bodyParts = [
    // Head
    <circle
      key="head"
      cx="140"
      cy="70"
      r="20"
      className="stroke-danger fill-none animate-fadeIn"
      strokeWidth="3"
    />,
    // Body
    <line
      key="body"
      x1="140"
      y1="90"
      x2="140"
      y2="140"
      className="stroke-danger animate-fadeIn"
      strokeWidth="3"
    />,
    // Left arm
    <line
      key="left-arm"
      x1="140"
      y1="105"
      x2="115"
      y2="125"
      className="stroke-danger animate-fadeIn"
      strokeWidth="3"
    />,
    // Right arm
    <line
      key="right-arm"
      x1="140"
      y1="105"
      x2="165"
      y2="125"
      className="stroke-danger animate-fadeIn"
      strokeWidth="3"
    />,
    // Left leg
    <line
      key="left-leg"
      x1="140"
      y1="140"
      x2="120"
      y2="170"
      className="stroke-danger animate-fadeIn"
      strokeWidth="3"
    />,
    // Right leg
    <line
      key="right-leg"
      x1="140"
      y1="140"
      x2="160"
      y2="170"
      className="stroke-danger animate-fadeIn"
      strokeWidth="3"
    />,
  ]

  return (
    <div className="flex justify-center items-center mb-8">
      <svg
        width="250"
        height="250"
        viewBox="0 0 250 250"
        className="max-w-full h-auto"
        aria-label={`Hangman figure showing ${incorrectCount} incorrect guesses`}
      >
        {/* Gallows base */}
        <line
          x1="20"
          y1="230"
          x2="180"
          y2="230"
          className="stroke-gray-700"
          strokeWidth="4"
        />
        {/* Gallows vertical pole */}
        <line
          x1="60"
          y1="230"
          x2="60"
          y2="20"
          className="stroke-gray-700"
          strokeWidth="4"
        />
        {/* Gallows horizontal pole */}
        <line
          x1="60"
          y1="20"
          x2="140"
          y2="20"
          className="stroke-gray-700"
          strokeWidth="4"
        />
        {/* Gallows rope */}
        <line
          x1="140"
          y1="20"
          x2="140"
          y2="50"
          className="stroke-gray-700"
          strokeWidth="3"
        />

        {/* Body parts (rendered based on incorrect count) */}
        {bodyParts.slice(0, incorrectCount)}
      </svg>
    </div>
  )
}
