import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tienda" };

const JORNADAS = [
  ["jornada-iman.webp", "Imán de nevera · Jornadas 2026", "RD$ 200"],
  ["jornada-llavero.webp", "Llavero · Jornadas 2026", "RD$ 250"],
  ["jornada-pin.webp", "Pin · Jornadas 2026", "RD$ 180"],
  ["jornada-ceramica.webp", "Pieza de cerámica · Jornadas 2026", "RD$ 450"],
  ["jornada-postal.webp", "Postal · Jornadas 2026", "RD$ 100"],
] as const;

const SEPARADORES = [
  ["sep-suntzu-resultados-msg.svg", "Separador · Grandes resultados"],
  ["sep-nervo-msg.svg", "Separador · Arquitecto del destino"],
  ["sep-suntzu-conocete-msg.svg", "Separador · Conócete a ti mismo"],
  ["sep-platon-msg.svg", "Separador · El sabio"],
  ["sep-davinci-msg.svg", "Separador · Genio y trabajo"],
  ["sep-seneca-msg.svg", "Separador · La fortaleza"],
] as const;

export default function TiendaPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Librería Editorial Logos</p>
          <h1>Tienda de las Jornadas</h1>
          <p className="lede">
            Solo los separadores y los recuerdos de Jornadas 2026. La compra se hace en la tienda.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2>Jornadas 2026</h2>
          <div className="shop">
            {JORNADAS.map(([file, title, price]) => (
              <a
                key={file}
                className="product"
                href="https://tienda.acropolis.org.do/regalos/jornadas-2026/"
              >
                <img src={`https://tienda.acropolis.org.do/img/regalos/${file}`} alt={title} />
                <div>
                  <h3>{title}</h3>
                  <p className="price">{price}</p>
                </div>
              </a>
            ))}
          </div>
          <h2 style={{ marginTop: "2.5rem" }}>Separadores de libros</h2>
          <div className="shop">
            {SEPARADORES.map(([file, title]) => (
              <a
                key={file}
                className="product"
                href="https://tienda.acropolis.org.do/regalos/separadores/"
              >
                <img src={`https://tienda.acropolis.org.do/img/regalos/${file}`} alt={title} />
                <div>
                  <h3>{title}</h3>
                  <p className="price">RD$ 150</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
