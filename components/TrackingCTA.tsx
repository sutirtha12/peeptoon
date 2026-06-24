import { PackageSearch, MessageCircle, Phone, Plane } from "lucide-react";

export default function TrackingCTA() {
  return (
    <section className="section" id="tracking">
      <div className="container">
        <div
          data-reveal
          style={{
            background:
              "linear-gradient(135deg, var(--gold), var(--gold-bright))",
            borderRadius: 28,
            padding: "clamp(36px,6vw,64px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 30px 70px -30px rgba(212,175,55,0.6)",
          }}
        >
          <Plane
            size={240}
            strokeWidth={1.25}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -50,
              right: -40,
              color: "rgba(255,255,255,.25)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <span
              className="mono"
              style={{
                color: "var(--ink)",
                letterSpacing: ".16em",
                fontSize: 13,
              }}
            >
              READY TO SHIP?
            </span>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--ink)",
                fontSize: "clamp(2rem,4vw,3rem)",
                marginTop: 12,
              }}
            >
              Track or book in under a minute.
            </h2>

            <p
              style={{
                color: "#2b2410",
                maxWidth: 540,
                margin: "14px auto 0",
              }}
            >
              One click, one quote, big savings — across India and to 200+
              countries.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 14,
                flexWrap: "wrap",
                marginTop: 28,
              }}
            >
              <a
                className="btn"
                href="https://track.peeptoon.com"
                style={{ background: "#fff", color: "var(--ink)" }}
              >
                <PackageSearch size={18} strokeWidth={1.75} aria-hidden="true" />
                Track Shipment
              </a>
              <a className="btn btn-primary" href="https://wa.me/918794152726">
                <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
                Book on WhatsApp
              </a>
            </div>

            <div
              className="mono"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 18,
                color: "#2b2410",
                fontSize: 14,
              }}
            >
              <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
              +91 7005 364 320
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
