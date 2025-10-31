# 🚀 Guía Completa de Inicio en Windows (Primera Vez con Docker)

Esta guía es para usuarios que **nunca han usado Docker** en Windows. Te llevaré paso a paso.

---

## 📋 PASO 1: Instalar Docker Desktop

### 1.1 Descargar Docker Desktop

1. Abre tu navegador (Chrome, Edge, Firefox)
2. Ve a: https://www.docker.com/products/docker-desktop
3. Haz clic en **"Download for Windows"**
4. Espera a que se descargue el instalador (unos 500 MB)

### 1.2 Instalar Docker Desktop

1. Busca el archivo descargado: **Docker Desktop Installer.exe**
2. Haz **doble clic** en el instalador
3. Si Windows pregunta "¿Quieres permitir que esta app haga cambios?", haz clic en **Sí**
4. En la ventana de instalación:
   - ✅ Deja marcado "Use WSL 2 instead of Hyper-V" (recomendado)
   - ✅ Deja marcado "Add shortcut to desktop"
5. Haz clic en **OK**
6. Espera a que se instale (puede tardar 5-10 minutos)
7. Cuando termine, haz clic en **Close and restart**

**⚠️ IMPORTANTE**: Tu computadora se reiniciará automáticamente.

### 1.3 Primera vez que abres Docker Desktop

Después de que tu PC se reinicie:

1. Busca el ícono de **Docker Desktop** en tu escritorio o en el menú de inicio
2. Haz **doble clic** para abrirlo
3. Si aparece un mensaje sobre WSL 2, haz clic en **Restart**
4. Acepta los términos de servicio (Service Agreement)
5. Puedes omitir el tutorial inicial (Skip tutorial)

**🎯 Objetivo**: Esperar a que en la parte inferior izquierda diga:
```
🟢 Docker Desktop is running
```

Esto puede tardar 1-2 minutos la primera vez.

---

## 📋 PASO 2: Verificar que Docker está funcionando

### 2.1 Abrir PowerShell o Command Prompt

**Opción A - PowerShell (Recomendado)**:
1. Presiona la tecla **Windows** + **X**
2. Selecciona **"Windows PowerShell"** o **"Terminal"**

**Opción B - Command Prompt**:
1. Presiona la tecla **Windows**
2. Escribe: `cmd`
3. Presiona **Enter**

### 2.2 Verificar instalación de Docker

En la ventana que se abrió, escribe este comando y presiona Enter:

```bash
docker --version
```

**Deberías ver algo como**:
```
Docker version 24.0.6, build ed223bc
```

Si ves esto, ¡Docker está instalado correctamente! ✅

### 2.3 Verificar que Docker está corriendo

Escribe este comando:

```bash
docker ps
```

**Deberías ver**:
```
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

Si ves esto (una tabla vacía), ¡Docker está funcionando! ✅

**Si ves un error** que dice "Cannot connect to Docker daemon":
- Ve al ícono de Docker en la barra de tareas (esquina inferior derecha)
- Haz clic derecho
- Selecciona "Start Docker Desktop"
- Espera 1-2 minutos

---

## 📋 PASO 3: Navegar a la carpeta del proyecto

### 3.1 Abrir la carpeta en el Explorador de Windows

1. Abre el **Explorador de Archivos** (ícono de carpeta amarilla)
2. Navega a: `C:\Users\Jhon Orrego\Desktop\ChatGPTApps\hangman-game`

### 3.2 Abrir PowerShell en esa carpeta

**Método 1 (Más fácil)**:
1. En el Explorador de Archivos, con la carpeta abierta
2. Haz clic en la barra de dirección (donde dice la ruta)
3. Escribe: `powershell`
4. Presiona **Enter**

Se abrirá PowerShell directamente en esa carpeta.

**Método 2 (Manual)**:
1. Abre PowerShell (Windows + X → PowerShell)
2. Escribe este comando:
```bash
cd "C:\Users\Jhon Orrego\Desktop\ChatGPTApps\hangman-game"
```
3. Presiona **Enter**

### 3.3 Verificar que estás en la carpeta correcta

Escribe:
```bash
dir
```

**Deberías ver archivos como**:
- backend/
- frontend/
- docker-compose.yml
- start.bat
- README.md

Si ves estos archivos, ¡estás en la carpeta correcta! ✅

---

## 📋 PASO 4: Iniciar el proyecto con Docker

### 4.1 Ejecutar el script de inicio

Ahora simplemente escribe:

```bash
.\start.bat
```

Y presiona **Enter**.

**📺 Lo que verás**:

```
========================================
   Hangman Game - Quick Start
