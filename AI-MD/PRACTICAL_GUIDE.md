# 🛠️ GUÍA PRÁCTICA - USO REAL CON CLAUDE CODE

## Instalación Inicial (Una sola vez)

```bash
# 1. Instalar Claude Code CLI (si no lo tienes)
npm install -g claude-code

# 2. Verificar instalación
claude --version

# 3. Verificar que los archivos de contexto existan
ls -la /home/claude/CLAUDE.md
ls -la /home/claude/PROMPTS_HANGMAN.md
ls -la /home/claude/QUICK_START.md
```

---

## Inicio del Proyecto

```bash
# Crear carpeta
mkdir hangman-game
cd hangman-game
git init

# Iniciar Claude Code
claude code
```

**Verás un prompt:** `claude>`

---

## PASO 1: Estructura Inicial - Ejemplo Real

### Comando Exacto a Usar en Claude Code:

```
claude> Referencia: archivo CLAUDE.md

Por favor, crea la estructura COMPLETA del proyecto Hangman:

1. Carpetas:
   - backend/src/{core,adapters,config,middleware,routes}
   - backend/tests/{unit,integration,fixtures}
   - frontend/src/{components,hooks,services,i18n,styles,types}
   - frontend/tests/{components,hooks,services}

2. Archivos package.json:
   - backend/package.json con: Express, TypeORM, TypeScript, Jest, Supertest
   - frontend/package.json con: React, Vite, Tailwind, i18next, Vitest

3. Configuración:
   - tsconfig.json (backend y frontend)
   - .gitignore
   - docker-compose.yml (PostgreSQL 14)
   - .env.example

4. Documentación base:
   - README.md
   - RULES.md

Sigue exactamente la estructura de CLAUDE.md sección "Estructura de Carpetas".
```

### Respuesta que Deberías Ver:

```
✓ Creando estructura...
✓ backend/src/core/domain/entities/
✓ backend/src/core/domain/services/
✓ backend/src/core/usecases/
... (30+ carpetas)
✓ package.json creado (backend)
✓ package.json creado (frontend)
✓ tsconfig.json (backend)
✓ tsconfig.json (frontend)
✓ .gitignore
✓ docker-compose.yml
✓ .env.example
✓ README.md

Estructura creada exitosamente. 47 carpetas y 8 archivos base.
```

### Verificación:

```bash
# En otra terminal, desde hangman-game/
ls -la
# Deberías ver:
# - backend/
# - frontend/
# - docker-compose.yml
# - .env.example
# - README.md
# - RULES.md
```

---

## PASO 2: Base de Datos - Ejemplo Real

### En Claude Code (mismo tab):

```
claude> Consulta CLAUDE.md sección "Esquema PostgreSQL".

Configura la base de datos para Hangman:

1. Instala y configura TypeORM:
   npm install -D typeorm typescript reflect-metadata pg

2. Crea backend/src/config/database.ts:
   - DataSource con configuración PostgreSQL
   - Conexión a localhost:5432
   - Sincronización de esquema

3. Entidades TypeORM (backend/src/adapters/entities/):
   
   User.ts:
   - id: number (PK)
   - username: string (UNIQUE)
   - email: string (UNIQUE)
   - stats_wins: number (default 0)
   - stats_losses: number (default 0)
   - created_at: Date

   Word.ts:
   - id: number (PK)
   - word_en: string
   - word_es: string
   - category: string
   - difficulty: number (1-3)
   - usage_count: number
   - created_at: Date

   Game.ts:
   - id: number (PK)
   - user_id: FK -> User
   - word_id: FK -> Word
   - status: 'active' | 'won' | 'lost'
   - guessed_letters: string
   - incorrect_count: number
   - attempts_remaining: number
   - started_at: Date
   - ended_at: Date | null

   GameHistory.ts:
   - id: number (PK)
   - game_id: FK -> Game
   - letter_guessed: string
   - correct: boolean
   - timestamp: Date

4. Seed Data (backend/src/config/seed.ts):
   Palabras ejemplo:
   - Animales: cat, dog, elephant, tiger, snake
   - Frutas: apple, banana, orange, strawberry, watermelon
   - Países: france, japan, mexico, brazil, spain
   - Objetos: computer, phone, book, chair, table
   - Películas: titanic, inception, avatar, matrix, interstellar

5. Variables .env:
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=hangman_user
   DB_PASSWORD=hangman_pass123
   DB_NAME=hangman_db
   NODE_ENV=development

Crea archivos completos y listos para ejecutar.
```

### Resultado:

```
✓ TypeORM instalado
✓ backend/src/config/database.ts creado
✓ 4 Entidades con decorators
✓ Relaciones configuradas
✓ Seed con 20 palabras en 5 categorías
✓ .env actualizado

Próximo paso: npm install && npm run typeorm:migrate
```

