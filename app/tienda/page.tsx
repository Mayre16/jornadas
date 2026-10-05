import type { Metadata } from "next";
import { TiendaBoard } from "@/components/TiendaBoard";

export const metadata: Metadata = { title: "Tienda" };

export default function TiendaPage() {
  return <TiendaBoard />;
}
