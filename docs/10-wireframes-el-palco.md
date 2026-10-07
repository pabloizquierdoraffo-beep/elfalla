# 10 · Wireframes de El Palco

*Dibujos sencillos de cada pantalla, hechos con texto. Sirven para decidir **qué hay en cada pantalla y dónde**, no cómo queda de bonito: los colores, las letras y los detalles salen del design system (documento 08).*

**Cómo leerlos:**

- `[ Botón ]` → algo que se pulsa
- `( Chip )` → etiqueta de estado
- `▓▓▓` → la celosía de la marca
- Lo que está **abajo** en el dibujo está en la **zona del pulgar**.
- Los códigos (VOT-01, PAL-02…) remiten a los requisitos del PRD (documento 04).

**Pantallas de este documento:**

1. Bienvenida (onboarding)
2. Inicio con sesión en directo
3. Inicio sin sesión hoy
4. Votar (voto rápido)
5. Pedir la cuenta al enviar
6. Voto enviado y nota de El Palco
7. Jurado completo
8. Ficha de agrupación
9. Ranking de El Palco
10. Sondeo "Agrupación de la noche"
11. Cómo funciona El Palco

---

## 1. Bienvenida (onboarding) · CUE-06

Tres pantallas que se pasan deslizando. Se pueden saltar.

```
┌────────────────────────────────┐
│                       Saltar › │
│                                │
│             ▓▓▓▓▓              │
│            EL FALLA            │
│                                │
│      El jurado de la afición   │
│                                │
│   Puntúa cada actuación y      │
│   descubre qué opina           │
│   El Palco: la nota de toda    │
│   la afición.                  │
│                                │
│            ● ○ ○               │
│                                │
│  [        Siguiente         ]  │
└────────────────────────────────┘

  Pantalla 2: "Crea tu Palco"
  Juega la porra con tus amigos: quién pasa,
  quién llega a la Final y quién gana.

  Pantalla 3: "Este año, el palco es de todos"
  El Falla es una iniciativa independiente,
  sin relación oficial con el Ayuntamiento
  de Cádiz ni con el COAC.
  [ Empezar ]
```

**Notas:**
- **No se pide registrarse aquí.** Se entra directamente a Inicio. La cuenta se pide solo al enviar el primer voto (CUE-03).
- Si alguien llega por un enlace compartido, se salta la bienvenida y va directo a lo que le han enviado.

---

## 2. Inicio con sesión en directo · SES-01 a SES-05, ESC

```
┌────────────────────────────────┐
│ ▓ EL FALLA              ( ☾ )  │  ← botón modo sala
│ Preliminares · Sesión 3        │
│ Hoy, 20:00                     │
├────────────────────────────────┤
│ ┃ (● EN ESCENA)                │  ← borde coral
│ ┃ COMPARSA                     │
│ ┃ Los del Muelle               │
│ ┃ Autor: J. Pérez              │
│ ┃                              │
│ ┃ [        Puntuar         ]   │
├────────────────────────────────┤
│ SIGUIENTE · hacia las 21:10    │
│ Chirigota · Las de la Caleta   │
│ [ ¡Ya ha salido! ]             │
├────────────────────────────────┤
│ YA HAN ACTUADO                 │
│ 1. Coro · El Vapor             │
│    Tu nota: 78 · (Votación     │
│    abierta)            [Votar] │
│ 2. Cuarteto · Los Tres Tristes │
│    ✓ Votado · El Palco 81,4    │
├────────────────────────────────┤
│ MÁS TARDE                      │
│ 5. Coro · …          ~22:20    │
│ 6. Comparsa · …      ~23:30    │
├────────────────────────────────┤
│ ⌂ Inicio  ⧉ Puntuar  ☰ Porra   │
│ ▓ El Palco  ◯ Perfil           │
└────────────────────────────────┘
```