---

## PASO 3: Lógica de Dominio - Ejemplo Real

### En Claude Code:

```
claude> Ejecuta PROMPT 3 de PROMPTS_HANGMAN.md

Implementa la lógica de negocio (Core Hexagonal):

1. ENTIDADES DOMINIO (backend/src/core/domain/entities/):

   Game.ts:
   export class GameEntity {
     private word: WordEntity
     private guessedLetters: Set<string>
     private incorrectCount: number
     private maxAttempts: number = 6

     guessLetter(letter: string): GuessResult {
       // Validar letra no usada
       // Verificar si está en palabra
       // Contar como intento incorrecto si aplica
       // Retornar resultado
     }

     isGameWon(): boolean {
       // Verificar si todas las letras están adivinadas
     }

     isGameLost(): boolean {
       // Verificar si llegó a 6 intentos incorrectos
     }

     getHiddenWord(): string {
       // Retornar palabra con _ en letras no adivinadas
     }
   }

   Word.ts:
   export class WordEntity {
     private wordEn: string
     private wordEs: string
     private category: string

     revealLetter(letter: string): boolean
     allLettersRevealed(guessedLetters: Set<string>): boolean
     getCategory(): string
   }

   Player.ts:
   export class PlayerEntity {
     private wins: number
     private losses: number

     updateStats(gameResult: boolean): void
     getWinRate(): number
   }

2. SERVICIOS DOMINIO (backend/src/core/domain/services/):

   GameService.ts:
   - Orquestar lógica de juego
   - No depende de frameworks
   - Métodos: startGame(), guessLetter(), getStatus()

   WordService.ts:
   - Validaciones de palabras
   - Métodos: isValidWord(), getWordDifficulty()

3. DTOs (backend/src/core/domain/dto/):

   GameDTO.ts:
   {
     gameId: string
     hiddenWord: string
     guessedLetters: string[]
     incorrectCount: number
     attemptsRemaining: number
     status: 'active' | 'won' | 'lost'
   }

   GuessResultDTO.ts:
   {
     correct: boolean
     hiddenWord: string
     attemptsRemaining: number
     gameStatus: 'active' | 'won' | 'lost'
     message: string
   }

4. CASOS DE USO (backend/src/core/usecases/):

   StartGameUseCase.ts
   - Input: userId, wordCategory?
   - Output: GameDTO
   - Lógica: crear juego, seleccionar palabra, inicializar

   GuessLetterUseCase.ts
   - Input: gameId, letter
   - Output: GuessResultDTO
   - Lógica: validar, procesar adivinanza, actualizar estado

   GetGameStatusUseCase.ts
   - Input: gameId
   - Output: GameDTO

   EndGameUseCase.ts
   - Input: gameId, reason ('won' | 'lost' | 'surrender')
   - Output: { finalWord, stats }

   GetGameRulesUseCase.ts
   - Input: language ('en' | 'es')
   - Output: { rules, tips, difficulty_levels }

5. PUERTOS (backend/src/core/ports/):

   IGameRepository.ts
   IWordRepository.ts
   IPlayerRepository.ts
   IRandomService.ts

Archivos completamente tipados, sin dependencias de framework.
Incluye tests unitarios para cada caso de uso.
```

### Resultado esperado:

```
✓ 8 archivos de entidades de dominio
✓ 2 servicios de dominio
✓ 4 DTOs definidos
✓ 5 casos de uso implementados
✓ 4 interfaces de puertos
✓ Tests unitarios (80% coverage)

Total: 20+ archivos
```

---

## PASO 4-6: Backend Completo - Atajos

### Estructura de comandos en serie:

```
claude> PROMPT 4 - Implementa adapters PostgreSQL

claude> PROMPT 5 - Crea controllers y rutas API

claude> PROMPT 6 - Escribe tests unitarios e integración
```

**Después de cada uno:**
```bash
# Verificar que se compila
npm run typecheck

# Correr tests
npm test
```

---

## PASO 7: Frontend React - Ejemplo Completo

### Comando a Claude Code:

