# 🔧 SOLUCIÓN INMEDIATA - Problema de CORS Resuelto

## 📊 Estado Actual

### ✅ Lo que funciona
- ✅ Backend corriendo en puerto 3000
- ✅ Frontend corriendo en puerto 5174
- ✅ PostgreSQL conectada
- ✅ Base de datos con 30 palabras
- ✅ API responde correctamente con PowerShell/curl

### ❌ Problema
- ❌ El navegador bloquea las solicitudes por CORS
- ❌ Error: "Access-Control-Allow-Origin' header has a value 'http://localhost:5173' that is not equal to the supplied origin"

## 🎯 SOLUCIÓN RÁPIDA: Usar puerto 5173

El backend ya está configurado para puerto 5173, pero el frontend arrancó en 5174 porque 5173 estaba ocupado.

### Paso 1: Cerrar el frontend actual

En la PowerShell donde está corriendo el frontend, presiona **Ctrl + C** para detenerlo.

### Paso 2: Verificar si hay algo corriendo en puerto 5173

```powershell
netstat -ano | findstr :5173
```

Si ves algún proceso, anota el PID (último número) y ciérralo:

```powershell
taskkill /PID <número_del_pid> /F
```

### Paso 3: Iniciar el frontend de nuevo

```powershell
cd frontend
npm run dev
```

**Deberías ver:**
```
VITE v5.4.21  ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Paso 4: Abre el navegador

Navega a: **http://localhost:5173**

¡El juego debería funcionar ahora! 🎉

---

## 🔄 SOLUCIÓN ALTERNATIVA: Reiniciar el backend

Si prefieres mantener el frontend en puerto 5174, necesitas reiniciar el backend para que lea la nueva configuración de CORS.

### Paso 1: Detener el backend

En la PowerShell donde está corriendo el backend, presiona **Ctrl + C**.

### Paso 2: Reiniciar el backend

```powershell
cd backend
npm run dev
```

**El backend debería mostrar:**
```
✅ Database connection established successfully
🚀 Server running on port 3000
```

### Paso 3: Verificar que funciona

Abre el navegador en: **http://localhost:5174**

¡Ahora debería funcionar! 🎮

---

## 🧪 VERIFICAR QUE TODO FUNCIONA

### 1. Ver en el navegador

Abre http://localhost:5173 o http://localhost:5174 (dependiendo de la solución que usaste).

**Deberías ver:**
- Título "Hangman Game"
- Switch de idioma EN/ES en la parte superior derecha
- El juego debería cargar automáticamente
- Palabra oculta: `_ _ _ _ _` (o el número de letras de la palabra seleccionada)
- Teclado A-Z activo
- Dibujo del ahorcado vacío

### 2. Jugar una partida

1. El juego debería iniciar automáticamente
2. Haz clic en una letra (por ejemplo, "A")
3. Si la letra está en la palabra:
   - ✅ Se revela en la palabra
   - ✅ Animación bounce verde
4. Si la letra NO está:
   - ❌ Se dibuja una parte del ahorcado
   - ❌ Animación shake roja
   - ⬇️ Intentos restantes disminuyen

### 3. Cambiar idioma

Haz clic en el switch **EN/ES** en la esquina superior derecha.
- Todos los textos deberían cambiar al idioma seleccionado
- La interfaz se actualiza inmediatamente

---

## 🐛 SI AÚN NO FUNCIONA

### Error en consola del navegador

Presiona **F12** → pestaña **Console**.

#### Si ves "CORS policy"

El backend no se reinició correctamente. Repite el PASO 2 de la solución alternativa.

#### Si ves "Validation failed"

El frontend está enviando datos incorrectos. Esto ya está arreglado en el código.
Cierra todas las PowerShells y vuelve a iniciar todo:

```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (nueva terminal)
cd frontend
npm run dev
```

#### Si ves "Network Error" o "ERR_CONNECTION_REFUSED"

El backend no está corriendo. Verifica que veas el mensaje "🚀 Server running on port 3000" en la terminal del backend.

---

## ✅ CUANDO TODO FUNCIONE

Verás esto en el navegador:

### Al cargar la página
```
Hangman Game                                [EN / ES]
=========================================

     +---+
     |   |
         |
         |
         |
         |
    =========

Palabra: _ _ _ _ _ _

Categoría: Animals | Dificultad: Medium
Intentos restantes: 6

[A][B][C][D][E][F][G][H][I][J][K][L][M]
[N][O][P][Q][R][S][T][U][V][W][X][Y][Z]
```

### Después de adivinar letras

Las letras correctas se mostrarán en la palabra, las incorrectas dibujarán el ahorcado.

---

## 📁 ARCHIVOS MODIFICADOS (ya actualizados)

1. **backend/.env** - CORS actualizado para ambos puertos
2. **backend/src/app.ts** - CORS acepta múltiples orígenes
3. **frontend/src/services/api.ts** - Comentarios agregados

**NO necesitas tocar ningún archivo**. Los cambios ya están aplicados.

---

## 🎊 RESUMEN

| Componente | Puerto | Estado | URL |
|------------|--------|--------|-----|
| Backend | 3000 | ✅ Running | http://localhost:3000/api |
| Frontend | 5173 o 5174 | ✅ Running | http://localhost:5173 |
| PostgreSQL | 5432 | ✅ Running | localhost:5432 |
| BD | hangman_db | ✅ Configurada | 30 palabras cargadas |

**Próximo paso**: Sigue la SOLUCIÓN RÁPIDA arriba y ¡disfruta jugando Hangman! 🎮

---

**Documentación completa**: Ver [APLICACION_LISTA.md](APLICACION_LISTA.md)
