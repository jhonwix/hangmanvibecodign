import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface UseLanguageReturn {
  language: string
  changeLanguage: (lang: string) => void
  t: (key: string, options?: any) => string
  languages: Array<{ code: string; label: string }>
}

export const useLanguage = (): UseLanguageReturn => {
  const { i18n, t } = useTranslation()

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
  ]

  const changeLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang)
      localStorage.setItem('i18nextLng', lang)
    },
    [i18n]
  )

  return {
    language: i18n.language,
    changeLanguage,
    t,
    languages,
  }
}
