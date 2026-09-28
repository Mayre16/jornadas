"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/programa/", label: "Programa" },
  { href: "/visitas/", label: "Visitas" },
  { href: "/hotel/", label: "Hotel" },
  { href: "/participacion/", label: "Participación" },
  { href: "/tienda/", label: "Tienda" },
  { href: "/contacto/", label: "Contacto" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href="/" onClick={() => setOpen(false)}>
            <small>Nueva Acrópolis · República Dominicana</small>
            <strong>Jornadas 2026</strong>
          </Link>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((value) => !value)}
          >
            Menú
          </button>
          <nav className={open ? "nav is-open" : "nav"} id="menu">
            {LINKS.map((link) => {
              const here = pathname.endsWith("/") ? pathname : `${pathname}/`;
              const current = here === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main id="contenido">{children}</main>
      <footer className="site-footer">
        <div className="wrap">
          <span>Nueva Acrópolis República Dominicana · OINADOM</span>
          <a href="mailto:Director.NA.RD@acropolis.org">Director.NA.RD@acropolis.org</a>
        </div>
      </footer>
    </>
  );
}
