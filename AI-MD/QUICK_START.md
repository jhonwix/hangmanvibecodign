# 🚀 GUÍA RÁPIDA DE INICIO - HANGMAN CON CLAUDE CODE

## Preparación Inicial (5 minutos)

### 1. Crear git del proyecto
```bash

git init
```

### 2. Iniciar Claude Code
```bash
# Terminal en la carpeta raíz
claude code
```

### 3. Verificar archivos de contexto
Los siguientes archivos deben estar en `/home/claude/`:
- ✅ `CLAUDE.md` - Contexto completo del proyecto
- ✅ `PROMPTS_HANGMAN.md` - Todos los prompts (este archivo)
- ✅ Esta guía

---

## Ejecución Paso a Paso

### PASO 1: Estructura Inicial (10-15 min)

**En el terminal de Claude Code, escribe:**

```
Referencia: archivo CLAUDE.md en /home/claude

Por favor, ejecuta PROMPT 1 del archivo PROMPTS_HANGMAN.md:

"Crea la estructura completa del proyecto Hangman según el archivo CLAUDE.md"

Incluye:
1. Todas las carpetas especificadas
2. package.json básicos para backend y frontend
3. tsconfig.json
4. .gitignore
5. docker-compose.yml con PostgreSQL
6. .env.example
7. README.md

Consulta CLAUDE.md sección "Estructura de Carpetas" para detalles exactos.
```

**Lo que verás:**
- Claude creará todas las carpetas
- Se crearán 7+ archivos base
- Estructura lista para siguiente paso

---

### PASO 2: Base de Datos (15-20 min)

**Comando:**
```
Continuando con el proyecto Hangman (referencia CLAUDE.md).

Ejecuta PROMPT 2:

Configura PostgreSQL:
1. Instala TypeORM en backend
2. Crea entidades: User, Word, Game, GameHistory
3. Configura relaciones según CLAUDE.md
4. Crea seed con 20 palabras ejemplo
5. Script de migraciones
6. Archivo .env configurado

Consulta: CLAUDE.md sección "Esquema PostgreSQL"
```

**Lo que se crea:**
- `src/config/database.ts`
- `src/entities/*.ts` (4 entidades)
- Script de migraciones
- Seed data con palabras

---

### PASO 3: Lógica de Negocio (20-25 min)

**Comando:**
```
Basándote en CLAUDE.md y PROMPTS_HANGMAN.md PROMPT 3.

Implementa el core del negocio (lógica hexagonal):

Crea en backend/src/core/:
1. domain/entities/: Game.ts, Word.ts, Player.ts (con métodos)
2. domain/services/: GameService.ts, WordService.ts
3. domain/dto/: GameDTO.ts, PlayerDTO.ts, GuessResultDTO.ts
4. usecases/: 5 casos de uso (Start, Guess, Status, End, Rules)
5. ports/: 3 interfaces de repositorios

Nota: Sin dependencias de framework, solo lógica pura.
Incluye validaciones en entidades.
```

**Archivos creados:**
- 8 archivos de dominio
- Lógica agnóstica de persistencia
- Casos de uso reutilizables

---

### PASO 4: Adapters y Persistencia (15-20 min)

**Comando:**
```
PROMPT 4 - Adapters y Repositorios

Implementa en backend/src/adapters/:

1. repositories/:
   - PostgresGameRepository.ts
   - PostgresWordRepository.ts
   - PostgresPlayerRepository.ts

2. services/:
   - RandomService.ts

3. Mappers para convertir Entity <-> DTO

Importante:
- Implementan los puertos creados
- Usan TypeORM para queries
- Manejo de errores adecuado
- Tests para cada repositorio
```

---

### PASO 5: Controllers y API (15-20 min)

**Comando:**
```
PROMPT 5 - Controllers y Rutas API

Implementa en backend/src/adapters/controllers/:

1. GameController.ts
   - POST /api/games/start
   - POST /api/games/:id/guess
   - GET /api/games/:id
   - POST /api/games/:id/surrender
   - GET /api/games/:id/history

2. WordController.ts
3. RulesController.ts
4. StatsController.ts

Incluye:
- Validación de input (Joi/Zod)
- Error handling
- Middleware
- Routes en src/routes/

Resultado: API REST completamente funcional.
```

---

### PASO 6: Tests Backend (15-20 min)

