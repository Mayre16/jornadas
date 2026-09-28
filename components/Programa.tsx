"use client";

import { useState } from "react";

type Audience = "delegaciones" | "directores" | "miembros" | "ambos";

type Slot = {
  start: string;
  end: string;
  title: string;
  where?: string;
  audience: Audience;
  doors?: string;
};

type Day = {
  id: string;
  name: string;
  date: string;
  note: string;
  slots: Slot[];
};

const DAYS: Day[] = [
  {
    id: "mar",
    name: "Martes",
    date: "13 oct",
    note: "Previo",
    slots: [
      {
        start: "19:00",
        end: "21:00",
        title: "Clase para miembros OINADOM con el DI",
        where: "Izbira · Salón Imperial",
        audience: "miembros",
      },
    ],
  },
  {
    id: "mie",
    name: "Miércoles",
    date: "14 oct",
    note: "Reunión de coordinación",
    slots: [
      {
        start: "10:00",
        end: "13:00",
        title: "XXXI Reunión de Coordinación",
        where: "Punto filosófico Evaristo Morales / Izbira",
        audience: "directores",
        doors: "9:45 · directores nacionales",
      },
      {
        start: "13:30",
        end: "14:30",
        title: "Almuerzo",
        where: "Izbira",
        audience: "directores",
      },
      {
        start: "18:00",
        end: "21:00",
        title: "Clase de ED para directores nacionales",
        where: "Izbira",
        audience: "directores",
        doors: "17:45 · directores nacionales",
      },
      {
        start: "21:00",
        end: "22:30",
        title: "Cena con directores nacionales",
        where: "Izbira",
        audience: "directores",
        doors: "20:45 · directores nacionales",
      },
    ],
  },
  {
    id: "jue",
    name: "Jueves",
    date: "15 oct",
    note: "Cóctel de bienvenida",
    slots: [
      {
        start: "10:00",
        end: "13:00",
        title: "Clase del DI para directores nacionales",
        where: "Punto filosófico Evaristo Morales / Izbira",
        audience: "directores",
        doors: "9:45 · directores nacionales",
      },
      {
        start: "13:30",
        end: "14:30",
        title: "Almuerzo y traslado",
        where: "Izbira → Crowne Plaza",
        audience: "directores",
      },
      {
        start: "17:00",
        end: "20:00",
        title: "Clase del DI para delegaciones",
        where: "Crowne Plaza · Salón B",
        audience: "ambos",
        doors: "16:30 delegaciones · 16:45 directores nacionales",
      },
      {
        start: "21:00",
        end: "23:00",
        title: "Cóctel de bienvenida",
        where: "Crowne Plaza · Área de piscina",
        audience: "ambos",
        doors: "20:30 delegaciones · 20:45 directores nacionales",
      },
    ],
  },
  {
    id: "vie",
    name: "Viernes",
    date: "16 oct",
    note: "Delegaciones",
    slots: [
      {
        start: "10:00",
        end: "13:00",
        title: "Clase del DI para delegaciones",
        where: "Crowne Plaza · Salón B",
        audience: "ambos",
        doors: "9:30 delegaciones · 9:45 directores nacionales",
      },
      {
        start: "13:00",
        end: "14:00",
        title: "Almuerzo libre",
        audience: "delegaciones",
      },
      {
        start: "17:00",
        end: "20:00",
        title: "Clase del DI para delegaciones",
        where: "Crowne Plaza · Salón B",
        audience: "ambos",
        doors: "16:30 delegaciones · 16:45 directores nacionales",
      },
      {
        start: "20:00",
        end: "22:00",
        title: "Cena libre",
        audience: "delegaciones",
      },
    ],
  },
  {
    id: "sab",
    name: "Sábado",
    date: "17 oct",
    note: "Cierre en el hotel",
    slots: [
      {
        start: "10:00",
        end: "13:00",
        title: "Taller formativo para instructores, clases de diálogo y cierre de Jornadas con el DI",
        where: "Crowne Plaza · Salón B",
        audience: "ambos",
        doors: "9:30 delegaciones · 9:45 directores nacionales",
      },
      {
        start: "18:00",
        end: "19:00",
        title: "Entrega de condecoraciones",
        where: "Crowne Plaza · Salón A",
        audience: "ambos",
        doors: "17:30 delegaciones · 17:45 directores nacionales",
      },
      {
        start: "20:30",
        end: "00:00",
        title: "Cena de confraternidad",
        where: "Crowne Plaza",
        audience: "ambos",
        doors: "20:00 delegaciones · 20:15 directores nacionales",
      },
    ],
  },
  {
    id: "dom",
    name: "Domingo",
    date: "18 oct",
    note: "Salida de delegaciones",
    slots: [
      {
        start: "5:00",
        end: "14:00",
        title: "Salida de delegaciones",
        audience: "delegaciones",
      },
    ],
  },
];

const FILTERS: { id: "todo" | Audience; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "delegaciones", label: "Delegaciones" },
  { id: "directores", label: "Directores nacionales" },
];

const WHO: Record<Audience, string> = {
  delegaciones: "Delegaciones",
  directores: "Directores nacionales",
  miembros: "Miembros OINADOM",
  ambos: "Todos",
};

function visible(slot: Slot, filter: "todo" | Audience) {
  if (filter === "todo") return true;
  if (filter === "delegaciones") return slot.audience === "delegaciones" || slot.audience === "ambos";
  if (filter === "directores") return slot.audience === "directores" || slot.audience === "ambos";
  return false;
}

export function Programa() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("todo");
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(DAYS.map((day) => [day.id, true])),
  );

  const days = DAYS.map((day) => ({
    ...day,
    slots: day.slots.filter((slot) => visible(slot, filter)),
  })).filter((day) => day.slots.length > 0);

  const allOpen = days.every((day) => open[day.id]);

  return (
    <>
      <div className="filters" role="tablist" aria-label="Filtrar el programa">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="day-tools">
        <button
          className="day-toggle"
          type="button"
          onClick={() =>
            setOpen(Object.fromEntries(days.map((day) => [day.id, !allOpen])))
          }
        >
          {allOpen ? "Cerrar todo" : "Expandir todo"}
        </button>
      </div>
      {days.map((day) => (
        <article className="day" key={day.id}>
          <header>
            <strong>{day.name}</strong>
            <span>
              {day.date} · {day.slots.length}{" "}
              {day.slots.length === 1 ? "actividad" : "actividades"}
            </span>
            <button
              className="day-toggle"
              type="button"
              aria-expanded={open[day.id]}
              onClick={() => setOpen((value) => ({ ...value, [day.id]: !value[day.id] }))}
            >
              {open[day.id] ? "Cerrar" : "Abrir"}
            </button>
          </header>
          {open[day.id] ? (
            <ul className="slots">
              {day.slots.map((slot) => (
                <li key={`${slot.start}-${slot.title}`}>
                  <time>
                    {slot.start}–{slot.end}
                  </time>
                  <span>
                    {slot.title}
                    {slot.where ? <span className="where">{slot.where}</span> : null}
                    <span className="who">{WHO[slot.audience]}</span>
                    {slot.doors ? <span className="doors">Puertas abiertas {slot.doors}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="where">{day.note}</p>
          )}
        </article>
      ))}
    </>
  );
}
