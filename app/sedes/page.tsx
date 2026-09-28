import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sedes" };

const LUGARES = [
  {
    kicker: "Hotel sede",
    name: "Crowne Plaza Santo Domingo",
    text: "Actividades principales de las Jornadas, cóctel de bienvenida, condecoraciones y cena de confraternidad.",
    rooms: ["Salón A · Condecoraciones", "Salón B · Clases y taller", "Área de piscina · Cóctel"],
    where: "Av. George Washington 218, Santo Domingo",
    map: "https://www.google.com/maps/search/?api=1&query=Crowne+Plaza+Santo+Domingo+Ave+George+Washington+218",
  },
  {
    kicker: "Nueva Acrópolis RD",
    name: "Sede central · Naco",
    text: "Visitas a la sede y apoyo institucional.",
    where: "Calle Cub Scouts #6, 3er nivel, Ensanche Naco, Santo Domingo",
    map: "https://www.google.com/maps/search/?api=1&query=Calle+Cub+Scouts+6+Naco+Santo+Domingo",
  },
  {
    kicker: "Nueva Acrópolis RD",
    name: "Punto filosófico Evaristo Morales",
    text: "Reunión de coordinación y clases indicadas en el programa.",
    where: "Av. Roberto Pastoriza #709, Santo Domingo",
    map: "https://www.google.com/maps/search/?api=1&query=Roberto+Pastoriza+709+Evaristo+Morales+Santo+Domingo",
  },
  {
    kicker: "Nueva Acrópolis RD",
    name: "Sede Los Prados",
    text: "Filial de Santo Domingo. Visitas y actividades de la escuela.",
    where: "Los Prados, Santo Domingo",
    map: "https://www.google.com/maps/search/?api=1&query=Nueva+Acrópolis+Los+Prados+Santo+Domingo",
  },
];

export default function SedesPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Locales</p>
          <h1>Dónde ocurre cada actividad</h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="grid sedes-grid">
            {LUGARES.map((place) => (
              <article className="card" key={place.name}>
                <p className="kicker">{place.kicker}</p>
                <h3>{place.name}</h3>
                <p>{place.text}</p>
                {"rooms" in place && place.rooms ? (
                  <ul>
                    {place.rooms.map((room) => (
                      <li key={room}>{room}</li>
                    ))}
                  </ul>
                ) : null}
                <p>{place.where}</p>
                <p>
                  <a href={place.map}>Ver en el mapa</a>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
