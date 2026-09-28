import type { Metadata } from "next";

export const metadata: Metadata = { title: "Visitas y paseos" };

export default function VisitasPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Visitas y paseos</p>
          <h1>Cuatro experiencias, del 15 al 18</h1>
          <p className="lede">
            Salidas y regresos desde el Hotel Crowne Plaza. La reserva de estos paseos es aparte de
            la cuota de participación, antes del 1 de octubre.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap days">
          <article className="day">
            <header>
              <strong>Jueves 15</strong>
              <span>Ciudad Colonial</span>
            </header>
            <div>
              <p>
                Recorrido histórico-cultural guiado por la primera ciudad europea de América.
                Incluye transporte, guía y agua. Unas 4 horas.
              </p>
              <ul className="slots">
                <li>
                  <time>8:00 a.m.</time>
                  <span>Salida. El recorrido termina a las 12:00 p.m.</span>
                </li>
                <li>
                  <time>Costo</time>
                  <span>US$ 45 por persona</span>
                </li>
              </ul>
            </div>
          </article>
          <article className="day">
            <header>
              <strong>Viernes 16</strong>
              <span>Noche criolla en El Conuco</span>
            </header>
            <div>
              <p>
                Traslado en grupo para una velada de gastronomía, música y tradición dominicana. La
                cena no está incluida.
              </p>
              <ul className="slots">
                <li>
                  <time>8:30 p.m.</time>
                  <span>Hasta las 11:00 p.m. Salida y regreso en el hotel.</span>
                </li>
                <li>
                  <time>Traslado</time>
                  <span>US$ 8 por persona</span>
                </li>
                <li>
                  <time>Cena</time>
                  <span>Unos US$ 25 por persona, de referencia, no incluida</span>
                </li>
              </ul>
            </div>
          </article>
          <article className="day">
            <header>
              <strong>Sábado 17</strong>
              <span>Museo Catedral Primada de América</span>
            </header>
            <div>
              <p>
                Recorrido guiado por orígenes, arquitectura, arte sacro y el tesoro de la Catedral.
                Incluye transporte, guía y agua. Unas 2.5 horas. Mínimo 6 personas.
              </p>
              <ul className="slots">
                <li>
                  <time>2:30 p.m.</time>
                  <span>Hasta las 5:00 p.m.</span>
                </li>
                <li>
                  <time>Costo</time>
                  <span>US$ 20 por persona</span>
                </li>
              </ul>
            </div>
          </article>
          <article className="day">
            <header>
              <strong>Domingo 18</strong>
              <span>Cuevas de las Maravillas y Almuerzo Playa</span>
            </header>
            <div>
              <p>
                Por la mañana, las Cuevas de las Maravillas: formaciones, pictografías y petroglifos
                taínos. Después, almuerzo frente al mar y tiempo de playa en Boca Chica. Transporte
                privado con aire acondicionado. El almuerzo no está incluido. Mínimo 9 personas
                para el almuerzo.
              </p>
              <ul className="slots">
                <li>
                  <time>8:30 a.m.</time>
                  <span>Salida desde Santo Domingo. Regreso alrededor de las 4:00 p.m.</span>
                </li>
                <li>
                  <time>Traslado</time>
                  <span>US$ 40 por persona, transporte y recorrido</span>
                </li>
                <li>
                  <time>Almuerzo</time>
                  <span>Unos US$ 25 a 40 por persona, no incluido</span>
                </li>
              </ul>
            </div>
          </article>
          <p className="note">
            Reservas de los paseos por WhatsApp al{" "}
            <a href="https://wa.me/18092588541">+1 (809) 258-8541</a>, antes del 1 de octubre.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2>Cerca del hotel y lo mejor de la cocina dominicana</h2>
          <div className="grid">
            <article className="card">
              <h3>Gautreaux&apos;s Restaurant</h3>
              <p>
                <a href="https://maps.app.goo.gl/ZExLr9aUCsM5D4gVA">Ver en el mapa</a>
              </p>
            </article>
            <article className="card">
              <h3>Luna Tapas Bar</h3>
              <p>
                <a href="https://maps.app.goo.gl/w8Azr5AvSdVL9Ggd6">Ver en el mapa</a>
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
