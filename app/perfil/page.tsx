import { ComingSoon } from "@/components/ComingSoon";

export default function PerfilPage() {
  return (
    <ComingSoon
      title="Tu perfil"
      when="semana 9"
      items={["Tu historial de notas", "Tus Palcos", "Rachas e insignias", "Tu carácter como jurado"]}
    />
  );
}
