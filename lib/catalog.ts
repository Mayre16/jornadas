import fallback from "@/data/catalog.json";

export type CatalogCategory = "dominicanos" | "acropolis" | "libros";

export type CatalogItem = {
  id: string;
  category: CatalogCategory;
  title: string;
  description?: string;
  price: number;
  priceNote?: string;
  image: string;
  available: boolean;
  stock: number | null;
  optionStock?: Record<string, number>;
};

export const POLO_COLOR: Record<string, string> = {
  "sep-nervo": "Azul marino",
  "sep-suntzu-conocete": "Negro",
  "sep-suntzu-resultados": "Naranja",
};

export const POLO_SIZES: Record<string, Record<string, number>> = {
  "sep-nervo": { S: 2, M: 3, L: 2 },
  "sep-suntzu-conocete": { S: 1, M: 2, L: 1 },
  "sep-suntzu-resultados": { M: 1, L: 1 },
};

export const CATEGORIES: { id: CatalogCategory; title: string; lead: string }[] = [
  {
    id: "dominicanos",
    title: "Souvenirs Dominicanos",
    lead: "Sabores, tradiciones y recuerdos de República Dominicana.",
  },
  {
    id: "acropolis",
    title: "Souvenirs Nueva Acrópolis",
    lead: "Polos, piezas en resina, dijes y recuerdos de Nueva Acrópolis.",
  },
  {
    id: "libros",
    title: "Libros Jornadas",
    lead: "Libros de las Jornadas para llevarse un poco de filosofía a casa.",
  },
];

export const FALLBACK_ITEMS = fallback as CatalogItem[];

export const CATALOG_URL =
  "https://editor.acropolis.adesa.com.do/api/content/editorial/published";

export const AJUSTES_URL =
  "https://editor.acropolis.adesa.com.do/api/content/jornadas/published";

const SOURCE_CATEGORY: Record<string, CatalogCategory> = {
  "jornadas-2026": "dominicanos",
  separadores: "acropolis",
  libretas: "libros",
};

const BLURBS: Record<string, string> = {
  "libreta-conocete":
    "Obra del Dr. Miguel F. Torres. Recorre el incienso en las civilizaciones antiguas: su botánica y su química, el comercio por la ruta del incienso y su uso en la vida religiosa, y cierra con el incienso en Guatemala.",
  "libreta-escribir":
    "Textos de Epicteto, Séneca y Marco Aurelio, con apuntes de la vida de cada uno y un esquema de las tres etapas del estoicismo. Una lectura para acercarse a una filosofía práctica.",
};

const CATEGORY_IDS = new Set<CatalogCategory>(["dominicanos", "acropolis", "libros"]);

const USD_RATE = 61;

export function pesosLabel(price: number): string {
  if (!Number.isFinite(price) || price <= 0) return "";
  return `RD$ ${price.toLocaleString("en-US")}`;
}

export function dolaresLabel(price: number): string {
  if (!Number.isFinite(price) || price <= 0) return "";
  const usd = Math.ceil(price / USD_RATE);
  return `US$${usd}`;
}

export function canReserve(item: CatalogItem): boolean {
  if (!item.available) return false;
  if (item.stock === 0) return false;
  return true;
}

export function catalogImage(src: string): string {
  if (src.startsWith("/uploads/")) return `https://editor.acropolis.adesa.com.do${src}`;
  if (src.startsWith("/img/")) return `https://tienda.acropolis.org.do${src}`;
  return src;
}

export function orderCap(item: { stock?: number | null }): number {
  if (item.stock == null) return 99;
  return Math.max(0, Math.min(99, item.stock));
}

function isItem(value: unknown): value is CatalogItem {
  if (!value || typeof value !== "object") return false;
  const item = value as CatalogItem;
  return (
    typeof item.id === "string" &&
    item.id.length > 0 &&
    CATEGORY_IDS.has(item.category) &&
    typeof item.title === "string" &&
    typeof item.price === "number" &&
    typeof item.image === "string" &&
    typeof item.available === "boolean"
  );
}

function blocked(id: string, title: string): boolean {
  const blob = `${id} ${title}`.toLowerCase();
  if (blob.includes("memorion") || blob.includes("memorión")) return true;
  if (title.toLowerCase().startsWith("libreta")) return true;
  const low = title.toLowerCase();
  if (low.includes("camiseta") && /s[oó]crates|plat[oó]n|metaphysica/.test(low)) return true;
  return false;
}

function parseOptionStock(raw: unknown): Record<string, number> | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const result: Record<string, number> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof value === "number" && Number.isFinite(value)) {
      result[key.trim()] = Math.max(0, value);
    } else if (typeof value === "string") {
      const num = parseInt(value, 10);
      if (Number.isFinite(num)) result[key.trim()] = Math.max(0, num);
    }
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

