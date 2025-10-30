# Proyecto Hangman - Contexto del Agente IA

## 📋 Descripción General
Sistema de juego Hangman (Ahorcado) con arquitectura hexagonal, soporte multiidioma (EN/ES), responsive design y suite completa de tests.

## 🏗️ Arquitectura Hexagonal

### Estructura de Carpetas
```
hangman-game/
├── backend/
│   ├── src/
│   │   ├── core/           # Lógica de negocio (puertos y casos de uso)
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── Game.ts
│   │   │   │   │   ├── Word.ts
│   │   │   │   │   └── Player.ts
│   │   │   │   ├── services/
│   │   │   │   │   ├── GameService.ts
│   │   │   │   │   └── WordService.ts
│   │   │   │   └── dto/
│   │   │   │       ├── GameDTO.ts
│   │   │   │       └── PlayerDTO.ts
│   │   │   └── usecases/
│   │   │       ├── StartGameUseCase.ts
│   │   │       ├── GuessLetterUseCase.ts
│   │   │       ├── GetGameStatusUseCase.ts
│   │   │       ├── EndGameUseCase.ts
│   │   │       └── GetGameRulesUseCase.ts
│   │   ├── ports/         # Interfaces (contratos)
│   │   │   ├── repositories/
│   │   │   │   ├── IGameRepository.ts
│   │   │   │   ├── IWordRepository.ts
│   │   │   │   └── IPlayerRepository.ts
│   │   │   └── services/
│   │   │       └── IRandomService.ts
│   │   ├── adapters/      # Implementaciones concretas
│   │   │   ├── repositories/
│   │   │   │   ├── PostgresGameRepository.ts
│   │   │   │   ├── PostgresWordRepository.ts
│   │   │   │   └── PostgresPlayerRepository.ts
│   │   │   ├── services/
│   │   │   │   └── RandomService.ts
│   │   │   └── controllers/
│   │   │       ├── GameController.ts
│   │   │       ├── WordController.ts
│   │   │       └── RulesController.ts
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   └── env.ts
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts
│   │   │   └── validation.ts
│   │   └── app.ts
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   └── usecases/
│   │   ├── integration/
│   │   └── fixtures/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Game/
│   │   │   │   ├── GameBoard.tsx
│   │   │   │   ├── WordDisplay.tsx
│   │   │   │   ├── LetterButtons.tsx
│   │   │   │   ├── HangmanDrawing.tsx
│   │   │   │   ├── GameStats.tsx
│   │   │   │   └── GameOver.tsx
│   │   │   ├── Common/
│   │   │   │   ├── LanguageSwitcher.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── Button.tsx
│   │   │   └── Layout/
│   │   │       ├── Header.tsx
│   │   │       ├── Footer.tsx
│   │   │       └── Container.tsx
│   │   ├── hooks/
│   │   │   ├── useGameLogic.ts
│   │   │   ├── useLanguage.ts
│   │   │   └── useResponsive.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── i18n/
│   │   │   ├── en.json
│   │   │   ├── es.json
│   │   │   └── i18n.ts
│   │   ├── styles/
│   │   │   ├── animations.css
│   │   │   ├── responsive.css
│   │   │   └── theme.css
│   │   ├── types/
│   │   │   └── game.types.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── tests/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
├── .env.example
├── README.md
└── RULES.md
```

## 🎮 Reglas del Juego

### Gameplay
1. **Inicio**: Se selecciona una palabra aleatoria de la base de datos
2. **Objetivo**: Adivinar la palabra letra por letra
3. **Límite de intentos**: 6 intentos fallidos permitidos
4. **Victoria**: Adivinar todas las letras antes de agotar intentos
5. **Derrota**: Agotar los 6 intentos sin completar la palabra

### Mecánicas
- Cada palabra adivinada correctamente se revela
- Las letras ya usadas no se pueden volver a usar
- Se muestra el progreso visual del ahorcado (6 estados)
- Se muestran estadísticas en tiempo real
- Se puede abandonar el juego en cualquier momento

### Palabras
- Mínimo 4 letras, máximo 12 letras
- Categorías: Animales, Objetos, Frutas, Países, Películas
- Soporte bilingüe (palabras en inglés y español)
- Se actualizan dinámicamente desde BD

## 🛠️ Stack Tecnológico

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **BD**: PostgreSQL 14+
- **ORM**: TypeORM o Prisma
- **Testing**: Jest + Supertest
- **Validación**: Joi o Zod

### Frontend
- **Framework**: React 18+
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS + Animations
- **HTTP Client**: Axios
- **i18n**: i18next
- **Testing**: Vitest + React Testing Library
- **Build**: Vite

## 📱 Requisitos Técnicos

### Responsiveness
- Mobile: 320px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1024px+
- Breakpoints implementados en Tailwind

