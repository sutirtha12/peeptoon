"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Truck, Menu, X, ArrowRight, MapPin } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Coverage", href: "#coverage" },
  { label: "Tracking", href: "#tracking" },
  { label: "Contact", href: "#contact" },
];

const WA_LINK = "https://wa.me/918794152726";
const TRACK_LINK = "https://track.peeptoon.com";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const journey = document.getElementById("journey");
      if (journey) {
        const end = journey.offsetTop + journey.offsetHeight - window.innerHeight - 4;
        setRevealed(window.scrollY >= end);
      } else {
        setRevealed(true);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="nav-header" data-scrolled={scrolled} data-revealed={revealed}>
      <div className="container" style={{ position: "relative" }}>
        <nav className="nav-bar">
          {/* LEFT — logo */}
          <a href="#home" onClick={() => setOpen(false)} className="nav-logo">
            <span className="nav-logo-icon">
              <Truck size={18} strokeWidth={2} />
            </span>
            <span className="nav-logo-text">
              Peep<span className="gradient-text">toon</span>
            </span>
            <span className="nav-badge mono">
              <MapPin size={9} strokeWidth={2.5} />
              Agartala
            </span>
          </a>

          {/* CENTER — nav links */}
          <div className="nav-links hidden lg:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </div>

          {/* RIGHT — CTAs */}
          <div className="nav-right">
            <span className="hidden sm:inline-flex" style={{ alignItems: "center", gap: 8 }}>
              <a href={TRACK_LINK} target="_blank" rel="noreferrer" className="nav-cta-track">
                <span className="nav-cta-dot" />
                Track
                <ArrowRight size={14} strokeWidth={2.5} />
              </a>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="nav-cta-wa">
                <MessageCircle size={16} strokeWidth={2} />
                WhatsApp
              </a>
            </span>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="nav-burger lg:hidden"
            >
              {open ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div className={`nav-mobile lg:hidden ${open ? "nav-mobile--open" : ""}`}>
          <div className="nav-mobile-inner">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="nav-mobile-link">
                {l.label}
              </a>
            ))}
            <div className="nav-mobile-ctas">
              <a href={TRACK_LINK} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="nav-cta-track" style={{ flex: 1, justifyContent: "center" }}>
                Track <ArrowRight size={14} strokeWidth={2.5} />
              </a>
              <a href={WA_LINK} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="nav-cta-wa" style={{ flex: 1, justifyContent: "center" }}>
                <MessageCircle size={16} strokeWidth={2} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .nav-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 60;
          transform: translateY(-115%);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.6s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.5s ease;
        }
        .nav-header[data-revealed="true"] {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 12px;
          padding: 8px 8px 8px 20px;
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(20px) saturate(1.4);
          -webkit-backdrop-filter: blur(20px) saturate(1.4);
          border: 1px solid rgba(28,24,19,0.06);
          border-radius: 18px;
          box-shadow: 0 8px 32px -8px rgba(28,24,19,0.1), 0 1px 2px rgba(28,24,19,0.04);
          transition: margin-top 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .nav-header[data-scrolled="true"] .nav-bar {
          margin-top: 6px;
          background: rgba(255,255,255,0.92);
          box-shadow: 0 12px 40px -8px rgba(28,24,19,0.14), 0 1px 3px rgba(28,24,19,0.06);
        }

        /* Logo */
        .nav-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px; height: 34px;
          border-radius: 10px;
          background: var(--ink);
          color: var(--clay-bright);
          transition: transform 0.3s ease;
        }
        .nav-logo:hover .nav-logo-icon { transform: rotate(-6deg) scale(1.08); }
        .nav-logo-text {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.01em;
          line-height: 1;
        }
        .nav-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 9px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          background: rgba(28,24,19,0.04);
          border: 1px solid rgba(28,24,19,0.06);
          padding: 3px 8px;
          border-radius: 6px;
          font-weight: 600;
        }

        /* Links */
        .nav-links {
          align-items: center;
          gap: 6px;
        }
        .nav-link {
          position: relative;
          font-size: 14px;
          font-weight: 500;
          color: var(--body);
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 10px;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .nav-link:hover {
          color: var(--ink);
          background: rgba(28,24,19,0.04);
        }

        /* Right CTAs */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .nav-cta-track {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--ink);
          background: rgba(28,24,19,0.04);
          border: 1px solid rgba(28,24,19,0.08);
          padding: 10px 16px;
          border-radius: 12px;
          transition: all 0.25s ease;
        }
        .nav-cta-track:hover {
          background: var(--ink);
          color: #fff;
          border-color: var(--ink);
        }
        .nav-cta-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 2px rgba(34,197,94,0.2);
          animation: nav-pulse 2s ease-in-out infinite;
        }
        @keyframes nav-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .nav-cta-wa {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          color: #fff;
          background: #25d366;
          padding: 10px 18px;
          border-radius: 12px;
          border: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px -4px rgba(37,211,102,0.4);
        }
        .nav-cta-wa:hover {
          background: #1eb954;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px -4px rgba(37,211,102,0.5);
        }

        /* Burger */
        .nav-burger {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px; height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(28,24,19,0.08);
          background: rgba(28,24,19,0.03);
          color: var(--ink);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-burger:hover {
          background: var(--ink);
          color: #fff;
        }

        /* Mobile menu */
        .nav-mobile {
          position: absolute;
          left: clamp(20px, 5vw, 44px);
          right: clamp(20px, 5vw, 44px);
          top: 100%;
          margin-top: 8px;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transform: translateY(-6px);
          pointer-events: none;
          transition: max-height 0.36s ease, opacity 0.28s ease, transform 0.28s ease;
        }
        .nav-mobile--open {
          max-height: 520px;
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .nav-mobile-inner {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(28,24,19,0.06);
          border-radius: 18px;
          padding: 12px;
          box-shadow: 0 16px 48px -12px rgba(28,24,19,0.16);
        }
        .nav-mobile-link {
          display: block;
          padding: 14px 16px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          color: var(--ink);
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .nav-mobile-link:hover { background: rgba(28,24,19,0.04); }
        .nav-mobile-ctas {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          padding-top: 12px;
          border-top: 1px solid rgba(28,24,19,0.06);
        }

        /* Tablet / mobile: tighten bar padding + gaps */
        @media (max-width: 1024px) {
          .nav-bar {
            gap: 10px;
            padding: 8px 8px 8px 16px;
          }
        }

        /* Phones */
        @media (max-width: 560px) {
          .nav-bar {
            gap: 8px;
            padding: 7px 7px 7px 14px;
          }
          .nav-logo { gap: 8px; }
          .nav-logo-icon { width: 32px; height: 32px; }
          .nav-logo-text { font-size: 18px; }
          .nav-mobile-ctas .nav-cta-track,
          .nav-mobile-ctas .nav-cta-wa {
            padding-left: 10px;
            padding-right: 10px;
          }
        }

        /* Small phones: hide locale badge so the lockup + burger stay on one line */
        @media (max-width: 430px) {
          .nav-badge { display: none; }
        }

        @media (max-width: 400px) {
          .nav-bar {
            gap: 6px;
            padding: 6px 6px 6px 12px;
          }
          .nav-logo-icon { width: 30px; height: 30px; }
          .nav-logo-text { font-size: 17px; }
          .nav-mobile-ctas { gap: 6px; }
          .nav-mobile-ctas .nav-cta-track,
          .nav-mobile-ctas .nav-cta-wa {
            font-size: 11px;
            padding-left: 8px;
            padding-right: 8px;
            gap: 5px;
          }
        }
      `}} />
    </header>
  );
}
