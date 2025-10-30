# 🎯 Prompts Optimizados para Claude Code - Proyecto Hangman

## Instrucción General (Leer antes de empezar)

Antes de usar cualquier prompt, asegúrate de:
1. Tener `CLAUDE.md` en la raíz del proyecto (consulta el archivo de contexto)
2. Usar Claude Code (`claude code` en terminal)
3. Ejecutar desde la carpeta raíz del proyecto
4. Mantener el contexto del archivo CLAUDE.md activo

---

## 📦 PROMPT 1: Configuración Inicial y Estructura de Carpetas

**Uso**: Ejecutar primero para crear toda la estructura del proyecto

```
Por favor, crea la estructura completa del proyecto Hangman según el archivo CLAUDE.md.

Crea:
1. Todas las carpetas especificadas en la sección "Estructura de Carpetas"
2. Archivos package.json básicos para backend y frontend
3. Archivos tsconfig.json para ambos
4. Archivos .gitignore
5. Archivo docker-compose.yml con PostgreSQL
6. Archivo .env.example
7. README.md con instrucciones de setup

Asegúrate de que:
- La estructura sea exactamente como se especifica en CLAUDE.md
- Los package.json incluyan todas las dependencias necesarias según el stack
- Los paths sean correctos para ambos proyectos
- El docker-compose esté listo para ejecutar
```

---

## 🗄️ PROMPT 2: Base de Datos y Migraciones

**Uso**: Después de crear la estructura. Configura PostgreSQL con TypeORM/Prisma

```
Configura la base de datos PostgreSQL para el proyecto Hangman:

1. INSTALACIÓN Y CONFIGURACIÓN:
   - Instala TypeORM (o Prisma si prefieres) en backend
   - Configura conexión a PostgreSQL según docker-compose.yml
   - Crea archivo de configuración en src/config/database.ts

2. ENTIDADES:
   Crea las siguientes entidades usando TypeORM decorators:
   - User: id, username, email, stats_wins, stats_losses, created_at
   - Word: id, word_en, word_es, category, difficulty, usage_count, created_at
   - Game: id, user_id (FK), word_id (FK), status, guessed_letters, incorrect_count, attempts_remaining, started_at, ended_at
   - GameHistory: id, game_id (FK), letter_guessed, correct, timestamp

3. RELACIONES:
   - User (1) -> (N) Games
   - Word (1) -> (N) Games
   - Game (1) -> (N) GameHistory

4. MIGRACIONES:
   - Crea scripts de migración
   - Seed básico con 20 palabras de ejemplo (EN/ES) en categorías variadas

5. CONFIGURACIÓN .env:
   - DB_HOST=localhost
   - DB_PORT=5432
   - DB_USER=hangman_user
   - DB_PASSWORD=hangman_pass
   - DB_NAME=hangman_db

Incluye validaciones y constraints necesarios.
```

---

## 🎮 PROMPT 3: Lógica de Dominio - Core del Backend

**Uso**: Crear la lógica de negocio con arquitectura hexagonal

```
Implementa el core del negocio (lógica de juego) con arquitectura hexagonal:

1. ENTIDADES DE DOMINIO (src/core/domain/entities/):
   - Game: métodos guessLetter(), isGameOver(), isWon(), isLost()
   - Word: métodos getHiddenWord(), revealLetter(), allLettersRevealed()
   - Player: métodos updateStats(), getStatistics()

2. SERVICIOS DE DOMINIO (src/core/domain/services/):
   - GameService: lógica principal del juego
   - WordService: gestión de palabras
   - Métodos pública para validaciones y transiciones de estado

3. DTOs (src/core/domain/dto/):
   - GameDTO: respuesta del estado del juego
   - PlayerDTO: datos del jugador
   - GuessResultDTO: resultado de una adivinanza

4. CASOS DE USO (src/core/usecases/):
   - StartGameUseCase: inicia una nueva partida
   - GuessLetterUseCase: procesa una adivinanza
   - GetGameStatusUseCase: obtiene estado actual
   - EndGameUseCase: finaliza partida
   - GetGameRulesUseCase: retorna reglas en EN/ES

5. PUERTOS (src/core/ports/):
   - IGameRepository: interfaz para persistencia de juegos
   - IWordRepository: interfaz para palabras
   - IPlayerRepository: interfaz para usuarios
   - IRandomService: interfaz para número aleatorio

Importante:
- Las entidades NO deben tener dependencias del framework
- Implementa validaciones en el dominio
- Los casos de uso deben ser agnósticos al storage
- Añade unit tests para cada servicio y caso de uso
```

