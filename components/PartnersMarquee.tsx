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
];

function CourierPill({ name }: { name: string }) {
  return (
    <span className="pill" style={{ marginRight: 14, whiteSpace: "nowrap" }}>
      <span
        className="mono"
        aria-hidden="true"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 26,
          height: 26,
          borderRadius: 6,
          background: "var(--gold-soft)",
          color: "var(--gold-deep)",
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {name.charAt(0)}
      </span>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 15,
          color: "var(--ink)",
        }}
      >
        {name}
      </span>
    </span>
  );
}

export default function PartnersMarquee() {
  return (
    <section className="section section-cream" style={{ paddingBlock: 64 }}>
      <div className="container">
        <div style={{ textAlign: "center", marginInline: "auto" }}>
          <span className="eyebrow">Trusted rails</span>
          <h3
            data-reveal
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              color: "var(--ink)",
              marginTop: 12,
            }}
          >
            Powered by India&apos;s top courier network.
          </h3>
        </div>

        <div style={{ marginTop: 36 }}>
          <div className="marquee-mask">
            <div className="marquee">
              {COURIERS.map((name) => (
                <CourierPill key={`row1-a-${name}`} name={name} />
              ))}
              {COURIERS.map((name) => (
                <CourierPill key={`row1-b-${name}`} name={name} />
              ))}
            </div>
          </div>

          <div className="marquee-mask" style={{ marginTop: 16 }}>
            <div className="marquee marquee-reverse">
              {COURIERS.map((name) => (
                <CourierPill key={`row2-a-${name}`} name={name} />
              ))}
              {COURIERS.map((name) => (
                <CourierPill key={`row2-b-${name}`} name={name} />
              ))}
            </div>
          </div>
        </div>

        <p
          className="text-muted"
          style={{ textAlign: "center", fontSize: 12, marginTop: 22 }}
        >
          Partner names shown for demonstration.
        </p>
      </div>
    </section>
  );
}
