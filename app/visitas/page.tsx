import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Tours" };

const TOURS = [
  {
    day: "Jueves 15",
    title: "Ciudad Colonial",
    img: "/img/lugares/colonial.webp",
    alt: "Calle de la Ciudad Colonial con buganvilias y campanario",
    text: "Recorrido histórico-cultural guiado por la primera ciudad europea de América. Incluye transporte, guía y agua. Unas 4 horas.",
    when: "8:00 a.m. a 12:00 p.m.",
    cost: "US$ 45 por persona",
    map: "https://www.google.com/maps/search/?api=1&query=Ciudad+Colonial+Santo+Domingo",
    mapLabel: "Cómo llegar a la Ciudad Colonial",
  },
  {
    day: "Viernes 16",
    title: "Noche criolla en El Conuco",
    img: "/img/lugares/conuco.webp",
    alt: "El Conuco, con bailarines y la bandera dominicana",
    text: "Traslado en grupo para una velada de gastronomía, música y tradición dominicana. La cena no está incluida.",
    when: "8:30 p.m. a 11:00 p.m.",
    cost: "Traslado US$ 8. La cena, unos US$ 25, no incluida",
    map: "https://www.google.com/maps/search/?api=1&query=El+Conuco+Restaurante+Santo+Domingo",
    mapLabel: "Cómo llegar a El Conuco",
  },
  {
    day: "Sábado 17",
    title: "Museo Catedral Primada de América",
    img: "/img/lugares/catedral.webp",
    alt: "Fachada de la Catedral Primada de América",
    text: "Recorrido guiado por orígenes, arquitectura, arte sacro y el tesoro de la Catedral. Incluye transporte, guía y agua. Unas 2.5 horas. Mínimo 6 personas.",
    when: "2:30 p.m. a 5:00 p.m.",
    cost: "US$ 20 por persona",
    map: "https://www.google.com/maps/search/?api=1&query=Catedral+Primada+de+América+Santo+Domingo",
    mapLabel: "Cómo llegar a la Catedral",
  },
  {
    day: "Domingo 18",
    title: "Cuevas de las Maravillas y almuerzo en la playa",
    img: "/img/lugares/cuevas.webp",
    alt: "Formaciones de las Cuevas de las Maravillas",
    text: "Por la mañana, las Cuevas de las Maravillas: formaciones, pictografías y petroglifos taínos. Después, almuerzo frente al mar y tiempo de playa en Boca Chica. El almuerzo no está incluido. Mínimo 9 personas para el almuerzo.",
    when: "8:30 a.m. Regreso alrededor de las 4:00 p.m.",
    cost: "Traslado US$ 40. Almuerzo unos US$ 25 a 40, no incluido",
    map: "https://www.google.com/maps/search/?api=1&query=Cuevas+de+las+Maravillas+República+Dominicana",
    mapLabel: "Cómo llegar a las Cuevas",
  },
];

export default function VisitasPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Tours</p>
          <h1 className="split">
            Cuatro Experiencias
            <span>del 15 al 18</span>
          </h1>
          <p className="lede">
            Salidas y regresos desde el Hotel Crowne Plaza. Los bares y restaurantes están en{" "}
            <Link href="/donde-comer/">Dónde comer</Link>.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap gallery">
          {TOURS.map((tour) => (
            <article className="tour-card" key={tour.title}>
              <img src={tour.img} alt={tour.alt} width={500} height={500} />
              <div>
                <p className="kicker">{tour.day}</p>
                <h2>{tour.title}</h2>
                <p>{tour.text}</p>
                <p>
                  <strong>{tour.when}</strong>
                  <br />
                  {tour.cost}
                </p>
                <p>
                  <a href={tour.map}>{tour.mapLabel}</a>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2>También en el calendario</h2>
          <div className="grid">
            <article className="card">
              <h3>Visita a la sede</h3>
              <p>Miércoles 14, de 2:30 p.m. a 5:00 p.m.</p>
              <p>Viernes 16, de 2:00 p.m. a 4:00 p.m.</p>
              <p>
                La dirección está en <Link href="/sedes/">Sedes</Link>.
              </p>
            </article>
            <article className="card">
              <h3>Cupo mínimo</h3>
              <p>
                El museo de la Catedral y el almuerzo del domingo se realizan cuando se completa el
                mínimo de personas.
              </p>
            </article>
          </div>
          <p className="note" style={{ marginTop: "1.25rem" }}>
            Las reservas de los tours son antes del 1 de octubre.
          </p>
        </div>
      </section>
    </>
  );
}