========================================

[OK] Docker is running

[INFO] Creating backend .env from example...
[INFO] Creating frontend .env from example...
[OK] Environment files ready

Select environment:
1) Development (with hot reload)
2) Production (optimized build)
Enter your choice (1 or 2):
```

### 4.2 Seleccionar opción de desarrollo

Escribe: `1`

Presiona **Enter**

### 4.3 Esperar a que descargue e inicie todo

**📥 Primera vez (10-15 minutos)**:

Verás algo como esto:
```
[INFO] Starting development environment...
Pulling postgres (postgres:14-alpine)...
14-alpine: Pulling from library/postgres
...
Building backend
...
Building frontend
...
Creating hangman-postgres ... done
Creating hangman-backend ... done
Creating hangman-frontend ... done
Creating hangman-adminer ... done
```

**¿Qué está pasando?**:
- Docker está descargando las imágenes necesarias (PostgreSQL, Node, etc.)
- Está construyendo el backend y frontend
- Está iniciando todos los servicios

**⏱️ Tiempos aproximados**:
- Primera vez: 10-15 minutos
- Siguientes veces: 1-2 minutos

### 4.4 Esperar mensaje de éxito

Cuando todo esté listo verás:

```
[OK] Development environment started!

Services available at:
  Frontend:  http://localhost:5173
  Backend:   http://localhost:3000
  Adminer:   http://localhost:8080

To view logs: docker-compose logs -f
To stop:      docker-compose down

========================================
   Setup Complete! Happy Gaming! 🎮
========================================
Press any key to continue . . .
```

¡Excelente! Todo está funcionando. ✅

---

## 📋 PASO 5: Abrir la aplicación en el navegador

### 5.1 Abrir el navegador

1. Abre tu navegador favorito (Chrome, Edge, Firefox)
2. En la barra de dirección, escribe: `http://localhost:5173`
3. Presiona **Enter**

### 5.2 ¿Qué deberías ver?

Deberías ver la aplicación del juego Hangman con:
- ✅ Header con el título "Hangman Game"
- ✅ Switch de idioma (EN/ES) en la esquina superior derecha
- ✅ Un dibujo de una horca (el ahorcado)
- ✅ Estadísticas (Attempts left: 6, Incorrect Guesses: 0)
- ✅ Una palabra oculta con guiones bajos: `_ _ _ _`
- ✅ Teclado A-Z con letras disponibles
- ✅ Botón "New Game"

**Si ves todo esto, ¡la aplicación está funcionando perfectamente! 🎉**

---

## 🎮 PASO 6: Jugar tu primera partida

### 6.1 Cómo jugar

1. **Haz clic en una letra** (por ejemplo, la "A")
2. Si la letra está en la palabra:
   - ✅ Se revelará en la palabra oculta
   - La letra se marcará como usada (se pondrá gris)
3. Si la letra NO está en la palabra:
   - ❌ Se añadirá una parte al dibujo del ahorcado
   - El contador de errores aumentará
   - Perderás un intento

### 6.2 Objetivo del juego

- Adivinar todas las letras de la palabra **antes** de completar el dibujo del ahorcado
- Tienes **6 intentos fallidos** permitidos
- Si completas la palabra: ¡GANAS! 🎉
- Si completas el dibujo: PIERDES 😢

