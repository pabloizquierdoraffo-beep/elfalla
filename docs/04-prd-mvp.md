# 04 · PRD del MVP

*PRD = "documento de requisitos del producto": qué tiene que hacer la app, para quién y cómo sabremos que está bien hecha. Todavía no dice **cómo** se programa.*

*Fuente: Dossier Maestro + decisiones de la Fase 1 (documentos 01, 02 y 03).*

**Estado del documento**

| Parte | Contenido | Estado |
|---|---|---|
| 1 | Visión, usuarios y alcance | ✅ Escrita, pendiente de revisión |
| 2 | El Palco: cuenta, sesiones, votar, nota, sondeos, ficha | ✅ Escrita, pendiente de revisión |
| 3 | Mi Palco (porras), compartir, perfil, notificaciones, ajustes y admin | ⏳ Próxima entrega |
| 4 | Requisitos generales (rendimiento, privacidad, accesibilidad) y criterios de lanzamiento | ⏳ Próxima entrega |

**Cómo leer las prioridades**

- 🔴 **Imprescindible**: sin esto no se lanza.
- 🟠 **Importante**: debería estar en el lanzamiento; si el calendario aprieta, puede llegar unos días después.
- 🟢 **Si da tiempo**: bonito, pero no bloquea.

Cada requisito tiene un código (por ejemplo **PAL-03**) para poder referirse a él más adelante en el diseño, en las pruebas y en el código.

---

# Parte 1 · Visión, usuarios y alcance

## 1.1 El problema

Durante el COAC, la afición ya puntúa actuaciones, discute quién debería pasar y hace quinielas, pero todo está disperso en grupos de WhatsApp, redes sociales y conversaciones de bar. No hay un sitio donde ver **qué opina la afición en conjunto** ni una forma cómoda de **jugar la porra con los amigos** sin hojas de cálculo.

## 1.2 La solución

Una app móvil con dos usos bajo la marca **El Falla**:

1. **El Palco**: cada persona puntúa las actuaciones y la app calcula la nota de la afición.
2. **Mi Palco**: grupos privados de amigos que predicen quién pasa cada fase y quién gana.

> *"Este año, el palco es de todos."*

## 1.3 Objetivos del primer COAC (2027)

1. **Demostrar que la afición lo usa**: que la gente vote durante las sesiones y vuelva la noche siguiente.
2. **Que los Palcos privados traigan gente nueva**: que cada Palco invite a amigos que se registran.
3. **Que la nota de El Palco sea creíble**: sin escándalos de manipulación y con suficientes votos para publicar notas.
4. **Que nadie la confunda con una app oficial.**

## 1.4 Cómo mediremos el éxito

Las métricas salen de la sección 13 del dossier. Los objetivos numéricos se fijarán en el plan de analítica; aquí solo se definen qué mirar.

| Métrica | Qué nos dice |
|---|---|
| Usuarios activos por sesión del COAC | Si la app se usa en directo |
| % de usuarios que vuelven la noche siguiente | Si engancha |
| Votos por agrupación y % de agrupaciones con nota publicada (≥ 30 votos) | Si hay masa suficiente para que El Palco tenga sentido |
| Palcos privados creados e invitaciones aceptadas | Si el crecimiento entre amigos funciona |
| Tarjetas compartidas | Si la gente presume de la app fuera de ella |
| Participación en sondeos | Si el contenido social interesa |

## 1.5 Para quién es

| Perfil | Cómo es | Qué necesita de El Falla |
|---|---|---|
| **La aficionada de butaca o de sofá** | Ve las sesiones en el teatro, por la tele o por internet. Tiene opinión de cada agrupación. | Votar rápido, con una mano, sin perderse la actuación. Ver si la afición piensa como ella. |
| **El "entendido"** | Se sabe las letras, puntúa pieza a pieza, discute cada corte. | La ficha de jurado completa, rankings, y comparar El Palco con el Jurado Oficial. |
| **La pandilla de la porra** | Un grupo de amigos que cada año hace su quiniela. | Crear un Palco en un minuto, invitar por WhatsApp y ver el ranking sin hacer cuentas. |
| **El curioso de fuera** | Le llega una tarjeta compartida por WhatsApp. | Entender en dos segundos qué es y entrar fácilmente. |

