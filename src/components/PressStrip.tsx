import { useEffect, useRef } from "react";
import anime from "animejs";

export function PressStrip() {
  const items = ["THE DAILY STAR", "BIKEBD", "DHAKA TRIBUNE"];
  const rowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const els = row.querySelectorAll<HTMLElement>(".yrc-press-item");
    els.forEach((e) => { e.style.opacity = "0"; e.style.transform = "translateY(40px)"; });
    let done = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !done) {
          done = true;
          anime({
            targets: Array.from(els),
            translateY: [40, 0],
            opacity: [0, 1],
            duration: 600,
            easing: "easeOutQuart",
            delay: anime.stagger(200),
          });
          io.disconnect();
        }
      }
    }, { threshold: 0.2 });
    io.observe(row);
    return () => io.disconnect();
  }, []);
  return (
    <section className="w-full bg-white px-6 lg:px-10" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div
        className="mx-auto max-w-7xl"
        style={{ borderTop: "1px solid rgba(0,48,135,0.08)", borderBottom: "1px solid rgba(0,48,135,0.08)", paddingTop: 32, paddingBottom: 32 }}
      >
        <p
          className="text-center font-sans"
          style={{ fontSize: 12, letterSpacing: "0.2em", color: "#999", textTransform: "uppercase" }}
        >
          As Featured In
        </p>
        <div ref={rowRef} className="mt-6 flex flex-wrap items-center justify-center gap-10 lg:gap-20">
          {items.map((name) => (
            <span
              key={name}
              className="font-display yrc-press-item"
              style={{ fontSize: 20, color: "#999", transition: "color 200ms ease", cursor: "default" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}