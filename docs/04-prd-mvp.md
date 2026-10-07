# 04 · PRD del MVP

*PRD = "documento de requisitos del producto": qué tiene que hacer la app, para quién y cómo sabremos que está bien hecha. Todavía no dice **cómo** se programa.*

*Fuente: Dossier Maestro + decisiones de la Fase 1 (documentos 01, 02 y 03).*

**Estado del documento**

| Parte | Contenido | Estado |
|---|---|---|
| 1 | Visión, usuarios y alcance | ✅ Escrita |
| 2 | El Palco: cuenta, sesiones, votar, nota, sondeos, ficha | ✅ Escrita y revisada |
| 3 | Mi Palco (porras), compartir, perfil, notificaciones, ajustes, admin y gamificación | ✅ Escrita y revisada |
| 4 | Requisitos generales (rendimiento, privacidad, accesibilidad) y criterios de lanzamiento | ✅ Escrita, pendiente de revisión |

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

Una **web app** (se usa desde el navegador del móvil, sin descargar nada) con dos usos bajo la marca **El Falla**:

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
| Nota y ranking de El Palco | |
| Sondeos | Acumulado de puntos de El Palco entre fases |
| Mi Palco: crear, unirse, predecir, ranking | Históricos de años anteriores |
| Tarjetas para compartir | Integraciones con medios |
| Perfil e historial propio | Recomendaciones personalizadas |
| Notificaciones básicas | Promociones avanzadas de patrocinadores |
| Panel de administración | |
| **Gamificación y premios**: rankings públicos, rachas, insignias y perfiles de jurado (decidido por el responsable del producto; el dossier la dejaba para la V2) | |

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
| CUE-02 | En el registro se pide un **alias** (nombre visible) y el **año de nacimiento**. ✅ **Edad mínima: 14 años** (decidido; se confirmará en la revisión legal). | 🔴 |
| CUE-03 | Se puede **empezar a votar sin cuenta**: la persona rellena su voto y, al pulsar "Enviar", se le pide registrarse. Su voto **no se pierde** y se envía al terminar el registro. | 🔴 |
| CUE-04 | Los alias pasan por un **filtro de palabras ofensivas**. | 🔴 |
| CUE-05 | La persona puede **borrar su cuenta** desde la propia app. Sus votos dejan de contar. *(Lo exige el RGPD.)* | 🔴 |
| CUE-06 | **Onboarding** de máximo 3 pantallas que se pueden saltar: qué es El Palco, qué es Mi Palco, y "El Falla es una iniciativa independiente, no oficial". | 🔴 |

**Se cumple si…** una persona que nunca ha usado la app puede pasar de abrirla a tener su primer voto enviado en **menos de 1 minuto**.

## 2.2 Sesiones y agrupaciones (pantalla de Inicio)

| Código | Requisito | Prioridad |
|---|---|---|
| SES-01 | La pantalla de **Inicio** muestra la **sesión de hoy**: fase, hora y lista de agrupaciones en orden de actuación. | 🔴 |
| SES-02 | Cada agrupación de la sesión tiene un **estado visible**: *Próximamente* · **En escena** · *Votación abierta* · *Votación cerrada*. | 🔴 |
| SES-03 | La app sabe qué agrupación está **en escena** combinando varias señales (ver "Cómo sabemos quién está en escena", justo debajo). | 🔴 |
| SES-04 | Cuando una agrupación está **en escena**, aparece arriba del todo con un botón grande **"Puntuar"**. | 🔴 |
| SES-05 | Si no hay sesión hoy, Inicio muestra la **próxima sesión** y los sondeos o rankings más recientes. | 🔴 |
| SES-06 | **Listado por fase y modalidad**: todas las agrupaciones de una fase, filtrables por coros, comparsas, chirigotas y cuartetos. | 🔴 |
| SES-07 | **Buscador** por nombre de agrupación o autor. | 🟠 |

### Cómo sabemos quién está en escena

Idea propuesta: detectarlo automáticamente con el directo de YouTube o con los tuits de los medios que retransmiten (por ejemplo, el aviso de "va a empezar tal agrupación").

**Análisis:**

| Opción | A favor | En contra |
|---|---|---|
| **Analizar el directo de YouTube** | Totalmente automático. | 🏛️ Las Bases 2027 dan a Onda Cádiz derechos audiovisuales exclusivos; procesar su emisión de forma automática necesita revisión jurídica y probablemente su permiso (dossier, sección 15). Además, reconocer quién canta en un vídeo es técnicamente complejo y caro. |
| **Leer los tuits de un medio** | Ese aviso existe y es muy fiable en el momento. | Leer X (Twitter) de forma automática exige su API, que es de pago y cara. Si el medio cambia la forma de escribir el tuit, se retrasa o no lo publica, la app se equivoca. Depende de un tercero con el que no hay acuerdo. |
| **Horario + orden de actuación** | Gratis, sin depender de nadie. El orden de cada sesión se conoce de antemano. | Las sesiones se retrasan, así que la hora exacta falla. |
| **La propia afición avisa** | Gratis. Quien está en el teatro o viendo la tele lo sabe al instante. | Hay que protegerlo de bromas (se exige que lo confirmen varias personas). |
| **Botón del equipo** | Exacto. | Necesita a alguien atento cada noche. |

