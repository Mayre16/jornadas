import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Programa" };

export default function ProgramaPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Programa general</p>
          <h1>Del 12 al 17 de octubre</h1>
          <p className="lede">
            Las jornadas propiamente dichas son del miércoles 14 al sábado 17. El lunes 12 es
            llegada y el martes 13 abre la recepción de directores nacionales.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap days">
          <article className="day">
            <header>
              <strong>Lunes 12</strong>
              <span>Llegada</span>
            </header>
            <p style={{ margin: 0, color: "var(--muted)" }}>
              Día de arribo. El traslado aeropuerto–hotel se coordina aparte.
            </p>
          </article>
          <article className="day">
            <header>
              <strong>Martes 13</strong>
              <span>Directores nacionales</span>
            </header>
            <ul className="slots">
              <li>
                <time>10:00</time>
                <span>Recepción de DDNN</span>
              </li>
              <li>
                <time>13:30</time>
                <span>Almuerzo libre</span>
              </li>
              <li>
                <time>19:00</time>
                <span>Reunión del DI con miembros de OINADOM</span>
              </li>
            </ul>
          </article>
          <article className="day">
            <header>
              <strong>Miércoles 14</strong>
              <span>Reunión de coordinación</span>
            </header>
            <ul className="slots">
              <li>
                <time>10:00</time>
                <span>Reunión de coordinación</span>
              </li>
              <li>
                <time>13:30</time>
                <span>Almuerzo en la sede central</span>
              </li>
              <li>
                <time>17:00</time>
                <span>Clase de ED para DDNN</span>
              </li>
              <li>
                <time>20:30</time>
                <span>Cena con DDNN en la sede central</span>
              </li>
            </ul>
          </article>
          <article className="day">
            <header>
              <strong>Jueves 15</strong>
              <span>Cóctel de bienvenida</span>
            </header>
            <ul className="slots">
              <li>
                <time>10:00</time>
                <span>Clase del DI para DDNN</span>
              </li>
              <li>
                <time>13:30</time>
                <span>Almuerzo en la sede central</span>
              </li>
              <li>
                <time>17:00</time>
                <span>Clase del DI para delegaciones</span>
              </li>
              <li>
                <time>20:30</time>
                <span>Cóctel de bienvenida</span>
              </li>
            </ul>
          </article>
          <article className="day">
            <header>
              <strong>Viernes 16</strong>
              <span>Delegaciones</span>
            </header>
            <ul className="slots">
              <li>
                <time>10:00</time>
                <span>Clase del DI para delegaciones</span>
              </li>
              <li>
                <time>13:30</time>
                <span>Almuerzo libre</span>
              </li>
              <li>
                <time>17:00</time>
                <span>Clase del DI para delegaciones</span>
              </li>
              <li>
                <time>20:30</time>
                <span>Cena libre</span>
              </li>
            </ul>
          </article>
          <article className="day">
            <header>
              <strong>Sábado 17</strong>
              <span>Cierre en el hotel</span>
            </header>
            <ul className="slots">
              <li>
                <time>10:00</time>
                <span>Clase del DI para delegaciones</span>
              </li>
              <li>
                <time>13:30</time>
                <span>Almuerzo libre</span>
              </li>
              <li>
                <time>18:00</time>
                <span>Entrega de condecoraciones, en el hotel</span>
              </li>
              <li>
                <time>20:00</time>
                <span>Cena de confraternidad, en el hotel</span>
              </li>
            </ul>
          </article>
          <p className="note">
            Miércoles y jueves hay transporte hotel–sede central para DDNN y SSI. Los paseos
            opcionales están en <Link href="/visitas/">Visitas</Link>, incluido el domingo 18.
          </p>
        </div>
      </section>
    </>
  );
}
