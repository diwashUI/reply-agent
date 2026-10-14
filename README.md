# ReplyAgent ☕

An AI receptionist for small businesses. Customers ask questions in the DMs —
hours, menu, prices, directions — and the agent answers instantly from the
business's real info. When it doesn't know something, it hands off to the owner
instead of guessing.

**Live demo:** skinned as Brewmandu, the sample café — chat with it, watch the
agent brain panel show its intent + confidence for every reply, and try to stump
it to see the owner handoff inbox fill up.

## How it works

No API keys, no LLM, no network calls. The brain is a pure-TypeScript intent
engine (`lib/brain.ts`):

1. **Understand** — `analyzeMessage()` matches the customer's text against the
   knowledge base: intent keywords (word-boundary matched, so "hi" doesn't fire
   on "this"), menu items, and policy topics. Each match scores confidence.
2. **Decide** — below the confidence threshold it escalates to the owner;
   otherwise it answers from real business data with the source cited.
3. **Explain** — every reply carries its intent, confidence, matched keywords,
   and knowledge source, shown live in the demo's inspector panel.

## Re-skin for a real client

Everything the agent knows lives in **`lib/knowledge.ts`** — business name,
owner, hours, menu with prices, policies (wifi, takeaway, payments…). Swap that
one file and the whole demo answers as the new business.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # vitest — 18 brain tests
npm run build
```

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Vitest
