"use client";

import Link from "next/link";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href="/">
            <img src="/img/logo-jornadas.png" alt="" width={52} height={52} />
            <span>
              <small>Nueva Acrópolis · República Dominicana</small>
              <strong>Tienda de las Jornadas</strong>
            </span>
          </Link>
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