### Animaciones
- Entrada suave de componentes (fade-in)
- Animación de letra correcta: scale + bounce
- Animación de letra incorrecta: shake red
- Dibujo del ahorcado: animación progresiva
- Transiciones entre estados del juego

### Multiidioma (i18n)
- Selección automática por navegador
- Switch de idioma en tiempo real
- Persistencia en localStorage
- Todos los textos externalizados

### Accesibilidad
- ARIA labels en elementos interactivos
- Contraste WCAG AA mínimo
- Soporte teclado
- Focus management

## 🗄️ Esquema PostgreSQL

### Tablas Principales
```sql
-- Users (jugadores)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE,
  stats_wins INT DEFAULT 0,
  stats_losses INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Words (palabras del juego)
CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  word_en VARCHAR(50) NOT NULL,
  word_es VARCHAR(50) NOT NULL,
  category VARCHAR(30),
  difficulty INT (1-3),
  usage_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Games (partidas)
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  word_id INT REFERENCES words(id),
  status VARCHAR(20), -- 'active', 'won', 'lost'
  guessed_letters VARCHAR(26),
  incorrect_count INT DEFAULT 0,
  attempts_remaining INT DEFAULT 6,
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP
);

-- GameHistory (historial)
CREATE TABLE game_history (
  id SERIAL PRIMARY KEY,
  game_id INT REFERENCES games(id),
  letter_guessed VARCHAR(1),
  correct BOOLEAN,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

## 📊 API Endpoints

### Game Management
- `POST /api/games/start` - Iniciar nueva partida
- `POST /api/games/:id/guess` - Adivinar letra
- `GET /api/games/:id` - Obtener estado del juego
- `POST /api/games/:id/surrender` - Abandonar juego
- `GET /api/games/:id/history` - Historial de movimientos

### Words
- `GET /api/words/categories` - Obtener categorías
- `GET /api/words/random` - Palabra aleatoria

### Game Rules & Info
- `GET /api/rules` - Obtener reglas
- `GET /api/tips` - Tips para jugar
- `GET /api/stats` - Estadísticas generales

### Users
- `POST /api/users` - Registrar usuario
- `GET /api/users/:id/stats` - Estadísticas del usuario

## ✅ Checklist de Implementación

### Backend
- [ ] Configuración de BD y migraciones
- [ ] Entidades del dominio
- [ ] Casos de uso
- [ ] Repositorios
- [ ] Controllers
- [ ] Rutas API
- [ ] Validaciones
- [ ] Manejo de errores
- [ ] Middleware autenticación
- [ ] Tests unitarios (80%+ coverage)
- [ ] Tests integración

### Frontend
- [ ] Layout responsivo
- [ ] Componentes Game
- [ ] Hook useGameLogic
- [ ] i18n (EN/ES)
- [ ] Animaciones CSS
- [ ] Integración API
- [ ] Manejo de estados
- [ ] Tests componentes
- [ ] PWA (opcional)
- [ ] Performance optimization

### DevOps
- [ ] Docker Compose
- [ ] Variables de entorno
- [ ] Documentación
- [ ] Scripts npm

## 🎨 Temas y Animaciones

### Colores Base
- Primary: #6366f1 (Indigo)
- Success: #10b981 (Green)
- Danger: #ef4444 (Red)
- Warning: #f59e0b (Amber)
- Background: #f9fafb
- Text: #1f2937

### Animaciones Principales
- `fadeIn`: 0.3s ease-in
- `slideUp`: 0.3s ease-out
- `bounce`: 0.6s cubic-bezier
- `shake`: 0.4s ease-in-out (error)
- `pulse`: 1s infinite (loading)

## 📝 Notas Importantes

1. **Estado Global**: Usar Context API o Zustand (simple)
2. **Validaciones**: Frontend + Backend redundantes
3. **Error Handling**: Respuestas consistentes en API
4. **Logging**: Winston o Pino en backend
5. **Variables de Entorno**: Usar dotenv con ejemplo
6. **CORS**: Configurado para desarrollo y producción
7. **Rate Limiting**: Implementar para API endpoints
8. **Testing**: Coverage mínimo 80%

## 🚀 Comandos Clave

```bash
# Backend
npm run dev              # Desarrollo
npm run build            # Build
npm test                 # Tests
npm run typecheck        # Type checking
npm run migrate:latest   # Migraciones BD

# Frontend
npm run dev              # Desarrollo
npm run build            # Build para producción
npm run preview          # Preview build
npm test                 # Tests
npm run lint             # Linting

# Docker
docker-compose up        # Iniciar servicios
docker-compose down      # Detener servicios
```

## 🔄 Última Actualización
Documento actualizado: 2025-10-30
Estado del Proyecto: Planificación completa ✓
