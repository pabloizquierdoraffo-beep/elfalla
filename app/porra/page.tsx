import { PorraIcon } from "@/components/AppIcons";
import { ComingSoon } from "@/components/ComingSoon";

export default function PorraPage() {
  return (
    <ComingSoon
      porra
      icon={PorraIcon}
      title="La Porra"
      when="semanas 7 y 8"
      items={["Crea tu Palco e invita a tus amigos", "¿Quién entra en Cuartos?", "Esta sería tu Final", "Ranking de tu Palco y ranking general"]}
    />
  );
}
