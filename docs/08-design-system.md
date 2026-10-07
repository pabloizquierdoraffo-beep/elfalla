# 08 · Design system básico

*Las "piezas de Lego" visuales de El Falla: colores, letras, tamaños y componentes. Así todas las pantallas se ven como una sola marca.*

Fuente: dossier, secciones 3 y 9, y la referencia visual aprobada (logo, icono, paleta Burdeos Falla / Marfil Cádiz / Arena).

---

> **Actualización (octubre 2026):** el responsable del producto pidió un estilo **más divertido y carnavalero** y una tipografía con más personalidad, tomando como referencia una maqueta con bloques de color por modalidad, tarjetas muy redondeadas, una portada burdeos y filtros en forma de píldora. Los cambios están en los apartados 2, 3, 4 y 9. De esa maqueta **no** se toman: fotos de agrupaciones (derechos audiovisuales), estrellas para votar (se decidió el deslizador 0-100) ni máscaras o gorros de bufón (dossier, sección 3).

## 1. Principios

1. **Crema, texto oscuro y burdeos.** Los acentos de color solo cuando significan algo.
2. **La celosía es una firma, no papel pintado.** Aparece poco y en sitios concretos.
3. **Se tiene que poder usar en la sala**: botones grandes, una mano, poco texto.
4. **Nada de máscaras, confeti ni bufones** (dossier, sección 3).
5. **Puntuar y predecir se distinguen a simple vista**: El Palco es burdeos; la porra, azul.

---

## 2. Colores

### Base de la marca (aprobada)

| Nombre | Código | Uso |
|---|---|---|
| **Burdeos Falla** | `#6B0D26` | Marca, botones principales, El Palco |
| **Marfil Cádiz** | `#F8F3E7` | Fondo general |
| **Arena** | `#D9C9A8` | Fondos secundarios, tarjetas, separadores |
| **Tinta** | `#2A1A1F` | Texto principal (casi negro, con un punto cálido) |
| **Gris cálido** | `#6F6266` | Texto secundario |

### Acentos por contexto

Tomados de la franja de color del dossier. **Los códigos son aproximados** y se ajustarán con los archivos originales de la marca.

| Acento | Claro (fondos, iconos) | Oscuro (texto) | Significa |
|---|---|---|---|
| **Coral** | `#C96B63` | `#A6463F` | **En directo**: "En escena", votación abierta |
| **Azul apagado** | `#5B7A9D` | `#3F5C7D` | **Porra**: predicciones, Mi Palco |
| **Ocre** | `#DDA94F` | `#8A6118` | **Logros**: rachas, insignias, premios |
| **Verde salvia** | `#8A9C88` | `#4F6650` | **Aciertos** y confirmaciones |

### Colores de modalidad (nuevo)

Bloques de color con icono que **sustituyen a las fotos** de las agrupaciones y alegran la pantalla. Siempre con texto Tinta encima.

| Modalidad | Normal | Modo sala | Icono | Contraste del texto |
|---|---|---|---|---|
| Comparsas | `#A8BEDD` | `#2F4058` | Guitarra | 8,8 / 9,5 ✅ |
| Chirigotas | `#B9CDB3` | `#35473B` | Bombo | 9,8 / 9,0 ✅ |
| Coros | `#F0B3AB` | `#5C2F33` | Abanico | 9,3 / 9,9 ✅ |
| Cuartetos | `#EBC572` | `#5C4620` | Palillos | 10,1 / 8,1 ✅ |

### Contraste comprobado

La norma de accesibilidad pide un contraste de al menos **4,5** para texto normal. Comprobado sobre el fondo Marfil:

| Combinación | Contraste | ¿Vale para texto? |
|---|---|---|
| Tinta sobre Marfil | 15,0 | ✅ |
| Burdeos sobre Marfil (y Marfil sobre Burdeos) | 11,1 | ✅ |
| Gris cálido sobre Marfil | 5,3 | ✅ |
| Coral oscuro / Azul oscuro / Ocre oscuro / Salvia oscuro sobre Marfil | 5,3 / 6,2 / 5,0 / 5,7 | ✅ |
| Coral / Azul / Ocre / Salvia **claros** sobre Marfil | 3,3 / 4,0 / 1,9 / 2,6 | ❌ Solo fondos, iconos grandes y adornos |
| Tinta sobre Ocre claro | 7,8 | ✅ (así se escribe encima del ocre) |

