"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";
import { Truck, Package } from "lucide-react";

/* ── topojson ──────────────────────────────────────────────── */
const GEO = "/maps/world-110m.json";

/* ── pin data ──────────────────────────────────────────────── */
type Pin = {
  id: string;
  city: string;
  description: string;
  coords: [number, number]; // [lng, lat]
  hq?: boolean;
  international?: boolean;
};

const PINS: Pin[] = [
  // India
  { id: "agartala",   city: "Agartala",   description: "HQ — Est. 2022",       coords: [91.28, 23.83],  hq: true },
  { id: "delhi",      city: "Delhi",      description: "North India Hub",      coords: [77.20, 28.61] },
  { id: "mumbai",     city: "Mumbai",     description: "West India Hub",       coords: [72.87, 19.07] },
  { id: "kolkata",    city: "Kolkata",    description: "East India Hub",       coords: [88.36, 22.57] },
  { id: "chennai",    city: "Chennai",    description: "South India Hub",      coords: [80.27, 13.08] },
  { id: "bengaluru",  city: "Bengaluru",  description: "Regional Hub",         coords: [77.59, 12.97] },
  { id: "hyderabad",  city: "Hyderabad",  description: "Regional Hub",         coords: [78.49, 17.38] },
  { id: "guwahati",   city: "Guwahati",   description: "Northeast Gateway",    coords: [91.74, 26.14] },
  // International
  { id: "dubai",      city: "Dubai",      description: "International Partner", coords: [55.27, 25.20],  international: true },
  { id: "singapore",  city: "Singapore",  description: "International Partner", coords: [103.80, 1.35],  international: true },
  { id: "london",     city: "London",     description: "International Partner", coords: [-0.12, 51.50], international: true },
  { id: "newyork",    city: "New York",   description: "International Partner", coords: [-74.00, 40.71], international: true },
  { id: "tokyo",      city: "Tokyo",      description: "International Partner", coords: [139.69, 35.68], international: true },
  { id: "sydney",     city: "Sydney",     description: "International Partner", coords: [151.21, -33.87], international: true },
  { id: "frankfurt",  city: "Frankfurt",  description: "International Partner", coords: [8.68, 50.11],  international: true },
];

/* ── stats ─────────────────────────────────────────────────── */
type Stat = { to: number; suffix: string; label: string };
const STATS: Stat[] = [
  { to: 150000, suffix: "+", label: "Deliveries Completed" },
  { to: 19000,  suffix: "+", label: "Pin Codes Covered" },
  { to: 200,    suffix: "+", label: "Countries Reached" },
];

/* Deterministic Indian-style digit grouping — identical on server & client
   (Intl/toLocaleString can differ between Node and the browser → hydration error). */
function formatIN(num: number): string {
  const s = String(num);
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3;
}

/* ── CountUp ───────────────────────────────────────────────── */
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const reduced = window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches;
            if (reduced) {
              setValue(to);
              return;
            }
            const duration = 1700;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
              setValue(Math.round(to * eased));
              if (t < 1) requestAnimationFrame(tick);
              else setValue(to);
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
      {formatIN(value)}
      {suffix}
    </span>
  );
}

/* ── Tooltip ───────────────────────────────────────────────── */
function Tooltip({
  pin,
  position,
}: {
  pin: Pin;
  position: { x: number; y: number };
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -100%) translateY(-16px)",
        pointerEvents: "none",
        zIndex: 50,
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "14px 18px",
        boxShadow: "0 12px 36px -10px rgba(28,24,19,0.18)",
        minWidth: 160,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 15,
          color: "var(--ink)",
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
        }}
      >
        {pin.city}
      </div>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          color: "var(--muted)",
          marginTop: 3,
        }}
      >
        {pin.description}
      </div>
      {/* arrow */}
      <div
        style={{
          position: "absolute",
          bottom: -7,
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
          width: 12,
          height: 12,
          background: "#fff",
          borderRight: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      />
    </div>
  );
}

/* ── Pin icon (inline SVG for Truck/Package) ───────────────── */
function PinIcon({ international }: { international?: boolean }) {
  if (international) {
    return (
      <Package
        size={10}
        strokeWidth={2.4}
        color="#fff"
        style={{ display: "block" }}
      />
    );
  }
  return (
    <Truck
      size={10}
      strokeWidth={2.4}
      color="#fff"
      style={{ display: "block" }}
    />
  );
}

