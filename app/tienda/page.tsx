import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tienda" };

const SOUVENIRS = [
  {
    file: "cafe-molido.webp",
    title: "Café Molido Santo Domingo",
    price: "RD$ 610",
    note: "USD$ 10",
    description:
      "El sabor del café dominicano para llevar contigo. Café elaborado con granos seleccionados, reconocido por su aroma intenso y sabor con cuerpo.",
  },
  {
    file: "cafe-grano.webp",
    title: "Café Santo Domingo en Grano",
    price: "RD$ 732",
    note: "USD$ 12",
    description:
      "Café dominicano en granos tostados que conserva su aroma y aceites naturales hasta el momento de ser molido.",
  },
  {
    file: "ron-brugal.webp",
    title: "Ron Brugal Doble Reserva 350 ml",
    price: "RD$ 915",
    note: "USD$ 15",
    description:
      "Ron premium dominicano de doble envejecimiento, en presentación de 350 ml.",
  },
  {
    file: "mamajuana.webp",
    title: "Mamajuana Dominicana Artesanal",
    price: "RD$ 610",
    note: "USD$ 10",
    description:
      "Raíces y cortezas para preparar mamajuana en casa, con ron dominicano, vino tinto y miel.",
  },
  {
    file: "dulces.webp",
    title: "Dulces Dominicanitos",
    price: "RD$ 100",
    note: "",
    description:
      "Selección de dulces tradicionales dominicanos, en un detalle artesanal para compartir.",
  },
  {
    file: "llaveros.webp",
    title: "Llaveros República Dominicana",
    price: "RD$ 183",
    note: "USD$ 3 · 4 por USD$ 10",
    description:
      "Llaveros con diseños de los colores, la música y los símbolos de la República Dominicana.",
  },
  {
    file: "vaso-12.webp",
    title: "Vasos térmicos 12 oz",
    price: "RD$ 732",
    note: "USD$ 12",
    description:
      "Vasos térmicos reutilizables con diseños de la identidad y los colores dominicanos.",
  },
  {
    file: "vaso-16.webp",
    title: "Vasos térmicos 16 oz",
    price: "RD$ 915",
    note: "USD$ 15",
    description:
      "Vasos térmicos reutilizables, en tamaño de 16 oz, con diseños dominicanos.",
  },
  {
    file: "chocolate-forteza.webp",
    title: "Chocolate Forteza · Cacao dominicano",
    price: "RD$ 732",
    note: "USD$ 12",
    description: "Chocolate caribeño Forteza, disponible en 70 % y 80 % de cacao dominicano.",
  },
  {
    file: "chocolate-kahkow.webp",
    title: "Chocolate KahKow",
    price: "RD$ 488",
    note: "USD$ 8",
    description: "Chocolate KahKow de cacao dominicano, disponible en 55 % y 62 %.",
  },
] as const;

export default function TiendaPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Souvenirs</p>
          <h1>Tienda de las Jornadas</h1>
          <p className="lede">
            Recuerdos de la República Dominicana para llevarse a casa. Los precios y las fotos son
            los de la Librería Editorial Logos.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="shop">
            {SOUVENIRS.map((item) => (
              <a
                key={item.file}
                className="product"
                href="https://tienda.acropolis.org.do/regalos/jornadas-2026/"
              >
                <img src={`/img/souvenirs/${item.file}`} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p className="price">
                    {item.price}
                    {item.note ? <span className="price-note"> · {item.note}</span> : null}
                  </p>
                  <p className="product-desc">{item.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
