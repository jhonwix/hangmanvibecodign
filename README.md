# 🎮 Hangman Game - Full Stack Application

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

Classic Hangman word-guessing game built with modern web technologies, featuring clean architecture, bilingual support (EN/ES), and responsive design.

## 📋 Descripción

Juego interactivo de Hangman desarrollado con stack moderno de TypeScript, implementando arquitectura hexagonal en el backend y React en el frontend con animaciones CSS personalizadas.

## 🛠️ Stack Tecnológico

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **Base de Datos**: PostgreSQL 14+
- **ORM**: TypeORM
- **Testing**: Jest + Supertest
- **Validación**: Joi

### Frontend
- **Framework**: React 18+
- **Lenguaje**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **i18n**: i18next
- **Testing**: Vitest + React Testing Library

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed
- Docker Compose v2.0+
- Git

### Option 1: Using Quick Start Scripts

**Windows:**
```bash
start.bat
```

**Linux/macOS:**
```bash
chmod +x start.sh
./start.sh
```

### Option 2: Using Docker Compose

**Development Mode:**
```bash
docker-compose up -d
```

**Production Mode:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Option 3: Using Makefile (Linux/macOS)

```bash
make dev        # Start development environment
make prod       # Start production environment
make logs       # View logs
make down       # Stop all containers
```

### Access the Application

After starting, services are available at:

- **Frontend (Dev)**: http://localhost:5173
- **Frontend (Prod)**: http://localhost
- **Backend API**: http://localhost:3000
- **API Health**: http://localhost:3000/api/health
- **Adminer (DB)**: http://localhost:8080
  - System: PostgreSQL
  - Server: postgres
  - Username: hangman_user
  - Password: hangman_pass
  - Database: hangman_db

## 💻 Development Setup (Without Docker)

### 1. Clone repository
```bash
git clone <repository-url>
cd hangman-game
```

### 2. Install dependencies
```bash
npm run install:all
```

### 3. Setup environment variables
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 4. Start PostgreSQL
```bash
docker-compose up -d postgres
```

### 5. Run migrations and seed
```bash
cd backend
npm run migrate
npm run seed
```

### 6. Start backend
```bash
cd backend
npm run dev
```

### 7. Start frontend (new terminal)
```bash
cd frontend
npm run dev
```

## 📁 Estructura del Proyecto

```
hangman-game/
├── backend/              # Backend con arquitectura hexagonal
│   ├── src/
│   │   ├── core/         # Lógica de negocio
│   │   ├── ports/        # Interfaces
│   │   ├── adapters/     # Implementaciones concretas
│   │   ├── config/       # Configuración
│   │   └── middleware/   # Middlewares Express
│   └── tests/            # Tests unitarios e integración
│
├── frontend/             # Frontend React
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # API services
│   │   ├── i18n/         # Traducciones EN/ES
│   │   └── styles/       # CSS y animaciones
│   └── tests/            # Tests de componentes
│
└── docker-compose.yml    # Configuración Docker
```

## 🎮 Reglas del Juego

1. **Objetivo**: Adivinar la palabra letra por letra
2. **Límite**: 6 intentos fallidos permitidos
3. **Victoria**: Completar la palabra antes de agotar intentos
4. **Derrota**: Agotar los 6 intentos sin completar la palabra

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                  # Todos los tests
npm run test:unit         # Tests unitarios
npm run test:integration  # Tests de integración
npm run test:coverage     # Reporte de cobertura
```

### Frontend Tests
```bash
cd frontend
npm test                  # Tests interactivos
npm run test:coverage     # Reporte de cobertura
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

### Rules & Info
- `GET /api/rules` - Obtener reglas
- `GET /api/tips` - Tips para jugar

## 🌍 Internacionalización

El juego soporta inglés (EN) y español (ES) con cambio en tiempo real:
- Detección automática del idioma del navegador
- Persistencia de preferencia en localStorage
- Todos los textos UI externalizados

## 🎨 Características

- ✅ Arquitectura hexagonal (backend)
- ✅ Diseño responsive (Mobile, Tablet, Desktop)
- ✅ Animaciones suaves CSS
- ✅ Soporte multiidioma (EN/ES)
- ✅ Tests con +80% coverage
- ✅ Containerizado con Docker
- ✅ TypeScript en todo el stack
- ✅ Validaciones frontend y backend

## 🔧 Comandos Útiles

### Backend
```bash
npm run dev              # Desarrollo
npm run build            # Build producción
npm test                 # Ejecutar tests
npm run typecheck        # Verificar tipos
npm run migrate:latest   # Ejecutar migraciones
npm run seed             # Seed de datos
```

### Frontend
```bash
npm run dev              # Desarrollo
npm run build            # Build producción
npm run preview          # Preview de build
npm test                 # Tests
npm run lint             # Linting
```

### Docker
```bash
docker-compose up        # Iniciar servicios
docker-compose down      # Detener servicios
docker-compose logs -f   # Ver logs en tiempo real
```

## 📝 Licencia

ISC

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

## 📞 Soporte

Para problemas o preguntas, por favor abre un issue en el repositorio.

---

**Última actualización**: 2025-10-30
**Estado del Proyecto**: En desarrollo activo
