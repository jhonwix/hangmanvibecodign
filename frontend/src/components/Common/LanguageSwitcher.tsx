import React from 'react'
import { useTranslation } from 'react-i18next'

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
  ]

  const currentLanguage = i18n.language

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
    localStorage.setItem('i18nextLng', langCode)
  }

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`
            px-3 py-1.5 rounded-md font-semibold text-sm
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary/50
            ${
              currentLanguage === lang.code
                ? 'bg-primary text-white shadow-md scale-105'
                : 'bg-transparent text-gray-600 hover:bg-gray-100'
            }
          `}
          aria-label={`Switch to ${lang.label}`}
          aria-pressed={currentLanguage === lang.code}
        >
          <span className="mr-1">{lang.flag}</span>
          {lang.label}
        </button>
      ))}
    </div>
  )
}
