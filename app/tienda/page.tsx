import type { Metadata } from "next";
import { ReservaButton, ReservaToggle } from "@/components/ReservaCart";

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

const POLOS = [
  {
    file: "polo-gm.webp",
    title: "Polo GM",
    price: "RD$ 1,220",
    note: "USD$ 20",
    description:
      "Polo naranja en tejido Dry-Fit, con el símbolo de GM bordado en el pecho. Ligero, para las actividades.",
  },
  {
    file: "polo-gf.webp",
    title: "Polo GF",
    price: "RD$ 1,220",
    note: "USD$ 20",
    description:
      "Polo azul marino en tejido Dry-Fit, con el símbolo de GF bordado en el pecho.",
  },
  {
    file: "polo-gs.webp",
    title: "Polo GS",
    price: "RD$ 1,220",
    note: "USD$ 20",
    description: "Polo negro en tejido Dry-Fit, con el símbolo de GS bordado en el pecho.",
  },
] as const;

const RESINA = [
  { file: "vesta.webp", title: "Vesta", price: "RD$ 2,440", note: "USD$ 40" },
  { file: "leonidas.webp", title: "Busto de Leónidas", price: "RD$ 2,745", note: "USD$ 45" },
  { file: "escorpion.webp", title: "Escorpión Egipcio", price: "RD$ 1,220", note: "USD$ 20" },
  { file: "minotauro.webp", title: "Minotauro", price: "RD$ 2,440", note: "USD$ 40" },
  { file: "ankh-resina.webp", title: "Llave de Ankh", price: "RD$ 1,525", note: "USD$ 25" },
  { file: "vegvisir.webp", title: "Vegvísir", price: "RD$ 1,830", note: "USD$ 30" },
  { file: "escarabajo.webp", title: "Escarabajo Egipcio", price: "RD$ 2,440", note: "USD$ 40" },
  { file: "esfinge.webp", title: "Esfinge", price: "RD$ 3,050", note: "USD$ 50" },
  { file: "thor.webp", title: "Thor", price: "RD$ 1,098", note: "USD$ 18" },
  { file: "flor-vida.webp", title: "Flor de la Vida", price: "RD$ 1,220", note: "USD$ 20" },
  { file: "bastet.webp", title: "Bastet", price: "RD$ 2,745", note: "USD$ 45" },
  { file: "medusa.webp", title: "Medusa", price: "RD$ 3,050", note: "USD$ 50" },
] as const;

export default function TiendaPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Souvenirs</p>
          <h1>Tienda de las Jornadas</h1>
          <p className="lede">Recuerdos dominicanos, polos y piezas filosóficas en resina.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2 className="shop-title">De la tierra</h2>
          <p className="shop-lead">Café, cacao, ron, mamajuana y recuerdos dominicanos.</p>
          <div className="shop">
            {SOUVENIRS.map((item) => (
              <article key={item.file} className="product">
                <img src={`/img/souvenirs/${item.file}`} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p className="price">
                    {item.price}
                    {item.note ? <span className="price-note"> · {item.note}</span> : null}
                  </p>
                  <p className="product-desc">{item.description}</p>
                  <ReservaButton
                    product={{
                      id: item.file,
                      title: item.title,
                      priceLabel: item.price,
                      note: item.note,
                      description: item.description,
                      image: `/img/souvenirs/${item.file}`,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
          <h2 className="shop-title">Polos</h2>
          <p className="shop-lead">GM, GF y GS.</p>
          <div className="shop">
            {POLOS.map((item) => (
              <article key={item.file} className="product">
                <img src={`/img/souvenirs/${item.file}`} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p className="price">
                    {item.price}
                    <span className="price-note"> · {item.note}</span>
                  </p>
                  <p className="product-desc">{item.description}</p>
                  <ReservaButton
                    product={{
                      id: item.file,
                      title: item.title,
                      priceLabel: item.price,
                      note: item.note,
                      description: item.description,
                      image: `/img/souvenirs/${item.file}`,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
          <h2 className="shop-title">Piezas filosóficas</h2>
          <p className="shop-lead">Piezas en resina, de Vesta a Medusa.</p>
          <div className="shop">
            {RESINA.map((item) => (
              <article key={item.file} className="product">
                <img src={`/img/souvenirs/${item.file}`} alt={`${item.title}, pieza en resina`} />
                <div>
                  <h3>{item.title}</h3>
                  <p className="price">
                    {item.price}
                    <span className="price-note"> · {item.note}</span>
                  </p>
                  <p className="product-desc">Pieza en resina</p>
                  <ReservaButton
                    product={{
                      id: item.file,
                      title: item.title,
                      priceLabel: item.price,
                      note: item.note,
                      description: "Pieza en resina",
                      image: `/img/souvenirs/${item.file}`,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="reserve-float">
        <p>Arme la reserva con los artículos. Se envía al correo de Leslie y una copia al suyo.</p>
        <ReservaToggle />
      </div>
    </>
  );
}
