// src/components/Events.tsx
import { useEffect, useRef } from "react";
import anime from "animejs";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useTilt } from "@/hooks/useTilt";

const EVENTS = [
  { 
    date: "JUN 5, 2026", 
    name: "WORLD ENVIROMENT DAY", 
    loc: "📍 YRC Barishal",
    image: "https://i.imgur.com/yBaCQpl.jpeg",
    fbLink: "https://www.facebook.com/share/p/1Jz47U2uTm/" 
  },
  { 
    date: "JUN 10, 2026", 
    name: "FOOTBALL TOURNAMENT ⚽", 
    loc: "📍 YRC DHAKA",
    image: "https://i.imgur.com/oaVMRra.png",
    fbLink: "https://www.facebook.com/share/v/1CodWyVC69/" 
  },
  { 
    date: "FEB 2, 2026", 
    name: "FLOOD RELIEFS", 
    loc: "📍 YRC CHATTOGRAM & MURADPUR",
    image: "https://i.imgur.com/UpumFGc.jpeg",
    fbLink: "https://www.facebook.com/share/p/1EbTu8vdZN/" 
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const { ref, innerRef, tiltProps } = useTilt(15);
  return (
    <div
      ref={ref}
      {...tiltProps}
      className="yrc-event-card"
      style={{ transformStyle: "preserve-3d", opacity: 0 }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

export function Events() {
  const sectionRef = useSectionReveal<HTMLElement>();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".yrc-event-card"));
    let done = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !done) {
          done = true;
          anime({
            targets: cards,
            translateY: [40, 0],
            opacity: [0, 1],
            duration: 700,
            easing: "easeOutQuart",
            delay: anime.stagger(150),
          });
          io.disconnect();
        }
      }
    }, { threshold: 0.2 });
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="w-full bg-[#fbfbfd] px-6 lg:px-10" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto max-w-7xl text-center">
        <p className="yrc-reveal font-sans" style={{ fontSize: 13, letterSpacing: "0.15em", color: "#0047cc", textTransform: "uppercase" }}>
          What's Happening
        </p>
        <h2 className="yrc-heading yrc-reveal mt-3 font-display" style={{ color: "#003087", fontSize: "clamp(40px, 6vw, 56px)", lineHeight: 1.05 }}>
          UPCOMING RIDES & EVENTS
        </h2>
      </div>

      <div ref={gridRef} className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map((e) => (
          <TiltCard key={e.name}>
            <div className="overflow-hidden rounded-2xl bg-white" style={{ boxShadow: "0 4px 20px rgba(0,48,135,0.1)" }}>
              
              <a 
                href={e.fbLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative block group overflow-hidden" 
                style={{ height: 220, backgroundColor: "#003087" }}
              >
                <img 
                  src={e.image} 
                  alt={e.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <span
                  className="absolute left-4 top-4 rounded-full bg-[#e60012] px-4 py-1.5 font-sans text-white z-10 shadow-md"
                  style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.05em" }}
                >
                  {e.date}
                </span>
              </a>

              <div style={{ padding: 24 }}>
                <h3 className="font-display" style={{ color: "#003087", fontSize: 28, lineHeight: 1.05 }}>
                  {e.name}
                </h3>
                <p className="mt-2 font-sans" style={{ fontSize: 14, color: "#666" }}>
                  {e.loc}
                </p>
                <a
                  href={e.fbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full rounded-full border-2 border-[#003087] py-2.5 text-center font-sans text-sm font-semibold text-[#003087] transition-colors hover:bg-[#003087] hover:text-white"
                >
                  RSVP ON FACEBOOK
                </a>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl justify-center">
        <a
          href="/events"
          className="inline-flex items-center justify-center rounded-full border-2 border-[#003087] px-8 py-3 font-sans text-sm font-semibold text-[#003087] transition-colors hover:bg-[#003087] hover:text-white"
        >
          VIEW ALL EVENTS
        </a>
      </div>
    </section>
  );
}
