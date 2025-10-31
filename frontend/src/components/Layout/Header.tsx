import React from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@components/Common/LanguageSwitcher'

export const Header: React.FC = () => {
  const { t } = useTranslation()

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {t('game.title')}
              </h1>
              <p className="text-xs text-gray-500">{t('game.subtitle')}</p>
            </div>
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