---

## 🔌 PROMPT 4: Adapters y Repositorios - Implementaciones Concretas

**Uso**: Implementar los adapters que conectan el dominio con PostgreSQL

```
Implementa los adapters (implementaciones concretas) para persistencia:

1. REPOSITORIOS POSTGRES (src/adapters/repositories/):
   - PostgresGameRepository: implementa IGameRepository
     * save(game): guardar/actualizar partida
     * findById(id): obtener partida por ID
     * findActive(userId): obtener partidas activas del usuario
     * delete(id): eliminar partida
   
   - PostgresWordRepository: implementa IWordRepository
     * findRandom(): obtener palabra aleatoria
     * findByCategory(category): palabras por categoría
     * findAll(): todas las palabras
     * getCategories(): categorías disponibles
   
   - PostgresPlayerRepository: implementa IPlayerRepository
     * save(player): crear/actualizar jugador
     * findById(id): obtener por ID
     * findByUsername(username): por usuario
     * updateStats(id, wins, losses): actualizar estadísticas

2. SERVICIOS ADAPTERS (src/adapters/services/):
   - RandomService: implementa IRandomService
     * getRandomInt(min, max): número aleatorio

3. MAPPERS:
   - GameMapper: convierte Entity -> DTO -> JSON
   - WordMapper: convierte Word DB -> Domain
   - PlayerMapper: Player DB -> Domain

4. MANEJO DE ERRORES:
   - Crear CustomError classes
   - Propagar errores con contexto claro
   - Logging de operaciones críticas

5. TESTS:
   - Tests para cada repositorio (mocking la BD)
   - Verificar transacciones
   - Validar constraints y relaciones

Nota: Usa TypeORM QueryBuilder para queries complejas.
```

---

## 🛣️ PROMPT 5: Controllers y Rutas API - Entrada HTTP

**Uso**: Crear los endpoints REST que el frontend consumirá

```
Implementa los controllers y rutas para la API:

1. CONTROLLERS (src/adapters/controllers/):
   
   GameController:
   - POST /api/games/start
     Body: { userId?: number, wordCategory?: string }
     Response: { gameId, hiddenWord, attemptsRemaining, guessedLetters }
   
   - POST /api/games/:id/guess
     Body: { letter: string }
     Response: { correct, hiddenWord, attemptsRemaining, status, message }
   
   - GET /api/games/:id
     Response: { id, status, hiddenWord, attemptsRemaining, guessedLetters, word (si terminó) }
   
   - POST /api/games/:id/surrender
     Response: { message, word, finalStatus }
   
   - GET /api/games/:id/history
     Response: [ { letter, correct, timestamp } ]

   WordController:
   - GET /api/words/categories
     Response: [ { name, count } ]
   
   - GET /api/words/random
     Response: { id, categoryName, difficulty }

   RulesController:
   - GET /api/rules?lang=en|es
     Response: { rules, tips, difficulty_levels }
   
   - GET /api/tips?lang=en|es
     Response: [ { title, description } ]

   StatsController:
   - GET /api/stats/global
     Response: { totalGames, totalPlayers, winRate, averageAttempts }

2. VALIDACIÓN DE INPUT:
   - Usar middleware de validación (Joi o Zod)
   - Validar tipos, ranges, formato de datos
   - Mensajes de error consistentes

3. ERROR HANDLING:
   - HTTP 400: Bad Request (validación)
   - HTTP 404: Not Found
   - HTTP 500: Server Error
   - Incluir error codes para frontend

4. MIDDLEWARE:
   - errorHandler: captura todos los errores
   - requestLogger: log de requests
   - responseFormatter: formato consistente

5. ROUTES (src/routes/):
   - Organizar por dominio
   - Versionado (/api/v1/)
   - CORS configurado

6. TESTS:
   - Tests de integración con Supertest
   - Mock de repositorios
   - Validar respuestas HTTP
```

