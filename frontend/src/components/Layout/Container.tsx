import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <main
      className={`
        container mx-auto px-4 py-8
        min-h-[calc(100vh-200px)]
        ${className}
      `}
    >
      {children}
    </main>
  )
}
