# 05 · Arquitectura técnica

*Cómo se construye El Falla: qué piezas usamos, por qué, cuánto cuestan y cómo trabajamos.*

**Punto de partida (decidido):**

- **Web app**, sin tiendas de aplicaciones (PRD, GEN-01).
- La construimos **tú y yo**: yo escribo el código y tú lo pruebas y decides.
- **Presupuesto elástico**: que el servidor aguante los picos de las noches del COAC y que cueste lo mínimo (o nada) el resto del tiempo.

---

## 1. La idea en un dibujo

```
  📱 Móvil de la afición (navegador)
            │
            ▼
  ┌─────────────────────────────┐
  │  VERCEL                     │   La web y la "lógica" (votar, calcular,
  │  web + funciones            │   enviar notificaciones, crear tarjetas).
  │  Crece y encoge sola        │   Se multiplica sola cuando hay mucha gente
  └─────────────────────────────┘   y se apaga cuando no hay nadie.
            │
            ▼
  ┌─────────────────────────────┐
  │  SUPABASE  (en la UE)       │   La base de datos (votos, Palcos, porras),
  │  base de datos + login      │   el inicio de sesión (Google, Apple, email)
  │  Tamaño ajustable           │   y las tareas programadas.
  └─────────────────────────────┘
```

**Tu idea del "servidor dinámico" es exactamente como funciona Vercel.** No hace falta cambiar de servidor al terminar el teatro: Vercel ejecuta la web solo cuando alguien la usa y se multiplica sola en los picos. Se paga por uso.

La única pieza que **no** crece sola es la **base de datos**. Ahí aplicamos tu idea a mano: **la subimos de tamaño para el COAC y la bajamos al terminar**. Supabase permite cambiar el tamaño con un clic.

---

## 2. Las piezas y por qué

| Pieza | Para qué | Por qué esta |
|---|---|---|
| **Next.js** | El "esqueleto" de la web: pantallas y funciones del servidor en un mismo proyecto. | Es el estándar para webs como esta, está hecho por los mismos de Vercel y lo conozco muy bien, lo que ayuda a ir rápido. |
| **Vercel** | Publicar la web y que crezca sola en los picos. | Pago por uso, sin servidores que mantener, y **cada cambio genera un enlace de prueba** que puedes abrir en tu móvil (ver apartado 5). |
| **Supabase** | Base de datos, inicio de sesión y tareas programadas. | Base de datos estándar (PostgreSQL), así que **no quedamos atados**: si un día queremos irnos, los datos se llevan a cualquier sitio. Incluye login con Google, Apple y enlace por email. Tiene centros de datos en la UE (Irlanda, París, Fráncfort, Estocolmo). |
| **Notificaciones web** | Avisos al móvil (PRD 3.6). | Son un estándar de los navegadores y **gratuitas**. |
| **Tarjetas para compartir** | Generar la imagen de cada tarjeta y la vista previa en WhatsApp (PRD 3.4). | Vercel tiene una herramienta para crear estas imágenes al vuelo. |
| **Aviso de errores** | Que nos enteremos si algo falla en directo (GEN-23). | Un servicio especializado con plan gratuito (por ejemplo, Sentry). |
| **Analítica** | Medir las métricas del PRD (1.4). | Una opción respetuosa con la privacidad y sin cookies de seguimiento. Se elegirá en el plan de analítica. |

**Región de los datos:** un centro de datos **concreto de la UE**, por ejemplo Fráncfort o París. Ojo: la opción genérica "Europa" de Supabase incluye Londres y Zúrich, que no son UE (GEN-17).

---

## 3. Cómo aguanta los picos

La noche del COAC el patrón es muy concreto: mucha gente a la vez, mirando lo mismo (la sesión de hoy) y haciendo lo mismo (votar).

1. **Lo que todo el mundo ve igual se sirve desde una caché.** La sesión de hoy, los rankings y las notas de El Palco se calculan **una vez cada pocos segundos** y se reparten ya hechos a miles de personas. Es muy barato, porque la base de datos no se entera de cuánta gente mira.
2. **Lo que es de cada persona va a la base de datos.** Un voto es una escritura pequeña. Miles de votos en un minuto son unas decenas por segundo, algo que una base de datos de tamaño pequeño o medio aguanta bien.
3. **"En escena" y la nota en directo**: la pantalla de Inicio **pregunta cada 10 segundos** si hay cambios (respuesta desde la caché). Es más simple y predecible de coste que mantener miles de conexiones abiertas. Para la gente, 10 segundos es "al momento".
4. **Votar sin cobertura**: el voto se guarda en el móvil y se reenvía al volver la conexión (GEN-08).
5. **Antes del lanzamiento**, una **prueba de carga** simula miles de personas votando a la vez para comprobar todo esto (GEN-06).

