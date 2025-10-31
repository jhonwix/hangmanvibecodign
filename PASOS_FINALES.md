# 🎯 PASOS FINALES - Hangman Game

## ✅ ESTADO ACTUAL (Lo que YA está listo)

- ✅ PostgreSQL 18 instalado y corriendo
- ✅ Backend: Código completo, dependencias instaladas
- ✅ Frontend: Código completo, dependencias instaladas, **CORRIENDO en http://localhost:5173**
- ✅ Variables de entorno configuradas
- ❌ **Falta: Configurar base de datos PostgreSQL**

---

## 🚀 LO QUE NECESITAS HACER AHORA (3 Pasos)

### PASO 1: Configurar la Base de Datos PostgreSQL

Tienes 3 opciones (elige la que prefieras):

#### Opción A: Script Automático PowerShell (MÁS RÁPIDO)

1. Abre PowerShell **como Administrador** en la carpeta del proyecto
2. Ejecuta:
```powershell
.\setup-db.ps1
```
3. Ingresa la contraseña del usuario `postgres` cuando se te solicite
4. Si funciona, verás: **"✅ Base de datos configurada!"**

#### Opción B: pgAdmin (Interfaz Gráfica)

1. Abre **pgAdmin 4**
2. Conecta al servidor PostgreSQL 18
3. Crea un usuario:
   - Nombre: `hangman_user`
   - Contraseña: `hangman_pass`
4. Crea una base de datos:
   - Nombre: `hangman_db`
   - Owner: `hangman_user`

#### Opción C: SQL Shell (psql)

1. Abre **SQL Shell (psql)**
2. Conecta como usuario `postgres`
3. Ejecuta estos comandos:

```sql
CREATE USER hangman_user WITH PASSWORD 'hangman_pass';
CREATE DATABASE hangman_db OWNER hangman_user;
GRANT ALL PRIVILEGES ON DATABASE hangman_db TO hangman_user;
\c hangman_db
GRANT ALL ON SCHEMA public TO hangman_user;
\q
```

**📖 Instrucciones detalladas**: Ver [CONFIGURAR_BD.md](CONFIGURAR_BD.md)

---

### PASO 2: Ejecutar Migraciones y Seed

Una vez que la base de datos esté configurada:

1. Abre **PowerShell #1** (nueva ventana) en la carpeta del proyecto:

```powershell
cd backend
npm run migrate
```

**Deberías ver:**
```
✅ Database initialized successfully
✅ Migration: Creating users table
✅ Migration: Creating words table
✅ Migration: Creating games table
✅ Migration: Creating game_history table
✅ All migrations completed
```

2. En la misma ventana, ejecuta el seed:

```powershell
npm run seed
```

**Deberías ver:**
```
✅ Seeding database...
✅ Created 30 words in 5 categories
✅ Database seeded successfully
```

---

### PASO 3: Iniciar el Backend

En la misma PowerShell #1:

```powershell
npm run dev
```

**Deberías ver:**
```
✅ Database initialized successfully
🚀 Server running on port 3000
📍 API: http://localhost:3000/api
📊 Environment: development
```

---

## 🎮 VERIFICAR QUE TODO FUNCIONA

### 1. Frontend está corriendo

- URL: **http://localhost:5173**
- Estado: **✅ YA CORRIENDO**

### 2. Backend está corriendo

- URL: **http://localhost:3000**
- Verificar: Abre http://localhost:3000/api/health

**Deberías ver:**
```json
{
  "success": true,
  "message": "Hangman API is running",
  "timestamp": "2025-10-30T..."
}
```

### 3. Jugar una partida

1. Abre **http://localhost:5173**
2. Deberías ver:
   - ✅ Título "Hangman Game"
   - ✅ Dibujo del ahorcado
   - ✅ Palabra oculta: `_ _ _ _`
   - ✅ Teclado A-Z
   - ✅ Switch de idioma EN/ES
3. Haz clic en una letra
4. Si funciona, ¡el juego está 100% operativo! 🎉

---

