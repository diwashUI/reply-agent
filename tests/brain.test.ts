import { describe, expect, it } from "vitest";
import { analyzeMessage, replyTo, HANDOFF_THRESHOLD } from "../lib/brain";

describe("analyzeMessage", () => {
  it("greets", () => {
    const a = analyzeMessage("Hello!");
    expect(a.intent).toBe("greeting");
  });

  it("does not match 'hi' inside 'this'", () => {
    const a = analyzeMessage("is this open?");
    expect(a.intent).toBe("hours");
  });

  it("detects hours questions", () => {
    expect(analyzeMessage("when do you open?").intent).toBe("hours");
    expect(analyzeMessage("what are your timings?").intent).toBe("hours");
  });

  it("detects location questions", () => {
    expect(analyzeMessage("where are you located?").intent).toBe("location");
  });

  it("detects price questions with item entity", () => {
    const a = analyzeMessage("how much is a latte?");
    expect(a.intent).toBe("price");
    expect(a.item?.name).toBe("Café Latte");
  });

  it("reads a bare item name as a price question", () => {
    const a = analyzeMessage("cappuccino?");
    expect(a.intent).toBe("price");
    expect(a.item?.name).toBe("Cappuccino");
  });

  it("detects recommendations", () => {
    const a = analyzeMessage("what's your best drink?");
    expect(a.intent).toBe("recommend");
  });

  it("detects policy questions", () => {
    const a = analyzeMessage("do you have wifi?");
    expect(a.intent).toBe("policy");
    expect(a.policyTopic).toBe("wifi");
  });

  it("detects order intent", () => {
    const a = analyzeMessage("i want to order a mocha for takeaway");
    expect(a.intent).toBe("order");
    expect(a.item?.name).toBe("Mocha");
  });

  it("prefers human handoff over everything", () => {
    const a = analyzeMessage("can i speak to a real person about the price?");
    expect(a.intent).toBe("human");
  });

  it("tolerates typos in item names", () => {
    const a = analyzeMessage("how much is expresso?");
    expect(a.intent).toBe("price");
    expect(a.item?.name).toBe("Espresso");
  });

  it("fuzzy-matches a bare typo'd item as a last resort", () => {
    const a = analyzeMessage("capuchino");
    expect(a.intent).toBe("price");
    expect(a.item?.name).toBe("Cappuccino");
  });

  it("does not let fuzzy matching override a real intent", () => {
    const a = analyzeMessage("thanks, see you later!");
    expect(a.intent).toBe("thanks");
  });

  it("falls back on nonsense", () => {
    const a = analyzeMessage("blorptastic zebras");
    expect(a.intent).toBe("fallback");
    expect(a.confidence).toBe(0);
  });

  it("handles empty input", () => {
    expect(analyzeMessage("   ").intent).toBe("fallback");
  });
});

describe("replyTo", () => {
  it("answers hours from the knowledge base", () => {
    const r = replyTo("are you open on saturday?");
    expect(r.handoff).toBe(false);
    expect(r.text).toContain("Saturday");
    expect(r.source).toBe("hours");
  });

  it("answers prices with the item and price", () => {
    const r = replyTo("price of cold brew?");
    expect(r.handoff).toBe(false);
    expect(r.text).toContain("Rs 300");
    expect(r.text).toContain("Cold Brew");
  });

  it("recommends the signature", () => {
    const r = replyTo("what should i try?");
    expect(r.text).toContain("Himalayan Spiced Latte");
  });

  it("varies handoff replies but stays deterministic", () => {
    const r1 = replyTo("do you cater weddings?");
    const r2 = replyTo("do you cater weddings?");
    expect(r1.handoff).toBe(true);
    expect(r1.text).toBe(r2.text); // same question → same reply
    const r3 = replyTo("is there parking nearby?");
    expect(r3.handoff).toBe(true);
    // different unknown questions get different replies, not one canned line
    expect(new Set([r1.text, r3.text]).size).toBeGreaterThan(1);
  });

  it("echoes the unknown topic so it feels heard", () => {
    const r = replyTo("do you offer catering?");
    expect(r.handoff).toBe(true);
    expect(r.text).toContain("catering");
  });

  it("hands off when it doesn't know", () => {
    const r = replyTo("do you cater weddings for 200 people?");
    expect(r.handoff).toBe(true);
    expect(r.text).toContain("Aashish");
    expect(r.confidence).toBeLessThan(HANDOFF_THRESHOLD);
  });

  it("hands off to a human on request", () => {
    const r = replyTo("let me talk to the owner");
    expect(r.handoff).toBe(false); // human intent has a direct answer (contact info)
    expect(r.text).toContain("+977");
  });

  it("answers wifi policy", () => {
    const r = replyTo("is there wifi?");
    expect(r.handoff).toBe(false);
    expect(r.text.toLowerCase()).toContain("wifi");
  });
});
