"use client";

import { useEffect, useState } from "react";
import { ReservaButton, ReservaToggle } from "@/components/ReservaCart";
import {
  CATALOG_URL,
  CATEGORIES,
  FALLBACK_ITEMS,
  canReserve,
  catalogImage,
  orderCap,
  pesosLabel,
  readCatalog,
  type CatalogCategory,
  type CatalogItem,
} from "@/lib/catalog";

function extraNote(item: CatalogItem): string {
  const note = (item.priceNote || "").trim();
  const price = pesosLabel(item.price);
  if (!note || note === price) return "";
  if (note.startsWith(price)) return note.slice(price.length).replace(/^[\s·]+/, "");
  return note;
}

export function TiendaBoard() {
  const [items, setItems] = useState<CatalogItem[]>(FALLBACK_ITEMS);
  const [filter, setFilter] = useState<CatalogCategory | "todas">("todas");

  useEffect(() => {
    let cancel = false;
    fetch(CATALOG_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const next = readCatalog(data);
        if (!cancel && next) setItems(next);
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
    };
  }, []);

  const visible = CATEGORIES.filter((category) => filter === "todas" || filter === category.id);

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Jornadas 2026</p>
          <h1>Tienda de las Jornadas</h1>
          <p className="lede">Souvenirs dominicanos, souvenirs de Nueva Acrópolis y libros. Reserve y le llega a Leslie.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="shop-filters" role="group" aria-label="Categorías">
            <button type="button" aria-pressed={filter === "todas"} onClick={() => setFilter("todas")}>
              Todas
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={filter === category.id}
                onClick={() => setFilter(category.id)}
              >
                {category.title}
              </button>
            ))}
          </div>
          {visible.map((category) => {
            const group = items.filter((item) => item.category === category.id);
            return (
              <div key={category.id}>
                <h2 className="shop-title">{category.title}</h2>
                <p className="shop-lead">{category.lead}</p>
                {group.length === 0 ? (
                  <p className="shop-empty">Todavía no hay artículos en esta categoría.</p>
                ) : (
                  <div className="shop">
                    {group.map((item) => {
                      const open = canReserve(item);
                      const note = extraNote(item);
                      return (
                        <article key={item.id} className={open ? "product" : "product is-off"}>
                          <img src={catalogImage(item.image)} alt={item.title} />
                          <div>
                            <h3>{item.title}</h3>
                            <p className="price">
                              {pesosLabel(item.price)}
                              {note ? <span className="price-note"> · {note}</span> : null}
                            </p>
                            {item.stock != null && item.stock > 0 ? (
                              <p className="stock-note">{item.stock} disponibles</p>
                            ) : null}
                            {item.description ? <p className="product-desc">{item.description}</p> : null}
                            {open ? (
                              <ReservaButton
                                product={{
                                  id: item.id,
                                  title: item.title,
                                  priceLabel: pesosLabel(item.price),
                                  note,
                                  description: item.description,
                                  image: catalogImage(item.image),
                                  stock: orderCap(item),
                                }}
                              />
                            ) : (
                              <p className="soldout">No disponible</p>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <div className="reserve-float">
        <p>Arme la reserva con los artículos. Se envía al correo de Leslie y una copia al suyo.</p>
        <ReservaToggle />
      </div>
    </>
  );
}
