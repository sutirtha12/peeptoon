import {
  ShieldCheck,
  BadgeCheck,
  Award,
  Rocket,
  Sparkles,
} from "lucide-react";

const certs = [
  {
    Icon: ShieldCheck,
    title: "GST Registered",
    note: "GSTIN verified",
  },
  {
    Icon: BadgeCheck,
    title: "GeM Seller",
    note: "Govt e-Marketplace",
  },
  {
    Icon: Award,
    title: "Udyam MSME",
    note: "Registered MSME",
  },
  {
    Icon: Rocket,
    title: "Startup India",
    note: "DPIIT recognised",
  },
  {
    Icon: Sparkles,
    title: "Startup Tripura",
    note: "State-recognised",
  },
];

export default function Certifications() {
  return (
    <section
      className="section section-cream"
      style={{ paddingTop: 70, paddingBottom: 70 }}
    >
      <div className="container">
        <div className="text-center">
          <span className="eyebrow">Registered &amp; compliant</span>
          <h3
            data-reveal
            className="text-center"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 30,
              color: "var(--ink)",
              marginTop: 14,
            }}
          >
            Certified &amp; government-recognised.
          </h3>
          <p
            data-reveal
            data-delay="0.1"
            className="text-muted text-center"
            style={{ marginTop: 10 }}
          >
            A registered, compliant logistics partner you can trust.
          </p>
        </div>

        <div
          data-reveal-group
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10"
        >
          {certs.map(({ Icon, title, note }) => (
            <div
              key={title}
              data-reveal-item
              className="card"
              style={{ padding: 20, textAlign: "center" }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "var(--gold-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <Icon size={22} color="var(--gold-deep)" />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 15,
                  color: "var(--navy)",
                  marginTop: 10,
                }}
              >
                {title}
              </div>
              <div className="text-muted" style={{ fontSize: 12, marginTop: 4 }}>
                {note}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" data-reveal style={{ marginTop: 28 }}>
          <span
            className="pill"
            style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
          >
            <span
              style={{ display: "inline-flex", alignItems: "center", gap: 3 }}
            >
              <span
                style={{
                  width: 8,
                  height: 16,
                  borderRadius: 3,
                  background: "#FF9933",
                }}
              />
              <span
                style={{
                  width: 8,
                  height: 16,
                  borderRadius: 3,
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                }}
              />
              <span
                style={{
                  width: 8,
                  height: 16,
                  borderRadius: 3,
                  background: "#138808",
                }}
              />
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14,
                color: "var(--navy)",
              }}
            >
              Proudly Made in India
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
