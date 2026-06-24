import { Warehouse, PackageOpen, Workflow } from "lucide-react";

export default function SpecializedServices() {
  const services = [
    {
      Icon: Warehouse,
      title: "Warehouse Solution",
      description: "Storage & fulfilment from our Kolkata & Agartala hubs.",
      tags: ["Inventory", "Pick-pack-ship"],
    },
    {
      Icon: PackageOpen,
      title: "Packaging Solution",
      description:
        "Custom boxes & protective materials that cut volumetric cost.",
      tags: ["Custom boxes", "Protective"],
    },
    {
      Icon: Workflow,
      title: "Dropshipping Solution",
      description:
        "Connect your store via API or plugin — we fulfil every order.",
      tags: ["API & plugin", "Auto-fulfil"],
    },
  ];

  return (
    <section className="section section-cream" id="solutions">
      <div className="container">
        <span className="eyebrow">Beyond shipping</span>
        <h2 className="h-section" data-reveal>
          Solutions that{" "}
          <span className="gradient-text">scale with you</span>.
        </h2>
        <p className="lead" data-reveal data-delay="0.1">
          The operational backbone behind your orders.
        </p>

        <div
          data-reveal-group
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {services.map(({ Icon, title, description, tags }) => (
            <div
              key={title}
              data-reveal-item
              className="card card-hover"
              style={{ padding: 28, minHeight: 240 }}
            >
              <div
                className="flex items-center justify-center rounded-2xl"
                style={{
                  width: 54,
                  height: 54,
                  background: "var(--gold-soft)",
                }}
              >
                <Icon size={26} color="var(--gold-deep)" strokeWidth={2} />
              </div>

              <h3
                className="text-navy"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  fontWeight: 600,
                  marginTop: 18,
                }}
              >
                {title}
              </h3>

              <p className="text-body" style={{ marginTop: 8 }}>
                {description}
              </p>

              <div className="flex flex-wrap gap-2" style={{ marginTop: 18 }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="pill-cream mono"
                    style={{ fontSize: 12 }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
