import { PalcoIcon } from "@/components/AppIcons";
import { ComingSoon } from "@/components/ComingSoon";

export default function ElPalcoPage() {
  return (
    <ComingSoon
      title="El Palco"
      icon={PalcoIcon}
      when="semana 6"
      items={["Ranking de la afición por fase y modalidad", "El corte de El Palco", "El Palco vs. Jurado Oficial", "Sondeos de cada noche"]}
    />
  );
}
