"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, MapPin, PackageCheck } from "lucide-react";
import type { Service } from "@/lib/services";

type Props = { service: Service | null; onClose: () => void };

export default function ServiceModal({ service, onClose }: Props) {
  // Internal copy of the service so the EXIT animation stays visible
  // after the parent sets `service` back to null.
  const [active, setActive] = useState<Service | null>(null);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const flapTopRef = useRef<HTMLDivElement | null>(null);
  const flapBottomRef = useRef<HTMLDivElement | null>(null);
  const flapLeftRef = useRef<HTMLDivElement | null>(null);
  const flapRightRef = useRef<HTMLDivElement | null>(null);
  const panelARef = useRef<HTMLDivElement | null>(null);
  const panelBRef = useRef<HTMLDivElement | null>(null);
  const connectorRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const closingRef = useRef(false);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // ---- finish the exit: clear internal state + tell parent ----
  const finishClose = () => {
    closingRef.current = false;
    setActive(null);
    onClose();
    try {
      prevFocusRef.current?.focus({ preventScroll: true });
    } catch {}
  };

  // ---- run the reverse animation, then finishClose() ----
  const playOut = () => {
    if (closingRef.current) return;
    closingRef.current = true;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // restore page scroll the instant we begin closing
    try {
      (window as any).__lenis?.start?.();
    } catch {}
    document.body.style.overflow = "";

    tlRef.current?.kill();

    if (reduce) {
      gsap.to(rootRef.current, {
        autoAlpha: 0,
        duration: 0.22,
        ease: "power1.in",
        onComplete: finishClose,
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.in" }, onComplete: finishClose });
    tl.to([panelARef.current, panelBRef.current], {
      scaleY: 0,
      autoAlpha: 0,
      duration: 0.3,
      transformOrigin: "top center",
    })
      .to(connectorRef.current, { autoAlpha: 0, scale: 0.6, duration: 0.22 }, "<")
      .to(
        flapTopRef.current,
        { rotateX: 0, duration: 0.34, ease: "power2.inOut" },
        "-=0.12"
      )
      .to(flapBottomRef.current, { rotateX: 0, duration: 0.34, ease: "power2.inOut" }, "<")
      .to(flapLeftRef.current, { rotateY: 0, duration: 0.34, ease: "power2.inOut" }, "<")
      .to(flapRightRef.current, { rotateY: 0, duration: 0.34, ease: "power2.inOut" }, "<")
      .to(boxRef.current, { scale: 0.85, autoAlpha: 0, duration: 0.26 }, "-=0.1")
      .to(scrimRef.current, { autoAlpha: 0, duration: 0.28 }, "<");
    tlRef.current = tl;
  };

  // ---- when prop service becomes non-null: adopt it + play IN ----
  useEffect(() => {
    if (service) {
      closingRef.current = false;
      setActive(service);
    } else if (active && !closingRef.current) {
      // prop went null while we were open (parent-driven close)
      playOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  // ---- OPEN choreography + scroll lock + a11y wiring ----
  useEffect(() => {
    if (!active) return;

    // cancel any in-flight exit timeline (rapid open -> close -> open)
    tlRef.current?.kill();
    // remember what to refocus when we close
    prevFocusRef.current =
      (document.activeElement as HTMLElement) || prevFocusRef.current;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // background scroll lock
    try {
      (window as any).__lenis?.stop?.();
    } catch {}
    document.body.style.overflow = "hidden";

    // focus the close button for keyboard users
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 60);

    const ctx = gsap.context(() => {
      gsap.set(rootRef.current, { autoAlpha: 1 });

      if (reduce) {
        // reduced motion: skip the flap choreography — fade everything in
        gsap.set(
          [
            flapTopRef.current,
            flapBottomRef.current,
            flapLeftRef.current,
            flapRightRef.current,
          ],
          { rotateX: 0, rotateY: 0, autoAlpha: 0 }
        );
        gsap.set(boxRef.current, { autoAlpha: 0 });
        gsap.fromTo(
          scrimRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.25 }
        );
        gsap.fromTo(
          [panelARef.current, panelBRef.current, connectorRef.current],
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.04, delay: 0.05 }
        );
        return;
      }

      // initial states
      gsap.set(scrimRef.current, { autoAlpha: 0 });
      gsap.set(boxRef.current, { autoAlpha: 0, scale: 0.7, rotateZ: -3 });
      gsap.set(flapTopRef.current, { rotateX: 0, transformOrigin: "top center" });
      gsap.set(flapBottomRef.current, { rotateX: 0, transformOrigin: "bottom center" });
      gsap.set(flapLeftRef.current, { rotateY: 0, transformOrigin: "left center" });
      gsap.set(flapRightRef.current, { rotateY: 0, transformOrigin: "right center" });
      gsap.set([panelARef.current, panelBRef.current], {
        scaleY: 0,
        autoAlpha: 0,
        transformOrigin: "top center",
      });
      gsap.set(connectorRef.current, { autoAlpha: 0, scale: 0.6 });

      const items = stageRef.current
        ? stageRef.current.querySelectorAll<HTMLElement>("[data-li]")
        : [];
      gsap.set(items, { autoAlpha: 0, x: -10 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(scrimRef.current, { autoAlpha: 1, duration: 0.3 })
        .to(
          boxRef.current,
          { autoAlpha: 1, scale: 1, rotateZ: 0, duration: 0.5, ease: "back.out(1.5)" },
          "-=0.1"
        )
        // FLAPS BURST OPEN — fling past 90deg with an overshoot
        .to(
          flapTopRef.current,
          { rotateX: -122, duration: 0.62, ease: "back.out(1.4)" },
          "flap"
        )
        .to(
          flapBottomRef.current,
          { rotateX: 122, duration: 0.62, ease: "back.out(1.4)" },
          "flap"
        )
        .to(
          flapLeftRef.current,
          { rotateY: 122, duration: 0.62, ease: "back.out(1.4)" },
          "flap"
        )
        .to(
          flapRightRef.current,
          { rotateY: -122, duration: 0.62, ease: "back.out(1.4)" },
          "flap"
        )
        // BOTH connected boxes open AT THE SAME TIME
        .to(
          [panelARef.current, panelBRef.current],
          { scaleY: 1, autoAlpha: 1, duration: 0.5, ease: "power3.out" },
          "reveal-=0.18"
        )
        // the tape-bridge connector snaps in over the gap
        .to(
          connectorRef.current,
          { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
          "reveal+=0.1"
        )
        // list items stagger in after their containers exist
        .to(
          items,
          { autoAlpha: 1, x: 0, duration: 0.34, stagger: 0.045, ease: "power2.out" },
          "reveal+=0.14"
        );
      tlRef.current = tl;
    }, rootRef);

    return () => {
      window.clearTimeout(focusTimer);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // ---- Escape to close ----
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        playOut();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // ---- cleanup on unmount ----
  useEffect(() => {
    return () => {
      tlRef.current?.kill();
      try {
        (window as any).__lenis?.start?.();
      } catch {}
      document.body.style.overflow = "";
    };
  }, []);

  if (!active) return null;

  const Icon = active.icon;

  return (
    <div
      ref={rootRef}
      className="svm2-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="svm2-title"
      aria-describedby="svm2-tagline"
      style={{ visibility: "hidden" }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div
        ref={scrimRef}
        className="svm2-scrim"
        aria-hidden="true"
        onClick={playOut}
      />

      <div className="svm2-center" ref={stageRef}>
        {/* The kraft box that opens. The opened panels live INSIDE it. */}
        <div ref={boxRef} className="svm2-box">
          {/* four kraft flaps with washi tape across each seam */}
          <div ref={flapTopRef} className="svm2-flap svm2-flap--top" aria-hidden="true">
            <span className="svm2-tape svm2-tape--h" />
          </div>
          <div
            ref={flapBottomRef}
            className="svm2-flap svm2-flap--bottom"
            aria-hidden="true"
          >
            <span className="svm2-tape svm2-tape--h" />
          </div>
          <div
            ref={flapLeftRef}
            className="svm2-flap svm2-flap--left"
            aria-hidden="true"
          >
            <span className="svm2-tape svm2-tape--v" />
          </div>
          <div
            ref={flapRightRef}
            className="svm2-flap svm2-flap--right"
            aria-hidden="true"
          >
            <span className="svm2-tape svm2-tape--v" />
          </div>

          {/* dark interior of the box, revealed as flaps open */}
          <div className="svm2-interior">
            {/* HEADER */}
            <header className="svm2-header">
              <div className="svm2-tile" aria-hidden="true">
                <Icon size={26} strokeWidth={1.75} />
              </div>
              <div className="svm2-head-text">
                <span className="svm2-num">{active.num}</span>
                <h2 id="svm2-title" className="svm2-title">
                  {active.title}
                </h2>
                <p id="svm2-tagline" className="svm2-tagline">
                  {active.tagline}
                </p>
              </div>
              <span className="svm2-stat" aria-hidden="false">
                {active.stat}
              </span>
            </header>

            {/* TWO CONNECTED BOXES + connector in the gap */}
            <div className="svm2-twin">
              {/* BOX A — bullets */}
              <section
                ref={panelARef}
                className="svm2-panel svm2-panel--a"
                aria-label="What is inside"
              >
                <div className="svm2-panel-head">
                  <MapPin size={13} strokeWidth={2} aria-hidden="true" />
                  <span>WHAT IS INSIDE</span>
                </div>
                <ul className="svm2-list">
                  {active.bullets.map((b, i) => (
                    <li key={i} data-li className="svm2-item">
                      <span className="svm2-dot" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* CONNECTOR in the gap — tape bridge w/ rivets + dashed line */}
              <div ref={connectorRef} className="svm2-connector" aria-hidden="true">
                <span className="svm2-rivet svm2-rivet--start" />
                <span className="svm2-link-line" />
                <span className="svm2-tape-band">LINKED</span>
                <span className="svm2-rivet svm2-rivet--end" />
              </div>

              {/* BOX B — extras */}
              <section
                ref={panelBRef}
                className="svm2-panel svm2-panel--b"
                aria-label="Also included"
              >
                <div className="svm2-panel-head">
                  <PackageCheck size={13} strokeWidth={2} aria-hidden="true" />
                  <span>ALSO INCLUDED</span>
                </div>
                <ul className="svm2-list">
                  {active.extra.map((b, i) => (
                    <li key={i} data-li className="svm2-item">
                      <span className="svm2-dot" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* CLOSE */}
          <button
            ref={closeBtnRef}
            type="button"
            className="svm2-close"
            onClick={playOut}
            aria-label={`Close ${active.title} details`}
          >
            <X size={18} strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---- self-contained CSS (template literal -> dangerouslySetInnerHTML) ---- */
const CSS = `
.svm2-root{
  position:fixed; inset:0; z-index:300;
  display:flex; align-items:center; justify-content:center;
  font-family:var(--font-sans, system-ui, sans-serif);
  color:var(--ink, #1c1813);
  -webkit-font-smoothing:antialiased;
}
.svm2-scrim{
  position:absolute; inset:0;
  background:rgba(28,24,19,0.55);
  backdrop-filter:blur(7px) saturate(115%);
  -webkit-backdrop-filter:blur(7px) saturate(115%);
  cursor:pointer;
}
.svm2-center{
  position:relative;
  width:min(940px, calc(100vw - 32px));
  max-height:calc(100vh - 40px);
  perspective:1400px;
  display:flex; align-items:center; justify-content:center;
}
.svm2-box{
  position:relative;
  width:100%;
  transform-style:preserve-3d;
  will-change:transform, opacity;
}

/* ---- the box flaps ---- */
.svm2-flap{
  position:absolute; z-index:5;
  background:
    repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0 2px, transparent 2px 14px),
    linear-gradient(160deg, #d2ac6e 0%, #c79f63 55%, #b58c4e 100%);
  border:1px solid rgba(120,86,38,0.45);
  box-shadow:inset 0 0 0 1px rgba(255,255,255,0.12), 0 10px 26px rgba(40,28,12,0.32);
  backface-visibility:hidden;
  will-change:transform;
}
.svm2-flap--top{
  top:-2px; left:8%; width:84%; height:46%;
  border-radius:8px 8px 2px 2px;
}
.svm2-flap--bottom{
  bottom:-2px; left:8%; width:84%; height:46%;
  border-radius:2px 2px 8px 8px;
}
.svm2-flap--left{
  left:-2px; top:8%; width:46%; height:84%;
  border-radius:8px 2px 2px 8px;
}
.svm2-flap--right{
  right:-2px; top:8%; width:46%; height:84%;
  border-radius:2px 8px 8px 2px;
}
.svm2-tape{
  position:absolute;
  background:linear-gradient(180deg, #e6cf9c, #ddc190);
  opacity:0.92;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,0.35), 0 1px 3px rgba(0,0,0,0.18);
}
.svm2-tape--h{ left:0; right:0; height:22px; top:50%; transform:translateY(-50%); }
.svm2-tape--v{ top:0; bottom:0; width:22px; left:50%; transform:translateX(-50%); }

/* ---- interior (revealed surface) ---- */
.svm2-interior{
  position:relative; z-index:1;
  background:
    radial-gradient(120% 90% at 50% -10%, var(--surface,#f8f1e6), var(--bg,#f1e8da)) ,
    var(--bg,#f1e8da);
  border:1px solid var(--border,#ddd0bd);
  border-radius:16px;
  padding:26px 26px 28px;
  box-shadow:
    inset 0 2px 0 rgba(255,255,255,0.55),
    inset 0 -20px 40px rgba(120,86,38,0.06),
    0 30px 70px rgba(40,28,12,0.4);
  overflow:auto;
  max-height:calc(100vh - 56px);
}

/* ---- header ---- */
.svm2-header{
  display:flex; align-items:flex-start; gap:14px;
  padding-bottom:18px; margin-bottom:18px;
  border-bottom:1px dashed var(--border-2,#cdbfa9);
}
.svm2-tile{
  flex:0 0 auto;
  width:52px; height:52px; border-radius:13px;
  display:flex; align-items:center; justify-content:center;
  color:#fff;
  background:linear-gradient(150deg, var(--clay-bright,#d56b4d), var(--clay,#c2553a) 60%, var(--clay-deep,#9e3f28));
  box-shadow:0 8px 20px rgba(158,63,40,0.35), inset 0 1px 0 rgba(255,255,255,0.35);
}
.svm2-head-text{ flex:1 1 auto; min-width:0; }
.svm2-num{
  display:inline-block;
  font-family:var(--font-mono, ui-monospace, monospace);
  font-size:11px; letter-spacing:0.22em;
  color:var(--muted,#948a7c);
}
.svm2-title{
  margin:2px 0 4px;
  font-family:var(--font-display, "Archivo", sans-serif);
  font-weight:800; text-transform:uppercase;
  letter-spacing:0.01em; line-height:1.02;
  font-size:clamp(22px, 3.4vw, 30px);
  color:var(--ink,#1c1813);
}
.svm2-tagline{
  margin:0; font-size:14px; line-height:1.45;
  color:var(--body,#4c453c);
}
.svm2-stat{
  flex:0 0 auto; align-self:flex-start;
  margin-left:auto;
  font-family:var(--font-mono, ui-monospace, monospace);
  font-size:12px; font-weight:600; letter-spacing:0.03em;
  color:#fff;
  background:linear-gradient(150deg, var(--clay,#c2553a), var(--clay-deep,#9e3f28));
  padding:7px 13px; border-radius:999px; white-space:nowrap;
  box-shadow:0 5px 14px rgba(158,63,40,0.3), inset 0 1px 0 rgba(255,255,255,0.3);
}

/* ---- the two connected boxes ---- */
.svm2-twin{
  display:grid;
  grid-template-columns:1fr auto 1fr;
  align-items:stretch;
  gap:0;
}
.svm2-panel{
  background:var(--surface,#f8f1e6);
  border:1px solid var(--border,#ddd0bd);
  border-radius:13px;
  padding:16px 16px 14px;
  will-change:transform, opacity;
  box-shadow:0 4px 14px rgba(120,86,38,0.08), inset 0 1px 0 rgba(255,255,255,0.6);
}
.svm2-panel--a{ border-top:3px solid var(--clay,#c2553a); }
.svm2-panel--b{ border-top:3px solid var(--rose,#c7aca3); }
.svm2-panel-head{
  display:flex; align-items:center; gap:7px;
  font-family:var(--font-mono, ui-monospace, monospace);
  font-size:11px; font-weight:700; letter-spacing:0.18em;
  color:var(--clay-deep,#9e3f28);
  margin-bottom:12px;
}
.svm2-panel--b .svm2-panel-head{ color:var(--body,#4c453c); }
.svm2-list{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:9px; }
.svm2-item{
  display:flex; align-items:flex-start; gap:10px;
  font-size:14px; line-height:1.4; color:var(--body,#4c453c);
}
.svm2-dot{
  flex:0 0 auto; margin-top:6px;
  width:7px; height:7px; border-radius:2px;
  background:var(--clay,#c2553a);
  box-shadow:0 0 0 3px var(--rose-soft,#ecdcd4);
  transform:rotate(45deg);
}
.svm2-panel--b .svm2-dot{ background:var(--rose,#c7aca3); }

/* ---- connector in the gap: dashed line + rivets + tape band ---- */
.svm2-connector{
  position:relative;
  width:62px;
  display:flex; align-items:center; justify-content:center;
  will-change:transform, opacity;
}
.svm2-link-line{
  position:absolute; left:6px; right:6px; top:50%;
  height:0; transform:translateY(-50%);
  border-top:2px dashed var(--clay,#c2553a);
  opacity:0.85;
}
.svm2-rivet{
  position:absolute; top:50%; transform:translateY(-50%);
  width:13px; height:13px; border-radius:50%;
  background:radial-gradient(circle at 35% 30%, #fff, var(--clay-bright,#d56b4d) 55%, var(--clay-deep,#9e3f28));
  box-shadow:0 2px 5px rgba(158,63,40,0.4), inset 0 0 0 1px rgba(255,255,255,0.4);
  z-index:2;
}
.svm2-rivet--start{ left:-4px; }
.svm2-rivet--end{ right:-4px; }
.svm2-tape-band{
  position:relative; z-index:1;
  font-family:var(--font-mono, ui-monospace, monospace);
  font-size:8px; font-weight:700; letter-spacing:0.16em;
  color:#7a5a26;
  background:linear-gradient(180deg, #e6cf9c, var(--tape,#ddc190));
  padding:5px 6px; border-radius:3px;
  transform:rotate(-90deg); transform-origin:center;
  white-space:nowrap;
  box-shadow:0 2px 6px rgba(120,86,38,0.3), inset 0 0 0 1px rgba(255,255,255,0.4);
  border:1px solid rgba(120,86,38,0.25);
}

/* ---- close button ---- */
.svm2-close{
  position:absolute; top:12px; right:12px; z-index:20;
  width:40px; height:40px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  background:var(--surface,#f8f1e6);
  color:var(--ink,#1c1813);
  border:1px solid var(--border-2,#cdbfa9);
  box-shadow:0 8px 20px rgba(40,28,12,0.3);
  cursor:pointer;
  transition:transform .18s ease, background .18s ease, color .18s ease;
}
.svm2-close:hover{
  transform:rotate(90deg);
  background:var(--clay,#c2553a); color:#fff;
  border-color:var(--clay-deep,#9e3f28);
}
.svm2-close:focus-visible{
  outline:2px solid var(--clay,#c2553a);
  outline-offset:3px;
}

/* ---- mobile: stack the two boxes with a VERTICAL connector ---- */
@media (max-width:680px){
  .svm2-interior{ padding:20px 16px 22px; }
  .svm2-header{ flex-wrap:wrap; }
  .svm2-stat{ margin-left:0; }
  .svm2-twin{
    grid-template-columns:1fr;
    grid-template-rows:auto auto auto;
  }
  .svm2-connector{
    width:100%; height:46px;
  }
  .svm2-link-line{
    left:50%; right:auto; top:6px; bottom:6px;
    height:auto; width:0; transform:translateX(-50%);
    border-top:0; border-left:2px dashed var(--clay,#c2553a);
  }
  .svm2-rivet--start{ left:50%; top:-4px; transform:translate(-50%,0); }
  .svm2-rivet--end{ right:auto; left:50%; top:auto; bottom:-4px; transform:translate(-50%,0); }
  .svm2-tape-band{ transform:rotate(0deg); }
  .svm2-close{ top:8px; right:8px; }
}

@media (prefers-reduced-motion: reduce){
  .svm2-close{ transition:none; }
  .svm2-close:hover{ transform:none; }
}
`;