**Regla:** los acentos claros **nunca** se usan para escribir sobre crema; para texto, siempre su versión oscura.

### Modo sala (oscuro)

Para no deslumbrar en el teatro (GEN-15):

| Nombre | Código | Uso |
|---|---|---|
| Fondo sala | `#1C1114` | Fondo |
| Superficie sala | `#2A1C20` | Tarjetas |
| Texto | Marfil `#F8F3E7` | Contraste 16,6 ✅ |
| Burdeos sala | `#D98A9E` | Marca y botones (el burdeos normal no se vería sobre oscuro). Contraste 7,1 ✅ |

---

## 3. Tipografía

| Uso | Propuesta | Notas |
|---|---|---|
| **Logo** | El lettering propio del logo, en vector | No se escribe con una fuente: es un dibujo. |
| **Títulos** | ✅ **Fraunces**, en negrita, con sus ejes "SOFT" (curvas suaves) y "WONK" (un toque travieso) al máximo | Con más personalidad que la primera prueba (*Marcellus*). Licencia abierta, gratuita. |
| **Texto** | ✅ **DM Sans** | Cercana y muy legible en móvil. Licencia abierta, gratuita. |
| **Números** (notas, puntos) | La fuente de texto con cifras del mismo ancho | Así una nota que cambia de 78,4 a 81,0 no "baila". |

### Tamaños

| Estilo | Tamaño | Uso |
|---|---|---|
| Nota grande | 56 px | La nota del deslizador y la nota de El Palco |
| Título 1 | 28 px | Título de pantalla |
| Título 2 | 22 px | Secciones |
| Texto | 17 px | Lo normal |
| Pequeño | 14 px | Ayudas, "Iniciativa independiente" |

Los tamaños crecen si la persona tiene la letra grande en su móvil (GEN-12).

---

## 4. Espacios, formas y movimiento

- **Espaciado** en pasos de 4: 4 · 8 · 12 · 16 · 24 · 32 · 48 px. Margen lateral de pantalla: 16 px.
- **Esquinas redondeadas**: 16 px en tarjetas y botones, 24 px en las tarjetas destacadas (la de "En escena" y la hoja de votar), y **píldoras** totalmente redondas para filtros y etiquetas.
- **Sombras suaves** en las tarjetas destacadas y los botones principales.
- **Zona del pulgar**: los botones importantes van en la mitad de abajo.
- **Tamaño mínimo de cualquier cosa que se pulse**: 48 × 48 px.
- **Movimiento**: animaciones cortas (menos de medio segundo) solo para confirmar algo: voto enviado, subida de puesto, acierto. Si la persona tiene activado "reducir movimiento" en su móvil, se quitan.

---

## 5. La celosía

| ✅ Sí | ❌ No |
|---|---|
| El isotipo en la cabecera y en el icono | Llenar fondos enteros con el patrón |
| **Marca de agua** muy suave en las tarjetas para compartir | Ponerla en cada tarjeta y cada botón |
| **Separador** fino entre secciones importantes | Cambiarle la forma o añadirle barras (dossier, sección 3) |
| Animación breve al confirmar un voto | Usarla como icono de carga constante |

---

## 6. Componentes

Cada componente tiene sus **estados**: normal, pulsado, desactivado, cargando y error.

| Componente | Descripción | Estados especiales |
|---|---|---|
| **Botón principal** | Burdeos con texto marfil, ancho completo. "Puntuar", "Enviar", "Haz tu predicción". | — |
| **Botón secundario** | Borde burdeos, fondo transparente. | — |
| **Deslizador de voto** | Ocupa todo el ancho. Número grande (56 px) encima, marcas cada 10, se mueve con el pulgar. Vibra levemente cada 10 puntos (si el móvil lo permite). | Sin tocar · moviéndose · enviado |
| **Tarjeta de actuación** | Nombre, modalidad, orden y hora prevista. | Programada · **Siguiente** · *Probablemente en escena* · **En escena** (borde coral, punto que late) · Terminada · No actúa |
| **Chip de estado** | Etiqueta pequeña: "En escena", "Votación abierta", "Cerrada", "Provisional". | Coral para directo, gris para cerrado |
| **Nota de El Palco** | La nota grande con el número de votos debajo. | **Oculta** ("Vota y descubre…") · **Faltan X votos** · **Provisional** · **Publicada** |
| **Fila de ranking** | Puesto, nombre, nota o puntos, flecha de subida o bajada. **Mi fila siempre resaltada.** | "Vota para ver" · línea de "El corte de El Palco" |
| **Contador de selección** | "Comparsas: 12 de 18", en azul. | Incompleto · completo (verde salvia) · pasado (error) |
| **Cuenta atrás** | "Cierra en 5 h 20 min", en azul. | Menos de 1 hora → coral |
| **Botón "¡Ya ha salido!"** | Solo en la tarjeta "Siguiente". | Disponible · ya pulsado ("Gracias, esperando confirmación") |
| **Aviso pendiente** | Barra fina: "Pendiente de envío" cuando no hay conexión. | Pendiente · enviado · no ha llegado a tiempo |
| **Insignia** | Medalla con la celosía, en ocre. | Conseguida · bloqueada (gris) |
| **Tarjeta para compartir** | Marca, agrupación o fase, dato principal, marca de agua de celosía, "Iniciativa independiente". | Vertical (Stories) · cuadrada |
| **Mensaje breve** | Aparece abajo unos segundos: "Voto enviado". | Éxito · error · información |

