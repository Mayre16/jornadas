import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dónde comer" };

const CERCA = [
  {
    name: "Gautreaux's Restaurant",
    kind: "Internacional · restaurante y bar · 2 min · 100 m",
    detail: "Desayuno, almuerzo y cena. Precio medio a medio alto. Abierto de 7:00 a.m. a 1:00 a.m.",
    where: "Félix Mariano Lluberes 8, Gazcue",
    phone: "809-412-7838",
    tel: "+18094127838",
    map: "https://www.google.com/maps/search/?api=1&query=Hotel+Maison+Gautreaux+Félix+Mariano+Lluberes+8+Santo+Domingo",
    img: "/img/lugares/gautreaux.webp",
    alt: "Fachada del Hotel Maison Gautreaux",
  },
  {
    name: "Indian Food Palace",
    kind: "India · opciones vegetarianas · 2–3 min · 150 m",
    detail:
      "Cocina india vegetariana y no vegetariana. Delivery según cobertura. Unos RD$ 1,000 a 1,500 por persona. De 12:00 p.m. a 3:00 p.m. y de 6:00 p.m. a 10:30 p.m.",
    where: "Félix Mariano Lluberes 20, Gazcue",
    phone: "829-799-5253",
    tel: "+18297995253",
    map: "https://www.google.com/maps/search/?api=1&query=Indian+Food+Palace+Félix+Mariano+Lluberes+20+Gazcue+Santo+Domingo",
  },
  {
    name: "Café Casabe",
    kind: "Dominicana e internacional · 3 min · 200 m",
    detail:
      "Buena alternativa para desayuno, almuerzo o cena informal. En el Sheraton. Precio medio a medio alto. De 6:00 a.m. a 10:00 p.m.",
    where: "Av. George Washington 365",
    phone: "809-221-6666",
    tel: "+18092216666",
    map: "https://www.google.com/maps/search/?api=1&query=Café+Casabe+George+Washington+365+Santo+Domingo",
  },
  {
    name: "Hermanos Villar",
    kind: "Criolla · desayunos · panadería · 3–4 min · 200 m",
    detail:
      "Comida casera: mofongo, chicharrón, pescados y tostones. Panadería, repostería y comida para llevar. Precio económico a moderado. Lunes a sábado de 7:00 a.m. a 11:00 p.m. Domingo de 7:00 a.m. a 10:00 p.m.",
    where: "Av. Independencia 312",
    phone: "809-682-1433",
    tel: "+18096821433",
    map: "https://www.google.com/maps/search/?api=1&query=Hermanos+Villar+Independencia+312+Santo+Domingo",
  },
  {
    name: "Luna Tapas Bar",
    kind: "Tapas · caribeña y española · 3 min · 250 m",
    detail:
      "Tapas, carnes, pescados, mariscos y opciones vegetarianas. Ambiente casual, con área exterior. En el Renaissance Jaragua. Precio medio a medio alto. De 6:30 a.m. a 11:00 p.m.",
    where: "Av. George Washington 367",
    phone: "809-221-2222",
    tel: "+18092212222",
    map: "https://maps.app.goo.gl/w8Azr5AvSdVL9Ggd6",
    img: "/img/lugares/luna.webp",
    alt: "Comedor de Luna Tapas Bar",
  },
  {
    name: "Cafetería Manolo",
    kind: "Dominicana · mariscos · 8–10 min · 700 m",
    detail:
      "Platos dominicanos, mariscos, sancocho y mondongo. Terraza, reservas y comida para llevar. Precio medio. De 7:00 a.m. a 1:00 a.m.",
    where: "Av. Independencia 457",
    phone: "809-687-7670",
    tel: "+18096877670",
    map: "https://www.google.com/maps/search/?api=1&query=Cafetería+Manolo+Independencia+457+Santo+Domingo",
  },
];

const TIPOS = [
  {
    title: "Cocina dominicana",
    text: "Jalao, Mesón de Bari, Casa Paco's, El Conuco y Adrián Tropical.",
  },
  {
    title: "Carnes",
    text: "Patagonia Grill, Rincón Argentino y Central Gastronómica.",
  },
  {
    title: "Italiana",
    text: "ZOLA, La Locanda en Piantini y Verema 23.",
  },
  {
    title: "Mariscos",
    text: "Adrián Tropical, Maraca y Buche Perico.",
  },
  {
    title: "Cafés y comidas ligeras",
    text: "Affogato Café, La Bendita y Café Casabe.",
  },
  {
    title: "Comida rápida",
    text: "McDonald's, Burger King, Wendy's, Domino's, Pizza Hut y Subway.",
  },
];

export default function DondeComerPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Dónde comer</p>
          <h1>Cerca del hotel y lo mejor de la cocina dominicana</h1>
          <p className="lede">
            Pruebe el mofongo, el sancocho, los tostones y la bandera dominicana: arroz, habichuelas
            y carne guisada.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="grid">
            {CERCA.map((place) => (
              <article className="card" key={place.name}>
                {"img" in place && place.img ? (
                  <figure>
                    <img src={place.img} alt={place.alt} />
                  </figure>
                ) : null}
                <h3>{place.name}</h3>
                <p>{place.kind}</p>
                <p>{place.detail}</p>
                <p>{place.where}</p>
                <p>
                  <a href={`tel:${place.tel}`}>{place.phone}</a>
                  {" · "}
                  <a href={place.map}>Ver en el mapa</a>
                </p>
              </article>
            ))}
          </div>
          <h2 className="shop-title">Más opciones por tipo de comida</h2>
          <div className="grid">
            {TIPOS.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
