"use client";

import { useEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { MapPin, Globe2, Boxes } from "lucide-react";

const GEO = "/maps/world-110m.json";
const GOLD = "#d4af37";
const GOLD_DEEP = "#ad8520";

type City = { name: string; lat: number; lng: number; label?: boolean; hq?: boolean };
const CITIES: City[] = [
  { name: "Agartala · HQ", lat: 23.83, lng: 91.28, label: true, hq: true },
  { name: "Delhi", lat: 28.61, lng: 77.2, label: true },
  { name: "Mumbai", lat: 19.07, lng: 72.87, label: true },
  { name: "Kolkata", lat: 22.57, lng: 88.36, label: true },
  { name: "Chennai", lat: 13.08, lng: 80.27, label: true },
  { name: "Bengaluru", lat: 12.97, lng: 77.59, label: true },
  { name: "Hyderabad", lat: 17.38, lng: 78.49 },
  { name: "Ahmedabad", lat: 23.02, lng: 72.57 },
  { name: "Pune", lat: 18.52, lng: 73.85 },
  { name: "Jaipur", lat: 26.91, lng: 75.79 },
  { name: "Lucknow", lat: 26.85, lng: 80.95 },
  { name: "Guwahati", lat: 26.14, lng: 91.74 },
  { name: "Kochi", lat: 9.93, lng: 76.27 },
  { name: "Nagpur", lat: 21.15, lng: 79.09 },
  { name: "Surat", lat: 21.17, lng: 72.83 },
];

const HUBS = [
  { name: "Dubai", lng: 55.27, lat: 25.2 },
  { name: "Singapore", lng: 103.8, lat: 1.35 },
  { name: "London", lng: -0.12, lat: 51.5 },
  { name: "New York", lng: -74.0, lat: 40.71 },
];
const INDIA_C: [number, number] = [80, 22];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !done.current) {
            done.current = true;
            if (reduced) {
              setN(to);
              return;
            }
            const start = performance.now();
            const dur = 1700;
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(to * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {n.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const geoStyle = (india: boolean) => ({
  default: {
    fill: india ? "var(--gold-soft)" : "#efe9da",
    stroke: india ? GOLD : "#e2dac7",
    strokeWidth: india ? 0.9 : 0.4,
    outline: "none" as const,
  },
  hover: {
    fill: india ? "var(--gold-soft)" : "#efe9da",
    stroke: india ? GOLD : "#e2dac7",
    strokeWidth: india ? 0.9 : 0.4,
    outline: "none" as const,
  },
  pressed: { outline: "none" as const },
});

export default function Coverage() {
  return (
    <section id="coverage" className="section section-white">
      <div className="container">
        <header style={{ maxWidth: 680 }}>
          <span className="eyebrow" data-reveal>
            <Globe2 size={14} /> Coverage
          </span>
          <h2 className="h-section" data-reveal style={{ marginTop: 18 }}>
            Delivering <span className="gradient-text">everywhere you sell</span>.
          </h2>
          <p className="lead" data-reveal data-delay="0.1" style={{ marginTop: 16 }}>
            From the Northeast to every metro and to 200+ countries — one network, transparent
            per-kg pricing, doorstep pickup and live tracking.
          </p>
        </header>

        <div
          style={{ display: "grid", gridTemplateColumns: "minmax(0,1.45fr) minmax(0,1fr)", gap: 28, marginTop: 44 }}
          className="cov-grid"
        >
          {/* India map */}
          <div className="card" data-reveal style={{ padding: 18, overflow: "hidden" }}>
            <div style={{ position: "relative" }}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [82, 22.5], scale: 1080 }}
                width={560}
                height={560}
                style={{ width: "100%", height: "auto" }}
              >
                <Geographies geography={GEO}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={geoStyle(geo.properties.name === "India")}
                      />
                    ))
                  }
                </Geographies>
                {CITIES.map((c) => (
                  <Marker key={c.name} coordinates={[c.lng, c.lat]}>
                    {c.hq && (
                      <circle r={7} fill="none" stroke={GOLD} strokeWidth={1.4} className="pin-pulse" />
                    )}
                    <circle
                      r={c.hq ? 5.5 : 3.6}
                      fill={c.hq ? GOLD_DEEP : GOLD}
                      stroke="#fff"
                      strokeWidth={1.2}
                    />
                    {c.label && (
                      <text
                        textAnchor="middle"
                        y={-10}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: c.hq ? 10 : 8.5,
                          fontWeight: 700,
                          fill: "#15233b",
                          paintOrder: "stroke",
                          stroke: "#fff",
                          strokeWidth: 2.4,
                        }}
                      >
                        {c.name}
                      </text>
                    )}
                  </Marker>
                ))}
              </ComposableMap>
              <span
                className="pill pill-cream mono"
                style={{ position: "absolute", left: 6, bottom: 6, fontSize: 11, padding: "6px 12px" }}
              >
                <MapPin size={13} style={{ color: GOLD_DEEP }} /> Pan-India network
              </span>
            </div>
          </div>

          {/* stats + world inset */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              data-reveal-group
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
            >
              <div data-reveal-item className="card" style={{ padding: "22px 20px" }}>
                <div className="display" style={{ fontSize: 34 }}>
                  <CountUp to={35000} suffix="+" />
                </div>
                <div className="text-muted" style={{ fontSize: 13, marginTop: 4 }}>
                  Delivery points
                </div>
              </div>
              <div data-reveal-item className="card" style={{ padding: "22px 20px" }}>
                <div className="display" style={{ fontSize: 34 }}>
                  <CountUp to={19000} suffix="+" />
                </div>
                <div className="text-muted" style={{ fontSize: 13, marginTop: 4 }}>
                  Pin codes covered
                </div>
              </div>
            </div>

            <div data-reveal className="card card-cream" style={{ padding: 18 }}>
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}
              >
                <span className="mono text-gold" style={{ fontSize: 12, letterSpacing: "0.14em" }}>
                  INTERNATIONAL REACH
                </span>
                <span className="display text-navy" style={{ fontSize: 20 }}>
                  <CountUp to={200} suffix="+" /> countries
                </span>
              </div>
              <ComposableMap
                projection="geoEqualEarth"
                projectionConfig={{ scale: 96, center: [24, 14] }}
                width={440}
                height={220}
                style={{ width: "100%", height: "auto" }}
              >
                <Geographies geography={GEO}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={geoStyle(geo.properties.name === "India")}
                      />
                    ))
                  }
                </Geographies>
                {HUBS.map((h) => (
                  <Line
                    key={h.name}
                    from={INDIA_C}
                    to={[h.lng, h.lat]}
                    stroke={GOLD}
                    strokeWidth={1.1}
                    strokeLinecap="round"
                    style={{ opacity: 0.65 }}
                  />
                ))}
                {HUBS.map((h) => (
                  <Marker key={h.name} coordinates={[h.lng, h.lat]}>
                    <circle r={3} fill={GOLD_DEEP} stroke="#fff" strokeWidth={1} />
                  </Marker>
                ))}
                <Marker coordinates={INDIA_C}>
                  <circle r={4} fill={GOLD} stroke="#fff" strokeWidth={1.2} />
                </Marker>
              </ComposableMap>
              <div className="pill pill-cream" style={{ marginTop: 12, fontSize: 13 }}>
                <Boxes size={15} style={{ color: GOLD_DEEP }} /> International from ₹300/kg · 2-day delivery
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 880px) {
          .cov-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
