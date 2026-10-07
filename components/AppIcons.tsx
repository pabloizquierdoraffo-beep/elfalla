// Sistema de iconos de El Falla (referencia aprobada por el responsable del producto,
// octubre de 2026). Formas rellenas y redondeadas; el color lo pone quien los usa (currentColor).

type IconProps = { className?: string; title?: string };

function Svg({ className = "h-6 w-6", title, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

const line = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Casa con el arco de la celosía dentro. */
export function InicioIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 2.2 22.4 11h-2.6v9.3a1.2 1.2 0 0 1-1.2 1.2H5.4a1.2 1.2 0 0 1-1.2-1.2V11H1.6zM12 8.4l-4.6 5.1v6.3h2.7v-3.7L12 13.8l1.9 2.3v3.7h2.7v-6.3z" />
    </Svg>
  );
}

/** Palco del teatro: cúpula, arcos y barandilla de celosía. */
export function PalcoIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4.6 8.6C4.6 5.9 7.9 4.1 12 4.1s7.4 1.8 7.4 4.5z" />
      <path d="M3.2 9.2h17.6v1.7H3.2z" />
      <path d="M4.2 11.4h15.6v4.5H4.2zM6 15.9v-2.4a1.4 1.4 0 0 1 2.8 0v2.4zm4.6 0v-2.4a1.4 1.4 0 0 1 2.8 0v2.4zm4.6 0v-2.4a1.4 1.4 0 0 1 2.8 0v2.4z" />
      <path d="M3.2 16.4h17.6v4.4H3.2zM6 17.2l1.3 1.4L6 20l-1.3-1.4zm4 0 1.3 1.4L10 20l-1.3-1.4zm4 0 1.3 1.4L14 20l-1.3-1.4zm4 0 1.3 1.4L18 20l-1.3-1.4z" />
    </Svg>
  );
}

/** Portapapeles con marcas: la porra. */
export function PorraIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="4.6" y="4.4" width="14.8" height="17" rx="2.4" {...line} />
      <path d="M9 2.6h6a1 1 0 0 1 1 1v2.2H8V3.6a1 1 0 0 1 1-1z" />
      <path d="m8.3 11 1.8 1.8 3.4-3.4M8.3 16.6l1.8 1.8 3.4-3.4" {...line} />
    </Svg>
  );
}

/** Urna con la papeleta: votar. */
export function VotarIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M7.6 2.6h8.8a.8.8 0 0 1 .8.8v8.4H6.8V3.4a.8.8 0 0 1 .8-.8zm1.9 5.6 1.7 1.7 3.6-3.6-1.1-1.1-2.5 2.5-.6-.6z" />
      <path d="M2.4 11.2h4v1.6h11.2v-1.6h4v2.4h-1v6.2a1.6 1.6 0 0 1-1.6 1.6H5a1.6 1.6 0 0 1-1.6-1.6v-6.2h-1z" />
    </Svg>
  );
}

export function ResultadosIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="12" width="3.8" height="9" rx="0.8" />
      <rect x="8.2" y="8" width="3.8" height="13" rx="0.8" />
      <rect x="13.4" y="3" width="3.8" height="18" rx="0.8" />
      <rect x="18.6" y="10" width="3" height="11" rx="0.8" />
    </Svg>
  );
}

/** Podio con corona. */
export function RankingIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="m8.8 3.5 1.6 1.6L12 2.6l1.6 2.5 1.6-1.6-.6 4H9.4z" />
      <rect x="9" y="9" width="6" height="12" rx="0.8" />
      <rect x="2.6" y="13" width="5.6" height="8" rx="0.8" />
      <rect x="15.8" y="15.5" width="5.6" height="5.5" rx="0.8" />
    </Svg>
  );
}

/** Grupo de personas: comparsas. */
export function ComparsasIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="6.4" r="3" />
      <circle cx="5.2" cy="8.4" r="2.4" />
      <circle cx="18.8" cy="8.4" r="2.4" />
      <path d="M6.6 20.6v-3.4a5.4 5.4 0 0 1 10.8 0v3.4z" />
      <path d="M1.2 19.6v-2.4a4 4 0 0 1 4-4c.7 0 1.3.2 1.9.5a6.8 6.8 0 0 0-1.9 3.5v2.4zM22.8 19.6v-2.4a4 4 0 0 0-4-4c-.7 0-1.3.2-1.9.5a6.8 6.8 0 0 1 1.9 3.5v2.4z" />
    </Svg>
  );
}

