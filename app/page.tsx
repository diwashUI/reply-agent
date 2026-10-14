import Demo from "@/components/Demo";
import Logo from "@/components/Logo";
import { business } from "@/lib/knowledge";

const BREWMANDU_URL = "https://cafe-demo-n4vf4usqq-noobug138-6131s-projects.vercel.app";
const INSTAGRAM_URL = "https://instagram.com/its_aurevya";
const GITHUB_URL = "https://github.com/diwashUI";
const EMAIL = "itsaurevya@gmail.com";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased">
      {/* ── NAV ── */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <span className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
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
          An AI receptionist for <span className="text-teal-600">your business</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">
          A chat agent trained on <em className="not-italic font-semibold text-zinc-900">your</em> menu,
          hours, and prices. It answers customers on your website 24/7 — and hands
          the tricky questions to you instead of guessing.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#demo"
            className="rounded-full bg-teal-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Try the live demo
          </a>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent("ReplyAgent for my business")}`}
            className="rounded-full border border-zinc-300 bg-white px-7 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
          >
            Get it for your business
          </a>
        </div>
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-zinc-200 bg-zinc-50/70 px-8 py-6 text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            What you're getting
          </p>
          <ul className="mt-3 space-y-2.5 text-[15px] text-zinc-700">
            <li className="flex gap-3">
              <span className="font-bold text-teal-600">✓</span>
              A chat widget on your website that replies to customers in seconds, day or night
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-teal-600">✓</span>
              Trained on your real business info — it can never invent a wrong price
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-teal-600">✓</span>
              An owner inbox: the questions it can't answer land with you, flagged
            </li>
          </ul>
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

      {/* ── PACKAGE: website + brain ── */}
      <section id="package" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-600">
            The full package
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl">
            We build the website. Then we give it a brain.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-zinc-600">
            One package for a local business: a website that brings customers in,
            and an agent that answers them at 11pm.
          </p>
          <div className="mx-auto mt-12 grid max-w-4xl items-stretch gap-5 md:grid-cols-[1fr_auto_1fr]">
            <a
              href={BREWMANDU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700">
                01 · The website
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">Brewmandu</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                The demo café website — story, menu, WhatsApp ordering. This is
                the kind of site we build for real shops in 3 days.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
                Visit the demo site
                <span className="transition group-hover:translate-x-0.5">→</span>
              </span>
            </a>
            <div className="flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl font-bold text-white">
                +
              </span>
            </div>
            <div className="rounded-3xl border-2 border-teal-600/20 bg-teal-50/50 p-8 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700">
                02 · The brain
              </p>
              <h3 className="mt-3 flex items-center gap-2.5 text-2xl font-bold tracking-tight">
                <Logo className="h-8 w-8" />
                ReplyAgent
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                The AI receptionist — trained on the same business info as the
                site. You're chatting with it right now, above.
              </p>
              <a
                href="#demo"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700"
              >
                Back to the live demo
                <span>↑</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="scroll-mt-24 bg-zinc-50/70">
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

      {/* ── CONTACT CTA ── */}
      <section className="bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Like what you see? Let's build yours.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-zinc-400">
            Websites and AI agents for local businesses — designed, built, and
            shipped from Kathmandu.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-teal-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-teal-500"
            >
              Instagram · @its_aurevya
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {EMAIL}
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 sm:flex-row">
          <span className="flex items-center gap-2.5">
            <Logo className="h-6 w-6" />
            <span className="font-semibold text-zinc-200">ReplyAgent</span>
            <span>· built by diwash</span>
          </span>
          <div className="flex items-center gap-5">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-zinc-200">
              Instagram
            </a>
            <a href={`mailto:${EMAIL}`} className="transition hover:text-zinc-200">
              Email
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-zinc-200">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
