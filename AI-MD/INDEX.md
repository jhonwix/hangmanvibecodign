# 📚 ÍNDICE MAESTRO - PROYECTO HANGMAN

## 🎯 Propósito
Este documento sirve como tabla de contenidos central para todos los recursos del proyecto Hangman con arquitectura hexagonal y soporte multi-idioma.

---

## 📖 Documentos Disponibles

### 1. **CLAUDE.md** (~11 KB)
**Tipo:** Contexto técnico completo  
**Ubicación:** `/home/claude/CLAUDE.md`  
**Propósito:** Documento de referencia permanente que Claude Code consulta constantemente

**Contenido:**
- 📋 Descripción general del proyecto
- 🏗️ Arquitectura hexagonal detallada
- 📁 Estructura de carpetas exacta
- 🎮 Reglas del juego (6 intentos, categorías, etc.)
- 🛠️ Stack tecnológico recomendado
- 📱 Requisitos técnicos (responsive, animaciones, i18n)
- 🗄️ Esquema PostgreSQL con 4 tablas
- 📊 API endpoints (20+ rutas)
- ✅ Checklist de implementación
- 🎨 Temas y animaciones
- 📝 Notas importantes y comandos clave

**Cuándo consultarlo:**
- Antes de empezar cada paso
- Para especificaciones exactas
- Para verificar requisitos
- Para entender la arquitectura

---

### 2. **PROMPTS_HANGMAN.md** (~25 KB)
**Tipo:** 13 prompts estructurados  
**Ubicación:** `/home/claude/PROMPTS_HANGMAN.md`  
**Propósito:** Suite de prompts listos para usar en Claude Code, cada uno completo y autoexplicativo

**Contenido - Los 13 Prompts:**
1. ✅ **PROMPT 1** - Estructura inicial (carpetas, package.json, docker-compose)
2. 🗄️ **PROMPT 2** - Base de datos PostgreSQL (entidades, relaciones, seed)
3. 💡 **PROMPT 3** - Lógica de dominio (entidades, servicios, casos de uso)
4. 🔌 **PROMPT 4** - Adapters y repositorios (persistencia)
5. 🛣️ **PROMPT 5** - Controllers y rutas API (20+ endpoints)
6. 🧪 **PROMPT 6** - Tests unitarios e integración (80%+ coverage)
7. ⚛️ **PROMPT 7** - Estructura React y componentes
8. 🌍 **PROMPT 8** - Internacionalización EN/ES con i18next
9. 🎨 **PROMPT 9** - Animaciones CSS y Tailwind responsivo
10. 🔗 **PROMPT 10** - Integración frontend-backend (API y hooks)
11. 🧪 **PROMPT 11** - Tests React y optimización performance
12. 🐳 **PROMPT 12** - Docker y deployment
13. 📋 **PROMPT 13** - Documentación completa

**Características:**
- ✔️ Cada prompt es completo e independiente
- ✔️ Pueden ejecutarse en orden o adaptados
- ✔️ Referencias cruzadas a CLAUDE.md
- ✔️ Especificaciones exactas de archivos
- ✔️ Ejemplos de código cuando aplica

**Cómo usar:**
```
claude> Ejecuta PROMPT X de PROMPTS_HANGMAN.md:
[Copiar contenido del prompt]
```

---

### 3. **QUICK_START.md** (~11 KB)
**Tipo:** Guía paso a paso  
**Ubicación:** `/home/claude/QUICK_START.md`  
**Propósito:** Overview ejecutivo de los 13 pasos con instrucciones de alto nivel

**Contenido:**
- 🚀 Preparación inicial (5 min)
- 📋 Los 13 pasos con resumen y comandos
- ✅ Verificación final
- 📊 Estadísticas esperadas
- 🔄 Commits Git recomendados
- 💾 Troubleshooting básico
- 📚 Recursos adicionales

**Cuándo consultarlo:**
- Para entender el flujo general
- Para ver timeline estimado
- Para verificar que vás en buen camino
- Para next steps

---

### 4. **PRACTICAL_GUIDE.md** (~18 KB)
**Tipo:** Guía práctica con ejemplos reales  
**Ubicación:** `/home/claude/PRACTICAL_GUIDE.md`  
**Propósito:** Ejemplos concretos y código real de cómo usar todo en Claude Code

**Contenido:**
- ⚙️ Instalación inicial de Claude Code
- 🚀 Cómo iniciar el proyecto
- 💻 Código exacto de cada paso (PASO 1 completo, PASO 2 completo, etc.)
- 📝 Respuestas esperadas después de cada comando
- ✅ Verificación en terminal
- 🛠️ Comandos útiles en Claude Code
- 🆘 Troubleshooting detallado
- 📊 Timeline con tabla
- 🎯 Resumen final