---

## 🧪 PROMPT 6: Tests Unitarios e Integración Backend

**Uso**: Crear suite completa de tests con Jest

```
Implementa la suite de tests para backend:

1. TESTS UNITARIOS (tests/unit/):
   
   services/:
   - GameService.test.ts
     * startNewGame(): crea juego con palabra válida
     * guessLetter(): retorna true si correcto, false si no
     * isGameWon(): detecta victoria correctamente
     * isGameLost(): detecta derrota a los 6 intentos
   
   - WordService.test.ts
     * revealLetter(): revela letra correctamente
     * getHiddenWord(): oculta letras no adivinadas
     * allLettersRevealed(): detecta finalización

   repositories/:
   - Mock repositories con datos de prueba
   - Verificar métodos save, findById, delete

2. TESTS INTEGRACIÓN (tests/integration/):
   - GameController.test.ts
     * POST /api/games/start: crea juego
     * POST /api/games/:id/guess: procesa adivinanza
     * GET /api/games/:id: obtiene estado
     * POST /api/games/:id/surrender: abandona
   
   - WordController.test.ts
     * GET /api/words/categories: retorna categorías
     * GET /api/words/random: retorna palabra válida

3. FIXTURES (tests/fixtures/):
   - Mock games, words, players
   - Data builders para tests complejos
   - Factories de objetos de prueba

4. COVERAGE:
   - Mínimo 80% de cobertura
   - Ejecutar: npm run test:coverage
   - Incluir reporte en formato HTML

5. CONFIGURACIÓN JEST:
   - jest.config.js configurado para TypeScript
   - Timeouts ajustados para integración
   - Setup de BD de prueba

Ejecutar con: npm test
```

---

## ⚛️ PROMPT 7: Estructura Frontend React - Componentes Base

**Uso**: Crear estructura de componentes React con TypeScript

```
Crea la estructura base del frontend React:

1. PROYECTO VITE + REACT:
   - Inicializar con TypeScript
   - Instalar: React, React Router, Axios, i18next, Tailwind, Vitest

2. COMPONENTES PRINCIPALES (src/components/):

   Game/GameBoard.tsx:
   - Componente contenedor principal
   - Estado del juego
   - Props: gameState, onGuess, onNewGame, onSurrender

   Game/WordDisplay.tsx:
   - Muestra palabra oculta con animaciones
   - Ejemplo: "_ _ L _ O"
   - Props: hiddenWord, guessedLetters

   Game/LetterButtons.tsx:
   - Grid de 26 botones (A-Z)
   - Desabilita letras ya adivinadas
   - Animación al hacer click
   - Props: onLetterClick, disabledLetters

   Game/HangmanDrawing.tsx:
   - SVG del ahorcado con 6 estados
   - Se anima progresivamente
   - Props: incorrectCount (0-6)

   Game/GameStats.tsx:
   - Intentos restantes
   - Letras adivinadas
   - Categoría de palabra
   - Props: stats

   Game/GameOver.tsx:
   - Modal de victoria/derrota
   - Botones: Nueva Partida, Ver palabra, Estadísticas
   - Props: status, word, onNewGame

   Common/LanguageSwitcher.tsx:
   - Dropdown EN/ES
   - Persiste en localStorage
   - Props: onChange

   Common/Modal.tsx:
   - Modal reutilizable
   - Props: isOpen, onClose, children, title

   Layout/Header.tsx:
   - Logo, título, lenguaje
   - Estadísticas rápidas

   Layout/Container.tsx:
   - Wrapper responsive
   - Padding adaptivo

3. TYPES (src/types/game.types.ts):
   - GameState interface
   - GuessResult interface
   - GameStatus enum
   - PlayerStats interface

4. HOOKS (src/hooks/):
   
   useGameLogic.ts:
   - Lógica central del juego
   - State: game, stats, ui
   - Métodos: startGame(), guessLetter(), newGame(), surrender()
   
   useLanguage.ts:
   - Gestión de idioma
   - Lectura/escritura localStorage
   - Retorna: { language, setLanguage }
   
   useResponsive.ts:
   - Detecta tamaño pantalla
   - Breakpoints: mobile, tablet, desktop
   - Retorna: { isMobile, isTablet, isDesktop }

5. LAYOUT RESPONSIVO:
   - Mobile: 320px (1 columna)
   - Tablet: 768px (2 columnas)
   - Desktop: 1024px+ (3 columnas)
   - Usar Tailwind breakpoints

Estructura App.tsx: Layout -> GameBoard -> componentes específicos
```

