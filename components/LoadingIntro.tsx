"use client";

import { useEffect, useState } from "react";

/* Route waypoints the truck blasts through, 0 → 100 */
const STOPS = [
  { at: 0, code: "AGT", name: "Agartala" },
  { at: 25, code: "CCU", name: "Kolkata" },
  { at: 50, code: "DEL", name: "Delhi" },
  { at: 75, code: "DXB", name: "Dubai" },
  { at: 100, code: "WORLD", name: "200+ Nations" },
];

function legFor(n: number) {
  if (n < 20) return "Dispatching · Agartala";
  if (n < 45) return "En route · Kolkata";
  if (n < 70) return "En route · Delhi";
  if (n < 96) return "Crossing borders · Dubai";
  return "Delivered · 200+ Nations";
}

export default function LoadingIntro() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false); // curtain split + content fade
  const [gone, setGone] = useState(false); // unmount

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(100);
      setDone(true);
      const t = setTimeout(() => setGone(true), 280);
      return () => clearTimeout(t);
    }

    const start = performance.now();
    const dur = 1350; // super fast run
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      // easeOutQuad — the truck zips across fast, then decelerates into its stop
      const eased = 1 - (1 - p) * (1 - p);
      setN(Math.round(100 * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setDone(true), 360); // hold on "Delivered"
        setTimeout(() => setGone(true), 1500); // after curtain split
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;

  const moving = n < 100 && !done;
  const panelEase = "transform 1.05s cubic-bezier(0.76, 0, 0.24, 1)";

  return (
    <div className="li-root" aria-hidden>
      {/* curtain — top */}
      <div
        className="li-curtain"
        style={{
          top: 0,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          transform: done ? "translateY(-100%)" : "translateY(0)",
          transition: panelEase,
        }}
      />
      {/* curtain — bottom */}
      <div
        className="li-curtain"
        style={{
          bottom: 0,
          transform: done ? "translateY(100%)" : "translateY(0)",
          transition: panelEase,
        }}
      />

      {/* content */}
      <div className="li-stage" style={{ opacity: done ? 0 : 1, transition: "opacity 0.32s ease" }}>
        {/* top bar */}
        <div className="li-bar mono">
          <span>Peeptoon</span>
          <span className="li-hide-sm">Est. 2022 — Agartala</span>
        </div>

        {/* center block */}
        <div className="li-center">
          {/* counter */}
          <div className="li-count">
            <span className="li-num">{String(n).padStart(2, "0")}</span>
            <span className="li-pct">%</span>
          </div>
          <div className="li-leg mono">{legFor(n)}</div>

          {/* ROUTE */}
          <div className="li-route">
            {/* base + trail */}
            <div className="li-rail">
              <div className="li-lane" data-moving={moving ? "true" : "false"} />
              <div className="li-trail" style={{ width: `${n}%` }} />
            </div>

            {/* waypoint dots */}
            <div className="li-stops">
              {STOPS.map((s) => {
                const passed = n >= s.at - 0.5;
                return (
                  <span
                    key={s.code}
                    className="li-stop"
                    data-passed={passed ? "true" : "false"}
                    style={{ left: `${s.at}%` }}
                  >
                    <span className="li-stop-dot" />
                  </span>
                );
              })}
            </div>

            {/* the truck */}
            <div
              className="li-truckwrap"
              style={{ left: `${n}%`, transform: `translateX(-${n}%)` }}
            >
              {/* speed streaks */}
              <span className="li-streaks" data-moving={moving ? "true" : "false"}>
                <i style={{ top: "30%", width: 26, animationDelay: "0ms" }} />
                <i style={{ top: "52%", width: 38, animationDelay: "90ms" }} />
                <i style={{ top: "72%", width: 20, animationDelay: "180ms" }} />
              </span>
              <img
                src="/truck-cutout.png?v=3"
                alt=""
                className="li-truck"
                data-moving={moving ? "true" : "false"}
                draggable={false}
              />
            </div>

            {/* anchor labels */}
            <div className="li-ends mono">
              <span data-passed="true">AGARTALA</span>
              <span data-passed={n >= 99 ? "true" : "false"}>200+ NATIONS</span>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="li-bar mono">
          <span>{n >= 100 ? "Delivered" : "Loading"}</span>
          <span>Pan-India + International</span>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .li-root { position: fixed; inset: 0; z-index: 200; pointer-events: none; }
        .li-curtain { position: absolute; left: 0; right: 0; height: 50%; background: #0d0b09; }

        .li-stage {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; justify-content: space-between;
          padding: clamp(20px, 5vw, 56px);
        }
        .li-bar {
          display: flex; justify-content: space-between;
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(245,238,228,0.5);
        }

        .li-center {
          flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: clamp(14px, 2.6vw, 24px);
        }

        /* counter */
        .li-count { display: flex; align-items: flex-start; line-height: 0.8; }
        .li-num {
          font-family: var(--font-display); font-weight: 900;
          font-size: clamp(4.6rem, 20vw, 15rem);
          letter-spacing: -0.05em; color: #f3ece0;
          font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1;
        }
        .li-pct {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(1.2rem, 4.6vw, 3.2rem);
          color: var(--clay-bright); margin-top: 0.35em; margin-left: 0.12em;
        }
        .li-leg {
          font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--clay-bright); height: 1.2em;
        }

        /* route */
        .li-route { position: relative; width: min(560px, 86vw); margin-top: clamp(8px, 2vw, 18px); }
        .li-rail {
          position: relative; height: 3px; border-radius: 3px;
          background: rgba(255,255,255,0.14); overflow: hidden;
        }
        .li-trail {
          position: absolute; inset: 0 auto 0 0; height: 100%;
          background: linear-gradient(90deg, var(--clay), var(--clay-bright));
          border-radius: 3px; box-shadow: 0 0 18px 0 rgba(213,107,77,0.7);
        }
        /* scrolling lane dashes for a sense of speed */
        .li-lane {
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(90deg,
            rgba(255,255,255,0.85) 0 10px, transparent 10px 22px);
          opacity: 0.0;
          mix-blend-mode: overlay;
        }
        .li-lane[data-moving="true"] { opacity: 0.9; animation: li-lane 0.5s linear infinite; }
        @keyframes li-lane { to { background-position-x: -22px; } }

        /* waypoint dots */
        .li-stops { position: absolute; inset: 0; }
        .li-stop {
          position: absolute; top: 50%; width: 0; height: 0;
        }
        .li-stop-dot {
          position: absolute; left: -5px; top: -5px; width: 10px; height: 10px;
          border-radius: 50%; background: #0d0b09;
          border: 2px solid rgba(255,255,255,0.28);
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .li-stop[data-passed="true"] .li-stop-dot {
          background: var(--clay-bright); border-color: var(--clay-bright);
          transform: scale(1.25);
          box-shadow: 0 0 0 4px rgba(213,107,77,0.22);
        }

        /* truck */
        .li-truckwrap { position: absolute; bottom: 1px; will-change: left, transform; }
        .li-truck {
          display: block; width: clamp(58px, 13vw, 82px); max-width: none; height: auto;
          transform-origin: bottom center;
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.6));
          image-rendering: -webkit-optimize-contrast;
        }
        .li-truck[data-moving="true"] { animation: li-bob 0.28s ease-in-out infinite; }
        @keyframes li-bob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-1px) rotate(-0.5deg); }
          75% { transform: translateY(0.5px) rotate(0.4deg); }
        }

        /* speed streaks trailing the truck */
        .li-streaks { position: absolute; right: 88%; bottom: 18%; height: 60%; width: 60px; pointer-events: none; opacity: 0; }
        .li-streaks[data-moving="true"] { opacity: 1; }
        .li-streaks i {
          position: absolute; right: 0; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, transparent, var(--clay-bright));
        }
        .li-streaks[data-moving="true"] i { animation: li-streak 0.42s linear infinite; }
        @keyframes li-streak {
          0% { transform: translateX(8px) scaleX(0.3); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateX(-22px) scaleX(1); opacity: 0; }
        }

        /* end anchor labels */
        .li-ends {
          position: absolute; top: calc(100% + 12px); left: 0; right: 0;
          display: flex; justify-content: space-between;
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(245,238,228,0.4);
        }
        .li-ends span { transition: color 0.3s ease; }
        .li-ends span[data-passed="true"] { color: var(--clay-bright); }

        @media (max-width: 560px) {
          .li-hide-sm { display: none; }
          .li-leg { font-size: 11px; letter-spacing: 0.18em; }
          .li-ends { font-size: 9px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .li-truck[data-moving="true"], .li-lane[data-moving="true"], .li-streaks[data-moving="true"] i { animation: none; }
        }
      `,
        }}
      />
    </div>
  );
}
