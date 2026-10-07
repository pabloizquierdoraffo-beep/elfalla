# 07 · Modelo de datos

*Qué información guarda El Falla y cómo se relaciona. Es el "plano del archivador" antes de construir.*

**Cómo leerlo:** la primera parte es para cualquiera. La segunda (apartado 4) es la ficha técnica que usaré al programar.

---

## 1. La idea en sencillo

Imagina un archivador con cajones. Cada **cajón** guarda un tipo de cosa (personas, agrupaciones, votos…) y cada **ficha** dentro del cajón es una de esas cosas. Algunas fichas apuntan a otras: un voto apunta a la persona que votó y a la actuación votada.

```
TEMPORADA 2027
 └─ FASES (Preliminares, Cuartos, Semifinal, Final)
     └─ SESIONES (8 de enero, 20:00 …)
         └─ ACTUACIONES (agrupación X, 3.ª de la noche)
             ├─ VOTOS ◄──────────── PERSONA
             ├─ "¡Ya ha salido!" ◄─ PERSONA
             ├─ NOTA DE EL PALCO (calculada)
             └─ NOTA OFICIAL (cuando se publica)

AGRUPACIONES (nombre, modalidad, autores)

PORRA
 └─ RONDAS (Cuartos, Semifinal, Final, Orden)
     └─ PREDICCIONES ◄────── PERSONA (una porra por persona)

PALCOS ◄── MIEMBROS ──► PERSONA
```

**La clave:** una **actuación** es "una agrupación en una fase". Por eso la regla "un voto por persona, agrupación y fase" se convierte en algo muy simple: **un voto por persona y actuación**.

---

## 2. Los cajones

### Personas y cuentas

| Cajón | Qué guarda |
|---|---|
| **Perfiles** | Alias, año de nacimiento, estado (activa, sospechosa, bloqueada), si quiere aparecer en rankings generales y su rol (persona normal, operador de directo, administrador). |
| **Datos de ganadores** | Nombre real y documento **solo de quien gana un premio**. Cajón separado y cerrado: solo lo ve el equipo (GEN-22). |
| **Preferencias de notificación** | Qué avisos quiere recibir. |
| **Suscripciones de notificación** | Los datos técnicos que el navegador da para poder enviar avisos a ese móvil. |

*El email y el inicio de sesión los guarda el propio sistema de login de Supabase, aparte.*

### El concurso

| Cajón | Qué guarda |
|---|---|
| **Temporadas** | 2027 (y las siguientes). |
| **Fases** | Preliminares, Cuartos, Semifinal y Final, con su orden, la **hora prevista del fallo** y si la votación se cerró a mano. |
| **Cupos** | Cuántas pasan por fase y modalidad (por ejemplo, Cuartos · comparsas · 18). Así, si las Bases cambian otro año, solo se cambia un número. |
| **Agrupaciones** | Nombre, modalidad, autores y si se ha retirado. |
| **Sesiones** | Fecha, fase y hora de inicio (las 20:00). |
| **Actuaciones** | Qué agrupación, en qué sesión, en qué orden, hora prevista (y la ajustada por el retraso), estado de "en escena", **cómo se confirmó** (horario, afición o equipo) y cuándo se abre y se cierra su votación. |
| **Piezas de la ficha** | Las piezas oficiales y su máximo por modalidad (Pasodoble 1 · 22 …). |
| **Notas oficiales** | El total oficial de cada actuación cuando se publica, y de dónde se sacó. |
| **Resultados** | Quién pasa cada fase y el orden de la Final. |

### El Palco

| Cajón | Qué guarda |
|---|---|
| **Votos** | Persona, actuación, nota (0-100), si fue rápido o completo, cuándo, y si es **válido** (o por qué no). |
| **Piezas votadas** | En el jurado completo, la nota del 0 al 10 de cada pieza. |
| **Avisos "¡Ya ha salido!"** | Quién pulsó y cuándo (uno por persona y actuación). |
| **Notas de El Palco** | El resultado ya calculado: nota, número de votos y estado (sin nota, provisional, publicada). Se recalcula cada pocos segundos. |
| **Sondeos** y **respuestas** | Las preguntas de cada noche y la respuesta de cada persona (una por sondeo). |

### Mi Palco y la porra

| Cajón | Qué guarda |
|---|---|
| **Palcos** | Nombre, código de invitación, anfitrión. |
| **Miembros** | Quién está en qué Palco y desde cuándo. |
| **Rondas** | Cuartos, Semifinal, Final y Orden, con su apertura y cierre. |
| **Predicciones** | Qué agrupaciones eligió cada persona en cada ronda (y el puesto, en la ronda de Orden). **No dependen del Palco**: una porra por persona, que cuenta en todos sus Palcos. |
| **Puntos de la porra** | Puntos, aciertos y posiciones exactas de cada persona y ronda, ya calculados. |

### Gamificación

| Cajón | Qué guarda |
|---|---|
| **Estadísticas** | Por persona y temporada: actuaciones puntuadas, fichas completas, racha actual y máxima, Ojo de jurado, carácter. Ya calculadas, para que los rankings vayan rápidos. |
| **Insignias** y **insignias conseguidas** | El catálogo y quién tiene cuál. |

### Equipo y seguridad

