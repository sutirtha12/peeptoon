"use client";

const COURIERS = [
  "Bluedart",
  "Delhivery",
  "DTDC",
  "Ekart",
  "Amazon Shipping",
  "Aramex",
  "UPS",
  "India Post",
  "Movin",
  "Royal Mail",
  "Ecom Express",
  "Xpressbees",
];

const LABEL = "POWERED BY INDIA'S TOP COURIER NETWORK";

function TickerItem({ name }: { name: string }) {
  return (
    <>
      <span style={{ whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
        {name.toUpperCase()}
      </span>
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--clay)",
          opacity: 0.7,
          flexShrink: 0,
        }}
      />
    </>
  );
}

export default function CourierTicker() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        background: "var(--ink)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Top label strip */}
      <div
        className="courier-label-strip"
        style={{
          textAlign: "center",
          padding: "14px 20px 0",
        }}
      >
        <span
          className="courier-label"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.18em",
            color: "var(--clay)",
            textTransform: "uppercase",
          }}
        >
          {LABEL}
        </span>
      </div>

      {/* Ticker strip */}
      <div
        className="courier-ticker-strip"
        style={{
          padding: "14px 0 16px",
        }}
      >
        <div className="marquee-mask">
          <div
            className="marquee"
            style={{
              gap: 28,
              alignItems: "center",
              animationDuration: "40s",
              fontFamily: "var(--font-display)",
              fontSize: 14,
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {COURIERS.map((name) => (
              <TickerItem key={`t1a-${name}`} name={name} />
            ))}
            {COURIERS.map((name) => (
              <TickerItem key={`t1b-${name}`} name={name} />
            ))}
          </div>
        </div>

        <div className="marquee-mask courier-row-2" style={{ marginTop: 24 }}>
          <div
            className="marquee marquee-reverse"
            style={{
              gap: 28,
              alignItems: "center",
              animationDuration: "52s",
              fontFamily: "var(--font-display)",
              fontSize: 14,
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {COURIERS.map((name) => (
              <TickerItem key={`t2a-${name}`} name={name} />
            ))}
            {COURIERS.map((name) => (
              <TickerItem key={`t2b-${name}`} name={name} />
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        section:has(.marquee-mask) .marquee-mask {
          mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
        }
        @media (max-width: 767px) {
          .courier-label-strip { padding: 12px 16px 0; }
          .courier-label { font-size: 9px; letter-spacing: 0.14em; }
          .courier-ticker-strip { padding: 12px 0 14px; }
          .courier-ticker-strip .marquee { gap: 22px !important; font-size: 13px !important; }
          .courier-ticker-strip .courier-row-2 { margin-top: 18px !important; }
        }
        @media (max-width: 400px) {
          .courier-label { font-size: 8px; letter-spacing: 0.1em; }
          .courier-ticker-strip .marquee { gap: 18px !important; font-size: 12px !important; }
          .courier-ticker-strip .courier-row-2 { margin-top: 14px !important; }
        }
      `}} />
    </section>
  );
}