---

## 4. Costes

### ⚠️ Dos matices sobre "gratis"

1. **El plan gratuito de Vercel (Hobby) es solo para uso personal y no comercial.** Si El Falla tiene patrocinadores o premios de marcas, es un uso comercial y hay que estar en el **plan Pro**. Las fuentes consultadas lo sitúan en unos **20 $ al mes por persona que publica** (en nuestro caso, una cuenta), con un crédito de uso incluido y pago extra si se supera.
2. **El plan gratuito de Supabase pone en pausa el proyecto tras 1 semana sin actividad y no tiene copias de seguridad.** Vale para desarrollar, pero no para el COAC. El **plan Pro** cuesta unos **25 $ al mes**, no se pausa e incluye **copias de seguridad diarias** guardadas 7 días (GEN-21).

*Los precios son de fuentes de 2026 que no son las páginas oficiales (no se pudieron abrir desde aquí). **Hay que comprobarlos en vercel.com/pricing y supabase.com/pricing** antes de dar de alta nada.*

### Estimación por temporada

| Periodo | Vercel | Supabase | Total aproximado al mes |
|---|---|---|---|
| **Desarrollo** (ahora, sin marcas ni público) | Gratis (Hobby) | Gratis | **0 €** |
| **COAC** (lanzamiento → Final) | Pro (~20 $) + uso extra si hay mucho tráfico | Pro (~25 $) + base de datos más grande en los picos | **~50-100 $**, según el tráfico |
| **Fuera de temporada** | Pro si se mantienen marcas; Hobby solo si no hay ningún uso comercial | Pro (para no perder las copias de seguridad) o bajar a un tamaño mínimo | **~25-45 $** |

Más el **dominio** (la dirección web), que cuesta poco al año.

### Para que no haya sustos

- **Límites de gasto** activados en Vercel y Supabase: si algo se dispara, nos avisan antes de cobrar de más.
- **Revisar la factura** después de la primera semana del COAC para ajustar el tamaño de la base de datos.

---

## 5. Cómo trabajamos tú y yo

```
 1. Yo escribo un cambio  ──►  2. Lo subo a GitHub (en una rama)
                                         │
                                         ▼
 4. Tú lo pruebas en tu móvil  ◄──  3. Vercel crea un ENLACE DE PRUEBA
         │
         ├─ ¿Bien? ──► 5. Lo pasamos a la web de verdad
         └─ ¿Mal?  ──► Me dices qué falla y vuelvo al paso 1
```

- **Nunca hay que tocar código para probar**: abres el enlace en el móvil y usas la web como cualquier persona.
- La web de verdad **solo cambia cuando tú das el visto bueno**.
- **Durante una sesión del COAC no se publican cambios grandes** (GEN-25).

### Lo que tendrás que hacer tú (te guiaré paso a paso)

1. Crear una cuenta en **Vercel** y otra en **Supabase** con tu email, y conectarlas a tu GitHub.
2. Comprar el **dominio** de El Falla.
3. Guardar en Vercel las "llaves" que conectan la web con la base de datos. **Yo nunca necesito tus contraseñas**: las llaves se quedan en tu cuenta.
4. Probar cada enlace que te mande y decirme qué tal.

Las actualizaciones de la base de datos (nuevas tablas, cambios) irán **dentro del propio código** y se aplicarán solas al publicar, para que no tengas que hacerlas a mano.

---

## 6. Riesgos técnicos y plan B

| Riesgo | Plan B |
|---|---|
| Vercel o Supabase tienen una caída durante una sesión | Los votos se guardan en el móvil y se reenvían (GEN-08). Mensaje de aviso en la web (GEN-24). Ambas empresas publican su estado en tiempo real. |
| El tráfico supera lo previsto | La parte de Vercel crece sola. La base de datos se sube de tamaño en minutos. Límites de gasto para no llevarnos sorpresas. |
| Queremos cambiar de proveedor más adelante | Next.js puede publicarse en otros servicios y la base de datos es PostgreSQL estándar. El cambio es trabajo, pero no hay que empezar de cero. |
| Los precios o condiciones cambian | Revisarlos antes de cada temporada. |

