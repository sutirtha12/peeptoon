"use client";

import {
  MessageCircle,
  Truck,
  Navigation,
  PackageCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    num: "01",
    Icon: MessageCircle,
    title: "Get a Quote",
    desc: "Message us on WhatsApp with your parcel details. Instant quote within 60 seconds — no calls, no waiting.",
    tag: "60s response",
  },
  {
    num: "02",
    Icon: Truck,
    title: "Doorstep Pickup",
    desc: "Our rider arrives at your door. We handle packaging, labelling & safe collection — you don't lift a finger.",
    tag: "Free pickup",
  },
  {
    num: "03",
    Icon: Navigation,
    title: "Real-time Transit",
    desc: "Track every mile on WhatsApp and our live dashboard. SMS updates at every hub your parcel crosses.",
    tag: "Live tracking",
  },
  {
    num: "04",
    Icon: PackageCheck,
    title: "Safe Delivery",
    desc: "Your parcel reaches its destination with proof of delivery. COD settlement within 48 hours for sellers.",
    tag: "48h COD",
  },
];

export default function ShipSteps() {
  return (
    <section id="ship-steps" className="ss-root">
      {/* Truck hero image — tilted diagonal */}
      <div className="ss-truck-hero">
        <div className="ss-truck-inner">
          <img
            src="/truck-cutout.png?v=3"
            alt="Peeptoon delivery truck"
            draggable={false}
          />
        </div>
      </div>

      {/* Dark content block */}
      <div className="ss-dark">
        {/* Header row */}
        <div className="container ss-header">
          <div className="ss-header-left">
            <span className="ss-eyebrow mono">How it works</span>
            <h2 className="ss-heading">
              <span style={{ color: "var(--clay-bright)" }}>#1</span> Pan-India
              Courier <br />
              Delivery Solution
            </h2>
          </div>
          <p className="ss-lead">
            From a WhatsApp message to your doorstep — four transparent steps,
            live-tracked end-to-end, with no hidden fees.
          </p>
        </div>

        {/* Flow connector line */}
        <div className="container">
          <div className="ss-flow">
            <div className="ss-flow-line" />
            {steps.map(({ num }, i) => (
              <div key={num} className="ss-flow-node">
                <div className="ss-flow-dot">
                  <span>{num}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="ss-flow-arrow">
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Steps grid — unique offset layout */}
        <div className="container">
          <div className="ss-grid" data-reveal-group>
            {steps.map(({ num, Icon, title, desc, tag }, i) => (
              <div
                key={num}
                className={`ss-card ${i % 2 === 1 ? "ss-card--raised" : ""}`}
                data-reveal-item
              >
                <div className="ss-card-accent" />
                <div className="ss-card-inner">
                  <div className="ss-card-top">
                    <div className="ss-icon-box">
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <span className="ss-tag mono">{tag}</span>
                  </div>
                  <h3 className="ss-card-title">{title}</h3>
                  <p className="ss-card-desc">{desc}</p>
                  <div className="ss-card-num">{num}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* ---- Root ---- */
        .ss-root {
          position: relative;
          overflow: visible;
        }

        /* ---- Truck hero ---- */
        .ss-truck-hero {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          margin-bottom: -100px;
          padding: 0 20px;
        }
        .ss-truck-inner {
          perspective: 1400px;
          max-width: 680px;
          width: 100%;
        }
        .ss-truck-inner img {
          display: block;
          width: 100%;
          height: auto;
          transform: rotateY(-6deg) rotateX(5deg) rotateZ(-2.5deg) translateY(10px);
          transform-style: preserve-3d;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          filter:
            drop-shadow(0 50px 100px rgba(0,0,0,0.45))
            drop-shadow(0 20px 40px rgba(0,0,0,0.2))
            drop-shadow(0 4px 12px rgba(0,0,0,0.15))
            contrast(1.04) brightness(1.02);
          transition: transform 0.6s cubic-bezier(0.23,1,0.32,1),
                      filter 0.6s cubic-bezier(0.23,1,0.32,1);
        }
        .ss-truck-inner:hover img {
          transform: rotateY(-2deg) rotateX(2deg) rotateZ(-1deg) translateY(4px) scale(1.04);
          filter:
            drop-shadow(0 60px 120px rgba(0,0,0,0.5))
            drop-shadow(0 24px 48px rgba(0,0,0,0.25))
            drop-shadow(0 6px 16px rgba(0,0,0,0.18))
            contrast(1.06) brightness(1.03);
        }

        /* ---- Dark block ---- */
        .ss-dark {
          position: relative;
          z-index: 1;
          background: #15171b;
          border-radius: 32px 32px 0 0;
          padding: 140px 0 80px;
        }

        /* ---- Header ---- */
        .ss-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 48px;
        }
        .ss-header-left {
          flex: 1;
          min-width: 0;
        }
        .ss-eyebrow {
          font-size: 12px;
          letter-spacing: 0.22em;
          color: var(--clay-bright);
          text-transform: uppercase;
          font-weight: 600;
        }
        .ss-heading {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          line-height: 1.05;
          color: #fff;
          margin-top: 16px;
          letter-spacing: -0.02em;
        }
        .ss-lead {
          max-width: 360px;
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255,255,255,0.45);
          padding-top: 40px;
          flex-shrink: 0;
        }

        /* ---- Flow connector ---- */
        .ss-flow {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding: 0 40px;
        }
        .ss-flow-line {
          position: absolute;
          top: 50%;
          left: 40px;
          right: 40px;
          height: 1px;
          background: linear-gradient(90deg,
            rgba(194,85,58,0.5) 0%,
            rgba(194,85,58,0.2) 50%,
            rgba(194,85,58,0.5) 100%);
        }
        .ss-flow-node {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0;
          flex: 1;
        }
        .ss-flow-node:last-child {
          flex: 0;
        }
        .ss-flow-dot {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #15171b;
          border: 2px solid rgba(194,85,58,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .ss-flow-dot span {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 800;
          color: var(--clay-bright);
          letter-spacing: -0.02em;
        }
        .ss-flow-dot:hover {
          border-color: var(--clay-bright);
          background: rgba(194,85,58,0.12);
          transform: scale(1.15);
        }
        .ss-flow-arrow {
          flex: 1;
          display: flex;
          justify-content: center;
          color: rgba(194,85,58,0.25);
        }

        /* ---- Steps grid ---- */
        .ss-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .ss-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .ss-card--raised {
          transform: translateY(-12px);
        }
        .ss-card:hover {
          transform: translateY(-8px);
        }
        .ss-card--raised:hover {
          transform: translateY(-20px);
        }

        /* Top accent bar */
        .ss-card-accent {
          height: 3px;
          background: linear-gradient(90deg, var(--clay-bright), rgba(194,85,58,0.3));
          border-radius: 3px 3px 0 0;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .ss-card:hover .ss-card-accent {
          opacity: 1;
        }

        .ss-card-inner {
          position: relative;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.06);
          border-top: none;
          border-radius: 0 0 20px 20px;
          padding: 28px 22px 36px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow: hidden;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .ss-card:hover .ss-card-inner {
          background: rgba(255,255,255,0.06);
          border-color: rgba(194,85,58,0.2);
        }

        /* Card top row */
        .ss-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .ss-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: rgba(194,85,58,0.1);
          border: 1px solid rgba(194,85,58,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--clay-bright);
          transition: all 0.3s ease;
        }
        .ss-card:hover .ss-icon-box {
          background: rgba(194,85,58,0.18);
          border-color: rgba(194,85,58,0.3);
          transform: scale(1.05);
        }
        .ss-tag {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--clay-bright);
          background: rgba(194,85,58,0.08);
          border: 1px solid rgba(194,85,58,0.12);
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 600;
        }

        .ss-card-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 19px;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          line-height: 1.15;
        }
        .ss-card-desc {
          margin-top: 10px;
          font-size: 13.5px;
          line-height: 1.65;
          color: rgba(255,255,255,0.42);
        }

        /* Large watermark number */
        .ss-card-num {
          position: absolute;
          bottom: -8px;
          right: 8px;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 80px;
          line-height: 1;
          color: rgba(255,255,255,0.025);
          letter-spacing: -0.04em;
          pointer-events: none;
          user-select: none;
          transition: color 0.3s ease;
        }
        .ss-card:hover .ss-card-num {
          color: rgba(194,85,58,0.06);
        }

        /* ---- Responsive ---- */
        @media (max-width: 1024px) {
          .ss-grid { grid-template-columns: repeat(2, 1fr); }
          .ss-card--raised { transform: translateY(0); }
          .ss-card--raised:hover { transform: translateY(-8px); }
          .ss-flow { display: none; }
        }
        @media (max-width: 767px) {
          .ss-header {
            flex-direction: column;
            gap: 16px;
          }
          .ss-lead {
            padding-top: 0;
            max-width: 100%;
          }
          .ss-grid { grid-template-columns: 1fr; }
          .ss-truck-hero { margin-bottom: -60px; padding: 0 16px; }
          .ss-dark { padding: 100px 0 64px; border-radius: 24px 24px 0 0; }
          .ss-truck-inner { max-width: 90%; }
          .ss-heading { font-size: clamp(1.7rem, 8vw, 2.2rem); }
          .ss-card-inner { padding: 24px 20px 32px; }
          .ss-card-num { font-size: 68px; right: 6px; }
        }
        @media (max-width: 400px) {
          .ss-truck-hero { margin-bottom: -44px; padding: 0 12px; }
          .ss-truck-inner { max-width: 100%; }
          .ss-dark { padding: 84px 0 56px; border-radius: 20px 20px 0 0; }
          .ss-heading { font-size: clamp(1.55rem, 8.5vw, 1.95rem); }
          .ss-eyebrow { font-size: 11px; letter-spacing: 0.18em; }
          .ss-card-inner { padding: 22px 18px 30px; }
          .ss-card-title { font-size: 18px; }
          .ss-card-num { font-size: 60px; right: 4px; bottom: -6px; }
        }
      `,
        }}
      />
    </section>
  );
}
