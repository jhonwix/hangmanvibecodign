# 🎮 Hangman Game

Sistema de juego Hangman (Ahorcado) con arquitectura hexagonal, soporte multiidioma (EN/ES), diseño responsive y suite completa de tests.

## 📋 Descripción

Juego interactivo de Hangman desarrollado con stack moderno de TypeScript, implementando arquitectura hexagonal en el backend y React en el frontend.

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

## 🚀 Instalación y Setup

### Prerrequisitos
- Node.js 18 o superior
- Docker y Docker Compose
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd hangman-game
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

### 3. Iniciar con Docker (Recomendado)
```bash
docker-compose up
```

Servicios disponibles:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **Adminer (BD UI)**: http://localhost:8080
- **PostgreSQL**: localhost:5432

### 4. Instalación manual (Desarrollo)

#### Backend
```bash
cd backend
npm install
npm run migrate:latest
npm run seed
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
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