## 🐛 SI ALGO NO FUNCIONA

### ❌ Error al ejecutar setup-db.ps1

**"No se puede ejecutar scripts en este sistema"**

Solución:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Luego vuelve a ejecutar `.\setup-db.ps1`

### ❌ Backend: "Cannot connect to database"

**Causa**: Base de datos no configurada correctamente

**Solución**:
1. Verifica que ejecutaste el PASO 1 correctamente
2. Verifica que PostgreSQL esté corriendo:
```powershell
Get-Service postgresql*
```
3. Prueba conectarte manualmente con pgAdmin

### ❌ Backend: "Migration failed"

**Causa**: Usuario no tiene permisos suficientes

**Solución**:
1. Abre SQL Shell (psql) como postgres:
```sql
\c hangman_db
GRANT ALL ON SCHEMA public TO hangman_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO hangman_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO hangman_user;
```

### ❌ Frontend muestra "No response from server"

**Causa**: Backend no está corriendo

**Solución**:
1. Verifica que PowerShell #1 tenga el mensaje "Server running on port 3000"
2. Verifica que http://localhost:3000/api/health responda

---

## 📋 RESUMEN DE VENTANAS NECESARIAS

Necesitas tener abiertas:

### PowerShell #1 - Backend
```powershell
cd backend
npm run dev
```
**Debe mostrar**: "🚀 Server running on port 3000"

### PowerShell #2 - Frontend (YA ABIERTO)
```powershell
cd frontend
npm run dev
```
**Debe mostrar**: "➜ Local: http://localhost:5173/"

### Navegador
```
http://localhost:5173
```

---

## ✅ CHECKLIST FINAL

Marca cada paso cuando lo completes:

- [ ] **PASO 1**: Base de datos configurada (usuario + database creados)
- [ ] **PASO 2**: Migraciones ejecutadas sin errores
- [ ] **PASO 2**: Seed ejecutado (30 palabras creadas)
- [ ] **PASO 3**: Backend corriendo en puerto 3000
- [ ] **Verificación**: http://localhost:3000/api/health responde JSON
- [ ] **Verificación**: Frontend muestra el juego
- [ ] **Verificación**: Puedo hacer clic en letras
- [ ] **Verificación**: Puedo cambiar idioma EN/ES
- [ ] **Verificación**: Puedo completar una partida

---

## 🎉 CUANDO TODO ESTÉ FUNCIONANDO

¡Felicitaciones! Has completado exitosamente:

- ✅ Backend API REST con arquitectura hexagonal
- ✅ Frontend React con animaciones y responsive design
- ✅ Base de datos PostgreSQL con TypeORM
- ✅ Sistema bilingüe (EN/ES)
- ✅ 33 tests unitarios passing
- ✅ Juego completamente funcional

**Total**: ~7,950 líneas de código en 125+ archivos

---

## 📚 DOCUMENTACIÓN ADICIONAL

- [CONFIGURAR_BD.md](CONFIGURAR_BD.md) - Guía detallada de configuración de PostgreSQL
- [RESULTADO_FINAL.md](RESULTADO_FINAL.md) - Estado final y solución sin Docker
- [GUIA_INICIO_WINDOWS.md](GUIA_INICIO_WINDOWS.md) - Guía completa para principiantes
- [TESTING.md](TESTING.md) - Cómo probar la aplicación
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Resumen ejecutivo completo
- [README.md](README.md) - Documentación técnica del proyecto

---

## 🆘 NECESITAS AYUDA

Si después de seguir todos los pasos algo no funciona:

1. **Revisa los logs del backend** en la PowerShell #1
2. **Revisa la consola del navegador** (F12 → Console)
3. **Verifica el estado de PostgreSQL**: `Get-Service postgresql*`
4. **Consulta [CONFIGURAR_BD.md](CONFIGURAR_BD.md)** para troubleshooting

---

**¡Mucho éxito! 🚀**

**Siguiente comando que debes ejecutar**: `.\setup-db.ps1` (si usas la Opción A)