**✅ Decidido para el MVP: combinar las tres señales gratuitas.** YouTube y X quedan descartados para el MVP.

**Para después (V2):** si se llega a un acuerdo formal con un medio que retransmita, se podría recibir el aviso directamente de su sistema. No se da por hecho ningún acuerdo.

#### Las tres señales y quién manda

| Orden | Señal | Qué aporta | Cuándo manda |
|---|---|---|---|
| 1 | **El equipo** (botón en el panel) | Exactitud total | Siempre. Lo que marca el equipo no lo cambia nadie más. |
| 2 | **La afición** (botón "¡Ya ha salido!") | Rapidez, sin coste | Si el equipo no ha intervenido. |
| 3 | **El horario** (orden + hora prevista) | Siempre disponible | Solo cuando no hay ninguna de las otras dos. |

#### Los estados de cada actuación

```
Programada ──► Siguiente ──► Probablemente en escena ──► En escena ──► Terminada
```

- **Programada**: actúa más tarde en la sesión.
- **Siguiente**: es la próxima en el orden. Se muestra con su hora prevista: *"Siguiente: [agrupación] · hacia las 22:40"*.
- **Probablemente en escena**: ha llegado su hora prevista, pero nadie lo ha confirmado todavía.
- **En escena**: confirmado por la afición o por el equipo. Se abre la votación.
- **Terminada**: cuando la siguiente pasa a "En escena" (o al acabar la sesión, para la última). Su votación sigue abierta según las reglas de siempre.

#### Cómo funciona cada señal

**1. El horario, que aprende el retraso de la noche**

- El equipo carga antes de cada sesión el **orden de actuación** y la **hora prevista** de cada agrupación.
- Cuando una agrupación se confirma en escena con retraso, **la app mueve las horas previstas de todas las siguientes** ese mismo retraso. Ejemplo: si la tercera sale 20 minutos tarde, la cuarta pasa de "hacia las 22:40" a "hacia las 23:00".
- Así, aunque nadie confirme nada, la estimación mejora a lo largo de la noche.

**2. La afición confirma**

- El botón **"¡Ya ha salido!"** aparece **solo en la agrupación "Siguiente"**, desde 10 minutos antes de su hora prevista (ya ajustada).
- Pasa a "En escena" cuando lo pulsan **5 personas distintas en menos de 2 minutos**. Las dos cifras son ajustes del panel: al principio, con pocos usuarios, puede convenir bajar a 3.
- Protecciones contra bromas:
  - Solo cuentan personas **con cuenta**, y cada una pulsa **una vez** por actuación.
  - Solo se puede avanzar **a la siguiente del orden**, nunca saltar ni volver atrás.
  - **Tiempo mínimo**: no se puede confirmar una agrupación si la anterior salió hace menos de 10 minutos (ajustable). Evita que alguien "adelante" la sesión.
  - Si el equipo deshace una confirmación de la afición, queda apuntado en el registro de auditoría.

**3. El equipo corrige**

Desde el móvil, el equipo puede:
- **Marcar** o **desmarcar** "En escena".
- **Marcar "No actúa"** si una agrupación se retira: se salta y no se abre su votación.
- **Cambiar el orden** si hay un cambio de última hora.

No hace falta que alguien esté pendiente toda la noche: el equipo solo interviene si algo falla.

#### Qué pasa con la votación

- La votación de una agrupación **se abre cuando pasa a "En escena"**, por cualquiera de las vías.
- **Red de seguridad:** si nadie la marca, se abre igualmente a su **hora prevista ajustada + 15 minutos**. Así nunca se queda nadie sin poder votar.

#### Casos raros

| Caso | Qué pasa |
|---|---|
| Pocos usuarios conectados (primeros días) y nadie pulsa | Funciona el horario; la votación se abre con la red de seguridad. |
| Alguien pulsa "¡Ya ha salido!" durante un descanso | Hacen falta 5 personas a la vez y el tiempo mínimo; si aun así ocurre, el equipo lo deshace. |
| Una agrupación cambia de orden sin aviso | La afición no puede saltar el orden: el equipo lo cambia; mientras, funciona la red de seguridad. |
| La sesión se retrasa mucho al empezar | La primera confirmación (afición o equipo) mueve todas las horas previstas. |

#### Requisitos

