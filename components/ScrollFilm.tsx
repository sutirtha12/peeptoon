"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, PackageOpen, ChevronDown } from "lucide-react";
import { SERVICES } from "@/lib/services";
import ServiceModal from "@/components/ServiceModal";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFilm() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const ctaLabelRef = useRef<HTMLSpanElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const spineRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);

  const durationRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const progressRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const seekingRef = useRef<boolean>(false);

  const [reduced, setReduced] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    if (!video || !wrapper || !stage) return;

    const mql = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    const prefersReduced = !!(mql && mql.matches);

    if (prefersReduced) {
      setReduced(true);
      try {
        video.loop = true;
        video.muted = true;
        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch (_) {
        /* no-op */
      }
      return;
    }

    video.pause();
    video.loop = false;

    // On phones the spine is laid out horizontally near the top and the first
    // frame is intentionally empty (cards only enter once you scroll in).
    const mqMobile = window.matchMedia("(max-width: 767px)");

    const handleLoadedMetadata = () => {
      if (!Number.isNaN(video.duration) && Number.isFinite(video.duration)) {
        durationRef.current = video.duration;
      }
      try {
        video.currentTime = 0;
      } catch (_) {
        /* no-op */
      }
      setTimeout(() => ScrollTrigger.refresh(), 60);
    };
    if (video.readyState >= 1 && video.duration) durationRef.current = video.duration;
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const onSeeked = () => {
      seekingRef.current = false;
    };
    video.addEventListener("seeked", onSeeked);

    const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

    // ── change-caches so we only touch the DOM when a value actually changes ──
    const segs = SERVICES.length;
    const lastPassed = new Array<number>(segs).fill(-1);
    const lastAria = new Array<number>(segs).fill(-1);
    let lastActive = -1;
    let lastFull = -1;
    let lastLabel = "";
    let lastHeadOp = -1;
    let lastIntroVis = -1;

    const applyOverlay = (progress: number) => {
      const denom = segs - 1;
      const mobile = mqMobile.matches;

      // Mobile: the entire opening frame is empty — heading, the horizontal
      // track/dots and the Track button all fade in only once you start
      // scrolling (full by ~6% progress). Desktop stays fully visible.
      const introVis = mobile ? clamp01(progress / 0.06) : 1;
      if (introVis !== lastIntroVis) {
        const v = String(introVis);
        if (headRef.current) headRef.current.style.opacity = v;
        if (spineRef.current) spineRef.current.style.opacity = v;
        // "Scroll to begin" hint — inverse of the intro fade.
        if (scrollHintRef.current) scrollHintRef.current.style.opacity = String(1 - introVis);
        lastIntroVis = introVis;
      }

      // Mobile: push every card centre into [LEAD, LEAD+SPAN] so the opening
      // frame shows NO card; cards fade in only after a little scroll.
      const LEAD = 0.14;
      const SPAN = 0.8;
      // trackProg drives the dots / fill / CTA so the line fills exactly as
      // each evenly-spaced dot is reached (and stays 0 through the empty lead).
      const trackProg = mobile ? clamp01((progress - LEAD) / SPAN) : progress;
      const win = (mobile ? 0.85 * SPAN : 0.85) / denom;

      for (let i = 0; i < segs; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const center = mobile ? LEAD + (i / denom) * SPAN : i / denom;
        const dist = Math.abs(progress - center) / win;
        const vis = clamp01(1 - dist);
        const eased = vis * vis * (3 - 2 * vis);
        const y = (1 - eased) * 26;
        // opacity + transform are continuous → GPU-composited, cheap to write
        el.style.opacity = eased < 0.001 ? "0" : eased.toFixed(3);
        el.style.transform = `translate3d(0,${y.toFixed(2)}px,0)`;
        const pe = eased > 0.5 ? 1 : 0;
        if (lastAria[i] !== pe) {
          el.style.pointerEvents = pe ? "auto" : "none";
          el.setAttribute("aria-hidden", pe ? "false" : "true");
          lastAria[i] = pe;
        }
      }

      const fill = fillRef.current;
      if (fill) {
        // horizontal track on mobile, vertical on desktop
        if (mobile) fill.style.width = `${(trackProg * 100).toFixed(2)}%`;
        else fill.style.height = `${(trackProg * 100).toFixed(2)}%`;
      }

      const activeIdx = Math.round(trackProg * denom);
      for (let i = 0; i < segs; i++) {
        const node = nodeRefs.current[i];
        if (!node) continue;
        const passed = trackProg >= i / denom - 0.0001 ? 1 : 0;
        if (lastPassed[i] !== passed) {
          node.setAttribute("data-passed", passed ? "true" : "false");
          lastPassed[i] = passed;
        }
      }
      if (activeIdx !== lastActive) {
        const prev = nodeRefs.current[lastActive];
        if (prev) prev.setAttribute("data-active", "false");
        const cur = nodeRefs.current[activeIdx];
        if (cur) cur.setAttribute("data-active", "true");
        lastActive = activeIdx;
      }

      const cta = ctaRef.current;
      if (cta) {
        cta.style.setProperty("--charge", trackProg.toFixed(3));
        const full = trackProg > 0.92 ? 1 : 0;
        if (lastFull !== full) {
          cta.setAttribute("data-full", full ? "true" : "false");
          lastFull = full;
        }
      }
      const ctaLabel = ctaLabelRef.current;
      if (ctaLabel) {
        const label = trackProg > 0.92 ? "Delivered — Track now" : "Track Shipment";
        if (label !== lastLabel) {
          ctaLabel.textContent = label;
          lastLabel = label;
        }
      }
    };

    // Single rAF drives both the smoothed video seek and the overlay. Seeks are
    // frame-paced (skip sub-frame deltas; never queue while a seek is pending)
    // so the decoder is never flooded — that's what keeps the scrub smooth.
    const SEEK_EPS = 0.033; // ~1 frame; avoids redundant same-frame seeks
    const tick = () => {
      const d = durationRef.current;
      if (d > 0 && video) {
        const target = targetTimeRef.current;
        currentTimeRef.current += (target - currentTimeRef.current) * 0.22;
        const next = currentTimeRef.current;
        if (!seekingRef.current && Math.abs(next - video.currentTime) > SEEK_EPS) {
          seekingRef.current = true;
          try {
            video.currentTime = next;
          } catch (_) {
            seekingRef.current = false;
          }
        }
      }
      applyOverlay(progressRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      pin: stage,
      pinSpacing: false,
      invalidateOnRefresh: true,
      // Keep onUpdate ultra-light: just record targets. The rAF tick above does
      // all the DOM/video work, so scroll events never block on rendering.
      onUpdate: (self) => {
        const p = self.progress;
        progressRef.current = p;
        const d = durationRef.current;
        if (d > 0) targetTimeRef.current = p * (d - 0.05);
      },
    });

    // Paint the correct initial overlay state right away (empty first frame on
    // mobile) without waiting for the first rAF tick.
    applyOverlay(progressRef.current);

    const onError = () => {
      st.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setReduced(true);
    };
    video.addEventListener("error", onError);
    const failTimer = window.setTimeout(() => {
      if (durationRef.current <= 0) onError();
    }, 6000);
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 80);

    return () => {
      st.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.clearTimeout(failTimer);
      window.clearTimeout(refreshTimer);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
    };
  }, []);

  const goToStage = (i: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const frac = i / (SERVICES.length - 1);
    const runway = Math.max(0, wrapper.offsetHeight - window.innerHeight);
    const targetY = Math.max(0, wrapper.offsetTop + frac * runway);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(targetY);
    else window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section id="journey" ref={sectionRef} className="sf-section">
      <div ref={wrapperRef} className="sf-wrapper" style={{ height: reduced ? "auto" : `${SERVICES.length * 84}vh` }}>
        <div
          ref={stageRef}
          className="sf-stage"
          style={reduced ? { height: "auto", overflow: "visible", position: "relative" } : undefined}
        >
          <video ref={videoRef} className="sf-video" muted playsInline preload="auto">
            <source src="/truck-scroll.mp4" type="video/mp4" />
          </video>

          <div className="sf-scrim" aria-hidden="true" />

          <div className="sf-head" ref={headRef}>
            <span className="mono sf-eyebrow">THE JOURNEY · 08 SERVICES</span>
            <h2 className="sf-title">Every parcel, scene by scene.</h2>
            <p className="sf-hint mono">Scroll the film · tap any card to open the box</p>
          </div>

          {/* clickable service cards */}
          <div className="sf-cards" data-reduced={reduced ? "true" : "false"}>
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  type="button"
                  className="sf-card"
                  style={reduced ? { opacity: 1, transform: "none", position: "relative" } : { opacity: i === 0 ? 1 : 0 }}
                  onClick={() => setSelected(i)}
                  aria-label={`Open ${s.title} details`}
                >
                  <span className="sf-card-fold" aria-hidden="true" />
                  <span className="sf-card-top">
                    <span className="sf-card-icon">
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <span className="mono sf-card-num">{s.num}</span>
                  </span>
                  <span className="sf-card-title">{s.title}</span>
                  <span className="sf-card-tagline">{s.tagline}</span>
                  <span className="sf-card-bottom">
                    <span className="mono sf-card-stat">{s.stat}</span>
                    <span className="sf-open">
                      <PackageOpen size={14} /> Open the box
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* progress spine + CTA */}
          {!reduced && (
            <div className="sf-spine" ref={spineRef}>
              <div className="sf-track">
                <div ref={fillRef} className="sf-fill" />
                <div className="sf-nodes">
                  {SERVICES.map((s, i) => (
                    <button
                      key={s.id}
                      ref={(el) => {
                        nodeRefs.current[i] = el;
                      }}
                      type="button"
                      className="sf-node"
                      data-passed={i === 0 ? "true" : "false"}
                      data-active={i === 0 ? "true" : "false"}
                      onClick={() => goToStage(i)}
                      aria-label={`Go to ${s.title}`}
                    >
                      <span className="sf-node-dot" />
                      <span className="mono sf-node-num">{s.num}</span>
                    </button>
                  ))}
                </div>
              </div>

              <a
                ref={ctaRef}
                href="https://track.peeptoon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="sf-cta"
                data-full="false"
                style={{ ["--charge" as string]: "0" }}
              >
                <span className="sf-cta-fill" aria-hidden="true" />
                <span ref={ctaLabelRef} className="sf-cta-label">
                  Track Shipment
                </span>
                <ArrowRight size={18} className="sf-cta-arrow" />
              </a>
            </div>
          )}

          {/* Scroll hint — shown on the empty mobile first frame */}
          <div className="sf-scrollhint" ref={scrollHintRef} aria-hidden="true">
            <span className="mono sf-scrollhint-label">Scroll to begin</span>
            <span className="sf-scrollhint-arrow">
              <ChevronDown size={18} strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </div>

      <ServiceModal service={selected != null ? SERVICES[selected] : null} onClose={() => setSelected(null)} />

      <style dangerouslySetInnerHTML={{ __html: `
        .sf-section { position: relative; background: var(--surface-2); color: var(--ink); }
        .sf-wrapper { position: relative; width: 100%; }
        .sf-stage { position: relative; height: 100dvh; width: 100%; overflow: hidden; background: #1c1813; }
        .sf-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; will-change: contents; }
        .sf-scrim {
          position: absolute; inset: 0; pointer-events: none;
          background:
            linear-gradient(105deg, rgba(241,232,218,0) 36%, rgba(241,232,218,0.5) 76%, rgba(241,232,218,0.84) 100%),
            linear-gradient(200deg, rgba(241,232,218,0) 44%, rgba(241,232,218,0.74) 100%);
        }

        .sf-head { position: absolute; top: clamp(28px, 6vh, 60px); left: clamp(20px, 5vw, 56px); z-index: 4; max-width: 60%; }
        .sf-eyebrow { font-size: 0.72rem; letter-spacing: 0.26em; color: var(--clay-deep); font-weight: 600; }
        .sf-title { margin: 10px 0 0; font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: -0.02em; line-height: 0.95; font-size: clamp(1.5rem, 3.4vw, 2.8rem); color: var(--ink); max-width: 13ch; }
        .sf-hint { margin-top: 12px; font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--clay); }

        .sf-cards { position: absolute; left: clamp(20px, 5vw, 56px); bottom: clamp(28px, 7vh, 64px); z-index: 5; width: min(380px, 86vw); height: clamp(214px, 32vh, 256px); }
        .sf-cards[data-reduced="true"] { position: relative; left: auto; bottom: auto; height: auto; width: min(440px, 92vw); margin: 0 auto; padding: 40px 0 64px; display: flex; flex-direction: column; gap: 18px; }

        .sf-card {
          position: absolute; inset: 0; text-align: left;
          display: flex; flex-direction: column; gap: 8px;
          background: rgba(250, 244, 233, 0.94);
          -webkit-backdrop-filter: blur(7px); backdrop-filter: blur(7px);
          border: 1px solid var(--border-2); border-radius: 18px;
          padding: 20px 22px; cursor: pointer; overflow: hidden;
          box-shadow: 0 20px 44px -26px rgba(28,24,19,0.6);
          will-change: opacity, transform;
          transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
          font-family: var(--font-sans);
        }
        .sf-card:hover { border-color: var(--clay); box-shadow: 0 26px 54px -24px rgba(194,85,58,0.5); }
        .sf-cards[data-reduced="true"] .sf-card { position: relative; inset: auto; opacity: 1 !important; transform: none !important; }
        /* corner fold cue (looks like a box flap you can open) */
        .sf-card-fold { position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: linear-gradient(225deg, var(--clay) 50%, transparent 50%); opacity: 0.9; border-top-right-radius: 18px; }
        .sf-card-top { display: flex; align-items: center; justify-content: space-between; }
        .sf-card-icon { width: 38px; height: 38px; border-radius: 11px; display: inline-flex; align-items: center; justify-content: center; color: #fff; background: linear-gradient(135deg, var(--clay), var(--clay-bright)); }
        .sf-card-num { font-size: 0.72rem; letter-spacing: 0.2em; color: var(--muted); }
        .sf-card-title { font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: -0.01em; font-size: 1.25rem; line-height: 1; color: var(--ink); }
        .sf-card-tagline { font-size: 0.9rem; line-height: 1.32; color: var(--body); flex: 1; }
        .sf-card-bottom { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 4px; }
        .sf-card-stat { font-size: 0.78rem; letter-spacing: 0.02em; color: var(--clay-deep); font-weight: 600; }
        .sf-open {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-mono); font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600;
          color: #fff; background: var(--clay); padding: 8px 13px; border-radius: 999px;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .sf-card:hover .sf-open { background: var(--clay-deep); transform: translateX(2px); }

        .sf-spine { position: absolute; top: 0; bottom: 0; right: clamp(16px, 3.4vw, 44px); z-index: 6; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 18px; padding-bottom: clamp(28px, 7vh, 64px); pointer-events: none; }
        .sf-track { position: relative; width: 2px; height: min(52vh, 460px); background: var(--border-2); border-radius: 2px; pointer-events: none; }
        .sf-fill { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 2px; height: 0%; background: linear-gradient(to bottom, var(--clay-bright), var(--clay)); border-radius: 2px; box-shadow: 0 0 10px -2px var(--clay); }
        .sf-nodes { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; align-items: center; }
        .sf-node { position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; background: transparent; border: none; padding: 0; margin: -12px 0; cursor: pointer; pointer-events: auto; z-index: 2; }
        .sf-node-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--surface); border: 2px solid var(--border-2); transition: transform 0.28s ease, background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease; }
        .sf-node[data-passed="true"] .sf-node-dot { background: var(--clay); border-color: var(--clay); }
        .sf-node[data-active="true"] .sf-node-dot { background: var(--clay-bright); border-color: var(--clay-bright); transform: scale(1.7); box-shadow: 0 0 0 4px rgba(194,85,58,0.22), 0 0 14px 2px rgba(194,85,58,0.55); }
        .sf-node-num { position: absolute; right: 150%; top: 50%; transform: translateY(-50%); font-size: 0.6rem; letter-spacing: 0.14em; color: var(--ink); opacity: 0; white-space: nowrap; transition: opacity 0.28s ease; font-weight: 600; }
        .sf-node[data-active="true"] .sf-node-num { opacity: 0.85; color: var(--clay-deep); }

        .sf-cta { position: relative; pointer-events: auto; display: inline-flex; align-items: center; gap: 8px; padding: 13px 20px; border-radius: 999px; overflow: hidden; border: 1px solid var(--clay); color: var(--clay-deep); background: rgba(250,244,233,0.94); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 600; text-decoration: none; cursor: pointer; white-space: nowrap; transition: color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease; }
        .sf-cta-fill { position: absolute; inset: 0; z-index: 0; background: linear-gradient(120deg, var(--clay), var(--clay-bright)); transform-origin: bottom center; transform: scaleY(calc(var(--charge, 0))); opacity: calc(0.25 + var(--charge, 0) * 0.75); transition: transform 0.12s linear, opacity 0.12s linear; }
        .sf-cta-label, .sf-cta-arrow { position: relative; z-index: 1; transition: color 0.3s ease, transform 0.3s ease; }
        .sf-cta[data-full="true"] { color: #fff; box-shadow: 0 0 0 4px rgba(194,85,58,0.2), 0 14px 34px -16px var(--clay-deep); }
        .sf-cta[data-full="true"] .sf-cta-arrow { transform: translateX(3px); }
        .sf-cta:hover { transform: translateY(-1px); }

        /* Scroll hint — hidden by default (driven to visible only on the
           empty mobile first frame via JS), bottom-centre with a bouncing arrow */
        .sf-scrollhint {
          position: absolute; left: 0; right: 0; bottom: clamp(30px, 8vh, 60px);
          z-index: 7; opacity: 0; pointer-events: none;
          display: none; flex-direction: column; align-items: center; gap: 7px;
        }
        .sf-scrollhint-label {
          font-size: 0.68rem; letter-spacing: 0.26em; text-transform: uppercase;
          font-weight: 600; color: var(--clay-deep);
          text-shadow: 0 1px 10px rgba(241,232,218,0.6);
        }
        .sf-scrollhint-arrow {
          display: flex; color: var(--clay);
          animation: sf-hintbounce 1.5s ease-in-out infinite;
        }
        @keyframes sf-hintbounce {
          0%, 100% { transform: translateY(0); opacity: 0.45; }
          50% { transform: translateY(6px); opacity: 1; }
        }

        /* ───────────────  MOBILE: horizontal track up top, small cards below  ─────────────── */
        @media (max-width: 767px) {
          /* show the scroll hint on the empty mobile first frame */
          .sf-scrollhint { display: flex; }
          /* heading stays top-left */
          .sf-head { max-width: 88%; left: 5vw; top: clamp(24px, 5vh, 48px); }
          .sf-title { max-width: 14ch; font-size: clamp(1.5rem, 7vw, 2.1rem); }
          .sf-hint { font-size: 0.62rem; margin-top: 8px; }

          /* progress track becomes HORIZONTAL, pinned near the top under the head */
          .sf-spine {
            top: clamp(162px, 24vh, 230px);
            left: 5vw; right: 5vw; bottom: auto;
            flex-direction: column; align-items: stretch; justify-content: flex-start;
            gap: 16px; padding-bottom: 0;
          }
          .sf-track { width: 100%; height: 2px; }
          .sf-fill {
            top: 0; left: 0; transform: none;
            height: 2px; width: 0%;
            background: linear-gradient(to right, var(--clay-bright), var(--clay));
          }
          .sf-nodes { flex-direction: row; }
          .sf-node { width: 28px; height: 28px; margin: 0 -14px; }
          .sf-node-num { display: none; }
          .sf-cta { align-self: flex-end; padding: 11px 16px; font-size: 0.64rem; }
          .sf-cta-fill { transform-origin: left center; transform: scaleX(calc(var(--charge, 0))); }

          /* smaller + shorter cards, anchored at the bottom */
          .sf-cards {
            width: min(320px, 84vw);
            left: 5vw; right: auto;
            bottom: clamp(24px, 5vh, 48px);
            height: clamp(158px, 23vh, 196px);
          }
          .sf-card { padding: 14px 16px; border-radius: 16px; gap: 5px; }
          .sf-card-fold { width: 24px; height: 24px; }
          .sf-card-icon { width: 32px; height: 32px; border-radius: 9px; }
          .sf-card-num { font-size: 0.66rem; }
          .sf-card-title { font-size: 1.05rem; }
          .sf-card-tagline { font-size: 0.8rem; line-height: 1.25; }
          .sf-card-stat { font-size: 0.72rem; }
          .sf-open { padding: 6px 10px; font-size: 0.58rem; }
        }

        @media (max-width: 400px) {
          .sf-head { max-width: 92%; top: clamp(20px, 4.5vh, 40px); }
          .sf-eyebrow { font-size: 0.64rem; letter-spacing: 0.2em; }
          .sf-title { font-size: clamp(1.35rem, 7.4vw, 1.8rem); }
          .sf-hint { font-size: 0.58rem; margin-top: 6px; }
          .sf-spine { top: clamp(142px, 22vh, 200px); }
          .sf-node { width: 24px; height: 24px; margin: 0 -12px; }
          .sf-cards { width: min(292px, 82vw); height: clamp(150px, 22vh, 182px); }
          .sf-card { padding: 12px 14px; }
          .sf-card-title { font-size: 0.98rem; }
          .sf-card-tagline { font-size: 0.76rem; }
          .sf-cta { padding: 10px 13px; font-size: 0.6rem; gap: 6px; }
        }
      ` }} />
    </section>
  );
}