/** Gorro de bufón con las puntas caídas: chirigotas. */
export function ChirigotasIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3.8 15.4C3.5 12.8 2.6 11.2 1 10.8c1.8-2.3 5.6-2 7.7 1.2.7-3.6 2-6.4 4-7.9.8 2.6 1.6 5 1.9 7.9 2.1-3.2 5.9-3.5 7.7-1.2-1.6.4-2.5 2-2.8 4.6z" />
      <circle cx="1.4" cy="12.4" r="1.5" />
      <circle cx="12.9" cy="3.2" r="1.5" />
      <circle cx="22.6" cy="12.4" r="1.5" />
      <path d="M3.2 16.2h17.6a.8.8 0 0 1 .8.8v2.6a.8.8 0 0 1-.8.8H3.2a.8.8 0 0 1-.8-.8V17a.8.8 0 0 1 .8-.8zm3.3 1.1-1.1 1.2 1.1 1.2 1.1-1.2zm5.5 0-1.1 1.2 1.1 1.2 1.1-1.2zm5.5 0-1.1 1.2 1.1 1.2 1.1-1.2z" />
    </Svg>
  );
}

/** Máscaras de comedia y tragedia: cuartetos. */
export function CuartetosIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M1.6 5.2c3.2-1.6 6.5-1.6 9.7 0v4.9c0 3.3-2.2 5.9-4.85 5.9S1.6 13.4 1.6 10.1zM3.7 8.5a1.2.8 0 1 0 2.4 0 1.2.8 0 1 0-2.4 0zm3.1 0a1.2.8 0 1 0 2.4 0 1.2.8 0 1 0-2.4 0zm-2.5 3.1c.9 1.3 3.4 1.3 4.3 0z" />
      <path d="M12.7 9.2c3.2-1.6 6.5-1.6 9.7 0v4.9c0 3.3-2.2 5.9-4.85 5.9s-4.85-2.6-4.85-5.9zm2.1 3.3a1.2.8 0 1 0 2.4 0 1.2.8 0 1 0-2.4 0zm3.1 0a1.2.8 0 1 0 2.4 0 1.2.8 0 1 0-2.4 0zm-2.5 4.1c.9-1.3 3.4-1.3 4.3 0z" />
    </Svg>
  );
}

/** Personas con una nota musical: coros. */
export function CorosIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M15.6 1.8v5.6a1.9 1.9 0 1 1-1.2-1.8V2.6l4.6-1v2.2z" />
      <circle cx="5" cy="11" r="2.2" />
      <circle cx="12" cy="11.6" r="2.2" />
      <circle cx="19" cy="11" r="2.2" />
      <path d="M1.6 20.6v-2.6a3.4 3.4 0 0 1 6.8 0v2.6zm7 0v-2a3.4 3.4 0 0 1 6.8 0v2zm7 0v-2.6a3.4 3.4 0 0 1 6.8 0v2.6z" />
    </Svg>
  );
}

export function CalendarioIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M7 2h2v2.2h6V2h2v2.2h1.8A2.2 2.2 0 0 1 21 6.4v13.4a2.2 2.2 0 0 1-2.2 2.2H5.2A2.2 2.2 0 0 1 3 19.8V6.4a2.2 2.2 0 0 1 2.2-2.2H7zM5 9.4v10.4h14V9.4zm2 1.8h2.6v2.4H7zm3.7 0h2.6v2.4h-2.6zm3.7 0H17v2.4h-2.6zM7 15h2.6v2.4H7zm3.7 0h2.6v2.4h-2.6z" />
    </Svg>
  );
}

export function BuscarIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="10.5" cy="10.5" r="6.5" {...line} strokeWidth={2.6} />
      <path d="m15.4 15.4 5.6 5.6" {...line} strokeWidth={3} />
    </Svg>
  );
}

export function FavoritosIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 21C5.6 16.6 2 13.1 2 8.7A5 5 0 0 1 7 3.6c2.1 0 3.6 1.1 5 2.9 1.4-1.8 2.9-2.9 5-2.9a5 5 0 0 1 5 5.1c0 4.4-3.6 7.9-10 12.3z" />
    </Svg>
  );
}

export function PerfilIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="7.4" r="4.4" />
      <path d="M3.4 21.2a8.6 8.6 0 0 1 17.2 0z" />
    </Svg>
  );
}

export function NotificacionesIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 2.6a6 6 0 0 1 6 6v4.6l1.8 3.2H4.2L6 13.2V8.6a6 6 0 0 1 6-6zM9.6 18.4h4.8a2.4 2.4 0 0 1-4.8 0z" />
      <circle cx="19.2" cy="4.6" r="2.4" />
    </Svg>
  );
}