| Código | Requisito | Prioridad |
|---|---|---|
| ESC-01 | Estados de actuación y paso de uno a otro tal como se describe arriba. | 🔴 |
| ESC-02 | Horario con orden de actuación, hora prevista y ajuste automático del retraso. | 🔴 |
| ESC-03 | Botón "¡Ya ha salido!" con sus protecciones. Cifras configurables en el panel. | 🔴 |
| ESC-04 | Controles del equipo desde el móvil: marcar, desmarcar, "No actúa" y cambiar el orden. | 🔴 |
| ESC-05 | Red de seguridad: apertura de la votación a la hora prevista ajustada + 15 minutos. | 🔴 |
| ESC-06 | Todo cambio de estado queda en el registro de auditoría, indicando qué señal lo provocó. | 🔴 |
| ESC-07 | En la tarjeta "En escena" se indica cómo se ha confirmado: *"Confirmado por la afición"* o *"Confirmado"*. | 🟢 |

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
| JUR-02 | 🎭 Cada pieza se puntúa **del 0 al 10** (más fácil de pensar) y la app la convierte sola a los puntos oficiales. Ejemplo: un 8 en un pasodoble de comparsa = 8/10 × 22 = **17,6 puntos**. ✅ *Decidido.* | 🟠 |
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

## Decisiones de las partes 1 y 2

| # | Tema | Decisión |
|---|---|---|
| 1 | Jurado completo | ✅ Cada pieza del 0 al 10; la app lo convierte a los puntos oficiales. |
| 2 | Quién está en escena | ✅ Horario que aprende el retraso + aviso de la afición + corrección del equipo. YouTube y X descartados para el MVP (derechos, coste y fragilidad). |
| 3 | Edad mínima | ✅ 14 años. |

---

# Parte 3 · Mi Palco, compartir, perfil, notificaciones y administración

## 3.1 Mi Palco: crear y unirse

Un **Palco** es un grupo privado de amigos que juegan la porra juntos. Las reglas de juego y de puntos están en el **documento 03** (sistema B).

| Código | Requisito | Prioridad |
|---|---|---|
| MPA-01 | **Crear un Palco** en un paso: solo se pide el nombre. Quien lo crea es su **anfitrión**. | 🔴 |
| MPA-02 | Los nombres de Palco pasan por el **filtro de palabras ofensivas**. | 🔴 |
| MPA-03 | **Invitar**: cada Palco tiene un **enlace** y un **código de 6 caracteres**. Botón directo para enviarlo por WhatsApp. | 🔴 |
| MPA-04 | **Unirse** con el enlace o escribiendo el código. Si la persona no tiene cuenta, se registra y entra al Palco directamente, sin repetir pasos. | 🔴 |
| MPA-05 | ✅ **Sin límites**: una persona puede estar en todos los Palcos que quiera y un Palco puede tener todos los miembros que quiera. Los rankings largos se cargan por partes para que la app siga siendo rápida. | 🔴 |
| MPA-09 | **Protección anti-robots** (invisible para la gente normal): si una cuenta crea Palcos o se une a ellos a un ritmo imposible para una persona (por ejemplo, decenas en un minuto), se frena y se avisa al equipo. No es un límite de producto, es seguridad. | 🔴 |
| MPA-06 | El anfitrión puede **cambiar el nombre**, **expulsar** a alguien y **cambiar el código** (el anterior deja de funcionar). | 🟠 |
| MPA-07 | Cualquiera puede **salir** de un Palco. | 🔴 |
| MPA-08 | Se puede **unir tarde**: juega desde la ronda que esté abierta; las anteriores le cuentan 0. | 🔴 |

## 3.2 Predecir

| Código | Requisito | Prioridad |
|---|---|---|
| PRE-01 | ✅ **Una sola porra por persona**: la persona hace su predicción una vez y **cuenta igual en todos sus Palcos**. | 🔴 |
| PRE-02 | Cada ronda muestra las agrupaciones **por modalidad**, con un contador visible: *"Comparsas: 12 de 18"*. | 🔴 |
| PRE-03 | No se puede guardar una modalidad con más o menos agrupaciones de las que tocan. | 🔴 |
| PRE-04 | En la ronda de **Orden**, se ordenan las finalistas de cada modalidad arrastrándolas a los puestos 1.º a 4.º. | 🔴 |
| PRE-05 | Cuenta atrás visible: *"Cierra en 5 h 20 min"*. Se puede cambiar todo hasta el cierre. | 🔴 |
| PRE-06 | Al cerrarse la ronda, la predicción **queda bloqueada** y se muestra un candado. | 🔴 |
| PRE-07 | **Nadie ve las predicciones de los demás hasta que la ronda se cierra.** Después, dentro de cada Palco se pueden ver las de los compañeros. | 🔴 |
| PRE-08 | Cuando el equipo carga el resultado oficial, los **puntos se calculan solos** y se avisa a la persona. | 🔴 |
| PRE-09 | Separación con El Palco: la pantalla de predecir **nunca** muestra botones de puntuar, y viceversa. | 🔴 |

