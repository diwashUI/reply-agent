// ── THE AGENT BRAIN ──────────────────────────────────────────────────────
// Pure intent engine: no API keys, no network, no LLM. It matches what the
// customer said against the business knowledge base, scores its confidence,
// and either answers from real business data or hands off to the owner.
// Every decision is explainable: intent + confidence + source.

import { business, type MenuItem } from "./knowledge";

export type Intent =
  | "greeting"
  | "hours"
  | "location"
  | "menu"
  | "price"
  | "recommend"
  | "order"
  | "policy"
  | "human"
  | "thanks"
  | "fallback";

export interface Analysis {
  intent: Intent;
  confidence: number; // 0..1
  item: MenuItem | null; // menu item mentioned, if any
  policyTopic: string | null; // policy matched, if any
  matched: string[]; // keywords that fired, for transparency
}

export interface AgentReply extends Analysis {
  text: string;
  handoff: boolean; // true → the owner needs to step in
  source: string; // which knowledge answered this, shown in the UI
}

/** Below this confidence the agent hands off instead of guessing. */
export const HANDOFF_THRESHOLD = 0.34;

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[?!.,'"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function hits(text: string, keywords: string[]): string[] {
  // Word-boundary matching so "hi" doesn't fire on "this".
  return keywords.filter((k) => {
    const esc = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${esc}\\b`).test(text);
  });
}

/** Tiny edit-distance for typo tolerance ("expresso" → "espresso"). */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prev = cur;
  }
  return prev[n];
}

/**
 * Find a menu item even when the customer mistypes it. Only used as a
 * fallback — exact keyword matches always win, so "see you later" never
 * becomes a latte order.
 */
function fuzzyItem(text: string): MenuItem | null {
  const words = text.split(/\s+/).filter((w) => /^[a-z]{4,}$/.test(w));
  let best: MenuItem | null = null;
  let bestDist = 3;
  for (const m of business.menu) {
    for (const kw of m.keywords) {
      if (kw.length < 4) continue;
      for (const w of words) {
        if (Math.abs(w.length - kw.length) > 2) continue;
        const d = levenshtein(w, kw);
        if (d < bestDist) {
          bestDist = d;
          best = m;
        }
      }
    }
  }
  return bestDist <= 2 ? best : null;
}

const STOPWORDS = new Set([
  "about", "what", "when", "where", "which", "there", "their", "your",
  "you", "do", "does", "have", "has", "with", "for", "and", "the",
  "are", "is", "can", "any", "our", "that", "this",
]);

/** Pull the most likely "topic" out of an unknown question ("catering"). */
function extractTopic(text: string): string | null {
  const words = text.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/);
  let best: string | null = null;
  for (const w of words) {
    if (w.length >= 5 && !STOPWORDS.has(w) && (!best || w.length > best.length)) {
      best = w;
    }
  }
  return best;
}

/** Deterministic hash so the same question always gets the same reply. */
function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

const INTENT_KEYWORDS: Record<Exclude<Intent, "fallback" | "price" | "policy">, string[]> = {
  greeting: ["hello", "hi", "hey", "namaste", "good morning", "good afternoon", "good evening", "yo"],
  hours: ["open", "close", "hours", "hour", "timing", "timings", "when", "till", "until"],
  location: ["where", "address", "location", "reach", "direction", "map", "thamel", "situated"],
  menu: ["menu", "drinks", "drink", "coffee", "what do you have", "serve", "options", "items", "beverages"],
  recommend: ["recommend", "best", "signature", "popular", "famous", "special", "suggest", "favorite", "favourite", "try"],
  order: ["order", "takeaway", "delivery", "deliver", "book", "want", "get me", "buy"],
  human: ["owner", "human", "call", "phone", "speak", "someone", "manager", "aashish", "person", "real"],
  thanks: ["thank", "thanks", "dhanyabad", "great", "awesome", "perfect"],
};

const PRICE_KEYWORDS = ["price", "cost", "how much", "rate", "charge", "rs"];

export function analyzeMessage(raw: string): Analysis {
  const text = norm(raw);
  const empty: Analysis = {
    intent: "fallback",
    confidence: 0,
    item: null,
    policyTopic: null,
    matched: [],
  };
  if (!text) return empty;

  // 1. Menu item mentioned? (needed for price/order intents)
  let item: MenuItem | null = null;
  let itemMatched: string[] = [];
  for (const m of business.menu) {
    const h = hits(text, m.keywords);
    if (h.length > itemMatched.length) {
      item = m;
      itemMatched = h;
    }
  }

  // 2. Policy topic?
  let policyTopic: string | null = null;
  let policyMatched: string[] = [];
  for (const p of business.policies) {
    const h = hits(text, p.keywords);
    if (h.length > policyMatched.length) {
      policyTopic = p.topic;
      policyMatched = h;
    }
  }

  // 3. Score intents.
  const scores = new Map<Intent, { score: number; matched: string[] }>();
  const set = (intent: Intent, matched: string[]) => {
    if (matched.length > 0) scores.set(intent, { score: matched.length, matched });
  };
  (Object.keys(INTENT_KEYWORDS) as Intent[]).forEach((intent) =>
    set(intent, hits(text, INTENT_KEYWORDS[intent as keyof typeof INTENT_KEYWORDS]))
  );
  set("price", hits(text, PRICE_KEYWORDS));
  if (policyTopic) set("policy", policyMatched);

  // A bare item name ("latte?") reads as a price question.
  if (item && itemMatched.length > 0 && !scores.has("price")) {
    scores.set("price", {
      score: Math.max(1, itemMatched.length),
      matched: itemMatched,
    });
  }

  // Nothing matched at all? One last try: a typo'd item name ("expresso?").
  if (scores.size === 0) {
    const fz = fuzzyItem(text);
    if (fz) {
      return { intent: "price", confidence: 0.5, item: fz, policyTopic: null, matched: [] };
    }
    return empty;
  }

  // Priority tie-break: human > price > policy > order > others.
  const priority: Intent[] = ["human", "price", "policy", "order", "recommend", "hours", "location", "menu", "greeting", "thanks"];
  let best: Intent = "fallback";
  let bestScore = -1;
  for (const intent of priority) {
    const s = scores.get(intent);
    if (s && s.score > bestScore) {
      best = intent;
      bestScore = s.score;
    }
  }
  const matched = scores.get(best)?.matched ?? [];

  // The intent wants an item ("how much is expresso?") but the name was
  // mistyped — fill it in with the fuzzy match.
  if (!item && (best === "price" || best === "order" || best === "menu" || best === "recommend")) {
    item = fuzzyItem(text);
  }

  return {
    intent: best,
    confidence: Math.min(1, bestScore / 3),
    item,
    policyTopic: best === "policy" ? policyTopic : null,
    matched,
  };
}

export function replyTo(raw: string): AgentReply {
  const a = analyzeMessage(raw);
  const b = business;

  const reply = (text: string, source: string, handoff = false): AgentReply => ({
    ...a,
    text,
    handoff,
    source,
  });

  const handoffReply = (raw: string): AgentReply => {
    // No more one canned line: rotate a few honest escalations, and echo
    // what they actually asked about so it feels heard, not robotic.
    const topic = extractTopic(norm(raw));
    const about = topic ? ` about "${topic}"` : "";
    const variants = [
      `Good question${about} — that's one for ${b.owner}! I've flagged it for him, he usually replies within a few minutes. Meanwhile, I can help with the menu, prices, hours, or directions. 🙏`,
      `Hmm, you got me${about}! Let me pass that to ${b.owner} — he'll know. Anything else about the café I can answer right now? ☕`,
      `I don't know that one${about} yet — but ${b.owner} does! I've put it in his inbox. Want to hear about our signature drinks while you wait?`,
    ];
    return reply(
      variants[hashStr(raw) % variants.length],
      "escalation rule",
      true
    );
  };

  switch (a.intent) {
    case "greeting":
      return reply(
        `Namaste! Welcome to ${b.name} ☕ ${b.tagline} Ask me about the menu, prices, hours, or how to find us!`,
        "greeting"
      );
    case "hours": {
      const h = b.hours.map((x) => `${x.days}: ${x.time}`).join(" · ");
      return reply(`We're open ${h}. Come by anytime — the smell of fresh roast will find you first!`, "hours");
    }
    case "location":
      return reply(
        `You'll find us at ${b.address}. Look for the smell of fresh roast on Chaksibari Marg! Need a ride? Just ask.`,
        "address"
      );
    case "menu": {
      const items = b.menu.map((m) => `${m.name} (${m.price})`).join(", ");
      return reply(
        `Here's what's pouring: ${items}. Our signature is the ${b.signature} — ${b.menu.find((m) => m.name === b.signature)?.desc}. Want a price on any of them?`,
        "menu"
      );
    }
    case "price":
      if (a.item) {
        return reply(
          `The ${a.item.name} is ${a.item.price} — ${a.item.desc.charAt(0).toLowerCase() + a.item.desc.slice(1)}. Want me to put one on order for takeaway?`,
          `menu › ${a.item.name}`
        );
      }
      return reply(
        `Which drink did you have in mind? Our menu runs Rs 180–340 — for example, Espresso Rs 180, Café Latte Rs 280, and our signature ${b.signature} Rs 340.`,
        "menu"
      );
    case "recommend":
      return reply(
        `If it's your first visit, get the ${b.signature} (${b.menu.find((m) => m.name === b.signature)?.price}) — ${b.menu.find((m) => m.name === b.signature)?.desc}. Regulars swear by it!`,
        "menu › signature"
      );
    case "order":
      if (a.item) {
        return reply(
          `Great choice! 🎉 Message us on WhatsApp at ${b.phone} with "${a.item.name} for takeaway" and it'll be ready when you arrive. Anything else?`,
          "ordering info"
        );
      }
      return reply(
        `Happy to take your order! Tell me what you'd like, or message us directly on WhatsApp at ${b.phone} and we'll have it ready.`,
        "ordering info"
      );
    case "policy": {
      const p = b.policies.find((x) => x.topic === a.policyTopic);
      return reply(p ? p.answer : "", p ? `policy › ${p.topic}` : "policy");
    }
    case "human":
      return reply(
        `Of course! You can reach ${b.owner} (the owner) directly at ${b.phone}, or just walk in — he's usually behind the bar. Anything else I can help with meanwhile?`,
        "contact info"
      );
    case "thanks":
      return reply(
        `Anytime! Hope to see you at ${b.name} soon ☕`,
        "greeting"
      );
    case "fallback":
    default:
      return handoffReply(raw);
  }
}
