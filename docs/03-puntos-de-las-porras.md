# 03 · Sistema de puntos de las porras ("Mi Palco")

*Fase 1 — "Solo papel". Fuente: Dossier Maestro, sección 7.*

Las porras son el segundo producto de El Falla: grupos privados de amigos ("Palcos") que predicen cómo irá el concurso. El dossier pide un sistema de puntos **simple, transparente, resistente a estrategias raras y con más peso en Semifinal y Final**, y que se propongan tres opciones, se simulen y se recomiende una.

> **Límite de producto:** El Falla no gestiona apuestas, dinero, botes ni pagos. Solo predicciones y clasificación entre amigos.

---

## 1. Qué se predice y cuándo

🏛️ Los cupos son los oficiales de las Bases COAC 2027. 🎭 El momento y la forma de predecir son reglas de El Falla.

| Ronda de la porra | Qué se predice | Cuántas eliges | Se cierra… |
|---|---|---|---|
| 1 · Cuartos | Quién **entra en Cuartos** | 10 coros · 18 comparsas · 18 chirigotas | Al terminar la última sesión de Clasificatoria |
| 2 · Semifinal | Quién **entra en Semifinal** | 6 coros · 8 comparsas · 8 chirigotas · 5 cuartetos | Al terminar la última sesión de Cuartos |
| 3 · Final | Quién **entra en la Final** | 4 por modalidad (16 en total) | Al terminar la última sesión de Semifinal |
| 4 · Orden | **Puesto 1.º a 4.º** de cada modalidad | Ordenar las 4 finalistas | Al empezar la Final |

**Reglas de juego (🎭):**

1. **Hay que elegir exactamente el número de plazas.** No se puede marcar "todas" para asegurar aciertos.
2. Cada ronda se elige **entre las agrupaciones que siguen vivas**. Excepción: los cuartetos no hacen Cuartos (🏛️), así que en la ronda 2 se eligen entre todos los de Clasificatoria.
3. Mientras la ronda está abierta, puedes **cambiar** tu predicción las veces que quieras. Al cerrarse, queda bloqueada.
4. Nadie ve las predicciones de los demás hasta que la ronda se cierra (así nadie copia).
5. Si te unes a un Palco tarde, **puedes jugar desde la ronda que esté abierta**. Las anteriores te cuentan 0.
6. Si en la Final entran **menos de 4** de una modalidad (🏛️ las bases dicen "hasta 4"), sigues eligiendo 4: hay menos aciertos posibles, pero **nadie pierde puntos**. En la ronda 4 se ordenan solo las que hayan entrado.
7. Si una agrupación se retira, las predicciones que la incluían simplemente no puntúan en ese hueco.

---

## 2. Los tres sistemas

### Sistema A · "Un acierto, un punto"

- Cada agrupación acertada en las rondas 1, 2 y 3: **1 punto**.
- Cada puesto exacto en la Final (ronda 4): **1 punto**.
- **Máximo: 105 puntos.**

### Sistema B · "Peso creciente" (✅ elegido)

- Ronda 1 (Cuartos): **1 punto** por acierto.
- Ronda 2 (Semifinal): **2 puntos** por acierto.
- Ronda 3 (Final): **4 puntos** por acierto.
- Ronda 4 (Orden): **5 puntos** por puesto exacto y **2 puntos** si te quedas a un puesto (dijiste 2.º y quedó 1.º o 3.º).
- **Máximo: 244 puntos.**

### Sistema C · "Porcentaje por ronda"

- Cada ronda vale una bolsa fija: Cuartos 100, Semifinal 200, Final 300, Orden 400 (**máximo 1.000**).
- Dentro de cada ronda, la bolsa se reparte a partes iguales entre modalidades, y ganas el porcentaje que aciertes. Ejemplo: aciertas 14 de 18 comparsas en Cuartos → 78 % de la parte de comparsas.
- Da números con decimales (por ejemplo, 663,8 puntos).

### Cuánto pesa cada ronda en cada sistema

| Ronda | A | B | C |
|---|---|---|---|
| 1 · Cuartos | **44 %** | 19 % | 10 % |
| 2 · Semifinal | 26 % | 22 % | 20 % |
| 3 · Final | 15 % | 26 % | 30 % |
| 4 · Orden | 15 % | **33 %** | **40 %** |

El dossier pide más peso en Semifinal y Final. **El sistema A no lo cumple**: casi la mitad de los puntos se decide en Cuartos, porque es la ronda con más plazas.

---

## 3. Ejemplo con el sistema B

Ana juega la porra de comparsas:

| Ronda | Lo que pasa | Puntos |
|---|---|---|
| Cuartos | Acierta 14 de las 18 | 14 × 1 = **14** |
| Semifinal | Acierta 5 de las 8 | 5 × 2 = **10** |
| Final | Acierta 3 de las 4 | 3 × 4 = **12** |
| Orden | Clava el 1.º y el 4.º; el 2.º y el 3.º los pone al revés | 5 + 2 + 2 + 5 = **14** |
| **Total comparsas** | | **50** |

Esto se suma con lo que haga en coros, chirigotas y cuartetos.

---

## 4. Simulación

Se simularon **20.000 concursos** por ordenador. Cada agrupación tiene una "calidad" oculta; el jurado ve esa calidad con algo de azar, y los puntos se arrastran de fase en fase. El número de agrupaciones inscritas es **inventado** (14 coros, 40 comparsas, 40 chirigotas, 12 cuartetos) porque solo sirve para comparar sistemas.

Jugadores simulados:

- **Experta**: conoce muy bien el concurso.
- **Aficionado**: lo sigue, pero se equivoca más.
- **Al azar**: elige sin criterio.
- **Llega tarde**: se une al Palco antes de la Final; solo juega rondas 3 y 4.
- **Contraria** (estrategia rara): en Cuartos y Semifinal rellena la mitad de sus plazas con las que cree que **no** pasarán, buscando "sorpresas".

### 4.1 ¿Gana quien más sabe? (5 jugadores distintos)

| | A | B | C |
|---|---|---|---|
| La Experta gana el Palco | 95 % | 90 % | 80 % |
| El Aficionado gana el Palco | 5 % | 9 % | 16 % |
| La estrategia "Contraria" gana | 0 % | 0,3 % | 3,7 % |
| "Al azar" gana | 0 % | 0 % | 0,2 % |
| "Llega tarde" gana | 0 % | 0 % | 0 % |
| Empate en el primer puesto | 2,2 % | 1,3 % | 0 % |

Los tres premian saber del concurso. Ninguno se puede ganar al azar. La estrategia rara no compensa en A ni en B; en C saca algo más.

### 4.2 ¿Hay emoción hasta el final? (6 amigos con un nivel parecido)

Esto es lo más realista: un grupo de amigos que saben más o menos lo mismo.

| | A | B | C |
|---|---|---|---|
| El que va primero tras Semifinal **no** acaba ganando | 54 % | 74 % | 79 % |
| El que va último tras Semifinal acaba ganando | 3 % | 10 % | 12 % |

Con A, la porra está casi decidida antes de la Final. Con B y C, la Final y el orden deciden de verdad, que es cuando más gente está mirando.

---

## 5. Comparativa y recomendación

| Criterio del dossier | A · Un acierto, un punto | B · Peso creciente | C · Porcentaje por ronda |
|---|---|---|---|
| Simple de entender | ✅ Muy simple | ✅ Simple (1-2-4-5) | ❌ Porcentajes y decimales |
| Transparente ("¿por qué tengo estos puntos?") | ✅ | ✅ | ⚠️ Cuesta explicarlo |
| Más peso en Semifinal y Final | ❌ Pesa más Cuartos | ✅ | ✅ |
| Resistente a estrategias raras | ✅ | ✅ | ⚠️ Algo menos |
| Premia saber del concurso | ✅ | ✅ | ✅ |
| Emoción hasta la Final | ❌ | ✅ | ✅ |
| Pocos empates | ⚠️ | ✅ | ✅ |

### ✅ Decidido: Sistema B · "Peso creciente"

Es el único que cumple todos los criterios del dossier. Se explica en una línea:

> **"1 punto por acierto en Cuartos, 2 en Semifinal, 4 en la Final, y 5 por cada puesto exacto (2 si te quedas a uno)."**

Los valores (1, 2, 4, 5 y 2) se guardan como ajustes del panel de administración, para poder retocarlos antes del lanzamiento sin tocar la app.

---

## 6. Ranking del Palco

Lo que pide el dossier (sección 7.3), aplicado al sistema B:

- **Puntos** totales: lo que ordena el ranking.
- **Aciertos**: cuántas agrupaciones acertaste en total.
- **Posiciones exactas** en la Final.
- **Evolución por fase**: puntos de cada ronda y cómo has subido o bajado en el ranking.

**Desempates** (en este orden):

1. Más posiciones exactas en la Final.
2. Más aciertos en la ronda 3 (quién entra en la Final).
3. Más aciertos totales.
4. Si sigue el empate, se comparte el puesto.

---

## 7. Lo que no entra

- Nada de dinero, botes, premios en metálico ni pagos entre usuarios.
- Nada de "multiplicadores" ni comodines en el MVP: complican y abren estrategias raras. Se pueden estudiar para la V2.