---

## 🌍 PROMPT 8: Internacionalización (i18n) - EN/ES

**Uso**: Implementar soporte multiidioma

```
Implementa i18next para soporte EN/ES:

1. INSTALACIÓN:
   - npm install i18next i18next-browser-languagedetector i18next-http-backend react-i18next

2. ARCHIVOS DE TRADUCCIÓN (src/i18n/):
   
   en.json:
   {
     "game": {
       "title": "Hangman Game",
       "newGame": "New Game",
       "guess": "Guess a Letter",
       "surrenderBtn": "Surrender",
       "gameWon": "You Won!",
       "gameLost": "Game Over!",
       "word": "Word was"
     },
     "rules": {
       "title": "Game Rules",
       "rule1": "Guess the word letter by letter",
       "rule2": "You have 6 attempts"
     },
     "categories": {
       "animals": "Animals",
       "objects": "Objects",
       "fruits": "Fruits"
     }
   }

   es.json:
   {
     "game": {
       "title": "Juego del Ahorcado",
       "newGame": "Nuevo Juego",
       "guess": "Adivina una Letra",
       "surrenderBtn": "Rendirse",
       "gameWon": "¡Ganaste!",
       "gameLost": "¡Fin del Juego!",
       "word": "La palabra era"
     },
     "rules": {
       "title": "Reglas del Juego",
       "rule1": "Adivina la palabra letra por letra",
       "rule2": "Tienes 6 intentos"
     },
     "categories": {
       "animals": "Animales",
       "objects": "Objetos",
       "fruits": "Frutas"
     }
   }

3. CONFIGURACIÓN (src/i18n/i18n.ts):
   - Inicializar i18next
   - Detector de idioma del navegador
   - Fallback a 'en' si no detecta

4. HOOK useTranslation:
   - En cada componente: const { t } = useTranslation()
   - Usar: <h1>{t('game.title')}</h1>

5. COMPONENTE LanguageSwitcher:
   - Cambiar idioma en tiempo real
   - Guardar en localStorage
   - Persistir entre sesiones

6. TODOS LOS TEXTOS:
   - UI: botones, labels, mensajes
   - Reglas del juego
   - Tips y consejos
   - Mensajes de error
   - Categorías de palabras

Verificar que toda la aplicación sea completamente bilingüe.
```

---

## 🎨 PROMPT 9: Animaciones CSS y Styling con Tailwind

**Uso**: Añadir animaciones y estilos responsive

