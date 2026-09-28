import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Centroamérica y el Caribe</p>
          <h1>XXXI Reunión de Coordinación y XXXVI Jornadas del Área</h1>
          <p className="lede">
            Por primera vez en República Dominicana. Santo Domingo recibe a los directores y
            delegaciones del área del 14 al 17 de octubre de 2026, con llegada desde el 12.
          </p>
          <ul className="facts">
            <li>
              <span>Fechas</span>
              <strong>14 al 17 de octubre de 2026</strong>
            </li>
            <li>
              <span>Lugar</span>
              <strong>Hotel Crowne Plaza Santo Domingo</strong>
            </li>
            <li>
              <span>Contacto</span>
              <strong>Director.NA.RD@acropolis.org</strong>
            </li>
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="prose">
            <h2>Bienvenida</h2>
            <p>
              Es un honor recibir, por primera vez en tierras dominicanas, las Jornadas y la
              Reunión de Coordinación de Centroamérica y el Caribe. Nueva Acrópolis República
              Dominicana prepara la casa para los hermanos acropolitanos del área.
            </p>
            <p>
              La participación es exclusiva para directores, incluyendo secretarios nacionales,
              jefes de fuerzas vivas y jefes nacionales de fuerzas vivas. La OINA CARD es
              indispensable para acceder a las reuniones y a las jornadas.
            </p>
            <p className="note">
              Los datos del encuentro salen de la Circular n.º 1 (26 de abril de 2026). Los paseos
              están en <Link href="/visitas/">Visitas</Link>.
            </p>
            <p className="note">
              Para entrar y salir del país hay que llenar el{" "}
              <a href="https://eticket.migracion.gob.do/">E-Ticket de Migración</a>: uno al llegar y
              otro al salir. Es gratis y la aerolínea lo pide antes del mostrador.
            </p>
          </div>
          <div className="grid" style={{ marginTop: "1.5rem" }}>
            <Link className="card" href="/programa/">
              <h3>Programa</h3>
              <p>Día por día, del martes 13 al sábado 17, más la llegada del lunes 12.</p>
            </Link>
            <Link className="card" href="/tienda/">
              <h3>Tienda</h3>
              <p>Souvenirs dominicanos: café, cacao, ron, mamajuana y recuerdos de la tierra.</p>
            </Link>
            <Link className="card" href="/visitas/">
              <h3>Visitas y paseos</h3>
              <p>
                Ciudad Colonial, El Conuco, la Catedral y, el domingo 18, Cuevas de las Maravillas y
                almuerzo en la playa.
              </p>
            </Link>
            <Link className="card" href="/hotel/">
              <h3>Hotel y traslados</h3>
              <p>Crowne Plaza, tarifas con desayuno e impuestos, y traslado de aeropuerto.</p>
            </Link>
            <Link className="card" href="/participacion/">
              <h3>Cuotas y plazos</h3>
              <p>Delegaciones, DDNN y SSI, anticipo, planillas y forma de pago.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
