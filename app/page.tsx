import Link from "next/link";
import Demo from "@/components/Demo";
import { business } from "@/lib/knowledge";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased">
      {/* ── NAV ── */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <span className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-600 text-white">
              ☕
            </span>
            <span className="text-lg font-bold tracking-tight">ReplyAgent</span>
          </span>
          <a
            href="#demo"
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Try the live demo
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 text-center sm:pt-24">
        <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 shadow-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Live demo · no signup
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Your shop's <span className="text-teal-600">smartest employee</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">
          ReplyAgent answers your customers' DMs instantly — hours, menu, prices,
          directions — from your real business info. When it doesn't know, it hands
          off to you instead of guessing.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#demo"
            className="rounded-full bg-teal-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Chat with the demo
          </a>
          <a
            href="#how"
            className="rounded-full border border-zinc-300 bg-white px-7 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
          >
            How it works
          </a>
        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" className="scroll-mt-24 bg-zinc-50/70">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-600">
            Live demo
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            You're the customer. It's {business.owner}'s receptionist.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-zinc-600">
            This demo is skinned as {business.name}, the sample café. Try to stump it —
            watch the brain panel and the owner inbox.
          </p>
          <div className="mt-10">
            <Demo />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-600">
            How it works
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Three steps to an AI receptionist
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "1",
                title: "Teach it your business",
                body: "Menu, hours, prices, policies — one knowledge file. It only ever answers from this, so it can't invent a wrong price.",
              },
              {
                n: "2",
                title: "It answers instantly",
                body: "Customers get replies in seconds, 24/7, in the DMs they're already using. Every answer shows its intent and confidence.",
              },
              {
                n: "3",
                title: "You step in when it matters",
                body: "Low confidence? It hands off to you with the full question flagged in your inbox — instead of confidently guessing wrong.",
              },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for shops like {business.name}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-zinc-400">
            A website brings customers in. ReplyAgent makes sure none of their
            questions go unanswered at 11pm.
          </p>
          <Link
            href="https://github.com/diwashUI/reply-agent"
            target="_blank"
            className="mt-8 inline-block rounded-full bg-teal-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-teal-500"
          >
            View on GitHub
          </Link>
        </div>
      </section>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row">
          <span className="font-semibold text-zinc-900">ReplyAgent</span>
          <span>Demo skinned as {business.name} · Built while learning</span>
        </div>
      </footer>
    </div>
  );
}