```
Implementa estilos y animaciones:

1. CONFIGURACIÓN TAILWIND:
   - Instalar Tailwind CSS
   - Configurar theme con colores custom
   - Colors: primary (#6366f1), success (#10b981), danger (#ef4444)

2. ANIMACIONES CUSTOM (src/styles/animations.css):
   
   @keyframes fadeIn:
   - From: opacity 0
   - To: opacity 1
   - Duration: 0.3s ease-in

   @keyframes slideUp:
   - From: translateY(20px), opacity 0
   - To: translateY(0), opacity 1
   - Duration: 0.4s ease-out

   @keyframes bounce:
   - Efecto de rebote elástico
   - Duration: 0.6s
   - Para letras correctas

   @keyframes shake:
   - Vibración horizontal
   - Duration: 0.4s
   - Para letras incorrectas

   @keyframes pulse:
   - Opacidad variable
   - Infinita para loading

3. COMPONENTES ANIMADOS:

   WordDisplay.tsx:
   - fadeIn al cargar palabra
   - Scale + bounce al revelar letra correcta
   - Color change (gray -> green)

   LetterButtons.tsx:
   - Botón correcto: verde, scale 1.1
   - Botón incorrecto: rojo, shake
   - Botones usados: disabled, opacity 50%

   HangmanDrawing.tsx:
   - Cada parte del ahorcado: aparecer con slideUp
   - Animación coordenada (cabeza -> cuerpo -> brazos -> piernas)

   GameOver.tsx:
   - Modal: fadeIn + slideUp
   - Confeti para victoria (librería react-confetti-cannon)

4. RESPONSIVE STYLES (src/styles/responsive.css):
   
   Mobile (320px):
   - Font sizes: sm
   - Button sizes: compact
   - Single column layout
   - Grid de letras: 4x7
   
   Tablet (768px):
   - Font sizes: base
   - Two column layout (game + stats)
   - Grid de letras: 6x5
   
   Desktop (1024px+):
   - Font sizes: lg
   - Three column layout
   - Grid de letras: 7x4

5. TEMA GLOBAL (src/styles/theme.css):
   - Variables CSS custom
   - Dark mode support (opcional)
   - Accesibilidad: contraste WCAG AA

6. COMPONENTES TAILWIND:
   - Usar clases utility
   - Responsive prefixes: sm:, md:, lg:
   - Transiciones: transition ease-in-out duration-300

Resultado: UI suave, profesional y accesible.
```

---

## 🔗 PROMPT 10: Integración Frontend-Backend y Hooks

**Uso**: Conectar frontend con API backend

```
Implementa servicios API y hooks principales:

1. SERVICIO API (src/services/api.ts):
   - Base URL configurable por ambiente
   - Axios instance con interceptores
   - Métodos para cada endpoint:

   const API = {
     games: {
       start: (category?) => POST /api/games/start
       guess: (gameId, letter) => POST /api/games/:id/guess
       getStatus: (gameId) => GET /api/games/:id
       surrender: (gameId) => POST /api/games/:id/surrender
       getHistory: (gameId) => GET /api/games/:id/history
     },
     words: {
       getCategories: () => GET /api/words/categories
       getRandom: () => GET /api/words/random
     },
     rules: {
       getRules: (lang) => GET /api/rules?lang=:lang
       getTips: (lang) => GET /api/tips?lang=:lang
     }
   }

2. MANEJO DE ERRORES:
   - Interceptor de respuestas
   - Mapeo de errores HTTP a mensajes usuario
   - Retry logic para fallos de conexión
   - Timeout de 10 segundos

3. HOOK useGameLogic.ts (Principal):
   
   Estado:
   - gameId: string | null
   - gameState: GameState
   - loading: boolean
   - error: string | null
   - stats: PlayerStats

   Métodos:
   - startNewGame(category?): inicia partida
     * Llamar API /games/start
     * Guardar gameId
     * Inicializar UI
   
   - guessLetter(letter: string): adivina letra
     * Validar letra (A-Z)
     * Llamar API /games/:id/guess
     * Actualizar state con respuesta
     * Animar según resultado
   
   - newGame(): nueva partida
     * Reset state
     * Llamar startNewGame()
   
   - surrender(): abandonar
     * Llamar API /games/:id/surrender
     * Mostrar palabra completa
     * Finalizar

4. ESTADOS DE CARGA:
   - Mostrar loader mientras carga
   - Deshabilitar botones durante petición
   - Manejar estados fallidos

5. PERSISTENCIA:
   - Guardar gameId en sessionStorage
   - Recuperar al refrescar página
   - Limpiar al salir de juego

6. TIMING:
   - Delays para animaciones (300ms entre adivinanzas)
   - Transiciones suaves (200ms)
   - No bloquear UI

Resultado: Frontend totalmente funcional y conectado al backend.
```

---

## 🧪 PROMPT 11: Tests Frontend y Optimización

**Uso**: Tests React y optimización de performance