export function CompartirIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" {...line} />
    </Svg>
  );
}

export function EstadisticasIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M10.8 3.2v9.6h9.6A9.6 9.6 0 1 1 10.8 3.2z" />
      <path d="M13 1.2a9.8 9.8 0 0 1 9.8 9.8H13z" />
    </Svg>
  );
}

/** Ondas de emisión: en directo. */
export function DirectoIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="2.6" />
      <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.6 4.6a10.5 10.5 0 0 0 0 14.8M19.4 4.6a10.5 10.5 0 0 1 0 14.8" {...line} strokeWidth={2.4} />
    </Svg>
  );
}

export function GuardadosIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M6 2.6h12a1 1 0 0 1 1 1v18l-7-4.6-7 4.6v-18a1 1 0 0 1 1-1z" />
    </Svg>
  );
}

export function GruposIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="6.6" r="3.2" />
      <circle cx="5" cy="8.6" r="2.4" />
      <circle cx="19" cy="8.6" r="2.4" />
      <path d="M6.6 20.6v-3a5.4 5.4 0 0 1 10.8 0v3zM1.2 19.6v-2a3.8 3.8 0 0 1 5.6-3.4 6.8 6.8 0 0 0-1.4 4v1.4zm21.6 0v-2a3.8 3.8 0 0 0-5.6-3.4 6.8 6.8 0 0 1 1.4 4v1.4z" />
    </Svg>
  );
}

export function ComentariosIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3c5.5 0 9.6 3.6 9.6 8.1s-4.1 8.1-9.6 8.1c-1 0-2-.1-2.9-.4L4 21.4l1.4-4.1c-1.9-1.5-3-3.7-3-6.2C2.4 6.6 6.5 3 12 3zM7.2 9.7a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8zm4.8 0a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8zm4.8 0a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
    </Svg>
  );
}

export function AjustesIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M10.3 1.8h3.4l.5 2.6c.7.3 1.4.7 2 1.1l2.5-.9 1.7 2.9-2 1.7a7.6 7.6 0 0 1 0 2.4l2 1.7-1.7 2.9-2.5-.9c-.6.5-1.3.8-2 1.1l-.5 2.6h-3.4l-.5-2.6c-.7-.3-1.4-.6-2-1.1l-2.5.9-1.7-2.9 2-1.7a7.6 7.6 0 0 1 0-2.4l-2-1.7 1.7-2.9 2.5.9c.6-.4 1.3-.8 2-1.1zM12 8.7a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6z" transform="translate(0 0.4)" />
    </Svg>
  );
}

export function TendenciasIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="m2.6 17.6 6-6 4 4 7.6-7.6" {...line} strokeWidth={2.8} />
      <path d="M14.6 5.4h7v7z" />
    </Svg>
  );
}

/** Copa con la celosía: premio. */
export function PremioIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M6 2.6h12v1.8h3.4v2.2a4 4 0 0 1-3.8 4 6 6 0 0 1-4.4 3.6v2.4h3.2v2.6H7.6v-2.6h3.2v-2.4a6 6 0 0 1-4.4-3.6 4 4 0 0 1-3.8-4V4.4H6zM4.4 6.4v.2a1.9 1.9 0 0 0 1.6 1.9V6.4zm15.2 0H18v2.1a1.9 1.9 0 0 0 1.6-1.9zM9.6 4.6l2.4 2.6 2.4-2.6zm0 6.8 2.4-2.6 2.4 2.6z" />
      <rect x="6" y="19.8" width="12" height="2.4" rx="0.6" />
    </Svg>
  );
}

/** Todos los iconos, para el catálogo. */
export const ALL_ICONS = {
  Inicio: InicioIcon,
  "El Palco": PalcoIcon,
  Porra: PorraIcon,
  Votar: VotarIcon,
  Resultados: ResultadosIcon,
  Ranking: RankingIcon,
  Comparsas: ComparsasIcon,
  Chirigotas: ChirigotasIcon,
  Cuartetos: CuartetosIcon,
  Coros: CorosIcon,
  Calendario: CalendarioIcon,
  Buscar: BuscarIcon,
  Favoritos: FavoritosIcon,
  Perfil: PerfilIcon,
  Notificaciones: NotificacionesIcon,
  Compartir: CompartirIcon,
  Estadísticas: EstadisticasIcon,
  Directo: DirectoIcon,
  Guardados: GuardadosIcon,
  "Grupos / amigos": GruposIcon,
  Comentarios: ComentariosIcon,
  Ajustes: AjustesIcon,
  Tendencias: TendenciasIcon,
  Premio: PremioIcon,
};
