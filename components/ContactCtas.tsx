"use client";

import { useEffect, useRef, useState } from "react";
import { EMAIL, INSTAGRAM_URL, WHATSAPP_NUMBER, WHATSAPP_URL, MAILTO } from "@/lib/contact";

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-zinc-500">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-emerald-600">
      <path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z" />
    </svg>
  );
}

function IconInsta() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-pink-600">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** One "Contact us" button; Email / WhatsApp / Instagram reveal on click. */
export default function ContactCtas({ variant }: { variant: "hero" | "card" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const btn =
    variant === "hero"
      ? "rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
      : "w-full rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700";

  const menuPos =
    variant === "hero"
      ? "left-1/2 w-64 -translate-x-1/2"
      : "left-0 right-0";

  const rows = [
    { href: MAILTO, icon: <IconMail />, title: "Email", sub: EMAIL, external: false },
    ...(WHATSAPP_NUMBER !== ""
      ? [{ href: WHATSAPP_URL, icon: <IconChat />, title: "WhatsApp", sub: "+" + WHATSAPP_NUMBER, external: true }]
      : []),
    { href: INSTAGRAM_URL, icon: <IconInsta />, title: "Instagram", sub: "@its_aurevya", external: true },
  ];

  return (
    <div ref={ref} className={`relative ${variant === "card" ? "mt-8" : ""}`}>
      <button type="button" onClick={() => setOpen((v) => !v)} className={btn} aria-expanded={open}>
        Contact us
      </button>
      {open && (
        <div
          className={`absolute top-full z-50 mt-2 overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left shadow-xl ${menuPos}`}
        >
          {rows.map((r) => (
            <a
              key={r.title}
              href={r.href}
              {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 transition hover:bg-zinc-50"
            >
              {r.icon}
              <span>
                <span className="block text-sm font-semibold text-zinc-900">{r.title}</span>
                <span className="block text-xs text-zinc-500">{r.sub}</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
