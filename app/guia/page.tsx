import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Guía SD" };

const LUGARES = [
  {
    name: "Zona Colonial",
    text: "Catedral Primada de América, Alcázar de Colón, calle Las Damas, Plaza de España, Fortaleza Ozama, Panteón Nacional, calle El Conde y Ruinas de San Francisco. De 3 a 5 horas.",
    img: "/img/lugares/colonial.webp",
    alt: "Calle de la Ciudad Colonial",
    map: "https://www.google.com/maps/search/?api=1&query=Zona+Colonial+Santo+Domingo",
  },
  {
    name: "Parque Nacional Los Tres Ojos",
    text: "Sistema de cuevas y lagos de aguas cristalinas. De 1.5 a 2 horas.",
    img: "/img/lugares/tres-ojos.webp",
    alt: "Entrada a las cavernas de Los Tres Ojos",
    map: "https://www.google.com/maps/search/?api=1&query=Los+Tres+Ojos+Santo+Domingo",
  },
  {
    name: "Jardín Botánico Nacional",
    text: "Jardín japonés, reloj floral y colecciones de plantas tropicales. Un paseo tranquilo.",
    img: "/img/lugares/botanico.webp",
    alt: "Lago y jardín del Jardín Botánico Nacional",
    map: "https://www.google.com/maps/search/?api=1&query=Jardín+Botánico+Nacional+Santo+Domingo",
  },
  {
    name: "Malecón de Santo Domingo",
    text: "Paseo frente al mar Caribe, justo frente al hotel. Especialmente agradable al final de la tarde.",
    img: "/img/lugares/malecon-sd.webp",
    alt: "Monumento a Fray Antonio de Montesinos, en el Malecón",
    map: "https://www.google.com/maps/search/?api=1&query=Malecón+de+Santo+Domingo",
  },
  {
    name: "Museo del Ámbar",
    text: "Piezas de ámbar dominicano con inclusiones naturales.",
    img: "/img/lugares/ambar.webp",
    alt: "Pieza de ámbar dominicano",
    map: "https://www.google.com/maps/search/?api=1&query=Museo+del+Ámbar+Santo+Domingo",
  },
  {
    name: "Centro Cultural Taíno, Casa del Cordón",
    text: "Una de las primeras casas europeas del Nuevo Mundo. Exposición permanente sobre los primeros pobladores.",
    img: "/img/lugares/cordon.webp",
    alt: "Portada de la Casa del Cordón",
    map: "https://www.google.com/maps/search/?api=1&query=Casa+del+Cordón+Santo+Domingo",
  },
  {
    name: "Faro a Colón",
    text: "Monumento y salas de exposición.",
    img: "/img/lugares/faro.webp",
    alt: "Faro a Colón",
    map: "https://www.google.com/maps/search/?api=1&query=Faro+a+Colón+Santo+Domingo",
  },
  {
    name: "Plaza de la Cultura",
    text: "Museo del Hombre Dominicano, Museo de Historia Natural y Biblioteca Nacional.",
    img: "/img/lugares/hombre.webp",
    alt: "Museo del Hombre Dominicano, en la Plaza de la Cultura",
    map: "https://www.google.com/maps/search/?api=1&query=Plaza+de+la+Cultura+Santo+Domingo",
  },
  {
    name: "Museo Bellapart",
    text: "Colección privada de pintura dominicana.",
    map: "https://www.google.com/maps/search/?api=1&query=Museo+Bellapart+Santo+Domingo",
  },
  {
    name: "Museo del Ron Dominicano",
    text: "Historia del ron dominicano y exhibición.",
    map: "https://www.google.com/maps/search/?api=1&query=Museo+del+Ron+Dominicano+Santo+Domingo",
  },
];

const TIEMPO = [
  { time: "2 horas", text: "Malecón, o un café en la Zona Colonial: Parque Colón y calle El Conde." },
  {
    time: "3 horas · historia",
    text: "Zona Colonial: Catedral, Alcázar de Colón, Plaza de España y Centro Cultural Taíno.",
  },
  { time: "3 horas · naturaleza", text: "Los Tres Ojos y el Faro a Colón." },
  { time: "3 horas · atardecer", text: "Malecón y comida dominicana." },
  { time: "Medio día", text: "Los Tres Ojos, Faro a Colón y Zona Colonial." },
  {
    time: "Día completo",
    text: "Jardín Botánico, Plaza de la Cultura, Zona Colonial y cena con música en vivo.",
  },
];

export default function GuiaPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Guía SD</p>
          <h1>Qué conocer en la ciudad</h1>
          <p className="lede">
            Lugares para el tiempo libre. Si el paseo es de las Jornadas, el cupo y el horario están
            en <Link href="/visitas/">Tours</Link>.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2>Si solo tiene unas horas libres</h2>
          <div className="grid">
            {TIEMPO.map((item) => (
              <article className="card" key={item.time}>
                <h3>{item.time}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <h2 className="shop-title">Los lugares</h2>
          <div className="grid">
            {LUGARES.map((place) => (
              <article className="card" key={place.name}>
                {"img" in place && place.img ? (
                  <figure>
                    <img src={place.img} alt={place.alt} />
                  </figure>
                ) : null}
                <h3>{place.name}</h3>
                <p>{place.text}</p>
                <p>
                  <a href={place.map}>Ver en el mapa</a>
                </p>
              </article>
            ))}
          </div>
          <h2 className="shop-title">Compras y recuerdos</h2>
          <div className="grid">
            <article className="card">
              <h3>Centros comerciales</h3>
              <p>BlueMall, Ágora Mall y Sambil.</p>
            </article>
            <Link className="card" href="/tienda/">
              <h3>Recuerdos</h3>
              <p>
                Souvenirs dominicanos y filosóficos de las Jornadas: café, cacao, ron y las piezas
                de la tienda.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