```
claude> Referencia: CLAUDE.md sección "Frontend" y PROMPT 7

Crea estructura frontend React con TypeScript:

1. Inicializar Vite:
   npm create vite@latest . -- --template react-ts
   npm install

2. Instalar dependencias:
   npm install axios tailwindcss postcss autoprefixer i18next react-i18next

3. Componentes (src/components/):

   Game/GameBoard.tsx:
   - Componente principal contenedor
   - State: gameState, loading, error
   - Render: WordDisplay + LetterButtons + Stats
   
   Game/WordDisplay.tsx:
   - Props: hiddenWord (string), guessedLetters (string[])
   - Render: letras separadas con estilo
   - Animación: scale + bounce al revelar

   Game/LetterButtons.tsx:
   - 26 botones (A-Z)
   - Props: onLetterClick, disabledLetters
   - Desabilita letras usadas
   - Animación shake en error

   Game/HangmanDrawing.tsx:
   - SVG con 6 estados del ahorcado
   - Props: incorrectCount (0-6)
   - Animación progresiva con slideUp

   Game/GameStats.tsx:
   - Intentos restantes
   - Letras adivinadas
   - Categoría

   Game/GameOver.tsx:
   - Modal con resultado
   - Props: status, word, onNewGame

   Common/LanguageSwitcher.tsx:
   - Dropdown EN/ES
   - Persiste en localStorage

   Layout/Header.tsx
   Layout/Container.tsx

4. Tipos (src/types/game.types.ts):
   export interface GameState {
     gameId: string | null
     hiddenWord: string
     guessedLetters: string[]
     incorrectCount: number
     status: 'active' | 'won' | 'lost'
   }

5. Hooks (src/hooks/):
   
   useGameLogic.ts:
   - State: game, loading, error
   - Métodos: startNewGame(), guessLetter(), newGame(), surrender()
   - Conecta con API backend

   useLanguage.ts:
   - language state
   - localStorage persistence

   useResponsive.ts:
   - Detecta breakpoints (mobile, tablet, desktop)

6. Tailwind: Configurar tailwind.config.js

7. App.tsx: Layout base con enrutamiento

Todos los componentes TypeScript, tipados, listos para usar.
```

### Resultado:

```
✓ Vite + React inicializado
✓ 10+ componentes React
✓ 3 hooks personalizados
✓ Tipos TypeScript definidos
✓ Tailwind configurado
✓ Estructura lista para animaciones

npm run dev -> funciona en http://localhost:5173
```

---

## PASO 8: i18n - Código Real

```
claude> PROMPT 8 - Internacionalización bilingüe

Configura i18next con inglés y español:

1. Crea src/i18n/en.json:
   {
     "game": {
       "title": "Hangman Game",
       "newGame": "New Game",
       "guessALetter": "Guess a Letter",
       "gameWon": "You Won!",
       "gameLost": "Game Over!",
       "surrenderBtn": "Surrender",
       "wordsWas": "The word was"
     },
     "categories": {
       "animals": "Animals",
       "fruits": "Fruits",
       "countries": "Countries"
     },
     "rules": {
       "title": "Game Rules",
       "rule1": "Guess letters to find the hidden word",
       "rule2": "You have 6 attempts"
     },
     "messages": {
       "loading": "Loading...",
       "error": "Something went wrong",
       "success": "Correct!"
     }
   }

2. Crea src/i18n/es.json (mismo contenido pero en español)

3. Configura src/i18n/i18n.ts:
   import i18n from 'i18next'
   import { initReactI18next } from 'react-i18next'
   import enTranslations from './en.json'
   import esTranslations from './es.json'

   i18n.use(initReactI18next).init({
     resources: {
       en: { translation: enTranslations },
       es: { translation: esTranslations }
     },
     lng: navigator.language.split('-')[0] || 'en',
     fallbackLng: 'en'
   })

4. Hook useLanguage.ts:
   export const useLanguage = () => {
     const { i18n } = useTranslation()
     const setLanguage = (lang) => {
       i18n.changeLanguage(lang)
       localStorage.setItem('language', lang)
     }
     return { language: i18n.language, setLanguage }
   }

5. LanguageSwitcher.tsx:
   <select onChange={(e) => setLanguage(e.target.value)}>
     <option value="en">English</option>
     <option value="es">Español</option>
   </select>

En componentes: const { t } = useTranslation(); <h1>{t('game.title')}</h1>
```

---

## PASO 9: Animaciones - Código Real

```
claude> PROMPT 9 - Animaciones Tailwind CSS

Crea animaciones en src/styles/animations.css:

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

Aplica en componentes:
- WordDisplay: className="animate-fadeIn"
- LetterButton correcto: className="animate-bounce bg-green-500"
- LetterButton incorrecto: className="animate-shake bg-red-500"
- GameOver Modal: className="animate-slideUp"

Tailwind config personalizado en tailwind.config.js
```

---

## PASO 10: Integración API - Ejemplo Real

```
claude> PROMPT 10 - Conecta Frontend con Backend

Crea src/services/api.ts:

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
})

export const gameAPI = {
  startGame: async (category?: string) => {
    return api.post('/games/start', { wordCategory: category })
  },

  guessLetter: async (gameId: string, letter: string) => {
    return api.post(`/games/${gameId}/guess`, { letter })
  },

  getStatus: async (gameId: string) => {
    return api.get(`/games/${gameId}`)
  },

  surrender: async (gameId: string) => {
    return api.post(`/games/${gameId}/surrender`)
  }
}

Luego en useGameLogic.ts:
const startNewGame = async (category?: string) => {
  try {
    const response = await gameAPI.startGame(category)
    setGameState(response.data)
  } catch (error) {
    setError(error.message)
  }
}
```

