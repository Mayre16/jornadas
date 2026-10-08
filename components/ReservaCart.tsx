"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { trackReserva } from "@/components/JornadasAnalytics";

export type ReservaProduct = {
  id: string;
  title: string;
  priceLabel: string;
  note?: string;
  description?: string;
  image: string;
  stock?: number | null;
};

type Line = ReservaProduct & { price: number; quantity: number };

type ToastItem = {
  id: number;
  title: string;
  count: number;
};

type CartApi = {
  lines: Line[];
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (product: ReservaProduct) => void;
  setQty: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  getQty: (id: string) => number;
  toasts: ToastItem[];
};

const CartContext = createContext<CartApi | null>(null);
const STORAGE = "jornadas-reserva-v1";

function parsePrice(label: string): number {
  const digits = label.replace(/[^\d]/g, "");
  const value = Number(digits);
  return Number.isFinite(value) ? value : 0;
}

function moneyUsd(amount: number): string {
  return `US$${amount}`;
}

function capOf(line: { stock?: number | null }): number {
  if (line.stock == null) return 99;
  return Math.max(0, Math.min(99, line.stock));
}

const PEDIDO_URL = "https://editor.acropolis.adesa.com.do/api/forms/tienda-pedido";

export function ReservaProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastIdRef = { current: 0 };

  const showToast = useCallback((title: string, count: number) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, title, count }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE);
      const parsed = raw ? (JSON.parse(raw) as Line[]) : [];
      if (Array.isArray(parsed)) setLines(parsed.filter((line) => line?.id && line.quantity > 0));
    } catch {
      setLines([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE, JSON.stringify(lines));
  }, [lines, ready]);

  const api = useMemo<CartApi>(
    () => ({
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      open,
      setOpen,
      toasts,
      add: (product) => {
        const cap = capOf(product);
        if (cap < 1) return;
        let newQuantity = 1;
        setLines((current) => {
          const found = current.find((line) => line.id === product.id);
          if (!found) {
            return [...current, { ...product, price: parsePrice(product.priceLabel), quantity: 1 }];
          }
          newQuantity = Math.min(capOf({ ...found, stock: product.stock }), found.quantity + 1);
          return current.map((line) =>
            line.id === product.id
              ? { ...line, stock: product.stock, quantity: newQuantity }
              : line,
          );
        });
        showToast(product.title, newQuantity);
      },
      setQty: (id, quantity) => {
        setLines((current) =>
          current
            .map((line) =>
              line.id === id ? { ...line, quantity: Math.max(0, Math.min(capOf(line), quantity)) } : line,
            )
            .filter((line) => line.quantity > 0),
        );
      },
      remove: (id) => setLines((current) => current.filter((line) => line.id !== id)),
      getQty: (id) => lines.find((line) => line.id === id)?.quantity ?? 0,
    }),
    [lines, open, toasts, showToast],
  );

  return (
    <CartContext.Provider value={api}>
      {children}
      <ReservaDrawer />
      <ToastContainer toasts={toasts} />
    </CartContext.Provider>
  );
}

export function useReserva(): CartApi {
  const value = useContext(CartContext);
  if (!value) throw new Error("Reserva sin proveedor");
  return value;
}

export function ReservaButton({ product }: { product: ReservaProduct }) {
  const { add, getQty, setQty } = useReserva();
  const qty = getQty(product.id);
  const cap = capOf(product);

  if (qty > 0) {
    return (
      <div className="product-qty">
        <button
          type="button"
          className="product-qty-btn"
          onClick={() => setQty(product.id, qty - 1)}
          aria-label="Quitar uno"
        >
          −
        </button>
        <span className="product-qty-count">{qty}</span>
        <button
          type="button"
          className="product-qty-btn"
          onClick={() => add(product)}
          disabled={qty >= cap}
          aria-label="Añadir uno más"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button className="reserve-btn" type="button" onClick={() => add(product)}>
      <span className="reserve-btn-icon">🛒</span>
      <span className="reserve-btn-text">Añadir</span>
    </button>
  );
}

export function ReservaToggle() {
  const { count, setOpen, open } = useReserva();
  return (
    <button
      className="reserve-toggle"
      type="button"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
    >
      Reserva{count > 0 ? ` (${count})` : ""}
    </button>
  );
}

function ReservaDrawer() {
  const { lines, open, setOpen, setQty, remove } = useReserva();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const total = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);

  if (!open) return null;

  async function submit() {
    setError("");
    setSuccess("");
    if (lines.length === 0) {
      setError("La reserva está vacía.");
      return;
    }
    if (!name.trim() || !email.trim()) {
      setError("Indique su nombre y correo.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("El correo no es válido.");
      return;
    }
    if (!phone.trim()) {
      setError("Indique teléfono o WhatsApp.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(PEDIDO_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          note: note.trim(),
          website: "",
          siteUrl: "https://jornadas.acropolis.org.do",
          items: lines.map((line) => ({
            kind: "regalo",
            id: line.id,
            title: line.title,
            subtitle: line.note ?? "",
            description: line.description ?? "",
            quantity: line.quantity,
            price: line.price,
            currency: "DOP",
            imageUrl: line.image,
          })),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || data.ok === false) {
        setError(data.error || "No se pudo enviar la reserva.");
        return;
      }
      trackReserva();
      setSuccess("Reserva enviada. Llega al correo de Leslie y una copia al suyo.");
      setNote("");
      lines.forEach((line) => remove(line.id));
    } catch {
      setError("No se pudo conectar para enviar la reserva.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button className="reserve-backdrop" type="button" aria-label="Cerrar reserva" onClick={() => setOpen(false)} />
      <aside className="reserve-drawer" aria-label="Reserva de la tienda">
        <div className="reserve-body">
          {lines.length === 0 && !success ? (
            <p>Aún no hay artículos. Use «Añadir» en la tienda.</p>
          ) : null}
          {success ? <p className="reserve-ok">{success}</p> : null}
          <ul>
            {lines.map((line) => (
              <li key={line.id}>
                <img src={line.image} alt="" />
                <div>
                  <strong>{line.title}</strong>
                  <span>{line.priceLabel}</span>
                  <div className="qty">
                    <button type="button" onClick={() => setQty(line.id, line.quantity - 1)} aria-label="Quitar uno">
                      −
                    </button>
                    <span>{line.quantity}</span>
                    <button type="button" onClick={() => setQty(line.id, line.quantity + 1)} aria-label="Añadir uno">
                      +
                    </button>
                    <button type="button" onClick={() => remove(line.id)}>
                      Quitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form
          className="reserve-form"
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
        >
          <label>
            Nombre
            <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
          </label>
          <label>
            Correo
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
          </label>
          <label>
            Teléfono
            <input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" />
          </label>
          <label>
            Nota
            <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={2} />
          </label>
          <p className="reserve-total">
            <span>Total</span>
            <strong>{moneyUsd(total)}</strong>
          </p>
          {error ? <p className="reserve-error">{error}</p> : null}
          <div className="reserve-actions">
            <button className="reserve-send" type="submit" disabled={busy || lines.length === 0}>
              {busy ? "Enviando…" : "Enviar"}
            </button>
            <button className="reserve-close" type="button" onClick={() => setOpen(false)}>
              Cerrar
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}

function ToastContainer({ toasts }: { toasts: ToastItem[] }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <span className="toast-check">✓</span>
          <span className="toast-text">
            <strong>{toast.title}</strong> añadido
            {toast.count > 1 ? ` (${toast.count})` : ""}
          </span>
        </div>
      ))}
    </div>
  );
}