/* ── Main Component ────────────────────────────────────────── */
export default function DeliveryMap() {
  const [activePin, setActivePin] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // react-simple-maps projects paths with floating-point math that differs
  // slightly between Node (SSR) and the browser, causing hydration mismatches.
  // Render the map only after mount so the server never emits the SVG.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handlePinHover = useCallback(
    (pinId: string, event: React.MouseEvent) => {
      const container = mapContainerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      setTooltipPos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
      setActivePin(pinId);
    },
    []
  );

  const handlePinLeave = useCallback(() => {
    setActivePin(null);
  }, []);

  const activePinData = PINS.find((p) => p.id === activePin) ?? null;

  return (
    <section
      id="delivery-map"
      className="section"
      style={{ background: "var(--paper)" }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: `<style>
  .dm-pin { cursor: pointer; transition: transform 0.2s ease; }
  .dm-pin:hover { transform: scale(1.18); }
  @keyframes dm-pulse { 0% { r: 12; opacity: 0.55; } 100% { r: 28; opacity: 0; } }
  .dm-pulse-ring { animation: dm-pulse 2.4s ease-out infinite; }
  .dm-connection { stroke-dashoffset: 0; animation: dm-dash 30s linear infinite; }
  @keyframes dm-dash { to { stroke-dashoffset: -100; } }
  .dm-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  @media (max-width: 700px) {
    .dm-stats-grid { grid-template-columns: 1fr; gap: 12px; }
    #delivery-map header { margin-bottom: 28px !important; }
    /* give the world map more width by trimming the map-card padding */
    #delivery-map .card:not(.card-hover) { padding: 14px 8px 10px !important; }
    /* tighten the legend row so the three pills wrap cleanly */
    #delivery-map .dm-legend { gap: 8px !important; padding: 12px 4px 0 !important; }
    #delivery-map .dm-legend .pill { font-size: 10px !important; padding: 5px 10px !important; }
    #delivery-map .dm-stats-grid .card { padding: 22px 18px !important; }
  }
  @media (max-width: 420px) {
    #delivery-map .card:not(.card-hover) { padding: 10px 6px 8px !important; }
    #delivery-map .dm-stats-grid .card { padding: 18px 14px !important; }
  }
</style>`,
        }}
      />

      <div className="container">
        {/* Heading */}
        <header style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="eyebrow" data-reveal>
            Network
          </span>
          <h2
            className="h-section"
            data-reveal
            style={{ marginTop: 16, maxWidth: 720, marginInline: "auto" }}
          >
            Delivering Across{" "}
            <span className="gradient-text">The Globe</span>
          </h2>
        </header>

        {/* Map card */}
        <div
          ref={mapContainerRef}
          className="card"
          style={{
            position: "relative",
            padding: "24px 16px 16px",
            overflow: "hidden",
          }}
          data-reveal
        >
          {/* Tooltip */}
          {activePinData && (
            <Tooltip pin={activePinData} position={tooltipPos} />
          )}

          {!mounted ? (
            <div
              aria-hidden
              style={{ width: "100%", aspectRatio: "900 / 440", display: "block" }}
            />
          ) : (
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 155, center: [20, 10] }}
            width={900}
            height={440}
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            {/* Countries */}
            <Geographies geography={GEO}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#f3ece0",
                        stroke: "#ddd0bd",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "#ede5d5",
                        stroke: "#ddd0bd",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Connection lines from HQ — pinpoint network wires */}
            {PINS.filter((p) => !p.hq).map((pin) => (
              <Line
                key={`line-${pin.id}`}
                from={[91.28, 23.83]}
                to={pin.coords}
                stroke={pin.international ? "rgba(194,85,58,0.55)" : "rgba(28,24,19,0.32)"}
                strokeWidth={pin.international ? 1.3 : 1}
                strokeLinecap="round"
                strokeDasharray="5 4"
                className="dm-connection"
              />
            ))}

            {/* Pin markers */}
            {PINS.map((pin) => {
              const isHQ = pin.hq;
              const pinRadius = isHQ ? 11 : 8;

              return (
                <Marker key={pin.id} coordinates={pin.coords}>
                  {/* HQ pulse ring */}
                  {isHQ && (
                    <circle
                      r={14}
                      fill="none"
                      stroke="#1c1813"
                      strokeWidth={1.2}
                      opacity={0.4}
                      className="dm-pulse-ring"
                    />
                  )}

                  {/* Dark circle body */}
                  <circle
                    r={pinRadius}
                    fill="#1c1813"
                    stroke="var(--paper)"
                    strokeWidth={2}
                    className="dm-pin"
                    onMouseEnter={(e) => handlePinHover(pin.id, e)}
                    onMouseLeave={handlePinLeave}
                  />

                  {/* White icon inside — using foreignObject for lucide */}
                  <foreignObject
                    x={isHQ ? -6 : -5}
                    y={isHQ ? -6 : -5}
                    width={isHQ ? 12 : 10}
                    height={isHQ ? 12 : 10}
                    style={{ pointerEvents: "none", overflow: "visible" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <PinIcon international={pin.international} />
                    </div>
                  </foreignObject>
                </Marker>
              );
            })}
          </ComposableMap>
          )}

          {/* Map legend */}
          <div
            className="dm-legend"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "10px 8px 0",
              flexWrap: "wrap",
            }}
          >
            <span
              className="pill pill-cream mono"
              style={{ fontSize: 11, padding: "5px 12px", gap: 6 }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#1c1813",
                  border: "1.5px solid var(--border)",
                }}
              />
              India Hubs
            </span>
            <span
              className="pill pill-cream mono"
              style={{ fontSize: 11, padding: "5px 12px", gap: 6 }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#1c1813",
                  border: "1.5px solid var(--clay)",
                }}
              />
              International
            </span>
            <span
              className="pill pill-cream mono"
              style={{ fontSize: 11, padding: "5px 12px", gap: 6 }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#1c1813",
                  border: "2px solid var(--clay)",
                  position: "relative",
                }}
              />
              HQ — Agartala
            </span>
          </div>
        </div>

        {/* Stats bar */}
        <div className="dm-stats-grid" style={{ marginTop: 28 }}>
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="card card-hover"
              style={{
                padding: "28px 24px",
                textAlign: "center",
              }}
              data-reveal
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  lineHeight: 1,
                  color: "var(--clay)",
                  letterSpacing: "-0.02em",
                }}
              >
                <CountUp to={stat.to} suffix={stat.suffix} />
              </div>
              <div
                className="text-muted mono"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  marginTop: 10,
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