**Se cumple si…** una persona puede hacer la predicción completa de una ronda en **menos de 3 minutos**.

## 3.3 Ranking del Palco y pestaña "Porra"

| Código | Requisito | Prioridad |
|---|---|---|
| POR-01 | La pestaña **Porra** muestra mis Palcos, la **ronda abierta** con su cuenta atrás y un botón grande *"Haz tu predicción"* (o *"Revisa tu predicción"* si ya la hizo). | 🔴 |
| POR-02 | **Ranking de cada Palco**: puntos, aciertos y posiciones exactas, con los desempates del documento 03. | 🔴 |
| POR-03 | **Evolución por fase**: puntos de cada ronda y si has subido o bajado de puesto (flechas). | 🟠 |
| POR-04 | Detalle de cada persona del Palco: qué eligió y en qué acertó (solo rondas cerradas). | 🟠 |
| POR-05 | ✅ **Ranking general de la porra**: todas las personas de la app, con su puesto, puntos y evolución. Siempre se ve *mi puesto*, aunque esté en el 3.500. | 🔴 |

## 3.4 Compartir

Cada momento importante genera una **tarjeta** (imagen) para WhatsApp, Instagram Stories y X (dossier, sección 10).

| Código | Tarjeta | Prioridad |
|---|---|---|
| COM-01 | **Mi puntuación**: "Le he dado un 87 a [agrupación]". Si ya hay nota de El Palco, se añade. | 🔴 |
| COM-02 | **Mi Final**: mis 16 finalistas. | 🔴 |
| COM-03 | **Mi corte** de Cuartos o Semifinal. | 🟠 |
| COM-04 | **Ranking de mi Palco**. | 🔴 |
| COM-05 | **Resultado de El Palco**: el ranking de la afición de una fase. | 🟠 |
| COM-06 | **El Palco vs. Jurado Oficial**, después de cada fallo. | 🟠 |

**Reglas de todas las tarjetas:**

- Llevan **marca, agrupación o fase, el dato principal y una llamada discreta** a la app. Nunca parecen un anuncio.
- Incluyen siempre, en pequeño: *"Iniciativa independiente"*.
- Dos formatos: **vertical** (Stories) y **cuadrado** (WhatsApp y X).
- El enlace de la tarjeta **abre directamente El Falla** en el navegador, en la pantalla correspondiente (la agrupación, el ranking o el Palco). Al pegarlo en WhatsApp se ve una vista previa con la imagen de la tarjeta.
- **No se puede compartir la nota de El Palco de una actuación con la votación abierta**, para no adelantársela a quien todavía no ha votado (coherente con PAL-01). Sí la puntuación propia.

## 3.5 Perfil

| Código | Requisito | Prioridad |
|---|---|---|
| PER-01 | Alias, y botón para cambiarlo. | 🔴 |
| PER-02 | **Mi historial**: todos mis votos, por fase, con mi nota y la de El Palco. | 🔴 |
| PER-03 | **Mis Palcos**, con mi puesto en cada uno. | 🔴 |
| PER-04 | **Mis estadísticas**: número de votos y "¿eres más exigente que El Palco?" (la diferencia media entre mis notas y las de El Palco). | 🟠 |

## 3.6 Notificaciones

Pocas y útiles. La persona elige cuáles recibir; **nunca más de 2 al día** en total (salvo las que pida expresamente).

> **Importante al ser web app:** en Android las notificaciones funcionan desde el navegador. En **iPhone solo funcionan si la persona ha añadido El Falla a su pantalla de inicio** (ver GEN-04b). Por eso las notificaciones son un extra, nunca la única forma de enterarse de algo: lo importante también se ve al abrir la web.

| Código | Aviso | Prioridad |
|---|---|---|
| NOT-01 | *"Empieza la sesión"* — una vez al día de sesión. | 🔴 |
| NOT-02 | *"La ronda cierra en 2 horas y te falta tu predicción"* — solo si le falta. | 🔴 |
| NOT-03 | *"Ya tienes los puntos de la ronda"* — tras cada resultado oficial. | 🔴 |
| NOT-04 | *"Alguien se ha unido a tu Palco"* — solo al anfitrión, agrupado (máximo 1 al día). | 🟢 |
| NOT-05 | *"Avísame cuando salga [agrupación]"* — la persona lo activa en la ficha de una agrupación. | 🟢 |

## 3.7 Ajustes y legales

