# 🗄️ Configuración de Base de Datos PostgreSQL

## Estado Actual

- ✅ PostgreSQL 18 instalado y corriendo
- ✅ Frontend corriendo en http://localhost:5173
- ❌ Backend NO puede conectarse (falta crear base de datos y usuario)

---

## 📋 PASOS PARA CONFIGURAR LA BASE DE DATOS

### Opción 1: Usando pgAdmin (Interfaz Gráfica)

#### 1. Abrir pgAdmin

1. Presiona **Windows** + busca **pgAdmin**
2. Abre pgAdmin 4
3. Te pedirá una contraseña maestra (la que configuraste al instalar PostgreSQL)

#### 2. Conectarse al servidor PostgreSQL

1. En el panel izquierdo, expande **Servers**
2. Haz clic en **PostgreSQL 18**
3. Te pedirá la contraseña del usuario `postgres` (la que configuraste durante la instalación)

#### 3. Crear el usuario `hangman_user`

1. Haz clic derecho en **Login/Group Roles**
2. Selecciona **Create** → **Login/Group Role...**
3. En la pestaña **General**:
   - Name: `hangman_user`
4. En la pestaña **Definition**:
   - Password: `hangman_pass`
5. En la pestaña **Privileges**:
   - Marca **Can login?**: `Yes`
   - Marca **Create databases?**: `Yes`
6. Haz clic en **Save**

#### 4. Crear la base de datos `hangman_db`

1. Haz clic derecho en **Databases**
2. Selecciona **Create** → **Database...**
3. En la pestaña **General**:
   - Database: `hangman_db`
   - Owner: `hangman_user` (selecciona del dropdown)
4. Haz clic en **Save**

#### 5. Otorgar privilegios

1. Haz clic derecho en la base de datos `hangman_db`
2. Selecciona **Query Tool**
3. Copia y pega este SQL:

```sql
GRANT ALL PRIVILEGES ON DATABASE hangman_db TO hangman_user;
GRANT ALL ON SCHEMA public TO hangman_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO hangman_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO hangman_user;
```

4. Presiona **F5** o haz clic en el botón **▶ Execute/Refresh**

---

### Opción 2: Usando SQL Shell (psql) - Línea de Comandos

#### 1. Abrir SQL Shell (psql)

1. Presiona **Windows** + busca **SQL Shell (psql)**
2. Se abrirá una ventana de comando
3. Te pedirá varios valores, presiona **Enter** para usar los valores por defecto:
   - Server [localhost]: **Enter**
   - Database [postgres]: **Enter**
   - Port [5432]: **Enter**
   - Username [postgres]: **Enter**
   - Password for user postgres: **Escribe tu contraseña de postgres**

#### 2. Ejecutar comandos SQL

Una vez conectado, copia y pega estos comandos uno por uno:

```sql
-- Crear usuario
CREATE USER hangman_user WITH PASSWORD 'hangman_pass';

-- Crear base de datos
CREATE DATABASE hangman_db OWNER hangman_user;

-- Otorgar privilegios
GRANT ALL PRIVILEGES ON DATABASE hangman_db TO hangman_user;

-- Conectarse a la nueva base de datos
\c hangman_db

-- Otorgar privilegios en el esquema
GRANT ALL ON SCHEMA public TO hangman_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO hangman_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO hangman_user;

-- Verificar que todo esté bien
\du hangman_user
\l hangman_db
```

#### 3. Salir de psql

Escribe:
```
\q
```

---

### Opción 3: Usando el Script Automático

#### 1. Ejecutar el script de setup

1. Abre **PowerShell** en la carpeta del proyecto
2. Ejecuta:

```powershell
.\setup-database.bat
```

3. Ingresa la contraseña del usuario `postgres` cuando se te solicite

---

## 🎯 VERIFICAR QUE FUNCIONA

### Método 1: pgAdmin

1. Abre pgAdmin
2. Navega a: **Servers** → **PostgreSQL 18** → **Databases** → **hangman_db**
3. Si lo ves, ¡está creado! ✅

### Método 2: psql

Abre SQL Shell y ejecuta:

```sql
\c hangman_db hangman_user
-- Si se conecta sin error, ¡funciona! ✅
```

### Método 3: Intentar iniciar el backend

1. Abre PowerShell en la carpeta del proyecto
2. Ejecuta:

```powershell
cd backend
npm run migrate
```

Si ves mensajes de éxito con tablas creadas, ¡la base de datos está configurada correctamente! ✅

---

## 🐛 Solución de Problemas

### ❌ Error: "role 'hangman_user' already exists"

**Solución**: El usuario ya existe. Puedes:
1. Eliminarlo primero: `DROP USER hangman_user;`
2. O cambiar la contraseña: `ALTER USER hangman_user WITH PASSWORD 'hangman_pass';`

### ❌ Error: "database 'hangman_db' already exists"

**Solución**: La base de datos ya existe. Puedes:
1. Eliminarla primero: `DROP DATABASE hangman_db;`
2. O simplemente continuar con los siguientes pasos

### ❌ No encuentro pgAdmin

**Solución**:
1. Busca en: `C:\Program Files\PostgreSQL\18\pgAdmin 4\bin\pgAdmin4.exe`
2. O reinstala PostgreSQL con pgAdmin incluido

### ❌ No sé la contraseña de postgres

**Solución**:
1. La configuraste durante la instalación de PostgreSQL
2. Si no la recuerdas, necesitarás reinstalar PostgreSQL o buscar cómo recuperarla

---

## ✅ SIGUIENTE PASO DESPUÉS DE CONFIGURAR LA BD

Una vez que la base de datos esté configurada correctamente:

### 1. Ejecutar Migraciones

Abre PowerShell en la carpeta del proyecto:

```powershell
cd backend
npm run migrate
```

**Deberías ver**:
```
✅ Database initialized successfully
✅ Migration completed
```

### 2. Seed (Datos Iniciales)

```powershell
npm run seed
```

**Deberías ver**:
```
✅ Seeded 30 words in 5 categories
```

### 3. Iniciar Backend

```powershell
npm run dev
```

**Deberías ver**:
```
✅ Database initialized successfully
🚀 Server running on port 3000
📍 API: http://localhost:3000/api
```

### 4. Verificar que todo funciona

Abre tu navegador en:
```
http://localhost:5173
```

**¡Deberías ver el juego funcionando completamente!** 🎮

---

## 📞 RESUMEN RÁPIDO

Para que la aplicación funcione, necesitas:

1. ✅ PostgreSQL corriendo (YA TIENES)
2. ❌ **Base de datos `hangman_db` creada** ← HAZLO AHORA
3. ❌ **Usuario `hangman_user` creado** ← HAZLO AHORA
4. ❌ **Ejecutar migraciones** ← DESPUÉS DE LO ANTERIOR
5. ❌ **Ejecutar seed** ← DESPUÉS DE MIGRACIONES
6. ❌ **Iniciar backend** ← ÚLTIMO PASO

---

**Una vez completados todos los pasos, el juego estará 100% funcional!** 🎉
