# 01 · Auditoría crítica del concepto

*Fase 1 — "Solo papel". Fuente: Dossier Maestro de El Falla (7 oct 2026).*

Este documento revisa el concepto con ojo crítico antes de construir nada: qué tiene de bueno, qué puede salir mal y qué piezas del dossier todavía no encajan o están sin decidir.

**Cómo leerlo.** Cada vez que aparece una regla se indica de dónde viene:

- 🏛️ **Regla oficial COAC**: viene de las Bases COAC 2027 del Ayuntamiento de Cádiz. El Falla la usa como referencia, no la decide.
- 🎭 **Regla de El Falla**: la decidimos nosotros.

---

## 1. Fortalezas

1. **Nace de un hábito que ya existe.** La afición ya puntúa, discute cortes y hace quinielas en grupos de WhatsApp. La app no tiene que inventar la necesidad, solo hacerla más cómoda y compartible.
2. **La separación "puntuar" / "predecir" es muy buena.** "¿Cuánto te ha gustado?" y "¿qué hará el jurado?" son preguntas distintas. Mantenerlas separadas da dos productos con sentido propio y evita que la nota de la afición se contamine con quinielas.
3. **Los Palcos privados hacen crecer la app solos.** Cada persona que crea un Palco invita a sus amigos. Es el canal de crecimiento más barato que hay.
4. **Temporada corta e intensa.** El COAC concentra la atención en pocas semanas. Eso crea urgencia ("vota esta noche") y hábito diario.
5. **Marca con raíz local.** La celosía del palco del Gran Teatro Falla es un símbolo reconocible para el aficionado y huye de los clichés de máscaras y confeti.
6. **Sin dinero.** Al no gestionar apuestas, botes ni pagos, El Falla queda fuera de la regulación del juego, que es exigente.

---

## 2. Riesgos principales

| # | Riesgo | Probabilidad | Impacto | Cómo lo mitigamos |
|---|---|---|---|---|
| R1 | **Que parezca una app oficial** (nombre "El Falla", celosía del teatro, notas "del jurado"). | Media | Alto | Aviso visible "iniciativa independiente" en onboarding, ajustes y tarjetas compartidas. Nunca usar escudos, logos ni tipografía institucional del Ayuntamiento. Revisión legal de la marca antes del lanzamiento. |
| R2 | **Fandoms organizados que inflan o hunden notas.** | Alta | Alto | Ver documento 02: la media recortada *por sí sola* protege poco. La defensa real está en el registro, un voto por persona, ventanas de votación y detección de patrones raros. |
| R3 | **Fricción de registro en directo.** Alguien quiere votar en mitad de una actuación y le pedimos crear una cuenta. | Alta | Alto | Registro en un toque (Apple / Google / enlace por email). Dejar que la persona rellene su voto *antes* de registrarse y pedir la cuenta solo al enviarlo, sin perder lo escrito. |
| R4 | **Copiar la ficha oficial completa es demasiado complejo** para usarla en directo. | Alta | Medio | El voto rápido es la puerta principal. El jurado completo es opcional y se puede ir rellenando pieza a pieza durante la actuación. |
| R5 | **Contenidos con derechos.** Las Bases 2027 contemplan derechos audiovisuales exclusivos de Onda Cádiz durante el COAC. | Media | Alto | El MVP no usa fotos, vídeo ni audio de actuaciones. Solo datos textuales (nombre, autor, modalidad, horario) y puntuaciones creadas por usuarios. |
| R6 | **Calendario muy ajustado.** Hoy es 7 de octubre de 2026 y el COAC suele arrancar en enero: quedan unas 14-15 semanas (fecha exacta a confirmar en las Bases). | Alta | Alto | Recortar el MVP sin piedad (ver apartado 4). Al ser **web app** (decidido después) no hay revisión de tiendas; aun así, publicarla al menos 2 semanas antes de la primera sesión para probarla con gente real. |
| R7 | **Saturación visual** por querer "hacer Carnaval". | Media | Medio | Design system estricto: crema, texto oscuro, burdeos y un acento por contexto. La celosía como firma, no como papel pintado. |
| R8 | **Demasiadas funciones antes del primer COAC.** | Alta | Alto | Lista de "no en el MVP" cerrada y respetada (apartado 4). |
| R9 | **Menores de edad.** Mucha afición joven sigue el COAC; en España el consentimiento propio para datos personales empieza a los 14 años. Además, algunos patrocinadores candidatos son marcas de bebidas alcohólicas. | Media | Alto | Pedir edad en el registro. Revisar con un profesional la publicidad de alcohol a menores antes de cerrar cualquier patrocinio. |
| R10 | **Pocas notas publicadas en sesiones tardías o agrupaciones poco conocidas** (no llegan al mínimo de votos). | Alta | Bajo | Mostrar "faltan X votos para la nota de El Palco": convierte el hueco en una llamada a votar. |

