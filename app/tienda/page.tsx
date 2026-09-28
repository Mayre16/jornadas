import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tienda" };

const SOUVENIRS = [
  {
    file: "cafe-molido.webp",
    title: "Café Molido Santo Domingo",
    price: "RD$ 610",
    note: "USD$ 10",
    description:
      "El sabor del café dominicano para llevar contigo. Café elaborado con granos seleccionados, reconocido por su aroma intenso y sabor con cuerpo. Una forma clásica de disfrutar en casa uno de los sabores más representativos de República Dominicana.",
  },
  {
    file: "cafe-grano.webp",
    title: "Café Santo Domingo en Grano",
    price: "RD$ 732",
    note: "USD$ 12",
    description:
      "Café dominicano en granos tostados que conserva su aroma y aceites naturales hasta el momento de ser molido. Ideal para quienes prefieren preparar su café desde el grano y llevarse a casa el auténtico sabor del café dominicano.",
  },
  {
    file: "ron-brugal.webp",
    title: "Ron Brugal Doble Reserva 350 ml",
    price: "RD$ 915",
    note: "USD$ 15",
    description:
      "Ron premium dominicano elaborado mediante un proceso de doble envejecimiento que le aporta un perfil de sabor complejo y equilibrado. Una representación de la tradición ronera dominicana en una práctica presentación de 350 ml.",
  },
  {
    file: "mamajuana.webp",
    title: "Mamajuana Dominicana Artesanal",
    price: "RD$ 610",
    note: "USD$ 10",
    description:
      "Una tradición dominicana que puedes llevar contigo. Esta mamajuana artesanal reúne raíces y cortezas tradicionalmente utilizadas para preparar una de las bebidas más representativas del país. Para disfrutarla en casa, agrega ron dominicano, vino tinto y miel y deja reposar la mezcla para que absorba los aromas y sabores de sus ingredientes.",
  },
  {
    file: "dulces.webp",
    title: "Dulces Dominicanitos",
    price: "RD$ 100",
    note: "",
    description:
      "Un recorrido por los sabores dulces de nuestra tierra. Una selección de dulces tradicionales dominicanos presentada en un detalle artesanal, ideal para descubrir, compartir y llevar a casa un pedacito de nuestra cultura.",
  },
  {
    file: "llaveros.webp",
    title: "Llaveros República Dominicana",
    price: "RD$ 183",
    note: "USD$ 3 · 4 por USD$ 10",
    description:
      "Llaveros con diseños inspirados en los colores, la música, las tradiciones y los símbolos que representan la esencia de la República Dominicana. Elige el diseño que más te guste o combina varios para compartir.",
  },
  {
    file: "vaso-12.webp",
    title: "Vasos térmicos 12 oz",
    price: "RD$ 732",
    note: "USD$ 12",
    description:
      "Vasos térmicos reutilizables con diseños inspirados en la identidad, cultura y colores de la República Dominicana. Ideales para disfrutar tus bebidas favoritas mientras llevas contigo un pedacito de República Dominicana.",
  },
  {
    file: "vaso-16.webp",
    title: "Vasos térmicos 16 oz",
    price: "RD$ 915",
    note: "USD$ 15",
    description:
      "Vasos térmicos reutilizables de 16 oz, con diseños inspirados en la identidad, cultura y colores de la República Dominicana.",
  },
  {
    file: "chocolate-forteza.webp",
    title: "Chocolate Forteza · Cacao dominicano",
    price: "RD$ 732",
    note: "USD$ 12",
    description:
      "Forteza Caribbean Chocolate, de cacao dominicano, en 70 % y 80 %. República Dominicana es reconocida por la calidad de su cacao y por su producción orgánica.",
  },
  {
    file: "chocolate-kahkow.webp",
    title: "Chocolate KahKow",
    price: "RD$ 488",
    note: "USD$ 8",
    description:
      "KahKow celebra el cacao dominicano. Disponible en 55 % y 62 %, para descubrir el aroma y el sabor del cacao de República Dominicana.",
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
