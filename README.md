# El Falla

> *El jurado de la afición.* — "Este año, el palco es de todos."

El Falla es una **web app** (se usa desde el navegador del móvil, sin descargar nada) independiente para el Concurso Oficial de Agrupaciones Carnavalescas (COAC) de Cádiz. Tiene dos productos bajo una misma marca:

1. **El Palco**: la afición puntúa cada actuación y se calcula una nota colectiva.
2. **Mi Palco / Porras**: grupos privados de amigos que predicen quién pasa de fase, quién llega a la Final y quién gana.

El Falla **no es una app oficial** del Ayuntamiento ni del COAC, y **no gestiona apuestas ni dinero**.

## Dónde estamos

**Fase 1 — "Solo papel".** Todavía no hay código. Primero definimos bien las reglas y comprobamos que el concepto aguanta.

✅ **Fase 1 cerrada:** todas las decisiones están tomadas (ver [docs/01, apartado 6](docs/01-auditoria-del-concepto.md#6-decisiones-tomadas)).

| Documento | Qué contiene |
|---|---|
| [01 · Auditoría del concepto](docs/01-auditoria-del-concepto.md) | Fortalezas, riesgos, contradicciones y decisiones tomadas |
| [02 · Algoritmo de El Palco](docs/02-algoritmo-el-palco.md) | Cómo se calcula exactamente la nota de la afición |
| [03 · Puntos de las porras](docs/03-puntos-de-las-porras.md) | Tres sistemas de puntuación, simulados y comparados; elegido el sistema B |
| [04 · PRD del MVP](docs/04-prd-mvp.md) | Qué hace la app y para quién (las 4 partes escritas) |
| [05 · Arquitectura técnica](docs/05-arquitectura.md) | Cómo se construye: piezas, costes y forma de trabajar |
| [06 · Roadmap](docs/06-roadmap.md) | Calendario semana a semana hasta el COAC 2027 (8 ene - 5 feb) |
| [07 · Modelo de datos](docs/07-modelo-de-datos.md) | Qué información se guarda, cómo se relaciona y quién puede ver qué |
| [08 · Design system](docs/08-design-system.md) | Colores, letras, tamaños y componentes |
| [09 · Checklist legal](docs/09-checklist-legal.md) | Puntos para la revisión profesional (privacidad, marca, premios, patrocinio) |
| [10 · Wireframes de El Palco](docs/10-wireframes-el-palco.md) | Dibujo de cada pantalla de El Palco |

La fuente de verdad del proyecto es el *Dossier Maestro* (versión del 7 de octubre de 2026).

**Dominio previsto:** elfalla.es (pendiente de comprar).

## Próximamente (resto de entregables del dossier, sección 19)

- [x] PRD completo del MVP
- [ ] Mapa de información y navegación
- [ ] Flujos: votar, consultar El Palco, crear/unirse a un Palco, predecir y compartir
- [x] Modelo de datos
- [ ] API / acciones de backend
- [x] Arquitectura técnica para llegar al COAC 2027
- [ ] Sistema anti-abuso y moderación
- [ ] Wireframes textuales pantalla por pantalla *(El Palco hecho; faltan Mi Palco, perfil y admin)*
- [x] Design system (tokens, componentes y estados)
- [ ] Panel de administración mínimo
- [ ] Plan de analítica y eventos
- [x] Roadmap por semanas hasta la publicación
- [x] Checklist legal y de privacidad para revisión profesional
- [ ] Plan de pruebas y criterios de aceptación

## La web (código)

**Estado:** semana 2. Agrupaciones y votos de prueba (inventados). Los votos ya se guardan **en el servidor**, en un archivo provisional (`.data/elfalla.json`) que se sustituirá por la base de datos real antes de la beta. Mientras no haya cuentas, cada móvil recibe un identificador anónimo.

**Parte pública:** bienvenida, Inicio con la sesión en directo, listado de la sesión por modalidad, votar, voto enviado con la nota de El Palco (oculta hasta votar), "¡Ya ha salido!", "Cómo funciona El Palco" y modo sala.

**Panel de administración** (`/admin`, o desde Perfil → "Acceso del equipo"), protegido con contraseña:

| Sección | Qué permite |
|---|---|
| Directo | Elegir la sesión que se ve en la web, poner agrupaciones en escena, marcar "No actúa", abrir y cerrar votaciones (una a una o todas) |
| Agrupaciones | Crear y editar (nombre, modalidad, autores, foto), retirar y volver a activar |
| Sesiones | Crear sesiones, añadir actuaciones, cambiar el orden, quitar actuaciones sin votos |
| Usuarios | Ver quién vota, bloquear (con motivo) y desbloquear. Los votos de un bloqueado dejan de contar |
| Ajustes | Votos mínimos, regla del recorte, cifras del "¡Ya ha salido!"… sin tocar código |
| Registro | Todo lo que se hace en el panel, con fecha y hora |

**Tecnología:** Next.js 15 · React 19 · Tailwind CSS 4 · TypeScript. Reglas de negocio en `lib/db/logic.ts` y cálculo de El Palco en `lib/palco.ts`, ambos con pruebas automáticas.

**Para arrancarla en un ordenador** (hace falta Node.js 22). Copia `.env.example` como `.env.local` y pon una contraseña en `ADMIN_PASSWORD`. Después:

```bash
npm install
npm run dev        # abre http://localhost:3000 (panel en /admin)
npm test           # pruebas automáticas de las reglas
npm run lint       # comprobación de tipos
```

**Pruebas con navegador** (con la web arrancada con `npm run build && npm start`):

- `npm run capturas` → capturas de las pantallas públicas, como en un móvil.
- `ADMIN_PASSWORD=… npm run prueba:panel` → prueba de punta a punta del panel (votar, bloquear, poner en escena, cerrar votaciones, crear agrupaciones). Usar con un archivo de datos nuevo (`ELFALLA_DATA_FILE`).
