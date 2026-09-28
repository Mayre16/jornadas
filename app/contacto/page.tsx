import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactoPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Comunicación oficial</p>
          <h1>Un solo correo</h1>
          <p className="lede">
            Planillas, comprobantes y consultas van únicamente a la dirección nacional.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid">
          <article className="card">
            <h3>Organización</h3>
            <p>
              Gabriel Paredes
              <br />
              DN OINADOM
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              <a href="mailto:Director.NA.RD@acropolis.org">Director.NA.RD@acropolis.org</a>
            </p>
          </article>
          <article className="card">
            <h3>Reservas de hotel</h3>
            <p>Formulario de reserva, una persona por habitación.</p>
            <p style={{ marginTop: "0.75rem" }}>
              <a href="mailto:Alma.burgos@ihgrd.com">Alma.burgos@ihgrd.com</a>
              <br />
              con copia al correo de la DN.
            </p>
          </article>
          <article className="card">
            <h3>Hotel</h3>
            <p>
              Crowne Plaza Santo Domingo
              <br />
              Ave. George Washington 218
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
