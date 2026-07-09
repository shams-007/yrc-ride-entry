// src/components/Gallery.tsx
const ITEMS = [
  { h: 240, img: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=400&q=80" },
  { h: 280, img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80" },
  { h: 220, img: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=400&q=80" },
  { h: 260, img: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?w=400&q=80" },
  { h: 200, img: "https://images.unsplash.com/photo-1591334800366-41ee1e6e02eb?w=400&q=80" },
  { h: 280, img: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=400&q=80" },
  { h: 240, img: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=400&q=80" },
  { h: 220, img: "https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=400&q=80" },
];

export function Gallery() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section id="gallery" className="w-full overflow-hidden bg-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <p className="font-sans" style={{ fontSize: 13, letterSpacing: "0.15em", color: "#0047cc", textTransform: "uppercase" }}>
          The Community
        </p>
        <h2 className="yrc-heading mt-3 font-display" style={{ color: "#003087", fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05 }}>
          RIDE TOGETHER
        </h2>
      </div>

      <div className="yrc-marquee mt-12">
        <div className="yrc-marquee-track">
          {loop.map((it, i) => (
            <div
              key={i}
              className="yrc-marquee-item flex shrink-0 items-center justify-center rounded-xl overflow-hidden"
              style={{ width: 320, height: it.h, backgroundColor: "#003087", marginRight: 20 }}
            >
              <img src={it.img} alt="YRC Gallery" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