| Cajón | Qué guarda |
|---|---|
| **Ajustes** | Todas las cifras que se cambian desde el panel: 30 votos, regla 1 de cada 5, puntos 1-2-4-5-2, 5 personas en 2 minutos, etc. |
| **Denuncias** | Quién denuncia qué (un alias, un nombre de Palco) y en qué quedó. |
| **Registro de auditoría** | Quién hizo qué y cuándo: cambios de estado, resultados cargados, cuentas bloqueadas, votos apartados. |

---

## 3. Quién puede ver qué

La base de datos aplica estas reglas por sí misma, así que aunque hubiera un fallo en la web, los datos siguen protegidos.

| Dato | Quién lo ve |
|---|---|
| Mis votos | Solo yo (y el equipo, para moderar). **Nadie más ve lo que he votado**; los demás solo ven la nota de El Palco. |
| Nota de El Palco con la votación abierta | Solo quien ya ha votado esa actuación (PAL-01). |
| Mis predicciones con la ronda abierta | Solo yo. |
| Predicciones de una ronda cerrada | Los miembros de los Palcos que comparto con esa persona. |
| Alias y puesto en rankings | Todo el mundo, salvo quien haya elegido no aparecer. |
| Datos de ganadores | Solo el equipo. |
| Panel de administración | Solo administradores; los operadores de directo, solo la parte de "en escena". |

---

## 4. Ficha técnica (para programar)

*Base de datos PostgreSQL en Supabase. Los nombres van en inglés porque es lo habitual en el código; al lado, su equivalente.*

```
profiles                 (perfiles)
  id uuid PK → auth.users   alias text UNIQUE   birth_year int
  status enum(active, suspicious, blocked)   role enum(user, live_operator, admin)
  hide_from_rankings bool   created_at

prize_winner_identity    (datos de ganadores · acceso solo admin)
  user_id FK   full_name   document_id   prize   created_at   delete_after date

seasons(id, year)
phases(id, season_id, kind enum(preliminares, cuartos, semifinal, final), position,
       expected_verdict_at timestamptz, voting_closed_manually_at)
quotas(phase_id, category, slots)              PK(phase_id, category)
groups(id, season_id, name, category enum(coro, comparsa, chirigota, cuarteto),
       authors text, withdrawn bool)
sessions(id, phase_id, starts_at timestamptz)
performances(id, session_id, group_id, running_order int,
       scheduled_at, adjusted_at,
       stage_status enum(scheduled, next, probably_on_stage, on_stage, finished, not_performing),
       on_stage_at, confirmed_by enum(schedule, crowd, staff),
       voting_opens_at, voting_closes_at)
       phase_id FK (copiado de la sesión)
       UNIQUE(group_id, phase_id)                -- una actuación por agrupación y fase
score_pieces(category, piece, position, max_points)
official_scores(performance_id PK, total_0_300, published_at, source_url)
phase_results(phase_id, group_id, advances bool, final_position int null)

votes(id, user_id, performance_id, score 0..100, kind enum(quick, full),
      created_at, updated_at, is_valid bool, invalid_reason text)
      UNIQUE(user_id, performance_id)           -- un voto por persona y actuación
vote_pieces(vote_id, piece, mark 0..10)
on_stage_reports(performance_id, user_id, created_at)   UNIQUE(performance_id, user_id)
palco_scores(performance_id PK, votes_count, score numeric(4,1),
             status enum(no_score, provisional, published), computed_at)

polls(id, session_id, performance_id null, kind, question, options jsonb, opens_at, closes_at, active)
poll_answers(poll_id, user_id, option)          UNIQUE(poll_id, user_id)

palcos(id, name, invite_code UNIQUE, host_id, created_at)
palco_members(palco_id, user_id, joined_at)     PK(palco_id, user_id)
rounds(id, season_id, kind enum(cuartos, semifinal, final, orden), opens_at, closes_at)
predictions(user_id, round_id, group_id, position int null)
      PK(user_id, round_id, group_id)   UNIQUE(user_id, round_id, position)
prediction_scores(user_id, round_id, points, hits, exact_positions)

user_stats(user_id, season_id, performances_scored, full_sheets, current_streak,
           best_streak, judge_eye_avg_diff, judge_character)
badges(id, code, name, description)
user_badges(user_id, badge_id, earned_at)

push_subscriptions(id, user_id, endpoint, keys jsonb, created_at)
notification_prefs(user_id, kind, enabled)
settings(key PK, value jsonb, updated_by, updated_at)
reports(id, reporter_id, target_kind, target_id, reason, status, resolved_by)
audit_log(id, actor_id, action, target_kind, target_id, before jsonb, after jsonb, at)
```

**Reglas que garantiza la propia base de datos:**

- Un voto por persona y actuación; un aviso "¡Ya ha salido!" por persona y actuación; una respuesta por sondeo.
- Notas entre 0 y 100; piezas entre 0 y 10.
- En la ronda de Orden, un puesto no puede repetirse.
- Un voto solo se acepta si la hora está **dentro de la ventana** de su actuación y la cuenta no está bloqueada.
- Las predicciones no se pueden cambiar después del cierre de su ronda.
- Seguridad por filas (RLS) con las reglas del apartado 3.

**Cálculos programados** (tareas automáticas):

| Cada… | Calcula |
|---|---|
| pocos segundos durante las sesiones | Notas de El Palco y estado de "en escena" |
| al cargar un resultado oficial | Puntos de la porra y rankings |
| al publicarse las notas oficiales | Ojo de jurado |
| al cierre de cada noche | Rachas, insignias y estadísticas |
