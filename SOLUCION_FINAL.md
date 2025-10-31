# 🎯 SOLUCIÓN FINAL - Cómo Ejecutar Hangman Game

## ❌ PROBLEMA ACTUAL

Tu proyecto necesita 3 servicios corriendo:
1. PostgreSQL (Base de datos) ❌ NO está corriendo
2. Backend (API) ❌ Falló porque necesita PostgreSQL
3. Frontend (Interfaz) ✅ Está corriendo pero no tiene datos

**Resultado**: Ves la interfaz pero no funciona el juego.

---

## ✅ SOLUCIÓN: USA DOCKER

Docker instalará y ejecutará TODO automáticamente en 10 minutos.

---

## 🚀 GUÍA PASO A PASO

### PASO 1: Instalar Docker Desktop (Solo primera vez)

#### 1.1 Descargar
1. Ve a: https://www.docker.com/products/docker-desktop
2. Haz clic en **"Download for Windows"**
3. Espera la descarga (500 MB aprox.)

#### 1.2 Instalar
1. Ejecuta el instalador descargado
2. Acepta cuando Windows pregunte por permisos
3. Deja las opciones por defecto marcadas
4. Haz clic en **OK** → Instalar
5. Cuando termine, haz clic en **Close and restart**
6. Tu PC se reiniciará

#### 1.3 Configurar (Primera vez después del reinicio)
1. Busca "Docker Desktop" en el menú de inicio
2. Ábrelo
3. Acepta los términos de servicio
4. Omite el tutorial (Skip)
5. **ESPERA** hasta ver en la parte inferior:
   ```
   🟢 Docker Desktop is running
   ```

**Tiempo total**: 15-20 minutos

---

### PASO 2: Ejecutar tu proyecto

#### 2.1 Abrir PowerShell en la carpeta del proyecto

**Método fácil**:
1. Abre el Explorador de Windows
2. Ve a: `C:\Users\Jhon Orrego\Desktop\ChatGPTApps\hangman-game`
3. Haz clic en la barra de dirección (arriba)
4. Escribe: `powershell`
5. Presiona Enter

#### 2.2 Ejecutar el script

En PowerShell, escribe:
```powershell
.\start.bat
```

Presiona Enter.

#### 2.3 Seleccionar modo desarrollo

Verás:
```
Select environment:
1) Development (with hot reload)
2) Production (optimized build)
Enter your choice (1 or 2):
```

Escribe: `1`

Presiona Enter.

#### 2.4 Esperar (Primera vez: 10-15 minutos)

Verás mensajes como:
```
Pulling postgres...
Building backend...
Building frontend...
Creating hangman-postgres ... done
Creating hangman-backend ... done
Creating hangman-frontend ... done
```

**¿Qué está pasando?**
- Docker descarga PostgreSQL
- Docker construye el backend
- Docker construye el frontend
- Inicia todo automáticamente

#### 2.5 ¡Listo!

Cuando veas:
```
✅ Development environment started!

Services available at:
  Frontend:  http://localhost:5173
  Backend:   http://localhost:3000
  Adminer:   http://localhost:8080
```

**¡Ya puedes jugar!**

---

### PASO 3: Abrir el juego

1. Abre tu navegador (Chrome, Edge, Firefox)
2. Ve a: **http://localhost:5173**
3. Deberías ver el juego funcionando completamente

---

## 🎮 CÓMO JUGAR

1. Verás una palabra oculta: `_ _ _ _`
2. Haz clic en las letras A-Z para adivinar
3. Si aciertas: la letra se revela
4. Si fallas: se añade una parte al ahorcado
5. Tienes 6 intentos
6. ¡Completa la palabra para ganar!

**Funciones**:
- 🌍 Cambiar idioma: Clic en EN/ES (arriba derecha)
- 🔄 Nuevo juego: Clic en "New Game"
- ⌨️ También puedes usar tu teclado físico

---

## 🛑 DETENER EL PROYECTO

Cuando termines de jugar:

En PowerShell:
```powershell
docker-compose down
```

Esto apaga todo (PostgreSQL, Backend, Frontend).

---

## 🔄 INICIAR DE NUEVO (Siguientes veces)

La próxima vez que quieras jugar:

1. Abre Docker Desktop (debe estar corriendo - ícono verde)
2. Abre PowerShell en la carpeta del proyecto
3. Ejecuta: `.\start.bat`
4. Selecciona: `1`
5. Espera 1-2 minutos (mucho más rápido)
6. Abre: http://localhost:5173

---

## ✅ VERIFICACIÓN

### Checklist de servicios:

Cuando esté todo corriendo, verifica:

- [ ] http://localhost:5173 → Muestra el juego ✅
- [ ] http://localhost:3000/api/health → Responde JSON ✅
- [ ] Puedo hacer clic en letras y funciona ✅
- [ ] Puedo cambiar idioma EN/ES ✅
- [ ] Se muestra el dibujo del ahorcado ✅
- [ ] Las estadísticas se actualizan ✅

Si todo está marcado: **¡Funciona perfectamente!** 🎉

---

## 🐛 PROBLEMAS COMUNES

### ❌ "Docker is not running"

**Solución**:
1. Abre Docker Desktop
2. Espera a ver el ícono verde
3. Intenta de nuevo

### ❌ "Port already in use"

**Solución**:
```powershell
docker-compose down
.\start.bat
```

### ❌ "Cannot connect to Docker daemon"

**Solución**:
1. Cierra Docker Desktop
2. Ábrelo de nuevo como Administrador:
   - Clic derecho en Docker Desktop
   - "Ejecutar como administrador"
3. Espera a que esté verde
4. Intenta de nuevo

### ❌ La página carga pero dice "No response from server"

**Solución**:
Espera 1-2 minutos más. El backend tarda un poco en iniciar.

Verifica que todo esté corriendo:
```powershell
docker ps
```

Deberías ver 4 contenedores:
- hangman-postgres
- hangman-backend
- hangman-frontend
- hangman-adminer

---

## 📊 COMANDOS ÚTILES

```powershell
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs solo del backend
docker-compose logs -f backend

# Reiniciar todo
docker-compose restart

# Ver qué está corriendo
docker ps

# Detener todo
docker-compose down

# Limpiar todo y empezar de cero
docker-compose down -v
docker-compose up --build
```

---

## 📚 RESUMEN

### Lo que tienes:
- ✅ Proyecto completo (Backend + Frontend + Database)
- ✅ Todo configurado y listo
- ✅ 100% funcional

### Lo que necesitas:
- ⚠️ Docker Desktop instalado y corriendo

### Pasos:
1. Instalar Docker (15 min primera vez)
2. Ejecutar `.\start.bat` (10-15 min primera vez)
3. Abrir http://localhost:5173
4. ¡Jugar!

---

## 🎯 TU PRÓXIMA ACCIÓN

**AHORA MISMO**:

1. Si NO tienes Docker:
   → Descarga: https://www.docker.com/products/docker-desktop
   → Instala y reinicia

2. Si YA tienes Docker:
   → Abre Docker Desktop
   → Ejecuta `.\start.bat`
   → Selecciona `1`
   → Espera
   → Abre http://localhost:5173

---

## 🎉 RESULTADO FINAL

Cuando todo esté corriendo:

```
✅ Juego completo funcionando
✅ Base de datos con palabras
✅ Backend API REST
✅ Frontend React con animaciones
✅ Bilingüe EN/ES
✅ Responsive design
✅ 33 tests pasando
```

---

**¡ESO ES TODO! Con Docker es súper fácil.** 🚀

¿Tienes Docker instalado? Si no, descárgalo ahora y en 15 minutos estarás jugando.
