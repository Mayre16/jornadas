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

const KNOWN_VARIANTS: Record<string, Variant[]> = {
  "regalo-mu0aw7wk": [
    { name: "Individual", priceUsd: 4, stock: null },
    { name: "Pack 3", priceUsd: 10, stock: null },
  ],
  "regalo-muulm0j6": [
    { name: "Conchita", priceUsd: 8, stock: null },
    { name: "Piedras", priceUsd: 8, stock: null },
  ],
};

function parseVariants(priceNote: string): Variant[] | null {
  if (!priceNote.toLowerCase().startsWith("precios:")) return null;
  const cleaned = priceNote.replace(/^precios:\s*/i, "").replace(/\.$/, "");
  const parts = cleaned.split(/\s*[·•]\s*/);
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
  if (KNOWN_VARIANTS[item.id]) {
    return KNOWN_VARIANTS[item.id].map((v) => ({
      ...v,
      stock: item.optionStock?.[v.name] ?? null,
    }));
  }
  
  const priced = parseVariants(item.priceNote || "");
  if (priced) {
    return priced.map((v) => ({
      ...v,
      stock: item.optionStock?.[v.name] ?? null,
    }));
  }
  
  if (item.optionStock && POLO_COLOR[item.id]) {
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
  
  return null;
}

type StockEdits = Record<string, Record<string, number | null>>;
type CustomVariant = { name: string; priceUsd: string };
type CustomVariants = Record<string, CustomVariant[]>;

export default function AdminStockPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [edits, setEdits] = useState<StockEdits>({});
  const [customVariants, setCustomVariants] = useState<CustomVariants>({});
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    } catch {
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

  function addCustomVariant(itemId: string) {
    setCustomVariants((prev) => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), { name: "", priceUsd: "" }],
    }));
  }

  function updateCustomVariant(itemId: string, index: number, field: "name" | "priceUsd", value: string) {
    setCustomVariants((prev) => ({
      ...prev,
      [itemId]: prev[itemId].map((v, i) => (i === index ? { ...v, [field]: value } : v)),
    }));
  }

  function removeCustomVariant(itemId: string, index: number) {
    setCustomVariants((prev) => ({
      ...prev,
      [itemId]: prev[itemId].filter((_, i) => i !== index),
    }));
    setEdits((prev) => {
      const itemEdits = { ...prev[itemId] };
      const variantName = customVariants[itemId]?.[index]?.name;
      if (variantName && itemEdits[variantName] !== undefined) {
        delete itemEdits[variantName];
      }
      return { ...prev, [itemId]: itemEdits };
    });
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
  const itemsWithoutVariants = items.filter((item) => getVariants(item) === null);
  
  const filteredItemsWithoutVariants = itemsWithoutVariants.filter((item) => {
    if (!searchTerm) return true;
    const needle = searchTerm.toLowerCase();
    return item.title.toLowerCase().includes(needle) || item.id.toLowerCase().includes(needle);
  });

  return (
    <div className="admin-page">
      <h1>Administración de Stock por Variantes</h1>
      <p className="admin-lead">
        Edita el stock de productos con variantes (tallas, opciones de precio, etc.)
      </p>

      {loading ? (
        <p className="admin-loading">Cargando catálogo...</p>
      ) : (
        <>
          {itemsWithVariants.length > 0 && (
            <>
              <h2 className="admin-section-title">
                Productos con variantes ({itemsWithVariants.length})
              </h2>
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
            </>
          )}

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
                  .filter(([, options]) =>
                    Object.values(options).some((v) => v !== null)
                  )
                  .map(([id, options]) => ({
                    id,
                    opciones: Object.fromEntries(
                      Object.entries(options).filter(([, v]) => v !== null)
                    ),
                  })),
                null,
                2
              )}
            </pre>
          </details>

          <div className="admin-divider" />

          <h2 className="admin-section-title">
            <button
              type="button"
              className="admin-toggle-btn"
              onClick={() => setShowAllProducts(!showAllProducts)}
            >
              {showAllProducts ? "▼" : "▶"} Agregar variantes a otros productos ({itemsWithoutVariants.length})
            </button>
          </h2>

          {showAllProducts && (
            <>
              <div className="admin-search">
                <input
                  type="text"
                  placeholder="Buscar producto por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="admin-grid">
                {filteredItemsWithoutVariants.slice(0, 20).map((item) => {
                  const itemCustomVariants = customVariants[item.id] || [];
                  return (
                    <article key={item.id} className="admin-card">
                      <img
                        src={catalogImage(item.image)}
                        alt={item.title}
                        className="admin-card-image"
                      />
                      <div className="admin-card-content">
                        <h3>{item.title}</h3>
                        <p className="admin-id">ID: {item.id}</p>
                        
                        {itemCustomVariants.length > 0 && (
                          <table className="admin-variants-table">
                            <thead>
                              <tr>
                                <th>Opción</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {itemCustomVariants.map((cv, idx) => (
                                <tr key={idx}>
                                  <td>
                                    <input
                                      type="text"
                                      value={cv.name}
                                      placeholder="Nombre"
                                      className="admin-variant-name"
                                      onChange={(e) =>
                                        updateCustomVariant(item.id, idx, "name", e.target.value)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      value={cv.priceUsd}
                                      placeholder="$"
                                      min="0"
                                      onChange={(e) =>
                                        updateCustomVariant(item.id, idx, "priceUsd", e.target.value)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      min="0"
                                      value={edits[item.id]?.[cv.name] ?? ""}
                                      placeholder="—"
                                      onChange={(e) =>
                                        handleStockChange(item.id, cv.name, e.target.value)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      className="admin-remove-btn"
                                      onClick={() => removeCustomVariant(item.id, idx)}
                                    >
                                      ×
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        
                        <button
                          type="button"
                          className="admin-add-variant-btn"
                          onClick={() => addCustomVariant(item.id)}
                        >
                          + Agregar variante
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
              {filteredItemsWithoutVariants.length > 20 && (
                <p className="admin-note">
                  Mostrando 20 de {filteredItemsWithoutVariants.length} productos. Usa el buscador para encontrar más.
                </p>
              )}
            </>
          )}
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
        .admin-section-title {
          font-size: 1.25rem;
          margin: 1.5rem 0 1rem;
          color: #333;
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
        .admin-color, .admin-id {
          font-size: 0.85rem;
          color: #666;
          margin: 0 0 0.75rem;
        }
        .admin-variants-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
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
        .admin-variant-name {
          width: 100px !important;
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
          margin-bottom: 2rem;
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
        .admin-divider {
          border-top: 1px solid #ddd;
          margin: 2rem 0;
        }
        .admin-toggle-btn {
          background: none;
          border: none;
          font: inherit;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0;
          color: #333;
        }
        .admin-toggle-btn:hover {
          color: #0066cc;
        }
        .admin-search {
          margin-bottom: 1.5rem;
        }
        .admin-search input {
          width: 100%;
          max-width: 400px;
          padding: 0.6rem 1rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
        }
        .admin-add-variant-btn {
          background: #f0f0f0;
          border: 1px dashed #ccc;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85rem;
          width: 100%;
        }
        .admin-add-variant-btn:hover {
          background: #e5e5e5;
        }
        .admin-remove-btn {
          background: #ff4444;
          color: white;
          border: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1rem;
          line-height: 1;
        }
        .admin-note {
          color: #666;
          font-size: 0.9rem;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
