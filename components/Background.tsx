export default function Background() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "var(--bg)" }}>
      <div
        className="glow"
        style={{
          width: 640,
          height: 640,
          top: "-14%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(199,172,163,0.35), transparent 65%)",
        }}
      />
      <div
        className="glow"
        style={{
          width: 560,
          height: 560,
          bottom: "-16%",
          left: "-12%",
          background: "radial-gradient(circle, rgba(194,85,58,0.1), transparent 65%)",
        }}
      />
    </div>
  );
}
