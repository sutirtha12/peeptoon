import {
  Plane,
  Boxes,
  Package,
  FileText,
  ArrowUpRight,
  MapPin,
  Truck,
} from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "International",
    price: "₹300",
    unit: "/kg",
    note: null,
    description:
      "Door-to-door to 200+ countries in ~2 days, with zero paperwork on your side.",
  },
  {
    icon: Boxes,
    title: "B2B Parcel",
    price: "₹5.5",
    unit: "/kg",
    note: "15–70 kg",
    description: "Bulk business freight at India&apos;s lowest per-kg rates.",
  },
  {
    icon: Package,
    title: "B2C Parcel",
    price: "₹30",
    unit: "/kg",
    note: "up to 40 kg",
    description: "Reliable last-mile delivery to your customers&apos; doorstep.",
  },
  {
    icon: FileText,
    title: "Document",
    price: "Same-day",
    unit: "",
    note: null,
    description: "Tamper-proof, time-critical documents with proof of delivery.",
  },
];

export default function ServicesGrid() {
  return (
    <section className="section section-white" id="services">
      <div className="container">
        <span className="eyebrow">What we move</span>
        <h2 className="h-section" data-reveal>
          Every parcel. <span className="gradient-text">Every size.</span> Every
          route.
        </h2>
        <p className="lead" data-reveal data-delay="0.1">
          Transparent per-kg pricing — pay only for what you ship.
        </p>

        <div
          data-reveal-group
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                data-reveal-item
                key={service.title}
                className="card card-hover"
                style={{
                  padding: 26,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  minHeight: 280,
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 16,
                    background: "var(--gold-soft)",
                  }}
                >
                  <Icon size={26} strokeWidth={1.9} color="var(--gold-deep)" />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    lineHeight: 1.2,
                    color: "var(--ink)",
                    marginTop: 18,
                  }}
                >
                  {service.title}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="pill mono">
                    <span className="text-gold">{service.price}</span>
                    {service.unit}
                  </span>
                  {service.note ? (
                    <span
                      className="text-muted mono"
                      style={{ fontSize: 12 }}
                    >
                      {service.note}
                    </span>
                  ) : null}
                </div>

                <p
                  style={{
                    color: "var(--body)",
                    marginTop: 14,
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="group mono inline-flex items-center gap-1.5 cursor-pointer"
                  style={{
                    marginTop: "auto",
                    paddingTop: 20,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--gold-deep)",
                  }}
                >
                  Learn more
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            );
          })}
        </div>

        <div
          className="card"
          data-reveal
          style={{
            background: "var(--gold-soft)",
            padding: 28,
            marginTop: 24,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div>
            <div className="flex items-center gap-2.5">
              <MapPin size={24} strokeWidth={2.1} color="var(--gold-deep)" />
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  lineHeight: 1.2,
                  color: "var(--ink)",
                }}
              >
                Same-day across Tripura —{" "}
                <span className="text-gold">flat ₹30</span> per box
              </h3>
            </div>
            <p className="text-muted" style={{ marginTop: 8, fontSize: 14 }}>
              Home pickup &amp; delivery · COD available
            </p>
          </div>

          <a
            className="btn btn-gold"
            href="https://wa.me/918794152726"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Truck size={18} strokeWidth={2} />
            Book local pickup
          </a>
        </div>
      </div>
    </section>
  );
}
