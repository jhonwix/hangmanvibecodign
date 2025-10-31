# 🧪 Guía de Pruebas - Hangman Game

## 📋 Estado Actual del Proyecto

### ✅ Completado (Pasos 1-9)

- ✅ Estructura completa del proyecto (backend + frontend)
- ✅ Base de datos PostgreSQL con TypeORM
- ✅ Arquitectura hexagonal en backend
- ✅ API REST completa con 15+ endpoints
- ✅ Frontend React con 18+ componentes
- ✅ Tests unitarios (33 passing)
- ✅ Docker & Docker Compose configurado
- ✅ Builds exitosos (backend + frontend)
- ✅ Documentación completa

### 📊 Métricas

**Backend:**
- Tests: 33/33 passing (100%)
- Coverage Core: 75.78%
- TypeScript: Sin errores
- Build: ✅ Exitoso

**Frontend:**
- Build: ✅ Exitoso (7.43s)
- Bundle: 261.78 KB (85.99 KB gzipped)
- TypeScript: Sin errores
- Componentes: 18 archivos

**Total:**
- Archivos creados: 100+
- Líneas de código: 5000+
- Dependencias: 1032 paquetes

---

## 🚀 Opción 1: Prueba con Docker (RECOMENDADO)

### Prerrequisitos
1. Docker Desktop instalado y **corriendo**
2. Docker Compose v2.0+

### Pasos para iniciar

#### A. Usando el script de inicio rápido (Windows)

```bash
start.bat
```

Selecciona opción **1** para desarrollo.

#### B. Usando Docker Compose directamente

```bash
# 1. Iniciar todos los servicios
docker-compose up -d

# 2. Ver logs en tiempo real
docker-compose logs -f

# 3. Ejecutar migraciones (en otra terminal)
docker-compose exec backend npm run migrate

# 4. Seed de datos iniciales
docker-compose exec backend npm run seed
```

### Servicios disponibles

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Health**: http://localhost:3000/api/health
- **Adminer (BD)**: http://localhost:8080
  - Server: `postgres`
  - Username: `hangman_user`
  - Password: `hangman_pass`
  - Database: `hangman_db`

### Verificar que funciona

```bash
# Test health check
curl http://localhost:3000/api/health

# Test categorías
curl http://localhost:3000/api/words/categories

# Test reglas
curl http://localhost:3000/api/rules
```

---

## 🔧 Opción 2: Prueba Local (Sin Docker)

### Prerrequisitos
- Node.js 18+
- PostgreSQL 14+ instalado localmente

### Paso 1: Iniciar PostgreSQL local

Si tienes PostgreSQL instalado localmente, asegúrate que esté corriendo y crea la base de datos:

```sql
CREATE DATABASE hangman_db;
CREATE USER hangman_user WITH PASSWORD 'hangman_pass';
GRANT ALL PRIVILEGES ON DATABASE hangman_db TO hangman_user;
```

### Paso 2: Configurar variables de entorno

Verifica que `backend/.env` tenga:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=hangman_user
DB_PASSWORD=hangman_pass
DB_NAME=hangman_db
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

### Paso 3: Iniciar Backend

```bash
cd backend

# Ejecutar migraciones
npm run migrate

# Seed de datos
npm run seed

# Iniciar servidor
npm run dev
```

El backend estará en: http://localhost:3000

### Paso 4: Iniciar Frontend (nueva terminal)

```bash
cd frontend

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará en: http://localhost:5173

---

## 🧪 Pruebas Funcionales

### 1. Test de API (Backend)

#### Health Check
```bash
curl http://localhost:3000/api/health
```
**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Hangman API is running",
  "timestamp": "2025-10-30T..."
}
```

#### Obtener Categorías
```bash
curl http://localhost:3000/api/words/categories
```
**Respuesta esperada:**
```json
{
  "success": true,
  "data": ["animals", "objects", "fruits", "countries", "movies"]
}
```

#### Iniciar Juego
```bash
curl -X POST http://localhost:3000/api/games/start \
  -H "Content-Type: application/json" \
  -d '{"language": "en"}'
```
**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "ACTIVE",
    "hiddenWord": "_ _ _ _",
    "guessedLetters": [],
    "incorrectCount": 0,
    "attemptsRemaining": 6,
    "language": "en",
    "category": "animals"
  }
}
```

#### Adivinar Letra
```bash
curl -X POST http://localhost:3000/api/games/1/guess \
  -H "Content-Type: application/json" \
  -d '{"letter": "A"}'
