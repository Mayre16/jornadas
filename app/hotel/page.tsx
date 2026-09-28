import type { Metadata } from "next";

export const metadata: Metadata = { title: "Hotel" };

export default function HotelPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Sede del evento</p>
          <h1>Crowne Plaza Santo Domingo</h1>
          <p className="lede">
            Frente al mar Caribe, con vista al mar desde las habitaciones y un centro de
            convenciones para las actividades. Queda cerca de la Zona Colonial.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="prose">
            <p>
              Ave. George Washington 218, Santo Domingo. Las habitaciones incluyen Wi-Fi, TV por
              cable, caja de seguridad, plancha y secador. El hotel tiene piscina al aire libre.
            </p>
            <p>
              <a href="https://www.ihg.com/crowneplaza/hotels/us/es/santo-domingo/sdqha/hoteldetail">
                Ficha del hotel en IHG
              </a>
            </p>
          </div>
          <h2 style={{ marginTop: "2rem" }}>Tarifa diaria</h2>
          <p>Dólares americanos, con desayuno e impuestos.</p>
          <table className="price-table">
            <thead>
              <tr>
                <th>Habitación</th>
                <th>Tarifa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Individual</td>
                <td className="amount">US$ 134.40</td>
              </tr>
              <tr>
                <td>Doble, por persona</td>
                <td className="amount">US$ 67.20</td>
              </tr>
              <tr>
                <td>Triple, por persona</td>
                <td className="amount">US$ 57.94</td>
              </tr>
            </tbody>
          </table>
          <div className="prose" style={{ marginTop: "1.5rem" }}>
            <p>
              La reserva se hace directo con el hotel. Una sola persona completa el formulario por
              habitación y lo envía a <a href="mailto:Alma.burgos@ihgrd.com">Alma.burgos@ihgrd.com</a>
              , con copia a{" "}
              <a href="mailto:Director.NA.RD@acropolis.org">Director.NA.RD@acropolis.org</a>.
            </p>
            <p>
              El hotel pide tarjeta de crédito como garantía. El cobro es al llegar: no hay cobro
              anticipado del hotel. Las triples hay que consultarlas con el hotel.
            </p>
            <h2>E-Ticket para entrar y salir</h2>
            <p className="note">
              Cada pasajero completa el <a href="https://eticket.migracion.gob.do/">E-Ticket</a> de
              la Dirección General de Migración, una vez para la entrada y otra para la salida.
              Guarde los dos códigos QR. El trámite es gratis y conviene hacerlo antes de llegar al
              mostrador de la aerolínea. En alojamiento puede indicar el Hotel Crowne Plaza, Ave.
              George Washington 218, Santo Domingo.
            </p>
            <h2>Aeropuertos</h2>
            <p>
              Las Américas queda a cerca de una hora de la capital. Punta Cana queda a unas 2.5
              horas. Conviene comprar los boletos en mayo, con seguro de cancelación.
            </p>
            <p>
              El traslado aeropuerto–hotel–aeropuerto cuesta <strong>US$ 30</strong> por persona. No
              está incluido en la cuota de participación.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
