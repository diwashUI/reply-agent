// ── THE BUSINESS KNOWLEDGE BASE ──────────────────────────────────────────
// Everything the agent knows about the business lives here. A real client
// gets their own file: name, menu, hours, policies. The agent only ever
// answers from this — never makes things up.

export interface MenuItem {
  name: string;
  price: string;
  desc: string;
  /** keywords customers use for this item */
  keywords: string[];
}

export interface BusinessInfo {
  name: string;
  owner: string;
  tagline: string;
  address: string;
  phone: string;
  hours: { days: string; time: string }[];
  menu: MenuItem[];
  policies: { topic: string; answer: string; keywords: string[] }[];
  signature: string;
}

export const business: BusinessInfo = {
  name: "Brewmandu",
  owner: "Aashish",
  tagline: "Coffee worth slowing down for.",
  address: "Chaksibari Marg, Thamel, Kathmandu",
  phone: "+977 98-00000000",
  hours: [
    { days: "Sun – Fri", time: "7:00 AM – 9:00 PM" },
    { days: "Saturday", time: "8:00 AM – 9:00 PM" },
  ],
  signature: "Himalayan Spiced Latte",
  menu: [
    {
      name: "Espresso",
      price: "Rs 180",
      desc: "Double shot, syrupy and bold",
      keywords: ["espresso", "shot"],
    },
    {
      name: "Cappuccino",
      price: "Rs 250",
      desc: "Classic thirds, dusted with cocoa",
      keywords: ["cappuccino", "cappucino", "cap"],
    },
    {
      name: "Café Latte",
      price: "Rs 280",
      desc: "Silky steamed milk, mellow roast",
      keywords: ["latte", "cafe latte", "caffe latte"],
    },
    {
      name: "Himalayan Spiced Latte",
      price: "Rs 340",
      desc: "Our signature — timmur & honey",
      keywords: ["spiced latte", "spice latte", "signature", "timmur", "special"],
    },
    {
      name: "Mocha",
      price: "Rs 320",
      desc: "Espresso meets dark chocolate",
      keywords: ["mocha", "chocolate"],
    },
    {
      name: "Cold Brew",
      price: "Rs 300",
      desc: "18-hour slow steep, served over ice",
      keywords: ["cold brew", "coldbrew", "iced coffee", "iced"],
    },
  ],
  policies: [
    {
      topic: "wifi",
      answer:
        "Yes! Free wifi for customers — the password's on the chalkboard behind the counter. Great spot to work from, the corner table has a plug point.",
      keywords: ["wifi", "wi-fi", "internet"],
    },
    {
      topic: "takeaway",
      answer:
        "Absolutely — order takeaway on WhatsApp and it'll be ready when you arrive. Just send us what you'd like!",
      keywords: ["takeaway", "take away", "to go", "parcel", "delivery", "deliver"],
    },
    {
      topic: "payment",
      answer:
        "We take cash, eSewa, and Khalti. Cards work too!",
      keywords: ["pay", "payment", "esewa", "khalti", "cash", "card"],
    },
    {
      topic: "beans",
      answer:
        "We sell our house-roast beans to take home! Rs 1,100 for 250g — roasted every Tuesday, so it's always fresh.",
      keywords: ["beans", "buy beans", "take home", "coffee beans"],
    },
  ],
};
