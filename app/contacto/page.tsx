import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contactos" };

const ORG = [
  {
    title: "Información y Recepción",
    text: "Dudas generales, programa, inscripciones.",
    phone: "+1 849 717 4144",
    tel: "+18497174144",
    wa: "18497174144",
  },
  {
    title: "Transporte y Seguridad",
    text: "Traslados, incidentes, objetos perdidos.",
    phone: "+1 849 585 4183",
    tel: "+18495854183",
    wa: "18495854183",
  },
  {
    title: "Anfitriones y edecanes",
    text: "Su anfitrión de delegación o edecán le comparte su número al llegar.",
    assigned: true,
  },
  {
    title: "Emergencia nacional",
    text: "Policía, ambulancia, bomberos.",
    phone: "911",
    tel: "911",
  },
  {
    title: "Asistencia vial",
    text: "Autopistas y carreteras.",
    phone: "511",
    tel: "511",
  },
];

export default function ContactoPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Contactos</p>
          <h1>A quién llamar</h1>
          <p className="lede">
            Información, transporte, emergencias y el hotel sede.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap contact-board">
          <article className="card">
            <h2>Contactos de la organización</h2>
            {ORG.map((item) => (
              <div className="contact-row" key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <div className="contact-actions">
                  {item.phone ? (
                    <a href={`tel:${item.tel}`}>{item.phone}</a>
                  ) : null}
                  {item.wa ? (
                    <a href={`https://wa.me/${item.wa}`}>WhatsApp</a>
                  ) : null}
                  {item.assigned ? <span className="assigned">Asignado</span> : null}
                </div>
              </div>
            ))}
          </article>
          <article className="card">
            <h2>Hotel sede</h2>
            <h3>Crowne Plaza Santo Domingo</h3>
            <p>Av. George Washington 218, frente al Malecón.</p>
            <p>Check-in 3:00 p.m. Check-out 12:00 p.m.</p>
            <p>
              Teléfono <a href="tel:+18092210000">+1 809 221 0000</a>
            </p>
            <p>Almuerzo: set menu US$ 30 por persona.</p>
            <p>
              <a href="https://www.google.com/maps/search/?api=1&query=Crowne+Plaza+Santo+Domingo+Ave+George+Washington+218">
                Abrir en Google Maps
              </a>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