**Comando:**
```
PROMPT 6 - Tests Unitarios e Integración

Crea en backend/tests/:

1. unit/services/*.test.ts
   - GameService
   - WordService

2. unit/repositories/*.test.ts
   - Repositorios con mocks

3. integration/controllers/*.test.ts
   - Tests de endpoints
   - Con Supertest
   - Mocking BD

Configurar:
- jest.config.js
- Fixtures y builders
- Coverage mínimo 80%

npm run test -> Ejecutar todo
```

**Backend completado ✓**

---

### PASO 7: Estructura Frontend React (15-20 min)

**Comando:**
```
PROMPT 7 - Estructura Frontend React

Crea frontend completo con:

1. Inicializar Vite + React + TypeScript
   npm install React, Axios, i18next, Tailwind, Vitest

2. Componentes en src/components/:
   - Game/ (5 componentes principales)
   - Common/ (LanguageSwitcher, Modal, Button)
   - Layout/ (Header, Container, Footer)

3. Tipos en src/types/game.types.ts

4. Hooks en src/hooks/:
   - useGameLogic.ts
   - useLanguage.ts
   - useResponsive.ts

Consulta CLAUDE.md para especificaciones exactas de cada componente.
```

---

### PASO 8: Internacionalización (10-15 min)

**Comando:**
```
PROMPT 8 - i18n Multiidioma EN/ES

Configura i18next:

1. Archivos de traducción:
   - src/i18n/en.json (Inglés)
   - src/i18n/es.json (Español)

2. Configuración en src/i18n/i18n.ts
   - Detector automático de idioma
   - Fallback a inglés

3. LanguageSwitcher.tsx
   - Cambiar idioma en vivo
   - Persistencia localStorage

Todos los textos externalizados:
- UI
- Reglas
- Categorías
- Mensajes de error

Resultado: App totalmente bilingüe.
```

---

### PASO 9: Animaciones y Estilos (15-20 min)

**Comando:**
```
PROMPT 9 - Animaciones CSS y Tailwind

Implementa:

1. Configuración Tailwind con theme custom
   - Colores: primary, success, danger, warning

2. Animaciones en src/styles/animations.css:
   - fadeIn
   - slideUp
   - bounce (letra correcta)
   - shake (letra incorrecta)
   - pulse (loading)

3. Responsive styles:
   - Mobile (320px): 4x7 grid letras
   - Tablet (768px): 6x5 grid
   - Desktop (1024px+): 7x4 grid

4. Aplicar animaciones en componentes:
   - WordDisplay: bounce en letra correcta
   - LetterButtons: shake en incorrecta
   - HangmanDrawing: slideUp progresivo
   - GameOver: confeti en victoria

Resultado: UI profesional, suave y accesible.
```

---

### PASO 10: Integración Frontend-Backend (15-20 min)

**Comando:**
```
PROMPT 10 - Integración API y Hooks

Conecta frontend con backend:

1. Servicio API en src/services/api.ts
   - Axios instance
   - Interceptores
   - Métodos para cada endpoint
   - Manejo de errores

2. Hook useGameLogic.ts (principal):
   - State: gameId, gameState, loading, error, stats
   - Métodos: startNewGame(), guessLetter(), newGame(), surrender()
   - Conecta con API

3. Hook useLanguage.ts
4. Hook useResponsive.ts

5. Persistencia:
   - gameId en sessionStorage
   - Recuperar al refrescar

Resultado: Frontend totalmente funcional y conectado.
```

---

### PASO 11: Tests Frontend (10-15 min)

**Comando:**
```
PROMPT 11 - Tests React y Optimización

Crea en frontend/tests/:

1. Componentes: GameBoard.test.tsx, WordDisplay.test.tsx, etc.
2. Hooks: useGameLogic.test.ts, useLanguage.test.ts
3. Mocking: API responses
4. Cobertura: 75%+ componentes, 80%+ hooks

Optimizaciones:
- React.memo en componentes
- useMemo para cálculos
- useCallback para callbacks
- Code splitting (lazy load modales)
- Bundle size < 200KB gzipped

npm run test -> Ejecutar tests
npm run build:analyze -> Ver bundle
```

**Frontend completado ✓**

---

### PASO 12: Docker (10-15 min)

