// ── AGENT API ────────────────────────────────────────────────────────────
// POST /api/chat  { "message": "how much is a latte?" }
// → { "text", "intent", "confidence", "handoff", "source" }
//
// This is the backend the café website (and any client site) talks to.
// One brain, many front-ends: the demo page above uses it, and the
// Brewmandu site's chat widget calls this same endpoint.

import { NextRequest, NextResponse } from "next/server";
import { replyTo } from "@/lib/brain";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: cors });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message;
    if (!message || typeof message !== "string" || message.length > 500) {
      return NextResponse.json(
        { error: "Send a JSON body like { \"message\": \"your question\" } (max 500 chars)." },
        { status: 400, headers: cors }
      );
    }
    const r = replyTo(message.trim());
    return NextResponse.json(
      {
        text: r.text,
        intent: r.intent,
        confidence: r.confidence,
        handoff: r.handoff,
        source: r.source,
      },
      { headers: cors }
    );
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400, headers: cors });
  }
}
