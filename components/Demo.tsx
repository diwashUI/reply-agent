"use client";

import { useEffect, useRef, useState } from "react";
import { replyTo, type AgentReply } from "@/lib/brain";
import { business } from "@/lib/knowledge";
import Logo from "./Logo";

interface Msg {
  id: number;
  role: "user" | "agent";
  text: string;
  reply?: AgentReply;
}

interface Handoff {
  id: number;
  question: string;
  time: string;
}

const STARTERS = [
  "What are your hours?",
  "How much is a latte?",
  "Do you have wifi?",
  "Where are you located?",
  "What's your signature drink?",
  "Do you do takeaway?",
];

let idc = 0;
const nid = () => ++idc;

function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Live demo: you play the customer, the agent plays Brewmandu's receptionist.
 * The inspector panel shows exactly what the agent "thought" — intent,
 * confidence, and which knowledge answered — plus the owner handoff inbox.
 */
export default function Demo() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: nid(),
      role: "agent",
      text: `Namaste! Welcome to ${business.name} ☕ Ask me about the menu, prices, hours, or how to find us!`,
      reply: {
        intent: "greeting",
        confidence: 1,
        item: null,
        policyTopic: null,
        matched: [],
        text: "",
        handoff: false,
        source: "greeting",
      },
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [handoffs, setHandoffs] = useState<Handoff[]>([]);
  const [resolved, setResolved] = useState<Set<number>>(new Set());
  const boxRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const lastReply = [...msgs].reverse().find((m) => m.role === "agent")?.reply ?? null;

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMsgs((m) => [...m, { id: nid(), role: "user", text }]);
    setInput("");
    setTyping(true);
    timerRef.current = window.setTimeout(() => {
      const r = replyTo(text);
      setMsgs((m) => [...m, { id: nid(), role: "agent", text: r.text, reply: r }]);
      if (r.handoff) {
        setHandoffs((h) => [...h, { id: nid(), question: text, time: timeNow() }]);
      }
      setTyping(false);
    }, 900);
  };

  const resolveHandoff = (id: number) =>
    setResolved((s) => new Set(s).add(id));

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      {/* ── Customer chat ── */}
      <div className="flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-zinc-100 px-5 py-4">
          <Logo className="h-10 w-10" />
          <div>
            <p className="font-semibold text-zinc-900">{business.name} Assistant</p>
            <p className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online · replies instantly
            </p>
          </div>
        </div>

        <div ref={boxRef} className="h-[380px] space-y-4 overflow-y-auto bg-zinc-50/60 px-5 py-5">
          {msgs.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-br-md bg-zinc-900 px-4 py-2.5 text-sm text-white">
                  {m.text}
                </p>
              </div>
            ) : (
              <div key={m.id} className="flex justify-start">
                <div className="max-w-[85%]">
                  <p className="rounded-2xl rounded-bl-md border border-zinc-200 bg-white px-4 py-2.5 text-sm leading-relaxed text-zinc-800 shadow-sm">
                    {m.text}
                  </p>
                  {m.reply && m.reply.intent !== "greeting" && (
                    <p className="mt-1.5 flex flex-wrap items-center gap-1.5 px-1 text-[11px]">
                      <span className="rounded-full bg-teal-50 px-2 py-0.5 font-medium text-teal-700">
                        {m.reply.intent}
                      </span>
                      <span className="text-zinc-400">
                        {Math.round(m.reply.confidence * 100)}% confident
                      </span>
                      {m.reply.handoff && (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 font-medium text-amber-700">
                          handed to owner
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            )
          )}
          {typing && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl rounded-bl-md border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-zinc-100 px-5 py-3">
          <div className="mb-3 flex flex-wrap gap-2">
            {STARTERS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={typing}
                className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-600 transition hover:border-teal-300 hover:text-teal-700 disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask as a customer…"
              className="flex-1 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-teal-400"
            />
            <button
              type="submit"
              disabled={typing || !input.trim()}
              className="rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* ── Agent brain inspector ── */}
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Agent brain · last message
          </p>
          {lastReply ? (
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
                  {lastReply.intent}
                </span>
                <span className="font-mono text-sm tabular-nums text-zinc-600">
                  {Math.round(lastReply.confidence * 100)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className={`h-full rounded-full transition-all ${
                    lastReply.handoff ? "bg-amber-400" : "bg-teal-500"
                  }`}
                  style={{ width: `${Math.round(lastReply.confidence * 100)}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500">
                <span className="font-medium text-zinc-700">Source:</span> {lastReply.source}
              </p>
              {lastReply.matched.length > 0 && (
                <p className="text-xs text-zinc-500">
                  <span className="font-medium text-zinc-700">Heard:</span>{" "}
                  {lastReply.matched.map((k) => `“${k}”`).join(", ")}
                </p>
              )}
              {lastReply.handoff && (
                <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800">
                  Below confidence threshold — flagged for {business.owner} instead of guessing.
                </p>
              )}
            </div>
          ) : (
            <p className="mt-4 text-sm text-zinc-400">Send a message to inspect the agent's thinking.</p>
          )}
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Owner inbox
            </p>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-zinc-600">
              {handoffs.filter((h) => !resolved.has(h.id)).length} open
            </span>
          </div>
          <div className="mt-4 space-y-2.5">
            {handoffs.length === 0 && (
              <p className="text-sm leading-relaxed text-zinc-400">
                Nothing here — the agent is handling everything so far. Stump it and watch this fill up.
              </p>
            )}
            {handoffs.map((h) => {
              const done = resolved.has(h.id);
              return (
                <div
                  key={h.id}
                  className={`flex items-start justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-sm ${
                    done ? "border-zinc-100 bg-zinc-50 opacity-60" : "border-amber-200 bg-amber-50/60"
                  }`}
                >
                  <div>
                    <p className={done ? "text-zinc-500 line-through" : "text-zinc-800"}>“{h.question}”</p>
                    <p className="mt-0.5 text-xs tabular-nums text-zinc-400">{h.time}</p>
                  </div>
                  {!done && (
                    <button
                      onClick={() => resolveHandoff(h.id)}
                      className="shrink-0 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 transition hover:border-teal-300 hover:text-teal-700"
                    >
                      Resolve
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-zinc-900 p-6 text-white shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
            What it knows
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center">
            {[
              [business.menu.length, "menu items"],
              [business.policies.length, "policies"],
              [business.hours.length, "hour ranges"],
            ].map(([n, label]) => (
              <div key={label as string} className="rounded-2xl bg-white/5 px-2 py-3">
                <p className="font-mono text-2xl font-bold tabular-nums">{n}</p>
                <p className="mt-1 text-[11px] text-zinc-400">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-zinc-400">
            A real client gets their own knowledge file — menu, hours, policies. The agent only
            answers from it, never invents. Edit <span className="font-mono text-zinc-300">lib/knowledge.ts</span> to
            re-skin the whole demo.
          </p>
        </div>
      </div>
    </div>
  );
}
