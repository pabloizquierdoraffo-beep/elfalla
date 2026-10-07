# 02 · Algoritmo de El Palco

*Fase 1 — "Solo papel". Fuente: Dossier Maestro, secciones 5 y 14.*

La **nota de El Palco** es la puntuación colectiva de la afición para una agrupación en una fase concreta (por ejemplo: "Comparsa X, Cuartos"). Va de 0 a 100. Todo lo de este documento es 🎭 **regla de El Falla**, no del concurso oficial.

> **Mensaje para el usuario:** "El Palco elimina las puntuaciones extremas para reflejar mejor la opinión general."

---

## 1. Qué votos cuentan

Un voto es **válido** si cumple todo esto:

1. Lo ha enviado una persona **con cuenta y sesión iniciada**.
2. Es el **único voto de esa persona** para esa agrupación en esa fase. Si lo cambia, cuenta solo el último.
3. Se envió **dentro de la ventana de votación**: desde que empieza la actuación hasta 24 horas después de que acabe la sesión (propuesta del documento 01, apartado 3.3).
4. La cuenta **no está bloqueada** por moderación ni marcada como sospechosa (ver apartado 6).
5. Es un número entero entre 0 y 100. Da igual que venga del voto rápido o del jurado completo; si la persona hizo los dos, cuenta el jurado completo (documento 01, apartado 3.1).

---

## 2. El cálculo, paso a paso

1. **Junta** todos los votos válidos de esa agrupación en esa fase. Llama **N** a cuántos hay.
2. **Si N es menor que 30** → no hay nota. Se muestra "Faltan X votos para la nota de El Palco".
3. **Ordena** los votos de menor a mayor.
4. **Calcula cuántos quitar por cada lado:** `K = N × porcentaje de recorte`, **redondeado hacia abajo**.
5. **Quita** los K votos más bajos y los K votos más altos.
6. **Haz la media** de los que quedan.
7. **Redondea a un decimal** (78,45 → 78,5).
8. **Publica** la nota junto con el número de votos válidos (N). Si N está entre 30 y 99, añade la etiqueta "Nota provisional".

### Cuántos votos se quitan

Con el 5 % del dossier y con el 10 % que se propone en el apartado 4:

| Votos (N) | Se quitan por lado con 5 % | Se quitan por lado con 10 % |
|---|---|---|
| 30 | 1 | 3 |
| 50 | 2 | 5 |
| 100 | 5 | 10 |
| 500 | 25 | 50 |

---

## 3. Ejemplo con 30 votos

Estos son 30 votos inventados, ya ordenados. Hay uno de 5 (alguien que quiere hundirla) y uno de 100 (un fan entusiasta):

```
5 · 52 · 54 · 56 · 56 · 60 · 61 · 62 · 67 · 68 · 68 · 69 · 69 · 69 · 70 ·
71 · 71 · 72 · 73 · 73 · 74 · 75 · 79 · 81 · 81 · 84 · 86 · 87 · 95 · 100
```

- **Media normal:** 2.088 ÷ 30 = **69,6**
- **Recorte del 5 %:** K = 30 × 0,05 = 1,5 → **1**. Se quitan el 5 y el 100. Quedan 28 votos que suman 1.983. Media = 1.983 ÷ 28 = 70,82 → **70,8**
- **Recorte del 10 %:** K = 30 × 0,10 = 3. Se quitan 5, 52, 54 y 87, 95, 100. Quedan 24 votos que suman 1.695. Media = 1.695 ÷ 24 = 70,625 → **70,6**

En la ficha se vería: **El Palco 70,8 · 30 votos · Nota provisional**.

---

## 4. Validación del umbral y del recorte (simulaciones)

Para comprobar las cifras del dossier se simularon miles de votaciones por ordenador, suponiendo que la opinión "real" de la afición sobre una agrupación es 72 y que la gente vota repartida alrededor de esa cifra (lo normal es que la mayoría se aleje menos de 12 puntos).

### 4.1 ¿Es suficiente con 30 votos?

Cuánto puede "bailar" la nota por puro azar, según el número de votos (en 95 de cada 100 casos):

| Votos | La nota sale entre… | Margen |
|---|---|---|
| 10 | 64,5 y 79,1 | ± 7,3 |
| 20 | 66,8 y 77,4 | ± 5,3 |
| **30** | **67,8 y 76,5** | **± 4,4** |
| 50 | 68,6 y 75,3 | ± 3,4 |
| **100** | **69,7 y 74,4** | **± 2,3** |
| 500 | 70,9 y 73,0 | ± 1,1 |

**Conclusión:** 30 votos es un mínimo razonable para publicar, pero todavía puede moverse unos 4 puntos. Por eso se propone:

- **Menos de 30 votos:** no hay nota.
- **De 30 a 99:** nota con la etiqueta "provisional".
- **100 o más:** nota normal.

### 4.2 ¿Protege el recorte del 5 % contra grupos organizados?

Se simuló una agrupación con 200 votos honestos (opinión real: 72) a la que se le suma un grupo organizado que vota todo 100 (para inflarla) o todo 0 (para hundirla). El porcentaje es la parte de los votos totales que viene del grupo organizado.

