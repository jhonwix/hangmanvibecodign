import { useState, useEffect } from 'react'

type Breakpoint = 'mobile' | 'tablet' | 'desktop'

interface UseResponsiveReturn {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  breakpoint: Breakpoint
  windowWidth: number
}

export const useResponsive = (): UseResponsiveReturn => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // Initial call
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Tailwind breakpoints: sm: 640px, md: 768px, lg: 1024px
  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth < 1024
  const isDesktop = windowWidth >= 1024

  const breakpoint: Breakpoint = isMobile
    ? 'mobile'
    : isTablet
    ? 'tablet'
    : 'desktop'

  return {
    isMobile,
    isTablet,
    isDesktop,
    breakpoint,
    windowWidth,
  }
}
