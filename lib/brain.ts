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

  if (scores.size === 0) return empty;

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

  const handoffReply = (why: string): AgentReply =>
    reply(
      `Hmm, ${why} — let me get ${b.owner} for you! He usually replies within a few minutes. Meanwhile, I can help with the menu, prices, hours, or directions. 🙏`,
      "escalation rule",
      true
    );

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
      return handoffReply("I'm not sure about that one");
  }
}
