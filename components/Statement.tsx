const WORDS = [
  "Ship Smarter",
  "Faster",
  "Cheaper",
  "Pan-India",
  "200+ Countries",
  "₹30 Flat Tripura",
  "Live Tracking",
];

export default function Statement() {
  return (
    <section className="section" style={{ overflow: "hidden", paddingBlock: "clamp(48px, 8vh, 110px)" }}>
      {/* running marquee of big words */}
      <div className="marquee-mask" style={{ borderTop: "1px solid var(--border-2)", borderBottom: "1px solid var(--border-2)", paddingBlock: "clamp(14px, 2vw, 26px)" }}>
        <div className="marquee">
          {[0, 1].map((dup) => (
            <div key={dup} style={{ display: "flex", alignItems: "center" }}>
              {WORDS.map((w, i) => (
                <span key={`${dup}-${i}`} style={{ display: "inline-flex", alignItems: "center" }}>
                  <span
                    className="display"
                    style={{
                      fontSize: "clamp(2rem, 5vw, 4.4rem)",
                      textTransform: "uppercase",
                      color: i % 2 === 0 ? "var(--ink)" : "var(--clay)",
                      paddingInline: "0.4em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {w}
                  </span>
                  <span style={{ color: "var(--rose-deep)", fontSize: "clamp(1rem,2vw,1.8rem)" }}>✶</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* manifesto */}
      <div className="container" style={{ marginTop: "clamp(56px, 9vw, 130px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.8fr) minmax(0,1.2fr)", gap: 40, alignItems: "start" }} className="hero-grid">
          <span className="eyebrow" data-reveal>
            The promise
          </span>
          <p
            data-reveal
            data-delay="0.1"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1.7rem, 3.6vw, 3.2rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            We don&apos;t just move parcels — from a single document to 70&nbsp;kg B2B freight,{" "}
            <span className="text-rose">we build trust</span>, handling every shipment with care,
            transparent pricing and obsessive tracking.
          </p>
        </div>
      </div>
    </section>
  );
}