| Código | Requisito | Prioridad |
|---|---|---|
| AJU-01 | Activar o desactivar cada tipo de notificación. | 🔴 |
| AJU-02 | **Cómo funciona El Palco** y **cómo funcionan los puntos de la porra**. | 🔴 |
| AJU-03 | Política de privacidad, términos de uso y aviso **"El Falla es una iniciativa independiente y no tiene relación oficial con el Ayuntamiento de Cádiz ni con el COAC"**. | 🔴 |
| AJU-04 | **Borrar mi cuenta** (CUE-05). | 🔴 |
| AJU-05 | **Pedir mis datos** (derecho de acceso del RGPD). En el MVP basta con un formulario que llega al equipo. | 🔴 |
| AJU-06 | **Denunciar** un alias o un nombre de Palco ofensivo. | 🟠 |
| AJU-07 | Contacto. | 🔴 |

## 3.8 Panel de administración

Una web privada para el equipo, que **funciona bien desde el móvil**. Es imprescindible: sin ella no hay datos de agrupaciones ni resultados.

| Código | Qué permite | Prioridad |
|---|---|---|
| ADM-01 | **Temporada**: crear fases, sesiones (fecha y hora), agrupaciones (nombre, modalidad, autores) y el **orden de actuación** de cada sesión. | 🔴 |
| ADM-02 | **En directo**: los controles de "en escena" (ESC-04). | 🔴 |
| ADM-03 | **Hora prevista del fallo** de cada fase y botón **"Cerrar votación ya"**. | 🔴 |
| ADM-04 | **Resultados oficiales**: quién pasa cada fase, orden de la Final y, si se publican, las puntuaciones oficiales. Al guardarlos se calculan los puntos de las porras. Antes de guardar, se pide **confirmar dos veces** (un error aquí afecta a todo el mundo). | 🔴 |
| ADM-05 | **Abrir y cerrar rondas** de predicción (con hora programada). | 🔴 |
| ADM-06 | **Sondeos**: activar los de cada noche (SON-03). | 🟠 |
| ADM-07 | **Moderación**: ver denuncias, cambiar alias o nombres de Palco ofensivos, bloquear cuentas. | 🔴 |
| ADM-08 | **Alertas de votos raros** (documento 02, apartado 6) y opción de **apartar votos sospechosos** de la nota. | 🟠 |
| ADM-09 | **Ajustes** sin tocar la app: mínimo de votos (30), proporción de recorte (5), puntos de la porra (1-2-4-5-2), cifras del botón "¡Ya ha salido!" (5 personas en 2 minutos), umbrales de la protección anti-robots, reglas de rachas e insignias. | 🔴 |
| ADM-10 | **Registro de auditoría**: quién hizo qué y cuándo. | 🔴 |
| ADM-11 | **Dos tipos de acceso**: *administrador* (todo) y *operador de directo* (solo ADM-02), para poder dar acceso a alguien de confianza solo para las noches de sesión. | 🟢 |
| ADM-12 | **Corregir un resultado oficial** cargado por error: se recalculan los puntos y se avisa a los afectados. | 🔴 |

---

## 3.9 Gamificación y premios

✅ **Decisión del responsable del producto:** los rankings son **públicos**, y algunos tendrán **premios** de marcas colaboradoras. Además de enganchar, es lo que hace atractiva la app para patrocinadores (dossier, sección 12).

Ejemplos de premio: a quien más actuaciones haya puntuado en todo el concurso, y a quien más haya acertado en la porra desde la Clasificatoria hasta la Final.

### ⚠️ Lo que cambia al haber premios

Un premio hace que merezca la pena hacer trampas. Por eso cada ranking lleva sus protecciones (apartado D), y los premios necesitan unas **bases legales** (apartado E). Así la nota de El Palco sigue siendo creíble aunque haya premios en juego.

### A · Rankings públicos

| Código | Ranking | Qué premia | Cuándo se actualiza | ¿Puede tener premio? | Prioridad |
|---|---|---|---|---|---|
| GAM-01 | **La Porra** (ranking general) | Acertar quién pasa cada fase y el orden de la Final (sistema B). | Tras cada fallo oficial | ✅ Sí | 🔴 |
| GAM-02 | **El más fiel** | Más actuaciones puntuadas en todo el concurso. | En directo | ✅ Sí | 🔴 |
| GAM-03 | **Rachas** | Más noches de sesión seguidas votando. Una noche sin sesión no rompe la racha. | En directo | ✅ Sí | 🔴 |
| GAM-04 | **Ojo de jurado** | Quien más se parece al Jurado Oficial con sus notas. | Cuando se publican las puntuaciones oficiales de cada fase (suelen salir unos días después del fallo) | ✅ Sí | 🟠 |
| GAM-05 | **Jurado de oficio** | Más fichas de jurado completo rellenadas. | En directo | ✅ Sí | 🟠 |
| GAM-06 | **El más exigente** y **el más generoso** | Quien puntúa más por debajo o por encima de la afición. | Al cerrar cada fase | ❌ Solo título y diversión | 🟠 |