**Cuándo consultarlo:**
- Cuando necesites código real (no teórico)
- Si no sabes qué escribir en Claude Code
- Para verificar que la salida es correcta
- Si algo falla y necesitas debuggear

---

## 🗺️ Mapa de Referencia Rápida

### Por Situación:

**"Quiero entender la arquitectura"**
→ Lee CLAUDE.md sección "🏗️ Arquitectura Hexagonal"

**"Quiero saber los 13 pasos"**
→ Lee QUICK_START.md sección "Ejecución Paso a Paso"

**"Quiero el prompt exacto a usar"**
→ Abre PROMPTS_HANGMAN.md, busca PROMPT N

**"Quiero ver código real"**
→ Abre PRACTICAL_GUIDE.md, busca "PASO X: Ejemplo Real"

**"Qué viene después?"**
→ QUICK_START.md sección "Verificación Final"

**"Algo falló, ¿qué hago?"**
→ PRACTICAL_GUIDE.md sección "Troubleshooting"

---

## 🔗 Referencias Cruzadas

### Estructura de Carpetas
- CLAUDE.md: "Estructura de Carpetas"
- PROMPTS_HANGMAN.md: PROMPT 1
- PRACTICAL_GUIDE.md: "PASO 1: Estructura Inicial"

### Base de Datos
- CLAUDE.md: "Esquema PostgreSQL"
- PROMPTS_HANGMAN.md: PROMPT 2
- PRACTICAL_GUIDE.md: "PASO 2: Base de Datos"

### API Endpoints
- CLAUDE.md: "API Endpoints"
- PROMPTS_HANGMAN.md: PROMPT 5
- PRACTICAL_GUIDE.md: "PASO 5: Controllers"

### Frontend React
- CLAUDE.md: "Frontend" en Estructura
- PROMPTS_HANGMAN.md: PROMPT 7
- PRACTICAL_GUIDE.md: "PASO 7: Frontend React"

### Internacionalización
- CLAUDE.md: "Multiidioma (i18n)"
- PROMPTS_HANGMAN.md: PROMPT 8
- PRACTICAL_GUIDE.md: "PASO 8: i18n"

### Animaciones
- CLAUDE.md: "Animaciones Principales"
- PROMPTS_HANGMAN.md: PROMPT 9
- PRACTICAL_GUIDE.md: "PASO 9: Animaciones"

### Docker
- CLAUDE.md: "Checklist de Implementación"
- PROMPTS_HANGMAN.md: PROMPT 12
- PRACTICAL_GUIDE.md: "PASO 12: Docker"

---

## 📝 Resumen de Contenido

| Documento | KB | Secciones | Mejor para | Tiempo |
|-----------|-------|-----------|-----------|---------|
| CLAUDE.md | 11 | 15+ | Referencias técnicas | Consultar |
| PROMPTS_HANGMAN.md | 25 | 13 prompts | Código a escribir | Copiar-pegar |
| QUICK_START.md | 11 | 13 pasos | Overview general | 5 min lectura |
| PRACTICAL_GUIDE.md | 18 | Ejemplos reales | Debugging | Consultar |

**Total: 65 KB de documentación completa**

---

## 🚀 Flujo de Trabajo Recomendado

### PRIMERA VEZ (Setup):
1. Lee **QUICK_START.md** (5 min)
2. Crea carpeta: `mkdir hangman-game && cd hangman-game`
3. Inicia Claude Code: `claude code`

### PARA CADA PASO:
1. Abre **PROMPTS_HANGMAN.md** 
2. Busca PROMPT N (el que toca)
3. Copia el contenido
4. Pega en Claude Code
5. Si dudas: consulta **PRACTICAL_GUIDE.md** para ese paso
6. Verifica en terminal

### CUANDO ALGO FALLA:
1. Abre **PRACTICAL_GUIDE.md**
2. Busca "PASO X: Ejemplo Real"
3. Compara tu output con el esperado
4. Consulta sección "Troubleshooting"

### PARA MODIFICACIONES:
1. Referencia: **CLAUDE.md** (especificaciones exactas)
2. Pide a Claude Code: "Modifica [archivo] para..."

---

## ✅ Checklist de Uso

```
☐ Leí QUICK_START.md para entender los 13 pasos
☐ Tengo acceso a /home/claude/CLAUDE.md
☐ Tengo acceso a /home/claude/PROMPTS_HANGMAN.md
☐ Tengo acceso a /home/claude/PRACTICAL_GUIDE.md
☐ Creé la carpeta hangman-game
☐ Inicia Claude Code correctamente
☐ Empecé con PROMPT 1
☐ Verifico cada paso con PRACTICAL_GUIDE.md
☐ Ejecuto tests después de cada PROMPT
☐ Hago commits Git después de cada PROMPT
```

