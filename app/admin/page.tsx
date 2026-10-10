"use client";

import { useEffect, useState } from "react";
import {
  AJUSTES_URL,
  CATALOG_URL,
  applyAjustes,
  catalogImage,
  readCatalog,
  POLO_COLOR,
  type CatalogItem,
} from "@/lib/catalog";

const USD_RATE = 61;

type Variant = {
  name: string;
  priceUsd: number;
  stock: number | null;
};

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
        stock: null,
      });
    }
  }
  return variants.length > 1 ? variants : null;
}

function getVariants(item: CatalogItem): Variant[] | null {
  const priced = parseVariants(item.priceNote || "");
  if (priced) {
    return priced.map((v) => ({
      ...v,
      stock: item.optionStock?.[v.name] ?? null,
    }));
  }
  if (!item.optionStock || !POLO_COLOR[item.id]) return null;
  const order = ["S", "M", "L", "XL"];
  const names = Object.keys(item.optionStock).sort((a, b) => {
    const left = order.indexOf(a);
    const right = order.indexOf(b);
    if (left === -1 && right === -1) return a.localeCompare(b, "es");
    if (left === -1) return 1;
    if (right === -1) return -1;
    return left - right;
  });
  const usd = Math.ceil(item.price / USD_RATE);
  return names.map((name) => ({
    name,
    priceUsd: usd,
    stock: item.optionStock?.[name] ?? null,
  }));
}

type StockEdits = Record<string, Record<string, number | null>>;

export default function AdminStockPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [edits, setEdits] = useState<StockEdits>({});

  async function loadCatalog() {
    setLoading(true);
    try {
      const [catalog, ajustes] = await Promise.all([
        fetch(CATALOG_URL)
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null),
        fetch(AJUSTES_URL)
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null),
      ]);
      const next = readCatalog(catalog);
      if (next) {
        const applied = applyAjustes(next, ajustes);
        setItems(applied);
        const initialEdits: StockEdits = {};
        for (const item of applied) {
          const variants = getVariants(item);
          if (variants) {
            initialEdits[item.id] = {};
            for (const v of variants) {
              initialEdits[item.id][v.name] = v.stock;
            }
          }
        }
        setEdits(initialEdits);
      }
    } catch (error) {
      setMessage("Error al cargar el catálogo");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCatalog();
  }, []);

  function handleStockChange(itemId: string, variantName: string, value: string) {
    const numValue = value === "" ? null : Math.max(0, parseInt(value, 10) || 0);
    setEdits((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [variantName]: numValue,
      },
    }));
  }

  async function saveChanges() {
    setSaving(true);
    setMessage("");
    try {
      const ajustes: { id: string; opciones: Record<string, number> }[] = [];
      for (const [itemId, options] of Object.entries(edits)) {
        const opciones: Record<string, number> = {};
        for (const [name, stock] of Object.entries(options)) {
          if (stock !== null && stock !== undefined) {
            opciones[name] = stock;
          }
        }
        if (Object.keys(opciones).length > 0) {
          ajustes.push({ id: itemId, opciones });
        }
      }

      const res = await fetch("https://editor.acropolis.adesa.com.do/api/content/jornadas/stock-opciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ajustes }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "No se pudo guardar");
      }

      setMessage("Stock de variantes guardado correctamente");
      await loadCatalog();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  const itemsWithVariants = items.filter((item) => getVariants(item) !== null);

  return (
    <div className="admin-page">
      <h1>Administración de Stock por Variantes</h1>
      <p className="admin-lead">
        Aquí puedes editar el stock de productos que tienen variantes (tallas, opciones de precio, etc.)
      </p>

      {loading ? (
        <p className="admin-loading">Cargando catálogo...</p>
      ) : itemsWithVariants.length === 0 ? (
        <p>No hay productos con variantes.</p>
      ) : (
        <>
          <div className="admin-grid">
            {itemsWithVariants.map((item) => {
              const variants = getVariants(item);
              if (!variants) return null;
              const isPolo = Boolean(POLO_COLOR[item.id]);
              return (
                <article key={item.id} className="admin-card">
                  <img
                    src={catalogImage(item.image)}
                    alt={item.title}
                    className="admin-card-image"
                  />
                  <div className="admin-card-content">
                    <h3>{item.title}</h3>
                    {POLO_COLOR[item.id] && (
                      <p className="admin-color">{POLO_COLOR[item.id]}</p>
                    )}
                    <table className="admin-variants-table">
                      <thead>
                        <tr>
                          <th>{isPolo ? "Talla" : "Opción"}</th>
                          <th>Precio</th>
                          <th>Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {variants.map((variant) => (
                          <tr key={variant.name}>
                            <td>{variant.name}</td>
                            <td>US${variant.priceUsd}</td>
                            <td>
                              <input
                                type="number"
                                min="0"
                                value={edits[item.id]?.[variant.name] ?? ""}
                                placeholder="—"
                                onChange={(e) =>
                                  handleStockChange(item.id, variant.name, e.target.value)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="admin-actions">
            <button onClick={saveChanges} disabled={saving} className="admin-save-btn">
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
            {message && <p className="admin-message">{message}</p>}
          </div>

          <details className="admin-json-preview">
            <summary>Ver JSON de ajustes (para copiar manualmente)</summary>
            <pre>
              {JSON.stringify(
                Object.entries(edits)
                  .filter(([_, options]) =>
                    Object.values(options).some((v) => v !== null)
                  )
                  .map(([id, options]) => ({
                    id,
                    opciones: Object.fromEntries(
                      Object.entries(options).filter(([_, v]) => v !== null)
                    ),
                  })),
                null,
                2
              )}
            </pre>
          </details>
        </>
      )}

      <style jsx>{`
        .admin-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        h1 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }
        .admin-lead {
          color: #666;
          margin-bottom: 2rem;
        }
        .admin-loading {
          color: #666;
        }
        .admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .admin-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
        }
        .admin-card-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          background: #f5f5f5;
        }
        .admin-card-content {
          padding: 1rem;
        }
        .admin-card-content h3 {
          font-size: 1rem;
          margin: 0 0 0.5rem;
        }
        .admin-color {
          font-size: 0.85rem;
          color: #666;
          margin: 0 0 0.75rem;
        }
        .admin-variants-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .admin-variants-table th,
        .admin-variants-table td {
          padding: 0.5rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        .admin-variants-table th {
          font-weight: 600;
          color: #444;
        }
        .admin-variants-table input {
          width: 70px;
          padding: 0.35rem 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 0.9rem;
        }
        .admin-variants-table input:focus {
          outline: none;
          border-color: #0066cc;
        }
        .admin-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .admin-save-btn {
          background: #0066cc;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
        }
        .admin-save-btn:hover {
          background: #0055aa;
        }
        .admin-save-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .admin-message {
          margin: 0;
          color: #666;
        }
        .admin-json-preview {
          background: #f5f5f5;
          border-radius: 8px;
          padding: 1rem;
        }
        .admin-json-preview summary {
          cursor: pointer;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        .admin-json-preview pre {
          margin: 0;
          padding: 1rem;
          background: #1a1a1a;
          color: #0f0;
          border-radius: 4px;
          overflow-x: auto;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