---

## 7. Navegación

Barra inferior con 5 pestañas (dossier, sección 8):

| Pestaña | Icono (simple, de línea) | Color cuando está activa |
|---|---|---|
| Inicio | Casa | Burdeos |
| Puntuar | Deslizador | Burdeos |
| Porra | Lista con marcas | **Azul** |
| El Palco | Celosía | Burdeos |
| Perfil | Persona | Burdeos |

---

## 8. Tono de los textos

Cádiz actual, directo, cercano y con gracia, sin forzar el habla (dossier, sección 9).

| ✅ Así | ❌ Así no |
|---|---|
| "Tu puntuación" | "Valoración del usuario" |
| "¿La ves dentro?" | "¿Considera que esta agrupación clasificará?" |
| "Crea tu Palco" | "Crear grupo privado" |
| "Esta sería tu Final" | "Resumen de selección final" |
| "Vota y descubre qué opina El Palco" | "Para ver la puntuación agregada debe emitir su voto" |

---

## 9. Pantallas con el nuevo estilo

- **Portada / bienvenida**: fondo burdeos, logo en marfil y una celosía enorme y muy suave al fondo. Siempre burdeos, también en modo sala.
- **Inicio**: saludo "¡Hola!" y "Que empiece el espectáculo"; tarjeta burdeos de **En escena** con la celosía como marca de agua; **cuatro bloques de modalidad** de colores; tarjeta "Siguiente"; lista de las que ya han actuado.
- **Listado de la sesión**: filtros en píldora (Todas, Comparsas, Chirigotas, Coros, Cuartetos) y filas con número, bloque de color, nombre y estado.
- **Votar**: bloque de color de la modalidad arriba (en lugar de la foto) y una hoja redondeada con el número grande y el deslizador.
- **Voto enviado**: chispas de colores breves alrededor del ✓ (se quitan si el móvil tiene "reducir movimiento").

---

## 10. Versión "teatro" (más profesional)

Segunda petición del responsable del producto: un diseño **más profesional**, con el Gran Teatro Falla presente.

- **Fotos del teatro de fondo**, ligeramente difuminadas y bajo un **velo burdeos** degradado (más suave arriba, casi opaco abajo) para que el texto marfil se lea siempre:
  - Inicio → la **fachada**;
  - Bienvenida y listado de la sesión → el **patio de butacas desde el palco**;
  - Votar → el **telón rojo** (o la foto de la agrupación, si la tiene).
- El contenido sube sobre la foto como una **hoja** marfil con esquinas de 28 px.
- Tarjeta **"En escena" de cristal** (fondo translúcido con desenfoque) sobre la foto.
- **Oro de los palcos** para las etiquetas pequeñas en mayúsculas espaciadas (`#8A6118` sobre marfil, `#D9B77A` sobre burdeos).
- **Modalidades en tonos profundos** con letras marfil, sustituyendo a los pastel:

| Modalidad | Color | Contraste del texto marfil |
|---|---|---|
| Comparsas | `#2E4A70` | 8,1 ✅ |
| Chirigotas | `#2F5240` | 7,9 ✅ |
| Coros | `#8E2F45` | 7,2 ✅ |
| Cuartetos | `#8A5A12` | 5,3 ✅ |

- **Fotos de agrupaciones**: opcionales (a partir de Cuartos). Si hay foto, sustituye al bloque de color.