**Notas:**
- Lo que está **en escena** va siempre arriba y es lo más grande.
- Si todavía no está confirmado, el chip dice **(Probablemente en escena)** y el botón "Puntuar" funciona igual.
- El botón **"¡Ya ha salido!"** solo aparece en "Siguiente" y desde 10 minutos antes de su hora. Al pulsarlo: *"Gracias. Esperando a que lo confirmen más personas"*.
- En "Ya han actuado", la nota de El Palco **solo aparece si ya has votado** (PAL-01).
- *(Los nombres de agrupaciones son inventados.)*

---

## 3. Inicio sin sesión hoy · SES-05

```
┌────────────────────────────────┐
│ ▓ EL FALLA                     │
├────────────────────────────────┤
│ PRÓXIMA SESIÓN                 │
│ Mañana, viernes 8 · 20:00      │
│ Preliminares · Sesión 1        │
│ 8 agrupaciones                 │
│ [ Ver el orden de actuación ]  │
├────────────────────────────────┤
│ ☰ LA PORRA                     │  ← en azul
│ Ronda: ¿quién entra en Cuartos?│
│ Cierra en 13 días              │
│ [   Haz tu predicción      ]   │
├────────────────────────────────┤
│ ▓ LO ÚLTIMO DE EL PALCO        │
│ Agrupación de la noche: …      │
│ [ Ver ranking ]                │
├────────────────────────────────┤
│      (barra de pestañas)       │
└────────────────────────────────┘
```

---

## 4. Votar (voto rápido) · VOT-01 a VOT-05

```
┌────────────────────────────────┐
│ ‹ Volver          (● EN ESCENA)│
│                                │
│ COMPARSA · Preliminares        │
│ Los del Muelle                 │
│                                │
│                                │
│              78                │  ← número grande (56 px)
│                                │
│ 0 ·····|·····|·····|·····|· 100│
│ ━━━━━━━━━━━━━━━━━━━━●━━━━━━━   │  ← deslizador, todo el ancho
│                                │
│ ¿Cuánto te ha gustado?         │
│                                │
│ Completar ficha de jurado ›    │  ← enlace discreto
│                                │
│  [         Enviar          ]   │
└────────────────────────────────┘
```

**Notas:**
- Al entrar, el deslizador está **sin tocar** (sin número) para no influir. El botón "Enviar" se activa al moverlo.
- Vibra levemente cada 10 puntos, si el móvil lo permite.
- Si sales de la pantalla sin enviar, el número se guarda (VOT-05).
- Si ya habías votado: *"Tu nota: 78. Puedes cambiarla hasta mañana a las 19:00"*.

---

## 5. Pedir la cuenta al enviar · CUE-01, CUE-03

Aparece desde abajo, encima de la pantalla de votar, solo la primera vez.

```
┌────────────────────────────────┐
│ (pantalla de votar, oscurecida)│
├────────────────────────────────┤
│  Para que tu 78 cuente,        │
│  entra en El Falla             │
│                                │
│  [   Continuar con Apple    ]  │
│  [   Continuar con Google   ]  │
│  [   Continuar con email    ]  │
│                                │
│  Tu voto no se pierde.         │
└────────────────────────────────┘

  Después (una sola pantalla):
  ┌────────────────────────────────┐
  │ ¿Cómo te llamamos?             │
  │ [ Tu alias               ]     │
  │ Año de nacimiento              │
  │ [ 1990 ▾ ]                     │
  │                                │
  │ Acepto los términos y la       │
  │ política de privacidad  ☐      │
  │                                │
  │ [ Listo, enviar mi voto ]      │
  └────────────────────────────────┘
```

**Notas:**
- Con "email" llega un enlace al correo; al pulsarlo se vuelve aquí con el voto intacto.
- Menores de 14: *"Lo sentimos, El Falla es para mayores de 14 años"*. No se guarda nada.
- El alias pasa por el filtro de palabras ofensivas (CUE-04).

---

## 6. Voto enviado y nota de El Palco · VOT-04, PAL-01 a PAL-05, SON-01

