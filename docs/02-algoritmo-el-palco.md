# 02 · Algoritmo de El Palco

*Fase 1 — "Solo papel". Fuente: Dossier Maestro, secciones 5 y 14.*

La **nota de El Palco** es la puntuación colectiva de la afición para una agrupación en una fase concreta (por ejemplo: "Comparsa X, Cuartos"). Va de 0 a 100. Todo lo de este documento es 🎭 **regla de El Falla**, no del concurso oficial.

> **Mensaje para el usuario:** "El Palco elimina las puntuaciones extremas para reflejar mejor la opinión general."
>
> **Explicación ampliada (página "Cómo funciona El Palco"):** "Igual que en el jurado se quita la nota más alta y la más baja, El Palco quita, de cada 5 votos, uno por arriba y uno por abajo."

---

## 1. Qué votos cuentan

Un voto es **válido** si cumple todo esto:

1. Lo ha enviado una persona **con cuenta y sesión iniciada**.
2. Es el **único voto de esa persona** para esa agrupación en esa fase. Si lo cambia, cuenta solo el último.
3. Se envió **dentro de la ventana de votación** (✅ decidido, ver abajo).
4. La cuenta **no está bloqueada** por moderación ni marcada como sospechosa (ver apartado 6).
5. Es un número entero entre 0 y 100. Da igual que venga del voto rápido o del jurado completo: **una persona, un voto**. Si la persona hizo los dos, cuenta el jurado completo (✅ decidido, documento 01, apartado 3.1).

### Ventana de votación (✅ decidido)

- **Se abre** cuando empieza la actuación.
- **Se cierra una hora antes de que empiece la siguiente sesión del concurso**, según el horario previsto que el admin tiene cargado (si la sesión se retrasa, no cambia el cierre).
- **Excepción, la última sesión de cada fase:** después de ella el jurado oficial publica su fallo. Para que nadie pueda votar sabiendo ya el resultado oficial, la votación se cierra **antes de que salga el fallo** (✅ decidido):
  - El admin carga la **hora prevista del fallo** de cada fase, y la votación se cierra a esa hora.
  - El admin tiene además un botón **"Cerrar votación ya"** por si el fallo se adelanta.
- La sesión de la Final no tiene "siguiente sesión": se aplica la misma regla, se cierra antes del fallo.
- Mientras está abierta, la persona puede **cambiar su voto**; cuenta el último.

### Nota oculta hasta votar (✅ decidido)

Mientras la votación de una actuación está abierta, la nota de El Palco **solo se muestra a quien ya ha votado** ("Vota y descubre qué opina El Palco"). Cuando se cierra, la ve todo el mundo.

---

## 2. El cálculo, paso a paso

1. **Junta** todos los votos válidos de esa agrupación en esa fase. Llama **N** a cuántos hay.
2. **Si N es menor que 30** → no hay nota. Se muestra "Faltan X votos para la nota de El Palco".
3. **Ordena** los votos de menor a mayor.
4. **Calcula cuántos quitar por cada lado:** `K = N ÷ 5`, **redondeado hacia abajo**. Es decir, por cada 5 votos se quita uno arriba y uno abajo.
5. **Quita** los K votos más bajos y los K votos más altos.
6. **Haz la media** de los que quedan.
7. **Redondea a un decimal** (78,45 → 78,5).
8. **Publica** la nota junto con el número de votos válidos (N). Si N está entre 30 y 99, añade la etiqueta "Nota provisional".

### La regla del recorte: "como en el jurado" (✅ decidido)

🏛️ En el jurado oficial hay 5 vocales y se quita la nota más alta y la más baja. 🎭 El Palco aplica **la misma proporción** a la afición: de cada 5 votos, se quita uno por arriba y uno por abajo (un 20 % por cada lado). Si el número de votos no es múltiplo de 5, se redondea hacia abajo.

| Votos (N) | Se quitan por cada lado | Votos que cuentan para la media |
|---|---|---|
| 30 | 6 | 18 |
| 34 | 6 | 22 |
| 50 | 10 | 30 |
| 100 | 20 | 60 |
| 500 | 100 | 300 |

> Ojo con la forma de contarlo: se puede decir que la regla está **inspirada** en el jurado oficial, pero nunca dar a entender que El Palco tiene relación con el jurado o con el COAC.

---

## 3. Ejemplo con 30 votos

Estos son 30 votos inventados, ya ordenados. Hay uno de 5 (alguien que quiere hundirla) y uno de 100 (un fan entusiasta):

```
5 · 52 · 54 · 56 · 56 · 60 · 61 · 62 · 67 · 68 · 68 · 69 · 69 · 69 · 70 ·
71 · 71 · 72 · 73 · 73 · 74 · 75 · 79 · 81 · 81 · 84 · 86 · 87 · 95 · 100
```

- **Media normal (sin quitar nada):** 2.088 ÷ 30 = **69,6**
- **Cuántos quitar:** K = 30 ÷ 5 = **6** por cada lado.
- **Se quitan por abajo:** 5 · 52 · 54 · 56 · 56 · 60
- **Se quitan por arriba:** 81 · 84 · 86 · 87 · 95 · 100
- **Quedan 18 votos:** 61 · 62 · 67 · 68 · 68 · 69 · 69 · 69 · 70 · 71 · 71 · 72 · 73 · 73 · 74 · 75 · 79 · 81
- **Media:** 1.272 ÷ 18 = 70,67 → **70,7**

