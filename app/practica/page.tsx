import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Info práctica" };

const ESTANCIA = [
  {
    name: "Moneda",
    lead: "Peso dominicano",
    text: "Código DOP, símbolo RD$. Referencia: RD$ 60 ≈ US$ 1. La mayoría de comercios acepta tarjetas; lleve solo el efectivo que necesite.",
  },
  {
    name: "Clima en octubre",
    lead: "24–31 °C",
    text: "Tropical, caluroso y húmedo, con lluvias breves por la tarde. Use ropa fresca y protector solar, y manténgase hidratado. Octubre forma parte de la temporada ciclónica: siga las indicaciones del equipo organizador.",
  },
  {
    name: "Electricidad",
    lead: "110 V",
    text: "Enchufes de patas planas, tipo A y B, iguales a los de Estados Unidos. Traiga adaptador si su equipo usa otro formato.",
  },
  {
    name: "Hora e idioma",
    lead: "GMT-4",
    text: "Sin horario de verano. Idioma oficial: español.",
  },
  {
    name: "Propinas e impuestos",
    lead: "10 % y 18 %",
    text: "Los restaurantes cargan por ley un 10 % de servicio en la cuenta. Se acostumbra dejar un 10 % adicional, opcional. Los servicios llevan ITBIS del 18 %.",
  },
  {
    name: "Aeropuertos",
    lead: "SDQ y PUJ",
    text: "Las Américas (SDQ) queda a cerca de una hora del hotel. Punta Cana (PUJ) queda a unas 2.5 horas.",
  },
];

export default function PracticaPage() {
  return (
    <>
      <div className="eticket-bar">
        <div className="wrap">
          <p>
            <strong>E-Ticket para entrar y salir.</strong> Cada pasajero llena un formulario al
            llegar y otro al salir. Es gratis. Guarde los dos códigos QR: la aerolínea los pide
            antes del mostrador.
            <a href="https://eticket.migracion.gob.do/">Hacer el E-Ticket</a>
          </p>
          <p>
            En alojamiento indique el Hotel Crowne Plaza, Ave. George Washington 218, Santo Domingo.
          </p>
        </div>
      </div>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Info práctica</p>
          <h1>Para su estancia</h1>
          <p className="lede">
            Lo necesario antes de venir: el país, la seguridad, las farmacias y los cajeros cerca
            del hotel.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="grid">
            {ESTANCIA.map((item) => (
              <article className="card" key={item.name}>
                <p className="kicker">{item.name}</p>
                <h3>{item.lead}</h3>
                <p>{item.text}</p>
              </article>
            ))}
            <article className="card">
              <p className="kicker">Seguridad y traslados</p>
              <h3>Cómo moverse</h3>
              <p>Use Uber o taxis autorizados por el hotel. Evite vehículos sin identificación.</p>
              <p>Preste atención al cruzar calles y al tránsito de motocicletas.</p>
              <p>
                Emergencias del país: <a href="tel:911">911</a>. Ante un inconveniente del encuentro,
                llame primero a la organización. Los teléfonos están en <Link href="/sedes/">Sedes</Link>.
              </p>
            </article>
          </div>
          <h2 className="shop-title">Farmacias</h2>
          <div className="grid">
            <article className="card">
              <h3>Farmacia Carmina</h3>
              <p>Av. Independencia 351, Gazcue. A unos 600 m del hotel.</p>
              <p>
                <a href="tel:+18096853191">809-685-3191</a>
                {" · "}
                <a href="https://www.google.com/maps/search/?api=1&query=Farmacia+Carmina+Av+Independencia+351+Gazcue+Santo+Domingo">
                  Mapa
                </a>
              </p>
            </article>
            <article className="card">
              <h3>GBC Gazcue</h3>
              <p>Calle Josefa Perdomo 169. Servicio a domicilio.</p>
              <p>
                <a href="tel:+18094754444">809-475-4444</a>
                {" · "}
                <a href="https://www.google.com/maps/search/?api=1&query=Farmacia+Medicar+GBC+Josefa+Perdomo+169+Gazcue+Santo+Domingo">
                  Mapa
                </a>
              </p>
            </article>
            <article className="card">
              <h3>Farmacia Carol</h3>
              <p>Servicio a domicilio, con entrega en el hotel.</p>
              <p>
                <a href="tel:+18095626767">809-562-6767</a>
              </p>
            </article>
          </div>
          <h2 className="shop-title">Bancos y cajeros</h2>
          <div className="grid">
            <article className="card">
              <h3>Cajero automático · Crowne Plaza</h3>
              <p>Dentro del hotel, las 24 horas. No necesita salir del hotel.</p>
              <p>
                <a href="tel:+18297555283">829-755-5283</a>
              </p>
            </article>
            <article className="card">
              <h3>Banreservas</h3>
              <p>Av. Independencia 201. A unos 500 m, unos 6 minutos a pie. Abierto las 24 horas.</p>
              <p>
                <a href="https://www.google.com/maps/search/?api=1&query=Banreservas+Av+Independencia+201+Santo+Domingo">
                  Mapa
                </a>
              </p>
            </article>
            <article className="card">
              <h3>Para comer</h3>
              <p>
                Maison Gautreaux, Luna, Villar, Manolo y más opciones están en{" "}
                <Link href="/donde-comer/">Dónde comer</Link>.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
