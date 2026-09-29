import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="landing-hero">
        <img
          className="landing-hero-photo"
          src="/img/lugares/colonial.webp"
          alt=""
        />
        <div className="wrap hero-top">
          <div>
            <p className="kicker">Centroamérica y el Caribe</p>
            <h1>XXXI Reunión de Coordinación y XXXVI Jornadas del Área</h1>
            <p className="lede">
              Por primera vez en República Dominicana. Santo Domingo recibe a los directores y
              delegaciones del área del 14 al 17 de octubre de 2026, con llegada desde el 12.
            </p>
          </div>
          <img
            className="logo-jornadas"
            src="/img/logo-jornadas.png"
            alt="31.ª Jornadas de América Central y el Caribe, República Dominicana 2026"
          />
        </div>
      </section>
      <section className="section places-section">
        <div className="wrap">
          <p className="kicker">La tierra que los recibe</p>
          <h2>Calles, música, piedra y mar</h2>
          <div className="places" aria-label="Lugares de Santo Domingo">
            <span className="place place-plaza">
              <img src="/img/lugares/collage-malecon.webp" alt="Malecón al anochecer, con el obelisco junto al mar" />
            </span>
            <span className="place place-museo">
              <img src="/img/lugares/collage-parque.webp" alt="Plaza con estatua, árboles y un edificio de piedra" />
            </span>
            <span className="place place-catedral">
              <img src="/img/lugares/collage-alcazar.webp" alt="Palacio de piedra iluminado al atardecer, frente al mar" />
            </span>
            <span className="place place-mar">
              <img src="/img/lugares/collage-playa.webp" alt="Playa de arena y mar azul claro, vista desde arriba" />
            </span>
            <span className="place place-espana">
              <img src="/img/lugares/collage-botanico.webp" alt="Árbol grande y sendero en un jardín" />
            </span>
          </div>
        </div>
      </section>
      <section className="hero hero-plain">
        <div className="wrap">
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
          </div>
          <div className="home-cards">
            <Link className="home-card" href="/programa/">
              <img src="/img/lugares/programa.webp" alt="Salón del encuentro, con escenario y sillas" />
              <div>
                <h3>Programa</h3>
                <p>La agenda del encuentro: actividades, hitos y el programa de cada día.</p>
              </div>
            </Link>
            <Link className="home-card" href="/tienda/">
              <span className="home-card-pair">
                <img src="/img/souvenirs/chocolate-kahkow.webp" alt="" />
                <img src="/img/souvenirs/vesta.webp" alt="" />
              </span>
              <div>
                <h3>Tienda</h3>
                <p>Souvenirs dominicanos y filosóficos.</p>
              </div>
            </Link>
            <Link className="home-card" href="/visitas/">
              <img src="/img/lugares/boca-chica.webp?v=2" alt="Bahía de Boca Chica desde arriba" />
              <div>
                <h3>Tours</h3>
                <p>Ciudad Colonial, El Conuco, la Catedral y, el domingo 18, las cuevas y la playa.</p>
              </div>
            </Link>
            <Link className="home-card" href="/donde-comer/">
              <img src="/img/lugares/luna.webp" alt="" />
              <div>
                <h3>Dónde comer</h3>
                <p>Bares, restaurantes y más opciones de comida, cerca del hotel y en la ciudad.</p>
              </div>
            </Link>
            <Link className="home-card" href="/bienvenida/">
              <img src="/img/lugares/botanico.webp" alt="Jardín Botánico Nacional" />
              <div>
                <h3>Bienvenida</h3>
                <p>Conoce a República Dominicana. Aquí los recibe Santo Domingo, frente al Caribe.</p>
              </div>
            </Link>
            <Link className="home-card" href="/guia/">
              <img src="/img/lugares/colonial.webp" alt="" />
              <div>
                <h3>Guía SD</h3>
                <p>Los lugares de Santo Domingo, y qué hacer si queda poco tiempo.</p>
              </div>
            </Link>
            <Link className="home-card" href="/sedes/">
              <img src="/img/lugares/malecon-sd.webp" alt="Malecón de Santo Domingo, frente al hotel" />
              <div>
                <h3>Sedes y contactos</h3>
                <p>El hotel, Naco, Evaristo Morales y Los Prados, y qué actividad es en cada uno.</p>
              </div>
            </Link>
            <Link className="home-card" href="/practica/">
              <img src="/img/lugares/faro.webp" alt="Faro a Colón" />
              <div>
                <h3>Info práctica</h3>
                <p>Emergencia, datos del país, farmacias y el E-Ticket.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