```
Implementa tests y optimización frontend:

1. TESTS COMPONENTES (tests/components/):
   - Usa Vitest + React Testing Library
   - Renderizar componentes con user interactions
   - Mock API responses

   GameBoard.test.tsx:
   - Renderiza correctamente
   - Maneja clicks en letras
   - Muestra estado del juego
   - Maneja victoria/derrota

   WordDisplay.test.tsx:
   - Oculta letras correctamente
   - Revela al adivinar
   - Animaciones se aplican

   LetterButtons.test.tsx:
   - Todos los botones presentes
   - Desabilita letras usadas
   - Callbacks se ejecutan

2. TESTS HOOKS (tests/hooks/):
   
   useGameLogic.test.ts:
   - startNewGame(): inicializa estado
   - guessLetter(A): procesa adivinanza
   - Maneja errores API
   - Límite de intentos

   useLanguage.test.ts:
   - Detecta idioma navegador
   - Cambia idioma
   - Persiste en localStorage

3. MOCKING API:
   - Mock axios responses
   - Simular latencia
   - Errores de red

4. COBERTURA:
   - Mínimo 75% componentes
   - Mínimo 80% hooks
   - Ejecutar: npm run test:coverage

5. OPTIMIZACIÓN PERFORMANCE:

   React.memo():
   - LetterButtons (no recalcular si props iguales)
   - WordDisplay
   - GameStats

   useMemo():
   - Hook useGameLogic: calcular hiddenWord
   - Categorías de palabras

   useCallback():
   - guessLetter callback
   - newGame callback
   - Prevenir re-renders innecesarios

   Code Splitting:
   - Lazy load Rules modal
   - Lazy load GameOver modal

   Bundle Size:
   - Analizar: npm run build:analyze
   - Target: < 200KB (gzipped)

6. PWA (Opcional):
   - Service Worker para offline
   - Cache de assets
   - Install prompt

npm run test       # Tests
npm run build      # Build optimizado
npm run preview    # Test build
```

---

## 🚀 PROMPT 12: Docker y Deployment

**Uso**: Containerizar y preparar para producción

```
Configura Docker para desarrollo y producción:

1. DOCKERFILE BACKEND (backend/Dockerfile):
   - Node 18-alpine base
   - Install dependencias
   - Build TypeScript
   - EXPOSE 3000
   - CMD npm start

2. DOCKERFILE FRONTEND (frontend/Dockerfile):
   - Node 18-alpine para build
   - Build optimizado Vite
   - nginx-alpine como servidor
   - EXPOSE 80
   - Servir con nginx

3. DOCKER-COMPOSE.YML:
   Servicios:
   - postgres: 
     * Image: postgres:14-alpine
     * Port: 5432
     * Volumes: postgres_data
     * Environment: BD_NAME, DB_USER, DB_PASSWORD
   
   - backend:
     * Build: ./backend
     * Port: 3000
     * Depends on: postgres
     * Environment: variables .env
   
   - frontend:
     * Build: ./frontend
     * Port: 80
     * Depends on: backend
   
   - adminer (opcional):
     * Interfaz gráfica PostgreSQL
     * Port: 8080

4. VARIABLES ENTORNO:
   - .env.example con todas las variables
   - DB_HOST=postgres (en docker)
   - API_URL=http://backend:3000 (inter-container)
   - NODE_ENV=production

5. COMANDOS:
   docker-compose up         # Inicio completo
   docker-compose down       # Detener
   docker-compose logs -f    # Logs en vivo
   docker exec backend npm test  # Tests en contenedor

6. VOLUMES:
   - postgres_data: persistencia BD
   - node_modules en backend y frontend
   - Avoid: .git, node_modules (usar .dockerignore)

7. HEALTH CHECKS:
   - Backend: GET /health
   - Frontend: retorna index.html
   - Restart policy: unless-stopped

Resultado: Proyecto completamente containerizado y escalable.
```

---

## 📋 PROMPT 13: Documentación Final y Guía de Uso

**Uso**: Crear documentación completa del proyecto