## 1.6 Qué entra y qué no entra en el MVP

| ✅ Entra | ❌ No entra (V2 o nunca) |
|---|---|
| Registro e inicio de sesión | Apuestas, dinero, botes o pagos (**nunca**) |
| Calendario de sesiones y agrupaciones | Fotos, vídeo o audio de actuaciones |
| Voto rápido y jurado completo | Comentarios públicos o chat |
| Nota y ranking de El Palco | Insignias y gamificación avanzada |
| Sondeos | Acumulado de puntos de El Palco entre fases |
| Mi Palco: crear, unirse, predecir, ranking | Históricos de años anteriores |
| Tarjetas para compartir | Integraciones con medios |
| Perfil e historial propio | Recomendaciones personalizadas |
| Notificaciones básicas | Promociones avanzadas de patrocinadores |
| Panel de administración | |

## 1.7 Principios que guían todas las decisiones

1. **Puntuar ≠ predecir.** Nunca se mezclan en la misma pantalla ni en la misma nota.
2. **Primero el directo.** Si algo estorba mientras alguien ve una actuación, se quita.
3. **Una mano, poco texto, botones grandes.**
4. **Independiente y honesta.** Siempre visible que no es oficial. La fórmula de El Palco es pública.
5. **Cádiz sin caricatura.** Tono cercano y con gracia, sin forzar el habla ni llenar todo de tópicos.

---

# Parte 2 · El Palco

## 2.1 Cuenta e inicio

| Código | Requisito | Prioridad |
|---|---|---|
| CUE-01 | Registrarse e iniciar sesión con **Apple**, **Google** o **enlace por email** (sin contraseñas). | 🔴 |
| CUE-02 | En el registro se pide un **alias** (nombre visible) y el **año de nacimiento**. Menores de 14 años no pueden registrarse (a validar con revisión legal). | 🔴 |
| CUE-03 | Se puede **empezar a votar sin cuenta**: la persona rellena su voto y, al pulsar "Enviar", se le pide registrarse. Su voto **no se pierde** y se envía al terminar el registro. | 🔴 |
| CUE-04 | Los alias pasan por un **filtro de palabras ofensivas**. | 🔴 |
| CUE-05 | La persona puede **borrar su cuenta** desde la propia app. Sus votos dejan de contar. *(Es obligatorio para publicar en la tienda de Apple.)* | 🔴 |
| CUE-06 | **Onboarding** de máximo 3 pantallas que se pueden saltar: qué es El Palco, qué es Mi Palco, y "El Falla es una iniciativa independiente, no oficial". | 🔴 |

**Se cumple si…** una persona que nunca ha usado la app puede pasar de abrirla a tener su primer voto enviado en **menos de 1 minuto**.

## 2.2 Sesiones y agrupaciones (pantalla de Inicio)

| Código | Requisito | Prioridad |
|---|---|---|
| SES-01 | La pantalla de **Inicio** muestra la **sesión de hoy**: fase, hora y lista de agrupaciones en orden de actuación. | 🔴 |
| SES-02 | Cada agrupación de la sesión tiene un **estado visible**: *Próximamente* · **En escena** · *Votación abierta* · *Votación cerrada*. | 🔴 |
| SES-03 | El estado **"En escena"** lo marca a mano una persona del equipo desde el panel de administración (ver pregunta 2 al final). | 🔴 |
| SES-04 | Cuando una agrupación está **en escena**, aparece arriba del todo con un botón grande **"Puntuar"**. | 🔴 |
| SES-05 | Si no hay sesión hoy, Inicio muestra la **próxima sesión** y los sondeos o rankings más recientes. | 🔴 |
| SES-06 | **Listado por fase y modalidad**: todas las agrupaciones de una fase, filtrables por coros, comparsas, chirigotas y cuartetos. | 🔴 |
| SES-07 | **Buscador** por nombre de agrupación o autor. | 🟠 |

## 2.3 Votar

### Ventana de votación (decidida en la Fase 1)

