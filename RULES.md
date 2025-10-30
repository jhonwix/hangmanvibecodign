# 🎮 Reglas del Juego Hangman / Ahorcado

## 📖 Reglas Básicas

### Objetivo
Adivinar una palabra oculta letra por letra antes de agotar todos los intentos disponibles.

### Mecánica del Juego

1. **Inicio del Juego**
   - El sistema selecciona una palabra aleatoria de la base de datos
   - La palabra se muestra oculta con guiones bajos: `_ _ _ _ _`
   - Se otorgan **6 intentos** para adivinar la palabra completa
   - Cada letra solo puede adivinarse una vez

2. **Adivinando Letras**
   - El jugador selecciona una letra del alfabeto (A-Z)
   - Si la letra está en la palabra:
     - ✅ La letra se revela en todas sus posiciones
     - El número de intentos restantes NO disminuye
     - La letra queda marcada como usada (verde)
   - Si la letra NO está en la palabra:
     - ❌ Se pierde un intento
     - La letra queda marcada como incorrecta (roja)
     - Aparece una parte del dibujo del ahorcado

3. **Condiciones de Victoria**
   - ✅ **Ganas si**: Adivinas todas las letras antes de agotar los 6 intentos
   - Se muestra mensaje de victoria
   - Se revela la palabra completa
   - Se actualizan las estadísticas del jugador

4. **Condiciones de Derrota**
   - ❌ **Pierdes si**: Agotas los 6 intentos sin completar la palabra
   - Se muestra mensaje de derrota
   - Se revela la palabra completa
   - Se muestra el dibujo completo del ahorcado

5. **Abandonar el Juego**
   - En cualquier momento puedes rendirte usando el botón "Surrender/Rendirse"
   - Se considera como derrota
   - Se revela la palabra completa

## 🎯 Características de las Palabras

### Longitud
- **Mínimo**: 4 letras
- **Máximo**: 12 letras
- Palabras de dificultad variable

### Categorías Disponibles
1. **Animales** (Animals)
   - Ejemplos: GATO, PERRO, ELEFANTE, LEÓN
2. **Objetos** (Objects)
   - Ejemplos: MESA, LIBRO, LÁMPARA, SILLA
3. **Frutas** (Fruits)
   - Ejemplos: MANZANA, PERA, PLÁTANO, UVA
4. **Países** (Countries)
   - Ejemplos: ESPAÑA, MÉXICO, BRASIL, FRANCIA
5. **Películas** (Movies)
   - Ejemplos: AVATAR, TITANIC, GLADIADOR

### Niveles de Dificultad
- **Nivel 1 (Fácil)**: 4-6 letras, palabras comunes
- **Nivel 2 (Medio)**: 7-9 letras, palabras moderadas
- **Nivel 3 (Difícil)**: 10-12 letras, palabras complejas

## 📊 Sistema de Puntuación

### Estadísticas Registradas
- Total de juegos jugados
- Victorias acumuladas
- Derrotas acumuladas
- Porcentaje de victorias
- Racha actual (victorias consecutivas)

### Sin Sistema de Puntos
- Este juego no tiene puntos numéricos
- El objetivo es simplemente ganar adivinando la palabra

## 🎨 Interfaz Visual

### Indicadores Visuales

1. **Progreso del Ahorcado** (6 estados)
   - Estado 0: Ninguna parte dibujada
   - Estado 1: Base
   - Estado 2: Poste vertical
   - Estado 3: Poste horizontal
   - Estado 4: Cuerda
   - Estado 5: Cabeza
   - Estado 6: Cuerpo completo (derrota)

2. **Estado de las Letras**
   - 🔵 **No usada**: Letra disponible (azul/gris)
   - 🟢 **Correcta**: Letra adivinada correctamente (verde)
   - 🔴 **Incorrecta**: Letra fallida (rojo)

3. **Información Mostrada**
   - Palabra oculta con letras reveladas
   - Intentos restantes: `X/6`
   - Letras ya usadas
   - Categoría de la palabra
   - Botón para nueva partida
   - Botón para rendirse

## 🌍 Multiidioma

### Idiomas Soportados
- 🇬🇧 **Inglés (EN)**: Palabras y UI en inglés
- 🇪🇸 **Español (ES)**: Palabras y UI en español

### Cambio de Idioma
- Cambio en tiempo real mediante selector
- La palabra actual continúa en el idioma en que inició
- Las nuevas partidas usan el idioma seleccionado
- Preferencia guardada en el navegador

## 💡 Tips y Estrategias

### Consejos para Ganar

1. **Empieza con vocales comunes**
   - EN: A, E, I, O, U
   - ES: A, E, I, O, U
   - Las vocales aparecen frecuentemente

2. **Consonantes frecuentes**
   - EN: R, S, T, N, L
   - ES: R, S, N, L, D

3. **Observa el patrón**
   - Usa la longitud de la palabra
   - Identifica patrones comunes
   - Deduce letras por contexto

4. **Prioriza letras dobles**
   - LL, RR, SS son comunes en español
   - OO, EE en inglés

5. **Usa la categoría**
   - La categoría da pistas sobre la palabra
   - Piensa en palabras típicas de esa categoría

### Errores Comunes a Evitar

- ❌ No adivinar letras poco comunes primero (Q, Z, X, K)
- ❌ Ignorar la categoría de la palabra
- ❌ No prestar atención a las letras ya usadas
- ❌ Rendirse demasiado pronto

## 🏆 Logros y Desafíos

### Desafíos Especiales
- **Racha perfecta**: Gana 5 juegos consecutivos
- **Maestro del idioma**: Gana en ambos idiomas
- **Eficiencia**: Adivina con 0 errores
- **Categoría experta**: Domina todas las categorías

## 📱 Responsive y Accesibilidad

### Compatibilidad
- ✅ Móvil (320px+): Layout vertical optimizado
- ✅ Tablet (768px+): Layout de 2 columnas
- ✅ Desktop (1024px+): Layout completo

### Accesibilidad
- Soporte para teclado completo
- Labels ARIA para lectores de pantalla
- Contraste WCAG AA
- Animaciones suaves (sin mareos)

## 🔄 Flujo del Juego

```
1. Iniciar Juego
   ↓
2. Seleccionar idioma (opcional)
   ↓
3. Sistema elige palabra aleatoria
   ↓
4. Jugador adivina letras
   ↓
5. ¿Letra correcta?
   ├─ SÍ → Revelar letra, continuar
   └─ NO → Perder intento, dibujar parte
   ↓
6. ¿Palabra completa O 6 intentos agotados?
   ├─ Palabra completa → VICTORIA
   └─ 6 intentos agotados → DERROTA
   ↓
7. Mostrar resultado
   ↓
8. ¿Nueva partida?
   ├─ SÍ → Volver al paso 1
   └─ NO → Fin
```

## 🆘 Preguntas Frecuentes

**¿Puedo cambiar de idioma durante una partida?**
- Sí, pero la palabra actual no cambiará. Solo las nuevas partidas usarán el nuevo idioma.

**¿Las mayúsculas y minúsculas importan?**
- No, el juego no distingue entre mayúsculas y minúsculas.

**¿Puedo usar el teclado físico?**
- Sí, puedes presionar las teclas A-Z directamente.

**¿Se guardan mis estadísticas?**
- Sí, en el navegador (localStorage) y opcionalmente en la base de datos con cuenta.

**¿Cuánto tiempo tengo para adivinar?**
- No hay límite de tiempo. Juega a tu ritmo.

---

**¡Buena suerte y disfruta del juego!** 🎮✨