---

## PASO 11: Tests Frontend

```
claude> PROMPT 11 - Tests React con Vitest

Crea tests/components/GameBoard.test.tsx:

import { render, screen, fireEvent } from '@testing-library/react'
import GameBoard from '../../src/components/Game/GameBoard'

describe('GameBoard', () => {
  it('should render game board', () => {
    render(<GameBoard />)
    expect(screen.getByText(/Hangman/i)).toBeInTheDocument()
  })

  it('should handle letter click', () => {
    const { getByText } = render(<GameBoard />)
    fireEvent.click(getByText('A'))
    // Verificar que se procesó
  })

  it('should show game over when lost', () => {
    render(<GameBoard gameState={{ status: 'lost' }} />)
    expect(screen.getByText(/Game Over/i)).toBeInTheDocument()
  })
})

npm run test -> ejecutar
```

---

## PASO 12: Docker

```
claude> PROMPT 12 - Docker y Compose

Verifica docker-compose.yml:

version: '3.9'
services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_USER: hangman_user
      POSTGRES_PASSWORD: hangman_pass123
      POSTGRES_DB: hangman_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: hangman_user
      DB_PASSWORD: hangman_pass123
      DB_NAME: hangman_db
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:

Ejecutar:
docker-compose up -d
docker-compose logs -f
```

---

## Verificación Final Completa

```bash
# Terminal 1: Docker
docker-compose up

# Terminal 2: Verificar servicios
curl http://localhost:3000/api/health
curl http://localhost:80
curl http://localhost:5432  # BD

# Terminal 3: Backend tests
cd backend
npm test
npm run test:coverage

# Terminal 4: Frontend
cd frontend
npm test
npm run build
npm run build:analyze
```

---

## Comandos Útiles en Claude Code

### Para modificar un archivo específico:

```
claude> Modifica backend/src/services/GameService.ts:
- Añade validación para letras duplicadas
- Añade logging de intentos
```

### Para añadir tests:

```
claude> Crea test para GameService.ts:
- Test para guessLetter() con letra correcta
- Test para guessLetter() con letra incorrecta
- Test para isGameWon()
```

### Para ver progreso:

```
claude> Muestra resumen del proyecto actual:
- Archivos creados
- Estructura completada
- Tests coverage
- Siguiente paso
```

### Para cambios rápidos:

```
claude> Cambia la animación de la palabra correcta de bounce a pulse
```

---

## Troubleshooting en Claude Code

Si algo no funciona, usa:

```
claude> PROBLEMA: Los tests de GameService fallan
Consulta: CLAUDE.md sección "Checklist de Implementación"
Revisa: backend/tests/unit/services/GameService.test.ts
Solución: [Claude analizará y arreglará]

claude> ERROR: "Cannot find module 'typeorm'"
Solución: npm install en la carpeta backend

claude> Frontend no se conecta con Backend
Debuggea VITE_API_URL en .env.development
Verifica: src/services/api.ts
Revisa logs: docker-compose logs backend
```

---

## Resumen de Archivos de Contexto

Tienes disponibles en `/home/claude/`:

1. **CLAUDE.md** ← Contexto técnico completo
2. **PROMPTS_HANGMAN.md** ← Los 13 prompts detallados
3. **QUICK_START.md** ← Guía de 13 pasos
4. **Este archivo** ← Ejemplos prácticos

**Siempre referencia:** "Consulta CLAUDE.md..." o "Ejecuta PROMPT X de PROMPTS_HANGMAN.md"

---

## Timeline Estimado

| Paso | Tarea | Tiempo | Cumplido |
|------|-------|--------|----------|
| 1 | Estructura | 10 min | ☐ |
| 2 | Base de datos | 15 min | ☐ |
| 3 | Lógica dominio | 20 min | ☐ |
| 4 | Adapters | 15 min | ☐ |
| 5 | Controllers | 15 min | ☐ |
| 6 | Tests backend | 20 min | ☐ |
| 7 | Frontend React | 15 min | ☐ |
| 8 | i18n | 10 min | ☐ |
| 9 | Animaciones | 15 min | ☐ |
| 10 | Integración | 15 min | ☐ |
| 11 | Tests frontend | 15 min | ☐ |
| 12 | Docker | 10 min | ☐ |
| 13 | Documentación | 10 min | ☐ |

**Total: 6-8 horas**

---

## ¡Listo! 🚀

```bash
cd hangman-game
claude code
# Copia y pega el primer comando de arriba
# ¡Disfruta creando!
```