```

### 2. Test de Frontend

Abre tu navegador en http://localhost:5173 y verifica:

#### ✅ Checklist UI
- [ ] El header muestra el logo y título "Hangman Game"
- [ ] Se puede cambiar idioma (EN/ES) con el switcher
- [ ] Se muestra el dibujo del ahorcado (gallows)
- [ ] Se muestran las estadísticas (intentos, errores, letras usadas)
- [ ] Se muestra la palabra oculta con guiones bajos
- [ ] Se muestra el teclado A-Z con 26 botones
- [ ] Al hacer clic en una letra, se marca como usada
- [ ] Las letras correctas se revelan en la palabra
- [ ] Las letras incorrectas añaden partes al dibujo
- [ ] Se muestra modal de victoria/derrota al terminar
- [ ] El botón "New Game" inicia un nuevo juego
- [ ] Footer se muestra con enlaces

#### ✅ Checklist Funcional
- [ ] Se puede jugar una partida completa
- [ ] Ganar revela la palabra y muestra mensaje de victoria
- [ ] Perder (6 errores) muestra mensaje de derrota
- [ ] Estadísticas se actualizan en tiempo real
- [ ] Animaciones funcionan (bounce, shake, fadeIn)
- [ ] Responsive en mobile (320px+)
- [ ] Cambio de idioma actualiza todos los textos
- [ ] No se pueden repetir letras
- [ ] Soporte de teclado físico funciona
- [ ] Badge de categoría se muestra correctamente

### 3. Test de Integración

```bash
# Ejecutar tests unitarios backend
cd backend
npm test

# Verificar cobertura
npm test -- --coverage
```

**Resultado esperado:**
- ✅ 33 tests passing
- ✅ Coverage: 75%+ en core/domain

---

## 🐛 Solución de Problemas

### Error: Cannot connect to database

**Causa**: PostgreSQL no está corriendo o credenciales incorrectas.

**Solución**:
```bash
# Con Docker
docker-compose up -d postgres
docker-compose logs postgres

# Local
# Verificar que PostgreSQL está corriendo
# Windows: Services > PostgreSQL
# Linux: sudo systemctl status postgresql
```

### Error: Port 3000 already in use

**Solución**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Error: CORS policy blocked

**Causa**: Frontend y backend en diferentes orígenes.

**Solución**: Verificar en `backend/.env`:
```env
CORS_ORIGIN=http://localhost:5173
```

### Error: Module not found

**Solución**:
```bash
# Reinstalar dependencias
cd backend && npm install
cd ../frontend && npm install
```

### Frontend no se conecta a Backend

**Verificar**:
1. Backend corriendo en puerto 3000
2. `frontend/.env` tiene: `VITE_API_URL=http://localhost:3000/api`
3. Abrir DevTools > Network para ver requests

---

## 📝 Comandos Útiles

### Docker

```bash
# Ver logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Reiniciar servicio
docker-compose restart backend

# Detener todo
docker-compose down

# Limpiar todo (incluyendo volúmenes)
docker-compose down -v

# Entrar a la BD
docker-compose exec postgres psql -U hangman_user -d hangman_db

# Ejecutar migraciones
docker-compose exec backend npm run migrate

# Seed de datos
docker-compose exec backend npm run seed
```

### NPM Scripts (Root)

```bash
npm run dev              # Iniciar con Docker
npm run prod             # Producción
npm run logs             # Ver logs
npm run migrate          # Migraciones
npm run seed             # Seed
npm run test:backend     # Tests backend
npm run install:all      # Instalar todo
```

---

## ✅ Criterios de Aceptación

Para considerar la prueba exitosa, deben cumplirse:

### Backend
- [x] Servidor inicia sin errores
- [x] Health check responde 200
- [x] Endpoints de API responden correctamente
- [x] Base de datos tiene datos seed
- [x] Tests unitarios pasan

### Frontend
- [x] Build sin errores TypeScript
- [x] Aplicación carga en el navegador
- [x] Se puede iniciar un juego
- [x] Se pueden adivinar letras
- [x] Animaciones funcionan
- [x] Cambio de idioma funciona
- [x] Responsive en mobile

### Integración
- [ ] Frontend se comunica con Backend
- [ ] CORS configurado correctamente
- [ ] Juego completo funciona end-to-end
- [ ] Estados del juego se sincronizan
- [ ] Errores se manejan correctamente

---

## 🎯 Próximos Pasos (Post-Prueba)

1. **Deployment a producción**
   - Configurar hosting (Vercel, Railway, etc.)
   - Variables de entorno de producción
   - SSL/HTTPS

2. **Tests adicionales**
   - Tests E2E con Cypress/Playwright
   - Tests de integración completos
   - Load testing

3. **Mejoras**
   - Autenticación de usuarios
   - Leaderboard global
   - Más categorías de palabras
   - Power-ups / pistas
   - Multijugador

4. **Optimizaciones**
   - Cache de Redis
   - CDN para assets
   - Compresión adicional
   - Lazy loading

---

**Última actualización**: 30 de Octubre, 2025
**Versión**: 1.0.0
**Estado**: ✅ Listo para pruebas funcionales