### 6.3 Funciones adicionales

- **Cambiar idioma**: Haz clic en "EN" o "ES" en la esquina superior derecha
- **Nuevo juego**: Haz clic en el botón "New Game"
- **Teclado físico**: También puedes presionar las letras en tu teclado

---

## 🔍 PASO 7: Verificar que todo funciona

### 7.1 Verificar el Backend (API)

1. Abre una nueva pestaña en tu navegador
2. Escribe: `http://localhost:3000/api/health`
3. Presiona Enter

**Deberías ver algo como**:
```json
{
  "success": true,
  "message": "Hangman API is running",
  "timestamp": "2025-10-30T..."
}
```

Si ves esto, el backend funciona correctamente. ✅

### 7.2 Verificar la base de datos (Adminer)

1. Abre una nueva pestaña en tu navegador
2. Escribe: `http://localhost:8080`
3. Deberías ver una página de login

**Datos de acceso**:
- System: **PostgreSQL**
- Server: **postgres**
- Username: **hangman_user**
- Password: **hangman_pass**
- Database: **hangman_db**

4. Haz clic en **Login**
5. Deberías ver las tablas: `users`, `words`, `games`, `game_history`

Si ves las tablas, la base de datos funciona correctamente. ✅

---

## 📊 PASO 8: Ver los logs (Opcional)

Si quieres ver qué está pasando "detrás de escena":

### 8.1 Abrir nueva ventana de PowerShell

1. Abre PowerShell (Windows + X)
2. Navega a la carpeta:
```bash
cd "C:\Users\Jhon Orrego\Desktop\ChatGPTApps\hangman-game"
```

### 8.2 Ver logs en tiempo real

Escribe:
```bash
docker-compose logs -f
```

Verás mensajes como:
```
backend    | 🚀 Server running on port 3000
backend    | 📍 API: http://localhost:3000/api
frontend   | VITE v5.4.11 ready in 2000 ms
frontend   | ➜  Local:   http://localhost:5173/
postgres   | database system is ready to accept connections
```

**Para salir de los logs**: Presiona **Ctrl + C**

---

## 🛑 PASO 9: Detener la aplicación

Cuando termines de jugar y quieras apagar todo:

### 9.1 Método 1: Desde PowerShell

1. Abre PowerShell en la carpeta del proyecto
2. Escribe:
```bash
docker-compose down
```
3. Presiona Enter

Verás:
```
Stopping hangman-frontend ... done
Stopping hangman-backend  ... done
Stopping hangman-postgres ... done
Removing hangman-frontend ... done
Removing hangman-backend  ... done
Removing hangman-postgres ... done
```

### 9.2 Método 2: Desde Docker Desktop

1. Abre Docker Desktop
2. Ve a la pestaña **"Containers"**
3. Verás los contenedores en ejecución
4. Haz clic en el botón **"Stop"** (⏹️) junto a cada contenedor

### 9.3 Cerrar Docker Desktop (Opcional)

Si quieres apagar Docker completamente:
1. Haz clic derecho en el ícono de Docker en la barra de tareas
2. Selecciona **"Quit Docker Desktop"**

---

## 🔄 PASO 10: Iniciar de nuevo (Veces siguientes)

La próxima vez que quieras jugar:

1. ✅ Abre **Docker Desktop** (debe estar corriendo)
2. ✅ Abre **PowerShell** en la carpeta del proyecto
3. ✅ Ejecuta: `.\start.bat`
4. ✅ Selecciona opción **1**
5. ✅ Espera 1-2 minutos (mucho más rápido que la primera vez)
6. ✅ Abre el navegador: `http://localhost:5173`

**Mucho más rápido**: Solo 1-2 minutos porque Docker ya tiene todo descargado.

---

## 🐛 Solución de Problemas Comunes

### ❌ Error: "Docker is not running"