---

## 3. Contradicciones y huecos a decidir

Para cada punto se dan alternativas y una recomendación. Los marcados con ⭐ son los que más bloquean el siguiente paso.

### 3.1 ⭐ ¿Cómo se juntan el "voto rápido" y el "jurado completo" en la nota de El Palco? 🎭

El dossier define los dos tipos de voto, pero no dice cómo se combinan.

- **A. Una persona, un voto (recomendada).** Los dos dan una nota sobre 100. Si alguien hace los dos para la misma agrupación y fase, cuenta solo el jurado completo. Todos los votos pesan igual.
- B. Solo cuenta el jurado completo. El voto rápido sería un "termómetro" aparte. Más riguroso, pero muy pocas personas rellenarán la ficha completa y casi ninguna agrupación llegaría al mínimo.
- C. Los dos cuentan, pero el jurado completo pesa más (por ejemplo, el doble). Difícil de explicar y abre la puerta a discusiones.

**✅ Decidido: A.** Una persona, un voto. Es simple, se explica en una frase y da volumen de votos.

**Sub-decisión: cómo es el voto rápido.** El dossier pide evitar las "estrellitas". Propuesta: un deslizador grande de 0 a 100, que se mueve con el pulgar, con marcas visibles cada 10.

### 3.2 ⭐ ¿Qué significa exactamente cada predicción de las porras? 🎭

El dossier dice "Antes de Cuartos: quién pasa por modalidad". Se puede leer de dos formas: "quién entra en Cuartos" o "quién sale de Cuartos hacia Semifinal". Como la siguiente línea es "Antes de Semifinales: quién pasa", interpretamos:

| Momento | Qué se predice | Elegir |
|---|---|---|
| Durante la Clasificatoria | Quién **entra en Cuartos** | 10 coros · 18 comparsas · 18 chirigotas (🏛️ cuartetos no hacen Cuartos) |
| Durante Cuartos | Quién **entra en Semifinal** | 6 coros · 8 comparsas · 8 chirigotas · 5 cuartetos (🏛️) |
| Durante Semifinal | Quién **entra en la Final** | 4 por modalidad (🏛️ "hasta 4", máximo 16) |
| Durante la Final | **Orden** 1.º, 2.º, 3.º y 4.º por modalidad | — |

Consecuencia: la predicción de cuartetos para Semifinal se hace **eligiendo entre todos los cuartetos de la Clasificatoria**, porque no pasan por Cuartos.

**Recomendación:** esta interpretación. Se detalla en el documento 03.

### 3.3 ¿Hasta cuándo se puede votar una actuación? 🎭

**✅ Decidido:** desde que empieza la actuación **hasta una hora antes de que empiece la siguiente sesión**. Da margen a quien la ve en diferido sin dejar que se vote semanas después.

Matiz añadido: en la **última sesión de cada fase**, la votación se cierra **antes de que salga el fallo oficial** (✅ decidido), para que nadie vote conociendo ya el resultado del jurado. Detalle en el documento 02.

Se puede **cambiar el voto** mientras la ventana está abierta; cuenta el último.

### 3.4 ¿Se enseña la nota de El Palco antes de votar? 🎭

Si la persona ve "El Palco: 84" antes de votar, tiende a acercarse a esa cifra y la nota deja de ser independiente.

**✅ Decidido:** mientras la votación de esa actuación esté abierta, la nota solo se muestra **después de votar** ("Vota y descubre qué opina El Palco"). Cuando se cierra, la ve todo el mundo. Además engancha.

### 3.5 ¿El Palco "arrastra" puntos entre fases como el jurado oficial? 🎭 / 🏛️

🏛️ En el concurso oficial, el arrastre de puntos empieza en Clasificatoria para las agrupaciones que avanzan.

- **A. Nota por fase (recomendada para el MVP).** Cada fase tiene su propia nota de El Palco. Es lo que la gente comenta: "¿cómo ha estado hoy?".
- B. Nota por fase + acumulado al estilo oficial. Más fiel al concurso, pero más complejo. Se puede dejar para la V2.

