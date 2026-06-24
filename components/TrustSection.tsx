"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Radar,
  Banknote,
  Truck,
  Clock,
  IndianRupee,
} from "lucide-react";

type Stat = {
  to: number;
  suffix: string;
  label: string;
};

const STATS: Stat[] = [
  { to: 5000, suffix: "+", label: "Clients trusted" },
  { to: 200, suffix: "+", label: "Countries served" },
  { to: 1000, suffix: "+", label: "Shipments / month" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const duration = 1600;
            const start = performance.now();

            const tick = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(to * eased));
              if (t < 1) {
                requestAnimationFrame(tick);
              } else {
                setValue(to);
              }
            };

            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function TrustSection() {
  const chips = [
    { Icon: Radar, label: "Live tracking" },
    { Icon: Banknote, label: "COD available" },
    { Icon: Truck, label: "Doorstep pickup" },
    { Icon: Clock, label: "24×7 support" },
    { Icon: IndianRupee, label: "Transparent pricing" },
  ];

  return (
    <section className="section section-cream" id="about">
      <div className="container">
        <span className="eyebrow">Why Peeptoon</span>
        <h2 className="h-section" data-reveal style={{ marginTop: 16 }}>
          We don&apos;t just move parcels &mdash;{" "}
          <span className="gradient-text">we build trust</span>.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8 items-center">
          {/* LEFT */}
          <div data-reveal>
            <p className="lead">
              From local to international delivery, every shipment is handled
              with care and precision. Trusted by 5,000+ wholesalers, traders,
              manufacturers and dropshippers &mdash; with transparent pricing
              and no hidden fees.
            </p>
            <a
              href="#about"
              className="btn btn-ghost cursor-pointer"
              style={{ marginTop: 28 }}
            >
              About us
              <ArrowRight size={18} strokeWidth={1.75} />
            </a>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="card" style={{ padding: 22 }}>
                <div
                  className="text-navy"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 32,
                    fontWeight: 700,
                    lineHeight: 1.1,
                  }}
                >
                  <span className="text-gold">
                    <CountUp to={stat.to} suffix={stat.suffix} />
                  </span>
                </div>
                <div className="text-muted" style={{ marginTop: 6, fontSize: 14 }}>
                  {stat.label}
                </div>
              </div>
            ))}

            <div className="card" style={{ padding: 22 }}>
              <div
                className="text-navy"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                24<span className="text-gold">&times;</span>7
              </div>
              <div className="text-muted" style={{ marginTop: 6, fontSize: 14 }}>
                Customer support
              </div>
            </div>
          </div>
        </div>

        {/* TRUST CHIPS */}
        <div
          className="flex flex-wrap gap-3"
          data-reveal-group
          style={{ marginTop: 36 }}
        >
          {chips.map(({ Icon, label }) => (
            <span
              key={label}
              className="pill"
              data-reveal-item
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <Icon size={16} strokeWidth={1.75} className="text-gold-deep" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