```
Crea documentación completa:

1. README.md (Raíz):
   - Descripción del proyecto
   - Requisitos (Node 18+, Docker)
   - Instalación paso a paso
   - Estructura del proyecto
   - Stack tecnológico
   - Comandos principales
   - Contribuciones

2. BACKEND/README.md:
   - Guía de desarrollo
   - Configuración BD
   - Correr tests
   - Estructura hexagonal explicada
   - Ejemplos de API requests

3. FRONTEND/README.md:
   - Guía de desarrollo
   - Componentes principales
   - i18n setup
   - Correr tests
   - Build para producción

4. API.md (Documentación endpoints):
   - Base URL
   - Headers requeridos
   - Todos los endpoints con:
     * Método HTTP
     * Path
     * Parámetros
     * Request body
     * Response ejemplo
     * Códigos de error
   
5. ARCHITECTURE.md:
   - Explicar arquitectura hexagonal
   - Diagrama de capas
   - Flujo de datos
   - Patrones usados
   - Decisiones de diseño

6. RULES.md:
   - Reglas del juego en detalle
   - Ejemplos de gameplay
   - Tips para jugadores
   - Dificultades

7. CONTRIBUTING.md:
   - Cómo contribuir
   - Estilo de código
   - Git workflow
   - Pull request process

8. CHANGELOG.md:
   - Versiones
   - Features por versión
   - Breaking changes

9. TROUBLESHOOTING.md:
   - Problemas comunes
   - Soluciones
   - Logs y debugging

Toda documentación debe estar en español e inglés donde sea aplicable.
```

---

## ✅ ORDEN RECOMENDADO DE EJECUCIÓN

1. **PROMPT 1**: Estructura de carpetas
2. **PROMPT 2**: Base de datos
3. **PROMPT 3**: Lógica de dominio
4. **PROMPT 4**: Adapters y repositorios
5. **PROMPT 5**: Controllers y rutas
6. **PROMPT 6**: Tests backend
7. **PROMPT 7**: Estructura frontend
8. **PROMPT 8**: i18n
9. **PROMPT 9**: Animaciones y estilos
10. **PROMPT 10**: Integración frontend-backend
11. **PROMPT 11**: Tests frontend
12. **PROMPT 12**: Docker
13. **PROMPT 13**: Documentación

---

## 💡 TIPS PARA USAR CON CLAUDE CODE

```bash
# Iniciar Claude Code
claude code

# En el prompt, incluir referencia al contexto
"Consulta el archivo CLAUDE.md para el contexto completo. Luego, ejecuta PROMPT 1..."

# Para cada prompt siguiente
"Basándote en el estado actual y en CLAUDE.md, ejecuta PROMPT X..."

# Pedir ajustes
"Modifica [componente] para que..."

# Verificar progreso
"Muestra resumen del proyecto actual, archivos creados y siguiente paso"
```

---

## 🎯 EJEMPLOS DE USO EN CLAUDE CODE

**Ejemplo 1: Crear estructura**
```
claude code
> Referencia archivo CLAUDE.md. Ejecuta PROMPT 1: Crea toda la estructura del proyecto Hangman
```

**Ejemplo 2: Backend específico**
```
> Basándote en CLAUDE.md PROMPT 3, implementa los servicios de dominio GameService.ts
```

**Ejemplo 3: Frontend con contexto**
```
> Consulta CLAUDE.md y PROMPT 7. Crea el componente GameBoard.tsx con animaciones según especificación
```

**Ejemplo 4: Tests**
```
> Crea tests unitarios completos para GameService.ts siguiendo PROMPT 6
```

---

## 🔄 Mantener Actualización del Contexto

Después de cada prompt ejecutado:
1. Revisar archivo CLAUDE.md
2. Marcar items completados en checklist
3. Actualizar estado del proyecto
4. Documentar cualquier decisión diferente
5. Guardar cambios

```bash
# Para actualizar CLAUDE.md después de cambios
git add CLAUDE.md
git commit -m "Update: Completado PROMPT X - [descripción]"
```

---

**Última actualización**: 2025-10-30  
**Estado**: Listo para inicio  
**Tiempo estimado total**: 6-8 horas con Claude Code optimizado
