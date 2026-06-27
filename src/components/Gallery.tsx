const ITEMS = [
  { h: 240 }, { h: 280 }, { h: 220 }, { h: 260 },
  { h: 200 }, { h: 280 }, { h: 240 }, { h: 220 },
];

export function Gallery() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section id="gallery" className="w-full overflow-hidden bg-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <p className="font-sans" style={{ fontSize: 13, letterSpacing: "0.15em", color: "#0047cc", textTransform: "uppercase" }}>
          The Community
        </p>
        <h2 className="mt-3 font-display" style={{ color: "#003087", fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05 }}>
          RIDE TOGETHER
        </h2>
      </div>

      <div className="yrc-marquee mt-12">
        <div className="yrc-marquee-track">
          {loop.map((it, i) => (
            <div
              key={i}
              className="yrc-marquee-item flex shrink-0 items-center justify-center rounded-xl"
              style={{ width: 320, height: it.h, backgroundColor: "#003087", marginRight: 20 }}
            >
              <span className="font-display tracking-widest text-white" style={{ fontSize: 16, opacity: 0.7 }}>
                RIDE PHOTO
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}