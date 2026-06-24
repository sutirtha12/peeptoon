import { MessageCircle, Truck, Navigation, PackageCheck } from "lucide-react";

const steps = [
  {
    num: "01",
    Icon: MessageCircle,
    title: "Get a quote",
    line: "Message us on WhatsApp for an instant quote.",
  },
  {
    num: "02",
    Icon: Truck,
    title: "Doorstep pickup",
    line: "We collect your parcel from your door.",
  },
  {
    num: "03",
    Icon: Navigation,
    title: "In transit",
    line: "Track your shipment live, end to end.",
  },
  {
    num: "04",
    Icon: PackageCheck,
    title: "Delivered",
    line: "Fast, safe delivery with proof of delivery.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section section-white" id="how-it-works">
      <div className="container">
        <span className="eyebrow">How it works</span>
        <h2 className="h-section" data-reveal>
          Ship in <span className="gradient-text">four simple steps</span>.
        </h2>
        <p className="lead" data-reveal data-delay="0.1">
          From quote to doorstep — simple, transparent, fast.
        </p>

        <div
          data-reveal-group
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {steps.map(({ num, Icon, title, line }) => (
            <div
              key={num}
              data-reveal-item
              className="card card-hover"
              style={{ padding: 26, position: "relative" }}
            >
              <div
                className="gradient-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 40,
                  lineHeight: 1,
                  fontWeight: 700,
                }}
              >
                {num}
              </div>

              <div
                style={{
                  marginTop: 10,
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "var(--gold-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={24} style={{ color: "var(--gold-deep)" }} />
              </div>

              <h3
                className="text-navy"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  marginTop: 16,
                  fontWeight: 600,
                }}
              >
                {title}
              </h3>
              <p className="text-body" style={{ marginTop: 6 }}>
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
