"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const API = "https://editor.acropolis.adesa.com.do/api/analytics/collect";
const VISITOR_KEY = "jornadas-analytics-vid";

function canTrack(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host !== "localhost" && host !== "127.0.0.1";
}

function visitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `v-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

function send(payload: Record<string, unknown>) {
  if (!canTrack()) return;
  void fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ site: "jornadas", visitorId: visitorId(), ...payload }),
    keepalive: true,
  }).catch(() => undefined);
}

export function trackReserva() {
  send({
    event: "form",
    formKey: "reserva",
    path: window.location.pathname || "/",
  });
}

export function JornadasAnalytics() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    send({
      event: "pageview",
      path: pathname,
      referrer: document.referrer || "",
      host: window.location.hostname,
    });

    let started = Date.now();
    let visible = document.visibilityState === "visible";
    const flush = () => {
      const now = Date.now();
      const elapsed = visible ? now - started : 0;
      started = now;
      if (elapsed > 0) {
        send({ event: "engagement", path: pathname, durationMs: Math.round(elapsed) });
      }
    };
    const timer = window.setInterval(() => {
      if (visible) flush();
    }, 15000);
    const onVisibility = () => {
      flush();
      visible = document.visibilityState === "visible";
      if (visible) started = Date.now();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    return () => {
      flush();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
    };
  }, [pathname]);

  return null;
}
