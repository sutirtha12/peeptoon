"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  { name: "Aarav Mehta", role: "Founder, MehtaBox", text: "Switched from BlueDart and haven't looked back. Peeptoon's WhatsApp-first approach saves us hours every week.", rating: 5, avatar: "AM" },
  { name: "Priya Sharma", role: "D2C Seller, Mumbai", text: "COD settlement in 48 hours is a game-changer for cash flow. No other aggregator comes close.", rating: 5, avatar: "PS" },
  { name: "Rishi Bose", role: "Etsy Seller, Kolkata", text: "International shipping to the US used to take 3 weeks. With Peeptoon it's 7 days, tracked end-to-end.", rating: 5, avatar: "RB" },
  { name: "Sneha Iyer", role: "Boutique Owner, Chennai", text: "Fragile sarees and glass bangles — everything arrives perfect. Their packaging game is elite.", rating: 5, avatar: "SI" },
  { name: "Kunal Joshi", role: "Amazon Seller", text: "19,000+ pin codes covered means I never reject an order. Revenue up 35% since joining.", rating: 5, avatar: "KJ" },
  { name: "Tanvi Reddy", role: "Meesho Seller, Hyderabad", text: "₹30 flat rate across Tripura? Insane value. My margins have never been healthier.", rating: 4, avatar: "TR" },
  { name: "Arjun Nair", role: "Electronics Store, Kochi", text: "Real-time WhatsApp tracking keeps my customers happy. Return complaints dropped 60%.", rating: 5, avatar: "AN" },
  { name: "Divya Patel", role: "Handicrafts, Ahmedabad", text: "From Agartala to Auckland — Peeptoon handles it all. One dashboard, zero headaches.", rating: 5, avatar: "DP" },
  { name: "Vikram Singh", role: "Warehouse Ops, Delhi", text: "Their warehouse integration API is clean. Synced 12,000 SKUs in one afternoon.", rating: 5, avatar: "VS" },
  { name: "Ananya Das", role: "Jewellery Brand, Guwahati", text: "High-value jewellery needs trust. Peeptoon's insurance and proof-of-delivery give me peace of mind.", rating: 5, avatar: "AD" },
  { name: "Rohan Gupta", role: "Dropshipper, Jaipur", text: "Automated label printing + WhatsApp notifications. My customers think I'm a big brand now.", rating: 5, avatar: "RG" },
  { name: "Meera Krishnan", role: "Organic Foods, Bangalore", text: "Perishable goods need speed. Peeptoon's same-city delivery in 4 hours saved my business.", rating: 5, avatar: "MK" },
  { name: "Sahil Ahmed", role: "Textile Exports, Surat", text: "Bulk B2B shipments to Dubai used to be a nightmare. Now it's three clicks on WhatsApp.", rating: 4, avatar: "SA" },
  { name: "Pooja Thakur", role: "Cosmetics Brand, Lucknow", text: "The doorstep pickup is real — rider came within 45 minutes. No drop-off points needed.", rating: 5, avatar: "PT" },
  { name: "Naveen Kumar", role: "Auto Parts, Coimbatore", text: "Heavy parcels, odd shapes — Peeptoon doesn't charge extra for packaging like others do.", rating: 5, avatar: "NK" },
  { name: "Ishita Roy", role: "Book Publisher, Kolkata", text: "Shipped 8,000 copies across India for a launch. Not a single damaged return. Incredible.", rating: 5, avatar: "IR" },
  { name: "Rajat Malhotra", role: "Furniture, Chandigarh", text: "Large item logistics finally solved. Their team even helped with assembly instructions packaging.", rating: 4, avatar: "RM" },
  { name: "Farhana Begum", role: "Fashion Label, Agartala", text: "Being local to Agartala, the support is personal. They treat every parcel like their own.", rating: 5, avatar: "FB" },
];

const TOTAL = TESTIMONIALS.length;
const INTERVAL = 3500;

