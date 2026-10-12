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
  "item-mv3buww9": "Blanco",
};

const KNOWN_OPTIONS: Record<string, { name: string; qty: number; usd: number }[]> = {
  "sep-nervo": [
    { name: "S", qty: 2, usd: 30 },
    { name: "M", qty: 3, usd: 30 },
    { name: "L", qty: 2, usd: 30 },
  ],
  "sep-suntzu-conocete": [
    { name: "S", qty: 1, usd: 30 },
    { name: "M", qty: 2, usd: 30 },
    { name: "L", qty: 1, usd: 30 },
  ],
  "sep-suntzu-resultados": [
    { name: "M", qty: 1, usd: 30 },
    { name: "L", qty: 1, usd: 30 },
  ],
  "item-mv3buww9": [
    { name: "S", qty: 2, usd: 30 },
    { name: "M", qty: 3, usd: 30 },
    { name: "L", qty: 2, usd: 30 },
  ],
  "regalo-muudl8on": [
    { name: "Amarillo", qty: 1, usd: 35 },
    { name: "Verde", qty: 1, usd: 35 },
  ],
  "regalo-muudlazo": [
    { name: "Azul L", qty: 1, usd: 35 },
    { name: "Azul M", qty: 1, usd: 35 },
    { name: "Beige M", qty: 1, usd: 35 },
    { name: "Negro M", qty: 3, usd: 35 },
  ],
  "regalo-mu20izhp": [
    { name: "Hipatia de Alejandría", qty: 1, usd: 15 },
    { name: "Marco Aurelio", qty: 1, usd: 15 },
    { name: "Olimpia", qty: 2, usd: 15 },
    { name: "Platón", qty: 1, usd: 15 },
  ],
  "regalo-mu21s5gv": [
    { name: "Plástico", qty: 50, usd: 1 },
    { name: "Metálico", qty: 60, usd: 3 },
  ],
  "regalo-mu0awa5f": [
    { name: "Amarillo", qty: 3, usd: 12 },
    { name: "Azul béisbol", qty: 3, usd: 12 },
    { name: "Azul RD", qty: 3, usd: 12 },
    { name: "Negro", qty: 3, usd: 12 },
  ],
  "regalo-mu0awcd6": [
    { name: "Azul", qty: 1, usd: 15 },
    { name: "Blanco", qty: 1, usd: 15 },
  ],
};

const NEW_PRODUCTS: CatalogItem[] = [
  {
    id: "nuevo-cafe-tejamani",
    category: "dominicanos",
    title: "Café Tejamani Orgánico",
    price: 610,
    priceNote: "USD$10",
    image: "",
    available: true,
    stock: 10,
  },
  {
    id: "nuevo-iman-pilon",
    category: "dominicanos",
    title: "Imán República Dominicana | Pilón",
    price: 183,
    priceNote: "USD$3",
    image: "",
    available: true,
    stock: 10,
  },
];

function withNewProducts(items: CatalogItem[]): CatalogItem[] {
  const ids = new Set(items.map((item) => item.id));
  for (const extra of NEW_PRODUCTS) {
    if (!ids.has(extra.id)) items.push({ ...extra });
  }
  return items;
}

function applyKnownOptions(item: CatalogItem, saved: unknown) {
  const known = KNOWN_OPTIONS[item.id];
  if (!known) return;
  const fromSaved: Record<string, number> = {};
  if (saved && typeof saved === "object") {
    for (const [name, qty] of Object.entries(saved as Record<string, unknown>)) {
      if (typeof qty === "number" && Number.isFinite(qty)) fromSaved[name] = Math.max(0, qty);
    }
  }
  item.optionStock = Object.keys(fromSaved).length
    ? fromSaved
    : Object.fromEntries(known.map((option) => [option.name, option.qty]));
  item.priceNote = `Precios: ${known.map((option) => `${option.name} — US$${option.usd}`).join(" · ")}`;
}

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
  if (id === "regalo-mv39datl") return true;
  return false;
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
    };
    if (row.sample === true) continue;
    const title = row.id === "regalo-mu21s5gv"
      ? "Lapicero | \"Por un Mundo Nuevo y Mejor\""
      : String(row.title || "").trim();
    const id = String(row.id || "").trim();
    if (!id || !title || blocked(id, title)) continue;
    const category = SOURCE_CATEGORY[String(row.category || "")];
    if (!category) continue;
    const price = typeof row.price === "number" && Number.isFinite(row.price) ? row.price : 0;
    const description = String(row.description || "").trim() || BLURBS[id] || "";
    items.push({
      id,
      category,
      title,
      description,
      price,
      priceNote: String(row.priceNote || "").trim(),
      image: String(row.imageUrl || ""),
      available: true,
      stock: null,
      optionStock: POLO_SIZES[id] ? { ...POLO_SIZES[id] } : undefined,
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
  if (!section || section.kind !== "ajustes") return withNewProducts(items.map((item) => ({ ...item })));
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
      if (KNOWN_OPTIONS[item.id]) applyKnownOptions(item, row.opciones);
      else if (row.opciones && typeof row.opciones === "object") {
        const nextStock: Record<string, number> = {};
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
      if (!raw || typeof raw !== "object") continue;
      const item = raw as CatalogItem & { opciones?: unknown };
      if (!isItem(item) || byId.has(item.id)) continue;
      if (item.opciones && typeof item.opciones === "object") {
        const optionStock: Record<string, number> = {};
        for (const [name, qty] of Object.entries(item.opciones as Record<string, unknown>)) {
          if (typeof qty === "number" && Number.isFinite(qty)) optionStock[name] = Math.max(0, qty);
        }
        if (Object.keys(optionStock).length) item.optionStock = optionStock;
      }
      applyKnownOptions(item, item.opciones);
      next.push(item);
      byId.set(item.id, item);
    }
  }
  return withNewProducts(next);
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
