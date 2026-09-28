import type { Metadata } from "next";

export const metadata: Metadata = { title: "Participación" };

export default function ParticipacionPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Cuotas</p>
          <h1>Participación y plazos</h1>
          <p className="lede">
            La cuota no incluye hospedaje, almuerzos del viernes y sábado, cena del viernes ni
            traslados.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <table className="price-table">
            <thead>
              <tr>
                <th>Quién</th>
                <th>Cuota</th>
                <th>Incluye</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Delegaciones</td>
                <td className="amount">US$ 278</td>
                <td>
                  Cóctel de bienvenida del jueves 15, cena de confraternización del sábado 17,
                  montaje y coffee breaks. Habitación triple en la referencia de la circular.
                </td>
              </tr>
              <tr>
                <td>DDNN y miembros SSI</td>
                <td className="amount">US$ 315</td>
                <td>
                  Lo anterior, más almuerzos del miércoles 14 y jueves 15, cena del miércoles 14,
                  refrigerios de las reuniones en la sede y transporte hotel–sede el miércoles y el
                  jueves. Habitación doble en la referencia de la circular.
                </td>
              </tr>
            </tbody>
          </table>
          <div className="prose" style={{ marginTop: "1.75rem" }}>
            <h2>Pagos</h2>
            <p>
              El 50&nbsp;% de la cuota se paga antes del <strong>7 de julio de 2026</strong>. El
              saldo se cancela al inicio del evento. Las reservas de hotel siguen el orden del
              anticipo.
            </p>
            <p>
              La transferencia usa el documento «Datos para el envío de la transferencia». El
              comprobante se envía a{" "}
              <a href="mailto:Director.NA.RD@acropolis.org">Director.NA.RD@acropolis.org</a>. Para
              pagar con tarjeta, se pide en la planilla un enlace de pago personalizado.
            </p>
            <h2>Planillas</h2>
            <ul>
              <li>
                Listado preliminar: a más tardar el <strong>30 de mayo de 2026</strong>.
              </li>
              <li>
                Planilla definitiva: a más tardar el <strong>10 de septiembre de 2026</strong>.
              </li>
            </ul>
            <p className="note">
              OINA CARD obligatoria. Si hay un inconveniente o se necesita una tarjeta temporal, hay
              que avisarlo al mismo correo.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