function wrap(i: number) {
  return ((i % TOTAL) + TOTAL) % TOTAL;
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => setActive((p) => wrap(p + 1)), []);
  const goPrev = useCallback(() => setActive((p) => wrap(p - 1)), []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(goNext, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, goNext]);

  const getSlot = (i: number) => {
    const diff = ((i - active) % TOTAL + TOTAL) % TOTAL;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === TOTAL - 1) return "left";
    if (diff === 2) return "far-right";
    if (diff === TOTAL - 2) return "far-left";
    return "hidden";
  };

  return (
    <section
      id="testimonials"
      className="tm-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container tm-head">
        <span className="eyebrow">Testimonials</span>
        <h2 className="h-section" style={{ marginTop: 14 }}>
          Trusted by <span className="gradient-text">thousands</span> of sellers
        </h2>
        <p className="tm-sub">
          {active + 1} / {TOTAL}
        </p>
      </div>

      <div ref={stageRef} className="tm-stage">
        {TESTIMONIALS.map((t, i) => {
          const slot = getSlot(i);
          return (
            <div
              key={i}
              className={`tm-card tm-slot-${slot}`}
              aria-hidden={slot === "hidden"}
            >
              <div className="tm-stars">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={13} fill="var(--clay-bright)" stroke="none" />
                ))}
              </div>
              <p className="tm-text">&ldquo;{t.text}&rdquo;</p>
              <div className="tm-author">
                <div className="tm-av">{t.avatar}</div>
                <div>
                  <div className="tm-name">{t.name}</div>
                  <div className="tm-role">{t.role}</div>
                </div>
              </div>
            </div>
          );
        })}

        <button className="tm-nav tm-nav--prev" onClick={goPrev} aria-label="Previous">
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <button className="tm-nav tm-nav--next" onClick={goNext} aria-label="Next">
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="tm-dots">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`tm-dot ${i === active ? "tm-dot--active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .tm-section {
          position: relative;
          padding: 80px 0 60px;
          background: var(--paper);
          overflow: hidden;
        }
        .tm-head {
          text-align: center;
          margin-bottom: 48px;
        }
        .tm-sub {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.1em;
          color: var(--muted);
          margin-top: 12px;
        }

        /* ---- Stage ---- */
        .tm-stage {
          position: relative;
          height: 320px;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ---- Cards ---- */
        .tm-card {
          position: absolute;
          width: min(380px, 78vw);
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 28px 26px 24px;
          box-shadow:
            0 4px 12px rgba(28,24,19,0.04),
            0 20px 56px -14px rgba(28,24,19,0.1);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }

        /* Slot positions — semicircle arc */
        .tm-slot-center {
          transform: translateX(0) translateY(-16px) scale(1) rotate(0deg);
          opacity: 1;
          z-index: 4;
        }
        .tm-slot-left {
          transform: translateX(-380px) translateY(30px) scale(0.85) rotate(-4deg);
          opacity: 0.55;
          z-index: 3;
        }
        .tm-slot-right {
          transform: translateX(380px) translateY(30px) scale(0.85) rotate(4deg);
          opacity: 0.55;
          z-index: 3;
        }
        .tm-slot-far-left {
          transform: translateX(-680px) translateY(80px) scale(0.7) rotate(-8deg);
          opacity: 0;
          z-index: 1;
          pointer-events: none;
        }
        .tm-slot-far-right {
          transform: translateX(680px) translateY(80px) scale(0.7) rotate(8deg);
          opacity: 0;
          z-index: 1;
          pointer-events: none;
        }
        .tm-slot-hidden {
          transform: translateX(0) translateY(60px) scale(0.6);
          opacity: 0;
          z-index: 0;
          pointer-events: none;
        }

        /* ---- Card innards ---- */
        .tm-stars {
          display: flex;
          gap: 2px;
          margin-bottom: 14px;
        }
        .tm-text {
          font-size: 15px;
          line-height: 1.7;
          color: var(--ink);
          margin-bottom: 20px;
        }
        .tm-author {
          display: flex;
          align-items: center;
          gap: 12px;
          border-top: 1px solid var(--border);
          padding-top: 14px;
        }
        .tm-av {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--clay);
          color: #fff;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tm-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          color: var(--ink);
        }
        .tm-role {
          font-size: 12px;
          color: var(--muted);
          margin-top: 2px;
        }

        /* ---- Nav arrows ---- */
        .tm-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: #fff;
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(28,24,19,0.06);
        }
        .tm-nav:hover {
          background: var(--ink);
          color: #fff;
          border-color: var(--ink);
        }
        .tm-nav--prev { left: 16px; }
        .tm-nav--next { right: 16px; }

        /* ---- Dots ---- */
        .tm-dots {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px;
          margin-top: 36px;
          padding-inline: 16px;
        }
        .tm-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: var(--border);
          cursor: pointer;
          padding: 0;
          transition: all 0.35s ease;
        }
        .tm-dot--active {
          background: var(--clay);
          width: 24px;
          border-radius: 4px;
        }

        /* ---- Responsive ---- */
        @media (max-width: 900px) {
          .tm-slot-left {
            transform: translateX(-260px) translateY(30px) scale(0.82) rotate(-4deg);
          }
          .tm-slot-right {
            transform: translateX(260px) translateY(30px) scale(0.82) rotate(4deg);
          }
          .tm-slot-far-left,
          .tm-slot-far-right {
            opacity: 0;
          }
        }
        @media (max-width: 767px) {
          .tm-section { padding: 60px 0 48px; }
          .tm-stage { height: 300px; }
          .tm-card { padding: 24px 20px 20px; width: min(300px, 84vw); }
          .tm-text { font-size: 14px; }
          .tm-slot-left {
            transform: translateX(-180px) translateY(24px) scale(0.78) rotate(-5deg);
            opacity: 0.35;
          }
          .tm-slot-right {
            transform: translateX(180px) translateY(24px) scale(0.78) rotate(5deg);
            opacity: 0.35;
          }
          .tm-nav { width: 36px; height: 36px; }
          .tm-nav--prev { left: 6px; }
          .tm-nav--next { right: 6px; }
        }

        /* ---- Small phones (≤400px) ---- */
        @media (max-width: 400px) {
          .tm-head { margin-bottom: 36px; }
          .tm-stage { height: 320px; }
          .tm-card {
            width: min(280px, 80vw);
            padding: 22px 18px 18px;
            border-radius: 18px;
          }
          .tm-text { font-size: 13.5px; line-height: 1.65; }
          /* Pull side cards in and fade them more so they never reach the
             viewport edge and never crowd the center card's text. */
          .tm-slot-left {
            transform: translateX(-128px) translateY(20px) scale(0.7) rotate(-5deg);
            opacity: 0.22;
          }
          .tm-slot-right {
            transform: translateX(128px) translateY(20px) scale(0.7) rotate(5deg);
            opacity: 0.22;
          }
          /* Keep arrows off the center card and easy to tap. */
          .tm-nav { width: 38px; height: 38px; }
          .tm-nav--prev { left: 2px; }
          .tm-nav--next { right: 2px; }
          .tm-dots { gap: 5px; margin-top: 28px; }
        }
      `}} />
    </section>
  );
}
