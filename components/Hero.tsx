"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Phone, PackageSearch, MessageCircle, ArrowDown } from "lucide-react";

const Drone3D = dynamic(() => import("@/components/Drone3D"), {
  ssr: false,
  loading: () => <div style={{ position: "absolute", inset: 0 }} />,
});

const CHIPS = ["International ₹300/kg", "B2B ₹5.5/kg", "Local Tripura ₹30 flat"];

export default function Hero() {
  useEffect(() => {
    const fire = () => window.dispatchEvent(new Event("resize"));
    fire();
    const t = [80, 300, 700, 1400].map((d) => setTimeout(fire, d));
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="home"
      style={{ minHeight: "100dvh", display: "flex", alignItems: "center", paddingTop: 130, paddingBottom: 50, position: "relative" }}
    >
      <div className="container" style={{ width: "100%" }}>
        {/* mono label row */}
        <div
          className="mono"
          data-reveal
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "clamp(26px, 4vw, 52px)",
          }}
        >
          <span>Pan-India + International Courier</span>
          <span className="hero-meta-right">Est. 2022 — Agartala</span>
        </div>

        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.1fr) minmax(0,0.9fr)",
            gap: 44,
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <div>
            <h1 className="h-hero">
              <span data-reveal style={{ display: "block" }}>
                Ship Smarter,
              </span>
              <span data-reveal data-delay="0.08" style={{ display: "block" }}>
                Faster &amp; <span className="gradient-text">Cheaper</span>.
              </span>
            </h1>

            <p data-reveal data-delay="0.16" className="lead" style={{ marginTop: 28, maxWidth: 480 }}>
              One click, one quote, big savings — Peeptoon moves your parcels across India and to
              200+ countries with live tracking, transparent per-kg pricing and same-day local
              delivery in Tripura.
            </p>

            <div data-reveal data-delay="0.24" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34 }}>
              <a href="https://track.peeptoon.com" target="_blank" rel="noreferrer" className="btn btn-primary">
                <PackageSearch size={16} /> Track Shipment
              </a>
              <a href="https://wa.me/918794152726" target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                <MessageCircle size={16} /> Book on WhatsApp
              </a>
            </div>

            <a
              href="tel:+917005364320"
              data-reveal
              data-delay="0.3"
              className="mono"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, marginTop: 26, textDecoration: "none", color: "var(--ink)", fontSize: 14, letterSpacing: "0.04em" }}
            >
              <Phone size={15} style={{ color: "var(--clay)" }} /> +91&nbsp;7005&nbsp;364&nbsp;320
            </a>

            <div data-reveal-group className="hero-stats" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 34 }}>
              {CHIPS.map((c) => (
                <span key={c} data-reveal-item className="pill mono" style={{ fontSize: 12 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--clay)", display: "inline-block" }} />
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — drone on warm panel */}
          <div className="hero-visual" style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", minHeight: 420 }}>
            <div
              style={{
                position: "absolute",
                inset: "4%",
                borderRadius: 22,
                background: "linear-gradient(160deg, var(--rose-soft), var(--surface))",
                border: "1px solid var(--border)",
              }}
            />
            <div className="dot-grid" style={{ inset: "4%", borderRadius: 22 }} />
            <div style={{ position: "absolute", inset: 0 }}>
              <Drone3D />
            </div>
            <div className="card animate-float" style={{ position: "absolute", top: "8%", left: "-3%", padding: "9px 13px" }}>
              <div className="mono text-gold" style={{ fontSize: 10, letterSpacing: "0.12em" }}>LIVE · IN-TRANSIT</div>
              <div className="display" style={{ fontSize: 14, color: "var(--ink)", marginTop: 3, textTransform: "none" }}>
                Agartala → Mumbai
              </div>
            </div>
            <div className="card animate-float" style={{ position: "absolute", bottom: "10%", right: "-3%", padding: "9px 13px", animationDelay: "-3s" }}>
              <div className="mono text-gold" style={{ fontSize: 10, letterSpacing: "0.12em" }}>INTERNATIONAL</div>
              <div className="display" style={{ fontSize: 14, color: "var(--ink)", marginTop: 3, textTransform: "none" }}>
                India → Dubai
              </div>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div
          className="mono"
          data-reveal
          data-delay="0.4"
          style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "clamp(28px, 4vw, 56px)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}
        >
          <ArrowDown size={14} /> Scroll to explore
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          .hero-meta-right {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
