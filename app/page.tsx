import Demo from "@/components/Demo";
import Logo from "@/components/Logo";

const BREWMANDU_URL = "https://brewmundaktm.vercel.app";
const INSTAGRAM_URL = "https://instagram.com/its_aurevya";
const GITHUB_URL = "https://github.com/diwashUI";
const EMAIL = "itsaurevya@gmail.com";
// diwash's WhatsApp number in international format, no "+" or spaces, e.g. "977981234567".
// The WhatsApp buttons stay hidden until this is filled in.
const WHATSAPP_NUMBER = "";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi SahayakOS! I want a website for my business."
)}`;

/** Email + WhatsApp contact options. WhatsApp appears once WHATSAPP_NUMBER is set. */
function ContactCtas({ variant }: { variant: "hero" | "card" }) {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent("Website for my business")}`;
  const wa = WHATSAPP_NUMBER !== "" && (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={
        variant === "hero"
          ? "rounded-full border border-emerald-600/30 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
          : "rounded-full border border-emerald-600/30 bg-emerald-50 px-6 py-3 text-center text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
      }
    >
      WhatsApp us
    </a>
  );
  if (variant === "hero") {
    return (
      <>
        <a
          href={mailto}
          className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
        >
          Email us
        </a>
        {wa}
      </>
    );
  }
  return (
    <div className="mt-8 flex flex-col gap-3">
      <a
        href={mailto}
        className="rounded-full bg-teal-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-700"
      >
        Email us
      </a>
      {wa}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased">
      {/* ── NAV ── */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <span className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight">SahayakOS</span>
          </span>
          <div className="flex items-center gap-5">
            <a href="#pricing" className="hidden text-sm font-medium text-zinc-600 transition hover:text-zinc-900 sm:block">
              Pricing
            </a>
            <a href="#work" className="hidden text-sm font-medium text-zinc-600 transition hover:text-zinc-900 sm:block">
              Work
            </a>
            <a
              href="#live"
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
              Try it live
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 text-center sm:pt-24">
        <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 shadow-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Live · no signup
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          A website for your shop, <span className="text-teal-600">with a brain</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">
          We build complete websites for local businesses — delivered in
          3 days, for one honest fixed price. And every site comes with
          our hero: an AI receptionist that answers your customers 24/7.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#live"
            className="rounded-full bg-teal-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            See it live
          </a>
          <ContactCtas variant="hero" />
        </div>
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-zinc-200 bg-zinc-50/70 px-8 py-6 text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            What you get
          </p>
          <ul className="mt-3 space-y-2.5 text-[15px] text-zinc-700">
            <li className="flex gap-3">
              <span className="font-bold text-teal-600">✓</span>
              A complete website — your story, menu, photos, WhatsApp ordering, delivered in 3 days
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-teal-600">✓</span>
              Our hero: an AI receptionist built in, answering customers day and night
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-teal-600">✓</span>
              Trained on your real business info — it never invents a price
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-teal-600">✓</span>
              An owner inbox — the questions it can't answer land with you
            </li>
          </ul>
        </div>
      </section>

      {/* ── LIVE ── */}
      <section id="live" className="scroll-mt-24 bg-zinc-50/70">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-600">
            Live now
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Try it yourself
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-zinc-600">
            You're the customer, it's the receptionist. Ask about the menu,
            prices, hours — or try to stump it.
          </p>
          <p className="mt-2 text-center text-sm">
            <a
              href={BREWMANDU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal-700 underline decoration-teal-300 underline-offset-4 transition hover:text-teal-600"
            >
              See it on a real café website →
            </a>
          </p>
          <div className="mt-10">
            <Demo simple />
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-600">
            Our work
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Live on the internet right now
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-zinc-600">
            A complete website we built for a Kathmandu coffee shop — story,
            menu, WhatsApp ordering — with the AI receptionist answering
            customers on every page.
          </p>
          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xl font-bold tracking-tight">Brewmandu Coffee Co.</p>
                <p className="mt-1 text-sm text-zinc-500">Coffee shop · Kathmandu</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
              </span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">
              Open it, click the chat bubble, and interrogate the receptionist —
              menu, prices, hours, directions. It answers from the shop's real info,
              and hands off to the owner when it doesn't know.
            </p>
            <a
              href={BREWMANDU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
              Visit the website →
            </a>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-600">
            Pricing
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Simple pricing, serious value
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-zinc-600">
            One product. One price. Everything included.
          </p>
          <div className="mx-auto mt-12 max-w-xl">
            <div className="flex flex-col rounded-3xl border-2 border-teal-600 bg-teal-50/60 p-8 shadow-md sm:p-10">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700">
                The Website, with a brain
              </p>
              <p className="mt-3 text-center text-5xl font-bold tracking-tight">
                One fixed price
              </p>
              <p className="mt-2 text-center text-sm text-zinc-500">
                Agreed upfront, in writing — no hourly billing, no retainers, no surprises.
              </p>
              <ul className="mt-7 space-y-3 text-[15px] leading-relaxed text-zinc-700">
                <li className="flex gap-3">
                  <span className="font-bold text-teal-600">✓</span>
                  Complete website — story, menu, photos, WhatsApp ordering, delivered in 3 days
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-teal-600">✓</span>
                  Our hero: AI receptionist built in, answering customers 24/7
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-teal-600">✓</span>
                  Trained on your real info — never invents a price
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-teal-600">✓</span>
                  Owner inbox for the questions it can't answer
                </li>
              </ul>
              <ContactCtas variant="card" />
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-zinc-500">
            One-time pricing, no subscriptions. You pay once, it's yours.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="scroll-mt-24 bg-zinc-50/70">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-600">
            How it works
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Three steps to your smart website
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "1",
                title: "Tell us about your business",
                body: "Menu, hours, story, photos — one conversation. You talk, we handle everything from there.",
              },
              {
                n: "2",
                title: "We build it in 3 days",
                body: "Your complete website goes live, with the AI receptionist trained on your info and answering from day one.",
              },
              {
                n: "3",
                title: "Customers get answers 24/7",
                body: "Instant replies day and night from your real business info. The tricky questions land in your inbox, flagged.",
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

      {/* ── ROADMAP ── */}
      <section className="border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
            Where this is going
          </p>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
            {[
              {
                tag: "Live now",
                title: "Website + AI receptionist",
                body: "Your site answers customers 24/7 from your real business info.",
                active: true,
              },
              {
                tag: "Next",
                title: "Social media DMs",
                body: "The same receptionist inside your Instagram and WhatsApp DMs.",
                active: false,
              },
              {
                tag: "Then",
                title: "Orders & customers",
                body: "It takes orders and keeps customer details organized for you.",
                active: false,
              },
            ].map((s) => (
              <div
                key={s.title}
                className={`rounded-2xl border p-6 ${
                  s.active
                    ? "border-teal-600/30 bg-teal-50/50"
                    : "border-zinc-200 bg-white opacity-75"
                }`}
              >
                <span
                  className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] ${
                    s.active ? "bg-teal-600 text-white" : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {s.tag}
                </span>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let's build yours.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-zinc-400">
            SahayakOS is a small software company building smart websites
            for local businesses — designed and shipped from Kathmandu.
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
            <span className="italic">Sahayak</span> means &ldquo;helper&rdquo; —
            fitting, since every site we ship comes with one.
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
            <span className="font-semibold text-zinc-200">SahayakOS</span>
            <span>· Kathmandu, Nepal</span>
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