```
┌────────────────────────────────┐
│ ✕                              │
│        ✓ ▓ (animación breve)   │
│        ¡Voto enviado!          │
│                                │
│  Los del Muelle                │
│ ┌────────────┬───────────────┐ │
│ │ TU NOTA    │ EL PALCO      │ │
│ │    78      │    81,4       │ │
│ │            │ 212 votos     │ │
│ └────────────┴───────────────┘ │
│  Eres 3,4 puntos más exigente  │
│  que El Palco                  │
│                                │
│ ¿La ves en Cuartos?            │
│  [  Sí  ]        [  No  ]      │  ← sondeo SON-01
│                                │
│ [ Compartir mi nota ]          │
│ [ Volver al directo ]          │
└────────────────────────────────┘
```

**Variantes de la caja "El Palco":**

```
 Menos de 30 votos       De 30 a 99 votos         Más de 100
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│ EL PALCO      │       │ EL PALCO      │       │ EL PALCO      │
│ Faltan 12     │       │    79,0       │       │    81,4       │
│ votos para    │       │ 45 votos      │       │ 212 votos     │
│ la nota       │       │(Provisional)  │       │               │
└───────────────┘       └───────────────┘       └───────────────┘
```

- Debajo, siempre, un enlace pequeño: *"¿Cómo se calcula?"* → pantalla 11.
- Si no hay conexión: *"Pendiente de envío. Lo mandamos en cuanto vuelva la cobertura"* (GEN-08).
- La primera vez, tras este voto, aparece la sugerencia de **añadir El Falla a la pantalla de inicio** (GEN-04b).

---

## 7. Jurado completo · JUR-01 a JUR-05

```
┌────────────────────────────────┐
│ ‹ Volver       Ficha de jurado │
│ COMPARSA · Los del Muelle      │
│                                │
│ Total               63,2 / 100 │  ← se va sumando
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                │
│ Presentación              (6)  │
│  0 1 2 3 4 5 6 7 [8] 9 10      │  → 4,8
│ Pasodoble 1              (22)  │
│  0 1 2 3 4 5 6 7 8 [9] 10      │  → 19,8
│ Pasodoble 2              (22)  │
│  0 1 2 3 4 5 6 [7] 8 9 10      │  → 15,4
│ Cuplé 1                   (9)  │
│  0 1 2 3 4 5 6 [7] 8 9 10      │  → 6,3
│ Cuplé 2                   (9)  │
│  ○ sin puntuar                 │
│ … Estribillos, Popurrí,        │
│   Tipo, Impresión              │
│                                │
│ Se guarda solo. Puedes seguir  │
│ más tarde.                     │
│ [ Enviar (faltan 5 piezas) ]   │  ← desactivado hasta completar
└────────────────────────────────┘
```

**Notas:**
- Las piezas salen **en el orden en que se cantan**.
- Cada pieza, del 0 al 10, con botones grandes. Al lado, en gris, cuántos puntos oficiales supone.
- Al enviar se redondea el total: 63,2 → **63**. Si ya había voto rápido: *"Esta ficha sustituirá a tu voto rápido (78)"*.

---

## 8. Ficha de agrupación · FIC-01 a FIC-08

```
┌────────────────────────────────┐
│ ‹                  [Compartir] │
│ COMPARSA                       │
│ Los del Muelle                 │
│ Autor: J. Pérez                │
│                                │
│ [Preliminares] [Cuartos] [...] │  ← pestañas por fase
├────────────────────────────────┤
│ ┌────────────┬───────────────┐ │
│ │ TU NOTA    │ EL PALCO      │ │
│ │    78      │ 81,4 · 212 v. │ │
│ └────────────┴───────────────┘ │
│ 5.ª de 48 comparsas en         │
│ El Palco                       │
├────────────────────────────────┤
│ La afición opina               │
│ 84 % la ve en Cuartos          │
│ ████████████████▒▒▒            │
│ 37 % la incluye en su Final ☰  │  ← dato de la porra, en azul
├────────────────────────────────┤
│ Sondeos                        │
│ Agrupación de la noche (S. 3)  │
│ 2.ª · 21 % de los votos        │
├────────────────────────────────┤
│ Jurado Oficial (tras el fallo) │
│ 84,0 (sobre 100)  vs  El Palco │
│ 81,4                           │
└────────────────────────────────┘
```