En la ficha se vería: **El Palco 70,7 · 30 votos · Nota provisional**.

(Fíjate en que hay dos votos de 81: se quita uno y el otro se queda. Se quitan posiciones, no valores.)

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

*(Con la regla elegida, quitar 1 de cada 5 por lado, los márgenes son prácticamente los mismos: ± 4,6 con 30 votos.)*

**Conclusión:** 30 votos es un mínimo razonable para publicar, pero todavía puede moverse unos 4 puntos. Por eso se propone:

- **Menos de 30 votos:** no hay nota.
- **De 30 a 99:** nota con la etiqueta "provisional".
- **100 o más:** nota normal.

### 4.2 ¿Protege el recorte del 5 % contra grupos organizados?

Se simuló una agrupación con 200 votos honestos (opinión real: 72) a la que se le suma un grupo organizado que vota todo 100 (para inflarla) o todo 0 (para hundirla). El porcentaje es la parte de los votos totales que viene del grupo organizado.

| Método | Inflar 10 % | Inflar 20 % | Hundir 10 % | Hundir 20 % | Margen con 30 votos |
|---|---|---|---|---|---|
| Media normal (sin recorte) | 74,7 | 77,6 | 64,8 | 57,5 | — |
| Recorte 5 % (dossier original) | 74,8 | 77,9 | 66,7 | 58,6 | ± 4,4 |
| Recorte 10 % | 74,5 | 77,9 | 69,5 | 60,6 | ± 4,4 |
| **1 de cada 5 por lado (20 %) ✅** | **74,0** | **77,0** | **70,1** | **67,0** | **± 4,6** |
| Mediana (el voto del medio) | 73,6 | 75,9 | 70,3 | 68,2 | ± 5,2 |

**Qué nos dice:**

- El recorte del 5 % casi no se diferencia de la media normal frente a un grupo organizado. Solo quita un puñado de votos sueltos extremos.
- La regla elegida, **1 de cada 5 por lado**, aguanta mucho mejor que el 5 % o el 10 % a quien intenta **hundir** una agrupación (el ataque más dañino), casi tanto como la mediana: con un 20 % de votos en contra organizados, la nota baja de 72 a 67, mientras que con el 5 % caería hasta 58,6. Y casi no añade ruido (± 4,6 frente a ± 4,4).
- Ningún método aguanta del todo a un grupo muy grande. **La defensa principal sigue estando en las cuentas y la detección de abusos (apartado 6), no solo en la fórmula.**
- El precio: con esta regla, el 40 % de los votos no entra en la media. Por eso es importante explicarlo bien. La comparación con el jurado ("de cada 5, se quita la más alta y la más baja") lo hace fácil de entender, y no es que se tire el voto de nadie: todos los votos sirven para decidir cuáles son los extremos.

**Decisión: ✅ 1 de cada 5 por lado.** La proporción se guarda como un ajuste del panel de administración, así se puede cambiar sin tocar la app si hiciera falta.

---

## 5. Casos extremos

| Caso | Qué pasa |
|---|---|
| Menos de 30 votos | No hay nota. "Faltan X votos." No aparece en el ranking. |
| Exactamente 30 votos | Hay nota, con etiqueta "provisional". |
| Todos votan lo mismo (p. ej. todos 80) | La nota es 80,0. El recorte no cambia nada. |
| Hay votos repetidos en el corte (p. ej. dos votos de 81 y solo cabe quitar uno) | Se quita solo uno de ellos: se cuentan posiciones, no valores distintos. |
| Alguien cambia su voto | Se usa solo el último. La nota se recalcula. |
| Voto enviado después del cierre | Se rechaza con un mensaje amable: "La votación de esta actuación ya está cerrada". |
| Se cambia el horario de la siguiente sesión | El admin actualiza el horario y el cierre se mueve con él. |
| El fallo oficial se va a publicar antes de lo previsto | El admin pulsa "Cerrar votación ya" antes de que salga. Los votos posteriores se rechazan. |
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
  PROPORCION_JURADO   = 5         # de cada 5 votos se quita 1 arriba y 1 abajo

FUNCION nota_el_palco(agrupacion, fase):
  votos = votos_validos(agrupacion, fase)          # apartado 1, uno por usuario (el último)
  N = cantidad(votos)

  SI N < MINIMO_VOTOS:
    DEVOLVER { estado: "sin_nota", votos: N, faltan: MINIMO_VOTOS - N }

  ordenar(votos) de menor a mayor
  K = redondear_hacia_abajo(N / PROPORCION_JURADO)
  centrales = votos desde la posición K hasta la posición N - K   # quita K por cada lado
  media = suma(centrales) / cantidad(centrales)
  nota = redondear(media, 1 decimal)

  estado = "provisional" SI N < MINIMO_CONSOLIDADA SI NO "publicada"
  DEVOLVER { estado, nota, votos: N }
```

**Cuándo se recalcula:** cada vez que entra o cambia un voto. Si hay mucho tráfico, basta con recalcular cada pocos segundos; nadie nota la diferencia.