- Todos los rankings se pueden ver **por fase** (Clasificatoria, Cuartos, Semifinal, Final) y **de toda la temporada**.
- Todos tienen también su versión **dentro de cada Palco** ("el más fiel de mi Palco").
- Siempre se ve **mi puesto**, aunque esté en el 3.500.
- Un ranking puede ir **"presentado por [marca]"**. La marca patrocina el ranking, **nunca el cálculo**: las reglas son las mismas con o sin patrocinador (dossier, regla de independencia).

### B · Cómo se calcula cada ranking

**GAM-04 · Ojo de jurado**

1. Cuando se publican las puntuaciones oficiales de una fase, para cada actuación se pasa la nota oficial a escala de 100 (total oficial ÷ 3).
2. Para cada persona se mira, en las actuaciones que puntuó, **cuántos puntos se ha separado** de la nota oficial, y se hace la media.
3. **Gana quien menos se separa.**
4. Para entrar en el ranking hay que haber puntuado **un mínimo de actuaciones en esa fase** (propuesta: la mitad de las de la fase). Así no gana alguien que puntuó una sola actuación y tuvo suerte.

**GAM-06 · El más exigente / el más generoso**

1. Para cada persona: media de *(su nota − nota de El Palco)* en las actuaciones que puntuó.
2. Muy por debajo de cero → exigente; muy por encima → generoso.
3. **Filtro anti-trampa:** solo entra quien **distingue** entre agrupaciones, es decir, quien pone notas más altas a las que la afición valora más (su orden se parece razonablemente al de El Palco). Quien pone 0 a todo no distingue nada y **queda fuera**. Así no compensa hundir notas para salir el primero.
4. Mínimo de 10 actuaciones puntuadas.

**Desempates de los rankings con premio**

- *El más fiel* (es fácil que haya empates, porque mucha gente puede puntuarlo todo): 1) más fichas de jurado completo, 2) racha más larga, 3) quien llegó antes a esa cifra.
- *La Porra*: los del documento 03.
- *Ojo de jurado*: más actuaciones puntuadas.

### C · Perfil e insignias

| Código | Qué | Prioridad |
|---|---|---|
| GAM-07 | En el perfil, **tu carácter como jurado** (*El Exigente*, *El Generoso*, *El Equilibrado*) y tu porcentaje de **Ojo de jurado**. Los nombres finales se escribirán con el tono de la marca: con gracia, sin insultos. | 🟠 |
| GAM-08 | **Insignias**: *Primera nota* · *Has votado toda una sesión* · *10 noches seguidas* · *Has puntuado la Final completa* · *Has acertado las 4 finalistas de una modalidad* · *Has clavado el orden de una Final* · *Top 10 de un ranking*. | 🟠 |
| GAM-09 | Tarjetas para **compartir** el puesto en un ranking, el perfil de jurado y las insignias. | 🟠 |

### D · Protecciones

| Código | Qué | Prioridad |
|---|---|---|
| GAM-10 | Los votos de cuentas bloqueadas o sospechosas **no cuentan** para ningún ranking ni insignia. | 🔴 |
| GAM-11 | **Una persona, una cuenta.** Para **recoger un premio** hay que identificarse (nombre real y documento). Si se descubre que alguien tenía varias cuentas, pierde el premio. Así se quita el incentivo de crear cuentas falsas. | 🔴 |
| GAM-12 | Antes de dar un premio, el equipo **revisa** la actividad del ganador (votos raros, patrones de robot). | 🔴 |
| GAM-13 | Filtro de "distingue entre agrupaciones" en los rankings de carácter (GAM-06). | 🟠 |
| GAM-14 | Opción **"No aparecer en rankings generales"** en ajustes. Quien la active sigue jugando, pero no opta a premios. | 🟠 |
| GAM-15 | **Riesgo aceptado:** con "Ojo de jurado" en juego, algunas personas votarán lo que creen que pondrá el jurado en lugar de lo que les ha gustado. Es el precio de tener este ranking. El equipo vigilará si la nota de la afición empieza a parecerse "demasiado" a la oficial y, si pasa, se puede replantear el ranking para la temporada siguiente. | 🔴 |

### E · Premios: lo que hay que tener en cuenta

Esto entrará en el checklist legal para revisión profesional:

- **Bases legales** publicadas para cada premio: quién puede participar, cómo se gana, fechas, desempates y cómo se entrega.
- Participar es **siempre gratis**. Nadie paga nada por jugar (dossier: sin apuestas ni dinero).
- **Edad:** la app admite desde 14 años, pero algunos premios (y cualquier premio de marcas de bebidas alcohólicas) deberán ser **solo para mayores de 18**.
- **Impuestos:** los premios a partir de cierto valor tienen obligaciones fiscales. Lo revisará un profesional.
- El premio lo da la **marca colaboradora** o El Falla, **nunca** el Ayuntamiento ni el COAC, salvo acuerdo formal.