| Método | Inflar 10 % | Inflar 20 % | Hundir 10 % | Hundir 20 % | Margen con 30 votos |
|---|---|---|---|---|---|
| Media normal (sin recorte) | 74,7 | 77,6 | 64,8 | 57,5 | — |
| Recorte 5 % (dossier) | 74,8 | 77,9 | 66,7 | 58,6 | ± 4,4 |
| **Recorte 10 %** | 74,5 | 77,9 | **69,5** | 60,6 | ± 4,4 |
| Recorte 20 % | 74,0 | 77,0 | 70,1 | 67,0 | ± 4,6 |
| Mediana (el voto del medio) | 73,6 | 75,9 | 70,3 | 68,2 | ± 5,2 |

**Qué nos dice:**

- El recorte del 5 % casi no se diferencia de la media normal frente a un grupo organizado. Solo quita un puñado de votos sueltos extremos.
- Ningún método aguanta solo a un grupo que sea el 20 % de los votos. **La defensa principal tiene que estar en las cuentas y la detección de abusos (apartado 6), no en la fórmula.**
- El recorte del 10 % mejora claramente frente a quien intenta **hundir** (que es el ataque más dañino) y no añade nada de ruido.
- Recortar más (20 %, mediana) protege algo más, pero significa ignorar el 40 % de los votos o más: "¿me han tirado el voto?" es difícil de explicar.

**Recomendación: recortar el 10 % por cada lado.** El mensaje al usuario sigue siendo el mismo. El porcentaje se guarda como un ajuste del panel de administración, así se puede cambiar sin tocar la app.

> Esta es una de las decisiones que necesito que confirmes (documento 01, pregunta 2). Si prefieres mantener el 5 % del dossier, el resto del documento vale igual.

---

## 5. Casos extremos

| Caso | Qué pasa |
|---|---|
| Menos de 30 votos | No hay nota. "Faltan X votos." No aparece en el ranking. |
| Exactamente 30 votos | Hay nota, con etiqueta "provisional". |
| Todos votan lo mismo (p. ej. todos 80) | La nota es 80,0. El recorte no cambia nada. |
| Hay votos repetidos en los extremos (p. ej. tres votos de 100 y K = 1) | Se quita solo uno de ellos: se cuentan posiciones, no valores distintos. |
| Alguien cambia su voto | Se usa solo el último. La nota se recalcula. |
| Voto enviado después del cierre | Se rechaza con un mensaje amable: "La votación de esta actuación ya está cerrada". |
| Una cuenta se bloquea por abuso | Sus votos dejan de contar y la nota se recalcula. Queda apuntado en el registro de auditoría. |
| Agrupación que no actúa (se retira, se cancela la sesión) | No se abre la votación. Si ya estaba abierta, el admin la anula y los votos no se publican. |
| Empate de nota en el ranking | Desempata quien tenga más votos válidos; si siguen empatadas, comparten puesto y se ordenan alfabéticamente. |
| El ranking de El Palco | Solo incluye agrupaciones con nota publicada, de la misma modalidad y fase. |

---

## 6. Lo que protege la nota además de la fórmula

Resumen de lo que pide la sección 14 del dossier, aplicado a El Palco (se detallará en el documento de anti-abuso):

1. **Un voto por persona + agrupación + fase**, garantizado por la base de datos.
2. **Cuentas difíciles de multiplicar**: login con Apple, Google o email verificado.
3. **Límite de velocidad**: una cuenta no puede votar decenas de actuaciones en segundos.
4. **Cuentas nuevas con lupa**: si una agrupación recibe de golpe muchos votos de cuentas recién creadas, se avisa al admin.
5. **Patrones raros**: muchos votos idénticos (todos 100 o todos 0) en poco tiempo → aviso al admin, que puede revisar y apartar votos sospechosos.
6. **Registro de auditoría**: cada voto, cambio y decisión de moderación queda apuntado.
7. **Transparencia**: una página "Cómo funciona El Palco" explica este documento en lenguaje sencillo.

---

## 7. Pseudocódigo

Para quien programe más adelante. Es la misma receta del apartado 2, escrita en forma de instrucciones:

```
AJUSTES
  MINIMO_VOTOS        = 30
  MINIMO_CONSOLIDADA  = 100
  RECORTE             = 0.10      # 0.05 si se mantiene el dossier

FUNCION nota_el_palco(agrupacion, fase):
  votos = votos_validos(agrupacion, fase)          # apartado 1, uno por usuario (el último)
  N = cantidad(votos)

  SI N < MINIMO_VOTOS:
    DEVOLVER { estado: "sin_nota", votos: N, faltan: MINIMO_VOTOS - N }

  ordenar(votos) de menor a mayor
  K = redondear_hacia_abajo(N * RECORTE)
  centrales = votos desde la posición K hasta la posición N - K   # quita K por cada lado
  media = suma(centrales) / cantidad(centrales)
  nota = redondear(media, 1 decimal)

  estado = "provisional" SI N < MINIMO_CONSOLIDADA SI NO "publicada"
  DEVOLVER { estado, nota, votos: N }
```

**Cuándo se recalcula:** cada vez que entra o cambia un voto. Si hay mucho tráfico, basta con recalcular cada pocos segundos; nadie nota la diferencia.