- Se abre cuando la agrupación sale **a escena**.
- Se cierra **una hora antes de que empiece la siguiente sesión**.
- En la **última sesión de cada fase** (y en la Final), se cierra **antes de que salga el fallo oficial**.
- Mientras está abierta, se puede **cambiar el voto**; cuenta el último.
- **Una persona, un voto** por agrupación y fase. Si hace el voto rápido y también el jurado completo, cuenta el completo.

### Voto rápido

| Código | Requisito | Prioridad |
|---|---|---|
| VOT-01 | Un **deslizador grande de 0 a 100**, que se mueve con el pulgar, con marcas cada 10 y el número bien visible. | 🔴 |
| VOT-02 | Un botón **"Enviar"** grande. Al enviar: microanimación breve y mensaje de confirmación. | 🔴 |
| VOT-03 | Debajo, un enlace discreto: **"Completar ficha de jurado"**. | 🔴 |
| VOT-04 | Tras enviar se muestra **"Tu puntuación"** y, al lado, la **nota de El Palco** (ver 2.4). | 🔴 |
| VOT-05 | Se puede abrir la pantalla de voto **mientras la agrupación actúa** y enviar al terminar. Si la persona sale de la app, lo que había puesto se guarda. | 🔴 |

### Jurado completo

🏛️ Sigue las piezas y los máximos oficiales de las Bases COAC 2027:

| Modalidad | Piezas y puntos máximos (total 100) |
|---|---|
| Coros | Presentación 6 · Tango 1: 22 · Tango 2: 22 · Cuplé 1: 9 · Cuplé 2: 9 · Estribillo 1: 3 · Estribillo 2: 3 · Popurrí 20 · Tipo 4 · Impresión 2 |
| Comparsas | Presentación 6 · Pasodoble 1: 22 · Pasodoble 2: 22 · Cuplé 1: 9 · Cuplé 2: 9 · Estribillo 1: 3 · Estribillo 2: 3 · Popurrí 20 · Tipo 4 · Impresión 2 |
| Chirigotas | Presentación 6 · Pasodoble 1: 12 · Pasodoble 2: 12 · Cuplé 1: 18 · Cuplé 2: 18 · Estribillo 1: 4 · Estribillo 2: 4 · Popurrí 20 · Tipo 4 · Impresión 2 |
| Cuartetos | Parodia 44 · Cuplé 1: 12 · Cuplé 2: 12 · Estribillo 1: 3 · Estribillo 2: 3 · Otras composiciones 20 · Tipo 4 · Impresión 2 |

*Se asume la misma ficha en todas las fases; hay que comprobarlo en las Bases antes de cerrar el diseño.*

| Código | Requisito | Prioridad |
|---|---|---|
| JUR-01 | La ficha muestra las piezas **en el orden en que se cantan**, para ir rellenando durante la actuación. | 🟠 |
| JUR-02 | 🎭 Cada pieza se puntúa **del 0 al 10** (más fácil de pensar) y la app la convierte sola a los puntos oficiales. Ejemplo: un 8 en un pasodoble de comparsa = 8/10 × 22 = **17,6 puntos**. *(Recomendación: ver pregunta 1.)* | 🟠 |
| JUR-03 | El **total sobre 100** se va sumando a la vista. Al enviar se redondea a número entero, que es el voto que cuenta para El Palco. | 🟠 |
| JUR-04 | Se puede **dejar a medias** y seguir más tarde mientras la votación esté abierta. Para enviar hay que puntuar todas las piezas. | 🟠 |
| JUR-05 | Si la persona ya hizo voto rápido, la ficha completa **lo sustituye** al enviarse (se le avisa). | 🟠 |

*El jurado completo es 🟠: si el calendario aprieta, puede salir unos días después del lanzamiento sin romper nada (documento 01, apartado 4).*

## 2.4 La nota de El Palco

Calculada exactamente como dice el **documento 02**: mínimo 30 votos, de cada 5 votos se quita uno arriba y uno abajo, media con un decimal.

| Código | Requisito | Prioridad |
|---|---|---|
| PAL-01 | Mientras la votación está abierta, la nota **solo se ve después de votar**. Antes aparece: *"Vota y descubre qué opina El Palco"*. | 🔴 |
| PAL-02 | Con **menos de 30 votos**: *"Faltan X votos para la nota de El Palco"*. | 🔴 |
| PAL-03 | De **30 a 99 votos**: la nota lleva la etiqueta **"Provisional"**. | 🔴 |
| PAL-04 | Siempre se muestra el **número de votos válidos** junto a la nota. | 🔴 |
| PAL-05 | Página **"Cómo funciona El Palco"** con la fórmula explicada en lenguaje sencillo, enlazada desde cada nota. | 🔴 |

