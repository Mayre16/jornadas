import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Bienvenida" };

const FOTOS = [
  {
    src: "/img/lugares/colonial.webp",
    alt: "Calle de la Ciudad Colonial con buganvilias y campanario",
    caption: "Ciudad Colonial",
  },
  {
    src: "/img/lugares/catedral.webp",
    alt: "Fachada de la Catedral Primada de América",
    caption: "Catedral Primada",
  },
  {
    src: "/img/lugares/cordon.webp",
    alt: "Portada de la Casa del Cordón",
    caption: "Casa del Cordón",
  },
  {
    src: "/img/lugares/botanico.webp",
    alt: "Lago y jardines del Jardín Botánico Nacional",
    caption: "Jardín Botánico",
  },
  {
    src: "/img/lugares/boca-chica.webp?v=2",
    alt: "Bahía de Boca Chica desde arriba, con el agua azul celeste",
    caption: "Boca Chica",
  },
  {
    src: "/img/lugares/malecon-sd.webp",
    alt: "Monumento a Fray Antonio de Montesinos, en el Malecón",
    caption: "Malecón",
  },
];

const PAIS = [
  {
    name: "1496",
    text: "Fundación de Santo Domingo: primera catedral, primera universidad y primera fortaleza de América.",
  },
  {
    name: "3,087 m",
    text: "Pico Duarte, la montaña más alta del Caribe y de toda la costa atlántica de América.",
  },
  {
    name: "Lago Enriquillo",
    text: "El más grande y el más bajo del Caribe, bajo el nivel del mar. Lo habitan cocodrilos americanos y flamencos.",
  },
  {
    name: "≈ 1,500",
    text: "Ballenas jorobadas llegan cada invierno, de enero a marzo, a la Bahía de Samaná para aparearse y parir.",
  },
  {
    name: "+ 25 %",
    text: "Del territorio nacional está protegido en parques y reservas.",
  },
  {
    name: "Merengue y bachata",
    text: "Patrimonio Cultural Inmaterial de la Humanidad (UNESCO, 2016 y 2019).",
  },
  {
    name: "+ 10 millones",
    text: "De turistas internacionales en 2025, récord regional, con ingresos superiores a US$ 11,300 millones. Punta Cana está entre los cinco destinos más visitados de América Latina.",
  },
  {
    name: "Larimar",
    text: "Piedra azul que en el mundo solo se encuentra en las montañas de Barahona. Buen recuerdo para llevar.",
  },
];

const ESCUELA = [
  {
    name: "+ 2,000",
    text: "Adultos y jóvenes formados en filosofía práctica.",
  },
  {
    name: "+ 13,000",
    text: "Participantes en charlas, conversatorios y actividades abiertas.",
  },
  {
    name: "≈ 2,000",
    text: "Voluntarios en reforestación, reciclaje y operativos médicos y sociales.",
  },
  {
    name: "Esfera",
    text: "Como Punto Focal, prepara a líderes e instituciones para servir mejor en emergencias.",
  },
];

const HITOS = [
  {
    year: "1993",
    text: "Rein Blumenberg, fundador de Nueva Acrópolis en El Salvador, dicta una conferencia en San Salvador. Entre el público, una dominicana decide traer esta filosofía a su tierra.",
  },
  {
    year: "Mediados de los 90",
    text: "Primera conferencia en Santo Domingo, en el Hotel Quinto Centenario. Muchos se quedan con ganas de seguir buscando.",
  },
  {
    year: "Septiembre de 1998",
    text: "Con la llegada de María Eugenia Ríos Lamas desde Cali, Colombia, se funda formalmente Nueva Acrópolis en República Dominicana.",
  },
  {
    year: "Agosto de 2024",
    text: "La dirección pasa a Gabriel Paredes.",
  },
  {
    year: "2026",
    text: "Veintiocho años de escuela, hoy en Santo Domingo y Santiago de los Caballeros. República Dominicana recibe las XXXVI Jornadas del Área y la XXXI Reunión de Coordinación de Centroamérica y el Caribe.",
  },
];

export default function BienvenidaPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Bienvenida</p>
          <h1>Bienvenidos a República Dominicana</h1>
          <p className="lede">
            Nos alegra profundamente recibirlos. Hemos preparado estos días para compartir
            formación, fraternidad y servicio, y para que se lleven un poco de la alegría, la
            cultura y la hospitalidad de nuestro país. Esta guía les ayudará a orientarse,
            aprovechar sus tiempos libres y disfrutar de una estancia cómoda y segura.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="grid">
            {FOTOS.map((foto) => (
              <article className="card" key={foto.caption}>
                <figure>
                  <img src={foto.src} alt={foto.alt} />
                </figure>
                <h3>{foto.caption}</h3>
              </article>
            ))}
          </div>
          <div className="columns" style={{ marginTop: "2.2rem" }}>
            <div>
              <h2>República Dominicana: cuna de América y corazón del Caribe</h2>
              <div className="prose">
                <p>
                  Aquí comenzó la historia del continente. En <strong>Santo Domingo, fundada en
                  1496</strong>, se levantaron la primera catedral, la primera universidad y la
                  primera fortaleza de América, y la ciudad fue la capital cultural y política del
                  Nuevo Mundo. De aquí partieron las expediciones que marcaron la colonización y el
                  encuentro de culturas del que nació América Latina. Su <strong>Ciudad
                  Colonial</strong>, Patrimonio de la Humanidad, está a diez minutos del hotel sede.
                </p>
                <p>
                  La geografía es de extremos: la cumbre más alta y el lago más bajo del Caribe
                  están en este país, y más de una cuarta parte del territorio está protegida como
                  parques y reservas. La cultura mezcla raíces taínas, africanas y españolas, y se
                  prueba en la mesa: sancocho, mangú y un cacao que se exporta al mundo.
                </p>
                <p>
                  Hoy es la séptima economía de América Latina, la mayor del Caribe insular y el
                  líder turístico de la región. En un mismo viaje se puede caminar por la primera
                  ciudad del continente, subir a la cumbre más alta del Caribe, navegar entre
                  ballenas y descansar en playas de ensueño.
                </p>
              </div>
            </div>
            <div>
              <h2>Nueva Acrópolis en República Dominicana</h2>
              <div className="prose">
                <p>
                  Nuestra historia empezó con una dominicana que escuchó y actuó. Un par de años
                  después de oír al profesor <strong>Rein Blumenberg</strong> en San Salvador, lo
                  invitó a Santo Domingo. Su conferencia fue en el entonces Hotel Quinto Centenario,{" "}
                  <strong>hoy el Crowne Plaza</strong>: el mismo lugar que hoy recibe estas jornadas.
                </p>
              </div>
              <ul className="timeline">
                {HITOS.map((item) => (
                  <li key={item.year}>
                    <strong>{item.year}</strong>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h2 className="shop-title">Del país</h2>
          <div className="grid">
            {PAIS.map((item) => (
              <article className="card" key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <h2 className="shop-title">La escuela</h2>
          <div className="grid">
            {ESCUELA.map((item) => (
              <article className="card" key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="prose" style={{ marginTop: "2.2rem" }}>
            <p>
              Moneda, clima, hora y el E-Ticket están en <Link href="/practica/">Info práctica</Link>.
              Los lugares de la ciudad, en <Link href="/guia/">Guía SD</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