function fromEditorial(data: unknown): CatalogItem[] | null {
  const regalos = (data as { sections?: { editorialRegalos?: unknown } })?.sections?.editorialRegalos;
  if (!Array.isArray(regalos)) return null;
  const items: CatalogItem[] = [];
  for (const raw of regalos) {
    if (!raw || typeof raw !== "object") continue;
    const row = raw as {
      id?: string;
      title?: string;
      category?: string;
      sample?: boolean;
      price?: number | null;
      priceNote?: string;
      description?: string;
      imageUrl?: string;
      stock?: number | null;
      opciones?: unknown;
      optionStock?: unknown;
      variantes?: unknown;
    };
    if (row.sample === true) continue;
    const title = String(row.title || "").trim();
    const id = String(row.id || "").trim();
    if (!id || !title || blocked(id, title)) continue;
    const category = SOURCE_CATEGORY[String(row.category || "")];
    if (!category) continue;
    const price = typeof row.price === "number" && Number.isFinite(row.price) ? row.price : 0;
    const description = String(row.description || "").trim() || BLURBS[id] || "";
    const stockFromEditor = parseOptionStock(row.opciones) 
      || parseOptionStock(row.optionStock) 
      || parseOptionStock(row.variantes);
    const stock = typeof row.stock === "number" ? Math.max(0, row.stock) : null;
    items.push({
      id,
      category,
      title,
      description,
      price,
      priceNote: String(row.priceNote || "").trim(),
      image: String(row.imageUrl || ""),
      available: true,
      stock,
      optionStock: stockFromEditor || (POLO_SIZES[id] ? { ...POLO_SIZES[id] } : undefined),
    });
  }
  return items.length ? items : null;
}

export function availabilityLabel(item: CatalogItem): string {
  if (item.stock === 0) return "Agotado";
  if (!item.available) return "No disponible";
  return "";
}

export function applyAjustes(items: CatalogItem[], data: unknown): CatalogItem[] {
  const section = (
    data as {
      sections?: {
        jornadasTienda?: {
          kind?: string;
          ajustes?: unknown;
          agregados?: unknown;
        };
      };
    }
  )?.sections?.jornadasTienda;
  if (!section || section.kind !== "ajustes") return items;
  const next = items.map((item) => ({ ...item }));
  const byId = new Map(next.map((item) => [item.id, item]));
  if (Array.isArray(section.ajustes)) {
    for (const raw of section.ajustes) {
      if (!raw || typeof raw !== "object") continue;
      const row = raw as {
        id?: string;
        price?: number;
        priceNote?: string;
        stock?: number | null;
        status?: string;
        opciones?: unknown;
      };
      const item = row.id ? byId.get(String(row.id)) : undefined;
      if (!item) continue;
      if (typeof row.price === "number" && Number.isFinite(row.price)) item.price = Math.max(0, row.price);
      if (typeof row.priceNote === "string") item.priceNote = row.priceNote.trim();
      if (row.opciones && typeof row.opciones === "object") {
        const nextStock = { ...(item.optionStock || {}) };
        for (const [name, qty] of Object.entries(row.opciones as Record<string, unknown>)) {
          if (typeof qty === "number" && Number.isFinite(qty)) nextStock[name] = Math.max(0, qty);
        }
        if (Object.keys(nextStock).length) item.optionStock = nextStock;
      }
      const status = String(row.status || "");
      if (status === "agotado") {
        item.available = true;
        item.stock = 0;
        if (item.optionStock) {
          item.optionStock = Object.fromEntries(Object.keys(item.optionStock).map((name) => [name, 0]));
        }
      } else if (status === "no_disponible") {
        item.available = false;
      } else if (status === "disponible") {
        item.available = true;
        const stock = row.stock;
        item.stock = stock == null ? null : Math.max(0, Number(stock) || 0);
      }
    }
  }
  if (Array.isArray(section.agregados)) {
    for (const raw of section.agregados) {
      if (!isItem(raw) || byId.has(raw.id)) continue;
      next.push(raw);
      byId.set(raw.id, raw);
    }
  }
  return next;
}

export function readCatalog(data: unknown): CatalogItem[] | null {
  const editorial = fromEditorial(data);
  if (editorial) return editorial;
  const root = data as { sections?: { jornadasTienda?: { items?: unknown } }; items?: unknown };
  const raw = Array.isArray(data)
    ? data
    : Array.isArray(root?.sections?.jornadasTienda?.items)
      ? root.sections.jornadasTienda.items
      : Array.isArray(root?.items)
        ? root.items
        : null;
  if (!raw) return null;
  const items = raw.filter(isItem);
  return items.length ? items : null;
}