**Comando:**
```
PROMPT 12 - Docker y Deployment

Configura containerización:

1. Dockerfile para backend (Node + TypeScript)
2. Dockerfile para frontend (build con Vite + nginx)
3. docker-compose.yml:
   - PostgreSQL
   - Backend
   - Frontend
   - Adminer (UI para BD)

4. Health checks y volumes
5. Variables de entorno

Comandos:
docker-compose up       # Iniciar todo
docker-compose down     # Detener
docker-compose logs -f  # Ver logs

Acceso:
- Frontend: http://localhost:80
- Backend: http://localhost:3000
- Adminer: http://localhost:8080
- BD: localhost:5432
```

---

### PASO 13: Documentación (10 min)

**Comando:**
```
PROMPT 13 - Documentación Completa

Crea documentación:

1. README.md (raíz) - Overview y setup
2. BACKEND/README.md - Guía desarrollo backend
3. FRONTEND/README.md - Guía desarrollo frontend
4. API.md - Documentación de todos los endpoints
5. ARCHITECTURE.md - Explicar hexagonal
6. RULES.md - Reglas del juego
7. CONTRIBUTING.md - Cómo contribuir
8. TROUBLESHOOTING.md - Problemas comunes

Documentación bilingüe donde aplique.
```

---

## Verificación Final

Después de completar todos los pasos, ejecuta:

```bash
# Terminal 1: Iniciar servicios
docker-compose up

# Terminal 2: Verificar salud
curl http://localhost:3000/health
curl http://localhost:80

# Terminal 3: Ejecutar tests
cd backend && npm test
cd frontend && npm test
```

**Verificar:**
- ✅ Frontend carga sin errores
- ✅ Botones funcionan
- ✅ Idiomas cambian
- ✅ Animaciones suaves
- ✅ Responsive en móvil
- ✅ Tests pasan

---

## 📊 Estadísticas Finales

Después de completar:

```
Frontend:
- 10+ componentes React
- 2 idiomas (EN/ES)
- 4+ animaciones
- 100% responsive
- 75%+ test coverage
- Bundle: ~150KB gzipped

Backend:
- 15+ archivos TypeScript
- Arquitectura hexagonal
- 30+ endpoints/servicios
- 80%+ test coverage
- PostgreSQL + TypeORM
- Ready for production

Total:
- Lineas de código: ~5000+
- Archivos: 50+
- Tiempo: 6-8 horas
- Resultado: Juego completamente funcional
```

---

## 🎯 Atajos en Claude Code

**Para referencia rápida:**
```
"Consulta CLAUDE.md línea X"
"Revisa PROMPTS_HANGMAN.md PROMPT Y"
"Basándote en el contexto actual..."
"Modifica [archivo] para..."
"Crea tests para..."
"Añade animación para..."
```

---

## 💾 Commits Recomendados

```bash
git add .
git commit -m "Paso 1: Estructura inicial"
git commit -m "Paso 2: Base de datos PostgreSQL"
git commit -m "Paso 3: Core lógica de negocio"
git commit -m "Paso 4: Adapters y repositorios"
git commit -m "Paso 5: Controllers y API REST"
git commit -m "Paso 6: Tests backend 80%"
git commit -m "Paso 7: Frontend React base"
git commit -m "Paso 8: Internacionalización EN/ES"
git commit -m "Paso 9: Animaciones y Tailwind CSS"
git commit -m "Paso 10: Integración frontend-backend"
git commit -m "Paso 11: Tests frontend y optimización"
git commit -m "Paso 12: Docker containerization"
git commit -m "Paso 13: Documentación completa"
```

---

## 🆘 Si Algo Falla

1. **Verifica el contexto**: `Consulta CLAUDE.md sección [X]`
2. **Revisa el prompt**: `Ejecuta nuevamente PROMPT [Y]`
3. **Limpia caché**: `rm -rf node_modules && npm install`
4. **Logs**: `docker-compose logs -f [servicio]`
5. **Reset Docker**: `docker-compose down -v && docker-compose up`

---

## 📚 Recursos Adicionales

- CLAUDE.md: Contexto técnico completo
- PROMPTS_HANGMAN.md: Prompts detallados
- Este archivo: Guía rápida
- Documentación en el proyecto: README.md, API.md, etc.

---

**¡Listo para comenzar!** 🎮

```bash
mkdir hangman-game
cd hangman-game
claude code
# Pega el primer comando del PASO 1
```

¡Que disfrutes creando tu juego Hangman! 🚀