---

## 🎯 Indicadores de Progreso

### Después de PROMPT 1:
```
✓ 47 carpetas creadas
✓ 8 archivos base (package.json, etc)
✓ Docker compose listo
```

### Después de PROMPT 6:
```
✓ Backend completado 100%
✓ 80%+ test coverage
✓ API funcional en localhost:3000
✓ BD sincronizada
```

### Después de PROMPT 11:
```
✓ Frontend completado 100%
✓ 75%+ test coverage
✓ App funcional en localhost:5173
✓ Conectado con backend
```

### Después de PROMPT 13:
```
✓ Proyecto completo
✓ Documentación completa
✓ Listo para producción
✓ Docker compose funciona
```

---

## 📱 Tamaños de Archivo Esperados

| Componente | Archivos | Líneas de Código | KB |
|-----------|----------|-----------------|-----|
| Backend Core | 15 | 2000+ | 150 |
| Backend Adapters | 10 | 1500+ | 120 |
| Backend Tests | 10 | 2000+ | 100 |
| Frontend Components | 10 | 1500+ | 100 |
| Frontend Hooks | 3 | 800+ | 50 |
| Frontend Tests | 5 | 1000+ | 50 |
| i18n (2 idiomas) | 2 | 200+ | 30 |
| CSS/Animations | 3 | 500+ | 40 |
| **TOTAL** | **58** | **9500+** | **640 KB** |

---

## 🔧 Stack Final

**Backend:**
- Node.js 18+
- Express.js
- TypeScript
- TypeORM
- PostgreSQL 14
- Jest + Supertest

**Frontend:**
- React 18+
- TypeScript
- Vite
- Tailwind CSS
- i18next
- Vitest + RTL

**DevOps:**
- Docker + Docker Compose
- PostgreSQL volume
- nginx para frontend

---

## 💡 Tips Importantes

1. **Mantén CLAUDE.md abierto** - Referencialo constantemente
2. **Ejecuta los prompts en orden** - Dependen unos de otros
3. **Verifica cada paso** - Usa los ejemplos de PRACTICAL_GUIDE.md
4. **Haz commits Git** - Después de cada PROMPT completado
5. **Consulta el contexto** - Siempre referencia a CLAUDE.md

---

## 🆘 Soporte Rápido

**"No sé qué hacer"**
→ Lee QUICK_START.md línea por línea

**"El prompt no funciona"**
→ Compara con PRACTICAL_GUIDE.md, misma sección

**"Necesito especificaciones"**
→ Consulta CLAUDE.md, sección relevante

**"Quiero ver código"**
→ Abre PRACTICAL_GUIDE.md, busca "Código Real"

**"Qué falta?"**
→ Revisa CLAUDE.md checklist, marca lo que hayas hecho

---

## 📊 Estadísticas del Proyecto

- **Documentación total:** 65 KB
- **Prompts incluidos:** 13
- **Pasos guiados:** 13
- **Tiempo estimado:** 6-8 horas
- **Cobertura de tests:** 80%+
- **Líneas de código final:** 9500+
- **Componentes frontend:** 10+
- **Endpoints API:** 20+
- **Idiomas soportados:** 2 (EN/ES)
- **Breakpoints responsive:** 3 (Mobile, Tablet, Desktop)

---

## 🎉 Resultado Final

Al completar todos los pasos tendrás:

✅ **Backend funcional**
- Arquitectura hexagonal pura
- Casos de uso reutilizables
- 80%+ test coverage
- API REST robusta
- PostgreSQL con seed data

✅ **Frontend profesional**
- 10+ componentes React
- Multiidioma (EN/ES)
- Animations suaves
- 100% responsive
- Integrado con backend

✅ **DevOps listo**
- Docker Compose
- Servicios containerizados
- BD persistente
- Listo para producción

✅ **Documentación completa**
- API docs
- Architecture guide
- Contributing guide
- Troubleshooting

---

## 📞 Último Paso: ¡Empezar!

```bash
# 1. Crear proyecto
mkdir hangman-game && cd hangman-game

# 2. Iniciar Claude Code
claude code

# 3. En Claude Code, escribe:
# "Referencia: /home/claude/CLAUDE.md
# Ejecuta PROMPT 1 de /home/claude/PROMPTS_HANGMAN.md"

# 4. ¡Disfruta!
```

---

**Última actualización:** 2025-10-30  
**Estado:** 100% Listo para usar  
**Versión:** 1.0 - Completa

¡Buena suerte con tu proyecto Hangman! 🎮✨