### 3.6 Comparar El Palco con el Jurado Oficial: cuidado con las escalas 🏛️

🏛️ Cada vocal oficial puntúa sobre 100, se quitan la nota más alta y la más baja y se **suman** las tres restantes: el total oficial va de 0 a 300. El Palco va de 0 a 100. Para la tarjeta "El Palco vs. Jurado Oficial" hay que dividir la nota oficial entre 3, y explicarlo en letra pequeña. Además, solo se pueden usar puntuaciones oficiales que se hayan publicado públicamente, revisando sus condiciones de uso.

### 3.7 La media recortada al 5 % protegía menos de lo que parece

Las simulaciones del documento 02 muestran que quitar el 5 % de cada extremo apenas frena a un grupo organizado que vote en bloque.

**✅ Decidido:** El Palco usa **la misma proporción que el jurado oficial**. Allí, de 5 vocales se quita la nota más alta y la más baja; en El Palco, de cada 5 votos se quita uno por arriba y uno por abajo. Aguanta mucho mejor a quien intenta hundir una agrupación y se explica muy fácil. Aun así, la defensa principal sigue siendo el control de cuentas (sección 14 del dossier). Detalle en el documento 02.

### 3.8 Datos de las porras en la ficha pública

La ficha de agrupación muestra "% que la incluye en su Final", que sale de **predicciones privadas** de los Palcos. Es correcto mientras sea un dato agregado y anónimo, pero hay que decirlo en la política de privacidad. Propuesta: mostrarlo solo si hay al menos 30 predicciones, igual que la nota.

### 3.9 ¿Qué pasa si en la Final entran menos de 4?

🏛️ Las bases dicen "hasta 4 por modalidad". La porra pide siempre 4 nombres; si entran menos, simplemente hay menos aciertos posibles y **nadie pierde puntos** por ello (detalle en documento 03).

### 3.10 ¿De dónde salen los datos de agrupaciones y horarios?

No hay una API oficial conocida. Para el MVP, el equipo los introducirá a mano en el panel de administración desde fuentes públicas, revisando sus condiciones de uso. Esto hace que el **panel de administración sea imprescindible** desde el primer día.

---

## 4. ¿El MVP cabe en el calendario?

La lista de la sección 16 es amplia para unas 14 semanas. Propuesta de prioridades, sin quitar ninguno de los dos productos:

| Imprescindible para el COAC 2027 | Puede ser sencillo en el MVP | Mejor para después |
|---|---|---|
| Registro/login · sesiones y agrupaciones · voto rápido · nota de El Palco · Palcos privados · porras por fase · ranking del Palco · compartir · panel de admin | Jurado completo (puede salir unos días más tarde) · sondeos (empezar con 2-3 fijos) · perfil (solo histórico propio) · notificaciones (solo "empieza la sesión" y "abren predicciones") | Acumulado de El Palco · tendencias entre fases · comparativas avanzadas · todo lo listado como V2 en el dossier |

---

## 5. Decisiones del dossier que se mantienen sin cambios

Se respetan todas las de la sección 18: nombre **El Falla**, una sola celosía como isotipo, logo de 1-2 colores, dos usos (El Palco + Porras), separar puntuación de predicción, El Palco como nota colectiva, grupos privados llamados "Palcos", **sin apuestas ni dinero**, base burdeos/marfil, y **nunca presentarse como producto oficial** sin autorización.

---

## 6. Decisiones tomadas

| # | Tema | Decisión |
|---|---|---|
| 1 | Voto rápido + jurado completo (3.1) | ✅ Una persona, un voto. Si hace los dos, cuenta el completo. |
| 2 | Recorte de El Palco (3.7) | ✅ Como el jurado: de cada 5 votos se quita uno arriba y uno abajo. |
| 3 | Sistema de puntos de las porras (documento 03) | ✅ Sistema B: 1 punto por acierto en Cuartos, 2 en Semifinal, 4 en la Final, y 5 por puesto exacto (2 si te quedas a uno). |
| 4 | Ventana de votación (3.3) | ✅ Hasta una hora antes de la siguiente sesión; en la última sesión de cada fase, se cierra antes de que salga el fallo oficial. |
| 5 | Nota oculta hasta votar (3.4) | ✅ Sí. |