### F · Calendario

Al ser **web app**, los rankings, las insignias y cualquier pantalla nueva **pueden publicarse durante el COAC** sin esperar a ninguna tienda (siempre fuera del horario de las sesiones). Las bases legales de los premios, en cambio, tienen que estar publicadas **antes** de que empiece el periodo de cada premio.

---

## Decisiones de la parte 3

| # | Tema | Decisión |
|---|---|---|
| 1 | Porra por persona | ✅ Una sola porra por persona, cuenta en todos sus Palcos. |
| 2 | Ranking general de la porra | ✅ Sí, imprescindible. |
| 3 | Límites de Palcos y miembros | ✅ Sin límites. Solo protección anti-robots. |
| 4 | Gamificación | ✅ Sí, en el MVP. |
| 5 | Rankings públicos y premios | ✅ Todos los rankings son públicos. Premios para La Porra, El más fiel, Rachas, Ojo de jurado y Jurado de oficio, con protecciones y bases legales. "Exigente" y "generoso" son públicos pero sin premio. |

---

# Parte 4 · Requisitos generales y criterios de lanzamiento

Los requisitos generales no son pantallas, sino **cualidades que toda la app tiene que cumplir**.

## 4.1 Dónde funciona

| Código | Requisito | Prioridad |
|---|---|---|
| GEN-01 | ✅ **Web app**: se usa desde el **navegador del móvil** (iPhone y Android), **sin descargar nada de ninguna tienda**. También funciona en ordenador. | 🔴 |
| GEN-02 | Cualquier **enlace compartido** (tarjetas, invitaciones a Palcos, fichas) abre directamente la pantalla correspondiente. | 🔴 |
| GEN-04b | Se puede **"Añadir a pantalla de inicio"**: queda un icono de El Falla como si fuera una app y se abre a pantalla completa. Se sugiere con un aviso amable **después** del primer voto (nunca antes), con instrucciones para iPhone, donde no es automático. | 🟠 |
| GEN-03 | Todo en **español**. | 🔴 |

✅ *Decidido por el responsable del producto: web app, para quitar la fricción de descargar una app. Ventajas añadidas: no depende de la revisión de Apple y Google, y se puede actualizar en cualquier momento.*

## 4.2 Rapidez y aguante

Durante el COAC el uso se concentra en pocas horas por noche, y en los momentos clave (cuando sale una agrupación, al acabar la actuación, tras un fallo) mucha gente hace lo mismo a la vez.

| Código | Requisito | Prioridad |
|---|---|---|
| GEN-04 | La app se abre y muestra la sesión de hoy en **menos de 3 segundos** con una conexión normal. | 🔴 |
| GEN-05 | Al pulsar "Enviar" en un voto, la confirmación aparece **al instante** (menos de 1 segundo). | 🔴 |
| GEN-06 | Aguanta **picos de miles de personas votando en el mismo minuto** sin caerse ni ir lenta. Se comprobará con una **prueba de carga** antes del lanzamiento. | 🔴 |
| GEN-07 | Los rankings y notas pueden tardar **unos segundos** en actualizarse; nadie lo nota. | 🔴 |

## 4.3 Mala cobertura

En el teatro y en las calles llenas la cobertura suele ser mala.

| Código | Requisito | Prioridad |
|---|---|---|
| GEN-08 | Si no hay conexión al enviar un voto o una predicción, **se guarda en el móvil** y se envía sola en cuanto vuelve la conexión, siempre que la web siga abierta o se vuelva a abrir. Se muestra *"Pendiente de envío"*. | 🔴 |
| GEN-09 | Para que cuente, el voto tiene que **llegar** antes del cierre. Si no llega a tiempo, se avisa con claridad. | 🔴 |
| GEN-10 | La última información descargada (sesión de hoy, mis Palcos) **se ve aunque no haya conexión**. | 🟠 |

## 4.4 Accesibilidad y uso en la sala

| Código | Requisito | Prioridad |
|---|---|---|
| GEN-11 | Botones grandes (mínimo el tamaño recomendado por Apple y Google para dedos) y **uso con una sola mano**: lo importante, en la mitad de abajo de la pantalla. | 🔴 |
| GEN-12 | Respeta el **tamaño de letra** que la persona tenga configurado en su móvil. | 🔴 |
| GEN-13 | **Contraste suficiente** entre texto y fondo, y nunca se depende solo del color para dar información. | 🔴 |
| GEN-14 | Funciona con el **lector de pantalla** del móvil (para personas ciegas o con baja visión). | 🟠 |
| GEN-15 | **"Modo sala"**: versión oscura de los colores de la marca para no deslumbrar en el teatro a oscuras. | 🟠 |

## 4.5 Privacidad y seguridad

