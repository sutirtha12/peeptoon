"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ITEMS = [
  {
    q: "How much does shipping cost?",
    a: "Pricing is per-kg and transparent: B2B from ₹5.5/kg (15–70 kg), B2C from ₹30/kg (up to 40 kg), international from ₹300/kg, and local Tripura at a flat ₹30 per box. No hidden fees.",
  },
  {
    q: "How long does delivery take?",
    a: "Surface 4–6 working days, air 2–3 working days, and international roughly 2 days. Local Tripura is same-day.",
  },
  {
    q: "Do you offer Cash on Delivery (COD)?",
    a: "Yes — COD is supported, along with doorstep pickup and 24×7 customer support.",
  },
  {
    q: "What are the weight limits?",
    a: "B2B parcels are 15–70 kg per box and B2C up to 40 kg. For heavier or bulk freight, message us for a custom quote.",
  },
  {
    q: "How is volumetric weight calculated?",
    a: "Chargeable weight is the greater of actual and volumetric weight. Volumetric = (L×W×H in cm) ÷ 4500 for B2B and ÷ 5000 for B2C.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes — to 200+ countries from ₹300/kg with about 2-day delivery and zero paperwork on your side.",
  },
  {
    q: "How do I track my parcel?",
    a: "Track live anytime at track.peeptoon.com using your booking ID.",
  },
  {
    q: "How do I book a shipment?",
    a: "Book in 60 seconds on WhatsApp, or online at local.peeptoon.com.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section section-white" id="faq">
      <div className="container">
        <span className="eyebrow">FAQ</span>
        <h2 className="h-section" data-reveal>
          Questions, <span className="gradient-text">answered</span>.
        </h2>
        <p className="lead" data-reveal data-delay="0.1">
          Everything you need to know before you ship.
        </p>

        <div
          style={{
            maxWidth: "820px",
            marginInline: "auto",
            marginTop: "36px",
          }}
        >
          {ITEMS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={i}
                className="card"
                data-reveal
                style={{
                  marginBottom: "12px",
                  padding: 0,
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  style={{
                    width: "100%",
                    padding: "18px 22px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "17px",
                      color: "var(--ink)",
                    }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    size={20}
                    style={{
                      color: "var(--gold-deep)",
                      flexShrink: 0,
                      transition: "transform 0.3s ease",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                <div
                  style={{
                    maxHeight: open ? "320px" : "0px",
                    opacity: open ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.35s ease, opacity 0.35s ease",
                  }}
                >
                  <p
                    style={{
                      padding: "0 22px 20px",
                      color: "var(--body)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
