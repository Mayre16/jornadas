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
};

export const CATEGORIES: { id: CatalogCategory; title: string; lead: string }[] = [
  {
    id: "dominicanos",
    title: "Souvenirs Dominicanos",
    lead: "Café, cacao, ron y recuerdos de República Dominicana.",
  },
  {
    id: "acropolis",
    title: "Souvenirs Nueva Acrópolis",
    lead: "Polos, piezas en resina, separadores, libretas y camisetas de la editorial.",
  },
  {
    id: "libros",
    title: "Libros Jornadas",
    lead: "Libros que Leslie publica para las Jornadas.",
  },
];

export const FALLBACK_ITEMS = fallback as CatalogItem[];

export const CATALOG_URL =
  "https://editor.acropolis.adesa.com.do/api/content/jornadas/published";

const CATEGORY_IDS = new Set<CatalogCategory>(["dominicanos", "acropolis", "libros"]);

export function pesosLabel(price: number): string {
  if (!Number.isFinite(price) || price <= 0) return "Consultar disponibilidad";
  return `RD$ ${price.toLocaleString("en-US")}`;
}

export function canReserve(item: CatalogItem): boolean {
  if (!item.available) return false;
  if (item.stock === 0) return false;
  return item.price > 0;
}

export function catalogImage(src: string): string {
  if (src.startsWith("/uploads/")) return `https://editor.acropolis.adesa.com.do${src}`;
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

export function readCatalog(data: unknown): CatalogItem[] | null {
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
