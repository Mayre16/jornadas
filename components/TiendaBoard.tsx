"use client";

import { useEffect, useState } from "react";
import { ReservaButton, ReservaToggle } from "@/components/ReservaCart";
import {
  AJUSTES_URL,
  CATALOG_URL,
  CATEGORIES,
  FALLBACK_ITEMS,
  applyAjustes,
  availabilityLabel,
  canReserve,
  catalogImage,
  dolaresLabel,
  orderCap,
  readCatalog,
  type CatalogCategory,
  type CatalogItem,
} from "@/lib/catalog";

function fold(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

type Variant = {
  name: string;
  priceUsd: number;
  priceDop: number;
};

const USD_RATE = 61;

function parseVariants(priceNote: string): Variant[] | null {
  if (!priceNote.toLowerCase().startsWith("precios:")) return null;
  const parts = priceNote.replace(/^precios:\s*/i, "").split(/\s*[·•]\s*/);
  const variants: Variant[] = [];
  for (const part of parts) {
    const match = part.match(/^(.+?)\s*[—–-]\s*US\$?\s*(\d+)/i);
    if (match) {
      const priceUsd = parseInt(match[2], 10);
      variants.push({
        name: match[1].trim(),
        priceUsd,
        priceDop: priceUsd * USD_RATE,
      });
    }
  }
  return variants.length > 1 ? variants : null;
}

function ProductCard({ item, first }: { item: CatalogItem; first: boolean }) {
  const variants = parseVariants(item.priceNote || "");
  const [selectedVariant, setSelectedVariant] = useState(0);
  const open = canReserve(item);

  const currentVariant = variants ? variants[selectedVariant] : null;
  const displayPrice = currentVariant ? currentVariant.priceDop : item.price;
  const priceUsd = currentVariant 
    ? `US$${currentVariant.priceUsd}` 
    : dolaresLabel(displayPrice);

  return (
    <article className={open ? "product" : "product is-off"}>
      <img
        src={catalogImage(item.image)}
        alt={item.title}
        loading={first ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={first ? "high" : "low"}
      />
      <div>
        <h3>{item.title}</h3>
        {priceUsd ? (
          <p className="price">{priceUsd}</p>
        ) : null}
        {item.stock != null && item.stock > 0 ? (
          <p className="stock-note">{item.stock} disponibles</p>
        ) : null}
        {item.description ? <p className="product-desc">{item.description}</p> : null}
        
        {variants ? (
          <div className="variant-selector">
            <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(Number(e.target.value))}
              className="variant-select"
            >
              {variants.map((v, i) => (
                <option key={i} value={i}>
                  {v.name} — US${v.priceUsd}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        
        {open ? (
          <ReservaButton
            product={{
              id: currentVariant ? `${item.id}-${selectedVariant}` : item.id,
              title: currentVariant ? `${item.title} (${currentVariant.name})` : item.title,
              priceLabel: priceUsd,
              description: item.description,
              image: catalogImage(item.image),
              stock: orderCap(item),
            }}
          />
        ) : (
          <p className="soldout">{availabilityLabel(item)}</p>
        )}
      </div>
    </article>
  );
}

export function TiendaBoard() {
  const [items, setItems] = useState<CatalogItem[]>(FALLBACK_ITEMS);
  const [filter, setFilter] = useState<CatalogCategory | "todas">("todas");
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancel = false;
    Promise.all([
      fetch(CATALOG_URL)
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null),
      fetch(AJUSTES_URL)
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null),
    ])
      .then(([catalog, ajustes]) => {
        const next = readCatalog(catalog);
        if (!cancel && next) setItems(applyAjustes(next, ajustes));
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
    };
  }, []);

  const needle = fold(query.trim());
  const visible = CATEGORIES.filter((category) => filter === "todas" || filter === category.id)
    .map((category) => ({
      ...category,
      group: items.filter((item) => {
        if (item.category !== category.id) return false;
        if (!needle) return true;
        return fold(`${item.title} ${item.description || ""}`).includes(needle);
      }),
    }))
    .filter((category) => !needle || category.group.length > 0);

  return (
    <>
      <section className="section shop-page">
        <div className="wrap">
          <div className="shop-toolbar">
            <form
              className="shop-search"
              role="search"
              onSubmit={(event) => {
                event.preventDefault();
                setQuery(draft);
              }}
            >
              <div className="shop-search-field">
                <input
                  type="search"
                  value={draft}
                  placeholder="Buscar"
                  aria-label="Buscar un artículo"
                  onChange={(event) => {
                    const value = event.target.value;
                    setDraft(value);
                    if (!value.trim()) setQuery("");
                  }}
                />
                {draft || query ? (
                  <button
                    type="button"
                    className="shop-search-clear"
                    aria-label="Quitar la búsqueda"
                    onClick={() => {
                      setDraft("");
                      setQuery("");
                    }}
                  >
                    ×
                  </button>
                ) : null}
              </div>
              <button type="submit">Buscar</button>
            </form>
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
          </div>
          {visible.length === 0 ? (
            <p className="shop-empty">No hay artículos con ese nombre.</p>
          ) : null}
          {visible.map((category, categoryIndex) => {
            const group = category.group;
            return (
              <div key={category.id}>
                <h2 className="shop-title">{category.title}</h2>
                <p className="shop-lead">{category.lead}</p>
                {group.length === 0 ? (
                  <p className="shop-empty">Todavía no hay artículos en esta categoría.</p>
                ) : (
                  <div className="shop">
                    {group.map((item, index) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        first={categoryIndex === 0 && index < 3}
                      />
                    ))}
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
