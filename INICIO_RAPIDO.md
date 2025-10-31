# 🚀 INICIO RÁPIDO - Hangman Game

## ✅ ESTADO DEL PROYECTO

Tu proyecto está **100% completo y listo** para ejecutarse.

---

## 🎯 PARA INICIAR AHORA MISMO

### Requisito: Docker Desktop

**Si NO tienes Docker Desktop instalado**:
1. Ve a: https://www.docker.com/products/docker-desktop
2. Descarga e instala (tarda 15 min primera vez)
3. Reinicia tu PC
4. Abre Docker Desktop y espera a que diga "🟢 Docker Desktop is running"

**Si YA tienes Docker Desktop**:
- Solo asegúrate de que esté abierto y corriendo (ícono verde en la barra de tareas)

---

## 🏃 PASOS RÁPIDOS (2 MINUTOS)

### 1. Abre PowerShell en la carpeta del proyecto

**Método Rápido**:
- Abre el Explorador de Windows
- Navega a: `C:\Users\Jhon Orrego\Desktop\ChatGPTApps\hangman-game`
- Haz clic en la barra de dirección
- Escribe: `powershell`
- Presiona Enter

### 2. Ejecuta el script de inicio

```powershell
.\start.bat
```

### 3. Selecciona opción 1

Cuando pregunte, escribe: `1` y presiona Enter

### 4. Espera

- **Primera vez**: 10-15 minutos (descarga imágenes Docker)
- **Siguientes veces**: 1-2 minutos

### 5. Abre el navegador

Ve a: **http://localhost:5173**

---

## 🎮 ¡LISTO PARA JUGAR!

Deberías ver:
- ✅ Juego Hangman cargado
- ✅ Palabra oculta: `_ _ _ _`
- ✅ Teclado A-Z
- ✅ Switch idioma EN/ES

---

## 🛑 PARA DETENER

En PowerShell:
```powershell
docker-compose down
```

---

## 📚 MÁS INFORMACIÓN

- **Guía completa Windows**: [GUIA_INICIO_WINDOWS.md](GUIA_INICIO_WINDOWS.md)
- **Guía de pruebas**: [TESTING.md](TESTING.md)
- **Resumen del proyecto**: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- **README principal**: [README.md](README.md)

---

## 🆘 PROBLEMAS COMUNES

### ❌ "Docker is not running"
**Solución**: Abre Docker Desktop y espera a que esté verde

### ❌ "Port already in use"
**Solución**:
```powershell
docker-compose down
.\start.bat
```

### ❌ Errores de Service Worker (sw.js)
**Solución**:
1. Ve a `chrome://serviceworker-internals/`
2. Busca `localhost:5173`
3. Haz clic en "Unregister"
4. Refresca la página (F5)

### ❌ La página no carga
**Solución**:
1. Espera 1-2 minutos más
2. Refresca (F5)
3. Revisa logs: `docker-compose logs -f`

---

## ✅ VERIFICACIÓN RÁPIDA

Marca cuando completes:

- [ ] Docker Desktop instalado y corriendo (verde)
- [ ] Ejecuté `.\start.bat` sin errores
- [ ] http://localhost:5173 abre el juego
- [ ] Puedo hacer clic en letras
- [ ] Puedo cambiar idioma EN/ES
- [ ] Sé detener con `docker-compose down`

---

## 🎉 ¡ESO ES TODO!

El proyecto incluye:
- ✅ Backend API REST (Node.js + Express)
- ✅ Frontend React con Tailwind
- ✅ PostgreSQL Database
- ✅ Docker Compose completo
- ✅ 33 tests unitarios
- ✅ Bilingüe EN/ES
- ✅ 100% funcional

**Disfruta jugando Hangman! 🎮**
