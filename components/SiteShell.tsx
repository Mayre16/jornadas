"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/bienvenida/", label: "Bienvenida" },
  { href: "/programa/", label: "Programa" },
  { href: "/visitas/", label: "Tours" },
  { href: "/donde-comer/", label: "Dónde comer" },
  { href: "/guia/", label: "Guía SD" },
  { href: "/sedes/", label: "Sedes" },
  { href: "/practica/", label: "Info práctica" },
  { href: "/tienda/", label: "Tienda" },
  { href: "/contacto/", label: "Contactos" },
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
            <img src="/img/logo-jornadas.png" alt="" width={52} height={52} />
            <span>
              <small>Nueva Acrópolis · República Dominicana</small>
              <strong>Jornadas 2026</strong>
            </span>
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
        </div>
      </footer>
    </>
  );
}