---

## 7. Calendario a grandes rasgos

El detalle por semanas irá en el **roadmap** (otro documento). Orden previsto:

1. **Base**: cuentas, proyecto, login, panel de administración mínimo y carga de agrupaciones.
2. **El Palco**: sesiones, "en escena", voto rápido, nota y ranking.
3. **Mi Palco**: Palcos, predicciones, puntos y rankings.
4. **Compartir y gamificación**: tarjetas, rachas, rankings generales, insignias.
5. **Jurado completo y sondeos.**
6. **Pruebas**: prueba de carga, simulacro con gente real, revisión legal.
7. **Lanzamiento**: web publicada al menos 2 semanas antes de la primera sesión.

---

## Fuentes consultadas sobre precios

- [Is Vercel Free? Yes on Hobby, No for Commercial (zplatform.ai)](https://zplatform.ai/guides/is-vercel-free/)
- [Vercel Pricing 2026: Hobby Free, Pro $20/developer/month (costbench.com)](https://costbench.com/software/developer-tools/vercel/)
- [Vercel Pricing 2026: Plans, Limits & Costs (temps.sh)](https://temps.sh/blog/vercel-pricing-complete-guide-2026)
- [Supabase Pricing 2026: Free vs Pro ($25) vs Team ($599) (nocode.mba)](https://www.nocode.mba/articles/supabase-pricing)
- [Supabase Pricing 2026: Free Tier Limits & Real Costs (designrevision.com)](https://designrevision.com/blog/supabase-pricing)
- [Supabase Backup 2026: Free Tier, Retention, PITR Cost (axonbuild.com)](https://axonbuild.com/blog/supabase-backup/)
- [Supabase · Available regions (documentación oficial)](https://supabase.com/docs/guides/platform/regions)

---

## 8. Cambio de base de datos: Firebase (8 de octubre de 2026)

✅ **Decidido:** la base de datos es **Firebase Firestore** (en lugar de Supabase), las cuentas serán **Firebase Authentication** (Google y enlace por email) y la web se publica en **Vercel**.

- **El navegador nunca escribe en la base de datos.** Toda escritura pasa por el servidor (Firebase Admin SDK) y las reglas de Firestore (`firestore.rules`) cierran todo acceso directo.
- **Un voto por persona y actuación** garantizado por el propio identificador del voto (`votes/{persona}_{actuación}`).
- **La nota de El Palco** se calcula desde un **histograma** (cuántos votos hay de cada nota) repartido en 10 trozos (`palcoTallies/{actuación}/shards`), para aguantar miles de votos a la vez. Da exactamente el mismo resultado que el cálculo voto a voto (probado con 2.000 votaciones al azar).
- **Transacciones:** cada operación carga solo los datos que necesita, aplica las reglas de `lib/db/logic.ts` y guarda solo lo que cambia (`lib/db/firestore-store.ts`). Probado con 80 votos simultáneos sobre la misma actuación.
- **Costes de Firestore:** el plan gratis (Spark) da 50.000 lecturas y 20.000 escrituras al día y, si se pasa, **deja de funcionar** hasta el día siguiente. Una noche de COAC lo supera: antes de la beta hay que pasar al plan **Blaze** (pago por uso) con alertas de gasto.
- **Clave de servicio:** solo en las variables de entorno de Vercel (`FIREBASE_SERVICE_ACCOUNT`), nunca en GitHub ni en el chat.

## 9. Estado anterior (provisional, ya sustituido)

- Los datos se guardan provisionalmente en un **archivo JSON en el servidor** (`lib/db/store.ts`). Todas las reglas están en `lib/db/logic.ts`, separadas del almacenamiento, así que pasar a Supabase (u otra base de datos) solo exige reescribir `store.ts`.
- **Sin cuentas todavía:** cada móvil recibe un identificador anónimo en una cookie. Sirve para "un voto por persona" y para poder bloquear, pero se puede saltar borrando cookies; las cuentas reales (CUE-01) lo resolverán.
- **Panel de administración** con una contraseña en `ADMIN_PASSWORD` y freno a los intentos repetidos. Antes del lanzamiento se sustituirá por cuentas con rol de administrador y doble verificación (GEN-20).
- Este almacenamiento en archivo **no sirve en Vercel** (no guarda archivos entre peticiones): antes de publicar hay que tener la base de datos real.
