import type { Metadata } from "next";
import Link from "next/link";
import { Programa } from "@/components/Programa";

export const metadata: Metadata = { title: "Programa" };

export default function ProgramaPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Programa general</p>
          <h1>Del 13 al 18 de octubre</h1>
          <p className="lede">
            Horarios en hora local de Santo Domingo (GMT-4). Filtre por su participación.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap days">
          <p className="note">
            Puertas abiertas: las delegaciones entran 30 minutos antes del inicio y los directores
            nacionales, 15 minutos antes. Los paseos opcionales están en{" "}
            <Link href="/visitas/">Tours</Link>.
          </p>
          <Programa />
        </div>
      </section>
    </>
  );
}