**Solución**:
1. Busca el ícono de Docker en la barra de tareas (esquina inferior derecha)
2. Si no está ahí, abre Docker Desktop desde el menú de inicio
3. Espera a que diga "Docker Desktop is running" (verde)
4. Intenta de nuevo

### ❌ Error: "port is already allocated"

**Problema**: Otro programa está usando los puertos 3000 o 5173.

**Solución**:
1. Abre PowerShell como administrador
2. Para liberar el puerto 3000:
```bash
netstat -ano | findstr :3000
taskkill /PID [número_que_aparece] /F
```
3. Para liberar el puerto 5173:
```bash
netstat -ano | findstr :5173
taskkill /PID [número_que_aparece] /F
```

### ❌ Error: "Cannot connect to backend"

**Solución**:
1. Verifica que todos los contenedores estén corriendo:
```bash
docker ps
```
2. Deberías ver 4 contenedores: postgres, backend, frontend, adminer
3. Si falta alguno:
```bash
docker-compose restart
```

### ❌ La página no carga en el navegador

**Solución**:
1. Espera 1-2 minutos más (puede tardar en iniciar)
2. Refresca la página (F5)
3. Verifica que el frontend esté corriendo:
```bash
docker-compose logs frontend
```
4. Busca mensajes de error

### ❌ WSL 2 no está instalado

Si ves este error durante la instalación de Docker:

**Solución**:
1. Abre PowerShell como **administrador**
2. Ejecuta:
```bash
wsl --install
```
3. Reinicia tu PC
4. Intenta instalar Docker Desktop de nuevo

---

## 📝 Comandos Útiles de Referencia Rápida

```bash
# Ver estado de contenedores
docker ps

# Ver todos los contenedores (incluso detenidos)
docker ps -a

# Iniciar el proyecto
.\start.bat

# Detener el proyecto
docker-compose down

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs solo del backend
docker-compose logs -f backend

# Ver logs solo del frontend
docker-compose logs -f frontend

# Reiniciar un servicio específico
docker-compose restart backend

# Reconstruir todo desde cero
docker-compose down
docker-compose up --build

# Limpiar todo (cuidado: borra datos)
docker-compose down -v
```

---

## ✅ Checklist de Verificación Final

Marca cada punto cuando lo completes:

- [ ] Docker Desktop instalado
- [ ] Docker Desktop está corriendo (ícono verde)
- [ ] Comando `docker --version` funciona
- [ ] Comando `docker ps` funciona
- [ ] Estoy en la carpeta correcta del proyecto
- [ ] Ejecuté `.\start.bat` sin errores
- [ ] http://localhost:5173 se abre y muestra el juego
- [ ] http://localhost:3000/api/health responde con JSON
- [ ] Puedo jugar una partida completa
- [ ] Puedo cambiar de idioma (EN/ES)
- [ ] Sé cómo detener la aplicación con `docker-compose down`

**Si marcaste todos**, ¡felicitaciones! Has completado la configuración exitosamente. 🎉

---

## 🆘 ¿Necesitas Ayuda?

Si algo no funciona:

1. **Revisa los logs**:
```bash
docker-compose logs -f
```

2. **Verifica el estado**:
```bash
docker ps
```

3. **Reinicia todo**:
```bash
docker-compose down
docker-compose up -d
```

4. **En último caso**, reconstruye desde cero:
```bash
docker-compose down -v
docker-compose up --build
```

---

## 🎯 Resumen Ultra Rápido

Para usuarios que ya completaron el setup:

```bash
# 1. Abrir Docker Desktop (debe estar corriendo)
# 2. Abrir PowerShell en la carpeta del proyecto
# 3. Ejecutar:
.\start.bat
# 4. Seleccionar opción 1
# 5. Abrir navegador: http://localhost:5173
# 6. ¡Jugar!
# 7. Para detener: docker-compose down
```

---

**¡Disfruta jugando Hangman! 🎮**

Si tienes algún problema, revisa la sección de "Solución de Problemas" o los logs con `docker-compose logs -f`.