| Código | Requisito | Prioridad |
|---|---|---|
| GEN-16 | Se piden **solo los datos imprescindibles**: identificador de inicio de sesión, alias, año de nacimiento. | 🔴 |
| GEN-17 | Los datos se guardan en **servidores dentro de la Unión Europea**. | 🔴 |
| GEN-18 | **Nunca se ceden datos a patrocinadores.** Si en el futuro una marca quiere contactar con usuarios, hará falta un permiso aparte, explícito y desmarcado por defecto. | 🔴 |
| GEN-19 | La analítica de uso respeta el consentimiento de la persona (aviso de cookies o equivalente en la app). | 🔴 |
| GEN-20 | El acceso al panel de administración exige **doble verificación** (contraseña + código en el móvil). | 🔴 |
| GEN-21 | **Copias de seguridad** diarias de los datos, y comprobado que se pueden recuperar. | 🔴 |
| GEN-22 | Los datos de identidad de los ganadores de premios se guardan aparte, solo el tiempo necesario, y solo los ve el equipo. | 🔴 |

## 4.6 Fiabilidad durante el COAC

| Código | Requisito | Prioridad |
|---|---|---|
| GEN-23 | El equipo recibe un **aviso automático** si la app falla o va lenta durante una sesión. | 🔴 |
| GEN-24 | Si algo grave falla, se puede activar un **mensaje de aviso** en la app ("Estamos teniendo problemas, tus votos están a salvo") sin publicar una nueva versión. | 🟠 |
| GEN-25 | Cualquier cambio en la app se prueba **antes** de llegar a los usuarios; **no se publican cambios grandes durante una sesión**. | 🔴 |

## 4.7 Marca e independencia

| Código | Requisito | Prioridad |
|---|---|---|
| GEN-26 | El aviso **"Iniciativa independiente"** aparece en el onboarding, en ajustes, en las tarjetas compartidas y en la web. | 🔴 |
| GEN-27 | No se usan escudos, logotipos ni tipografías institucionales del Ayuntamiento o del COAC, ni fotos, vídeos o audios de actuaciones. | 🔴 |
| GEN-28 | Textos con el tono de la marca: Cádiz actual, directo, cercano y con gracia, sin forzar el habla (dossier, sección 9). | 🔴 |

---

## 4.8 Lista de "listo para lanzar"

La app **no se lanza** hasta que todo esto esté marcado:

**Producto**
- [ ] Todos los requisitos 🔴 de este PRD funcionan y han pasado sus pruebas.
- [ ] Las pantallas de gamificación están preparadas (aunque algún ranking se active más tarde).
- [ ] Páginas "Cómo funciona El Palco" y "Cómo funcionan los puntos de la porra" publicadas.

**Datos**
- [ ] Agrupaciones de la temporada, sesiones y orden de actuación de la Clasificatoria cargados y revisados por dos personas.
- [ ] Rondas de predicción programadas.

**Técnica**
- [ ] **Prueba de carga** superada (GEN-06).
- [ ] **Simulacro completo** de una sesión con un grupo de personas reales: votar, "¡Ya ha salido!", cierre de votación, cargar un resultado, puntos de la porra.
- [ ] Avisos automáticos de fallo funcionando (GEN-23).
- [ ] Copia de seguridad recuperada con éxito al menos una vez (GEN-21).

**Web**
- [ ] Web **publicada en su dominio definitivo al menos 2 semanas antes** de la primera sesión del COAC, para probarla con gente real.
- [ ] Probada en los navegadores principales del móvil (Safari en iPhone, Chrome en Android) y añadida a pantalla de inicio en ambos.
- [ ] Vista previa de los enlaces comprobada en WhatsApp, Instagram y X.

**Legal** (revisado por un profesional)
- [ ] Política de privacidad y términos de uso.
- [ ] Revisión de la marca "El Falla" y de que nada parezca oficial.
- [ ] Bases legales de cada premio publicadas antes de su periodo.
- [ ] Revisión de patrocinios con marcas de bebidas alcohólicas y menores.

**Equipo**
- [ ] Calendario de quién está de guardia cada noche de sesión (para corregir "en escena", moderar y atender incidencias).
- [ ] Plan de qué hacer si algo falla en directo.

---

## Preguntas de la parte 4

Estas dos ya miran al siguiente paso (arquitectura y calendario):

1. **¿Quién va a construir la app?** ¿Lo hacemos tú y yo (yo escribo el código y tú lo revisas y pruebas), o hay más personas o una empresa?
2. **¿Qué presupuesto mensual aproximado hay** para servidores y servicios durante el COAC? No hace falta una cifra exacta; me basta con un orden de magnitud (por ejemplo, "lo mínimo posible", "unos 50 €", "unos cientos"). Al ser web app no hay que pagar cuentas de desarrollador de Apple ni Google; sí hará falta un **dominio** (la dirección web, del estilo *elfalla.xx*), que cuesta poco al año.