## 2.5 Ranking de El Palco (pestaña "El Palco")

| Código | Requisito | Prioridad |
|---|---|---|
| RAN-01 | Ranking **por fase y modalidad**, ordenado por nota de El Palco. Solo entran agrupaciones con nota publicada. | 🔴 |
| RAN-02 | Si una actuación tiene la votación abierta y la persona aún no la ha votado, su fila aparece como **"Vota para ver"** en lugar de la nota. | 🔴 |
| RAN-03 | **"El corte de El Palco"**: una línea en el ranking que marca hasta dónde pasarían a la siguiente fase **si decidiera la afición** (por ejemplo, las 18 primeras comparsas en Clasificatoria). | 🟠 |
| RAN-04 | **El Palco vs. Jurado Oficial**: después del fallo, se muestra al lado la nota oficial pasada a escala de 100 (total oficial ÷ 3), solo con datos que se hayan publicado públicamente. | 🟠 |
| RAN-05 | **Tendencia**: si la agrupación sube o baja respecto a su nota de la fase anterior. | 🟢 |

## 2.6 Sondeos

No cambian la nota de El Palco; son contenido social (dossier, 5.3).

| Código | Requisito | Prioridad |
|---|---|---|
| SON-01 | Tras votar una agrupación, aparece una pregunta: **"¿La ves en [siguiente fase]?"** — Sí / No. De aquí sale el "% que cree que pasa". | 🔴 |
| SON-02 | Al terminar cada sesión: **"Agrupación de la noche"**, eligiendo entre las que han actuado. | 🔴 |
| SON-03 | Otros sondeos de la noche (mejor pasodoble, mejor cuplé, mejor tipo, sorpresa de la sesión), que el equipo activa desde el panel de administración. | 🟠 |
| SON-04 | Una respuesta por persona y sondeo. Los resultados se ven **después de responder**, o cuando el sondeo se cierra. | 🔴 |
| SON-05 | Los sondeos se cierran con la misma regla que la votación de su sesión. | 🔴 |

## 2.7 Ficha de agrupación

Todo lo que pide el dossier (5.4) en una sola pantalla:

| Código | Contenido | Prioridad |
|---|---|---|
| FIC-01 | Nombre, modalidad, autor o autores, y fases en las que ha actuado. **Solo texto**, sin fotos ni vídeos. | 🔴 |
| FIC-02 | **Tu puntuación** y la **nota de El Palco** (con las reglas de 2.4), por cada fase. | 🔴 |
| FIC-03 | **Posición** en su modalidad dentro del ranking de El Palco. | 🔴 |
| FIC-04 | **% que cree que pasa** (del sondeo SON-01). | 🔴 |
| FIC-05 | **% que la incluye en su Final** (de las porras de Mi Palco; solo si hay al menos 30 predicciones). | 🟠 |
| FIC-06 | Resultados de los sondeos en los que aparece. | 🟠 |
| FIC-07 | Tendencia respecto a la fase anterior. | 🟢 |
| FIC-08 | Botón **"Compartir"** (las tarjetas se definen en la Parte 3). | 🔴 |

---

## Preguntas de esta entrega

Solo tres, y solo las que cambian el diseño:

1. **Jurado completo:** ¿cada pieza se puntúa del **0 al 10** y la app hace la conversión a los puntos oficiales (recomendado), o prefieres que la persona ponga directamente los puntos oficiales (por ejemplo, de 0 a 22 en un pasodoble)?
2. **"En escena":** para saber qué agrupación está actuando en cada momento, alguien del equipo tiene que pulsar un botón en el panel durante cada sesión. **¿Habrá alguien que pueda hacerlo cada noche del COAC?** Si no, la alternativa es usar el horario previsto, que es menos preciso porque las sesiones se retrasan.
3. **Edad mínima de 14 años:** ¿te parece bien como punto de partida? (Lo revisará un profesional en el checklist legal.)