**Notas:**
- Solo texto: **sin fotos ni vídeos** (FIC-01).
- Si la votación sigue abierta y no has votado, la caja de El Palco dice *"Vota para ver"* con un botón **Puntuar**.
- "% que la incluye en su Final" solo aparece con 30 predicciones o más.

---

## 9. Ranking de El Palco · RAN-01 a RAN-04

```
┌────────────────────────────────┐
│ ▓ El Palco                     │
│ [Preliminares ▾]               │
│ [Coro][Compar.][Chirig.][Cuart.]│  ← modalidades
├────────────────────────────────┤
│  1  Los Faroleros     88,2  ▲  │
│  2  La Bajamar        86,9     │
│  3  Vapor y Sal       85,0  ▼  │
│  …                             │
│ ▶5  Los del Muelle    81,4     │  ← la que tú votaste, resaltada
│  …                             │
│ 18  Los Caleteros     74,1     │
│ ─ ─ ─ El corte de El Palco ─ ─ │  ← las 18 primeras pasarían
│ 19  …                 73,8     │
│  …                             │
│ 31  Los Romeros   (Vota para   │
│                     ver)       │
│ 40  …        (Faltan 9 votos)  │
├────────────────────────────────┤
│ [ Compartir el ranking ]       │
└────────────────────────────────┘
```

**Notas:**
- **"El corte de El Palco"** marca hasta dónde pasarían si decidiera la afición (cupo de la fase siguiente).
- Las que no tienen nota (menos de 30 votos) van al final, sin posición.
- Tras el fallo aparece un interruptor **"Ver vs. Jurado Oficial"** que añade la columna oficial (RAN-04).

---

## 10. Sondeo "Agrupación de la noche" · SON-02, SON-04

Aparece en Inicio cuando acaba la sesión.

```
┌────────────────────────────────┐
│ AGRUPACIÓN DE LA NOCHE         │
│ Preliminares · Sesión 3        │
│                                │
│ ( ) Coro · El Vapor            │
│ ( ) Cuarteto · Los Tres Tristes│
│ (●) Comparsa · Los del Muelle  │
│ ( ) Chirig. · Las de la Caleta │
│ …                              │
│                                │
│ [         Votar            ]   │
└────────────────────────────────┘

  Después de votar:
  Los del Muelle      ██████████ 34 %
  Las de la Caleta    ███████    24 %
  El Vapor            █████      17 %
  …                   1.204 respuestas
```

---

## 11. Cómo funciona El Palco · PAL-05

```
┌────────────────────────────────┐
│ ‹  Cómo funciona El Palco      │
│                                │
│ El Palco es la nota de toda    │
│ la afición.                    │
│                                │
│ 1. Cada persona da una nota    │
│    del 0 al 100. Un voto por   │
│    persona y actuación.        │
│                                │
│ 2. Igual que en el jurado se   │
│    quita la nota más alta y la │
│    más baja, aquí, de cada 5   │
│    votos, quitamos uno por     │
│    arriba y uno por abajo.     │
│                                │
│ 3. Con el resto hacemos la     │
│    media.                      │
│                                │
│ 4. Con menos de 30 votos no    │
│    hay nota. Hasta 100, es     │
│    "provisional".              │
│                                │
│ Ejemplo con 30 votos  ›        │
│                                │
│ El Falla es una iniciativa     │
│ independiente, sin relación    │
│ oficial con el COAC.           │
└────────────────────────────────┘
```

---

## Pantallas que vendrán en el siguiente documento

Mi Palco y la porra (crear, unirse, predecir, ranking), compartir, perfil, notificaciones, ajustes y panel de administración.
