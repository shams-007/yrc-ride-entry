import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useTilt } from "@/hooks/useTilt";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "All Rides & Events — YRC.BD" },
      { name: "description", content: "Every adventure starts here. Browse all upcoming Yamaha Riders Club Bangladesh rides and events." },
      { property: "og:title", content: "All Rides & Events — YRC.BD" },
      { property: "og:description", content: "Every adventure starts here." },
    ],
  }),
  component: EventsPage,
});

const EVENTS = [
  { date: "DEC 15, 2025", name: "TOUR DE CHITTAGONG", loc: "📍 Pahartali, Chittagong" },
  { date: "JAN 8, 2026", name: "SYLHET WINTER RIDE", loc: "📍 Sylhet City" },
  { date: "FEB 2, 2026", name: "DHAKA CONCLAVE 2026", loc: "📍 Dhaka Central" },
  { date: "MAR 15, 2026", name: "BANDARBAN HILL RIDE", loc: "📍 Bandarban" },
  { date: "APR 5, 2026", name: "CHITTAGONG COASTAL CRUISE", loc: "📍 Cox's Bazar Road" },
  { date: "MAY 20, 2026", name: "YRC BIRTHDAY BASH", loc: "📍 Dhaka" },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const { ref, innerRef, tiltProps } = useTilt(15);
  return (
    <div
      ref={ref}
      {...tiltProps}
      className="yrc-event-card"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

function EventsPage() {
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
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#f8f9ff", color: "#0d0d0d" }}>
      <Navbar />
      
      {/* Hero Section with diagonal lines and glow */}
      <section 
        className="w-full relative overflow-hidden px-6 lg:px-10" 
        style={{ 
          backgroundColor: "#003087",
          minHeight: 450,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* Diagonal lines background */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1000 450"
        >
          <defs>
            <style>
              {`
                line {
                  stroke: rgba(255, 255, 255, 0.08);
                  stroke-width: 1px;
                  transform: rotate(-12deg);
                  transform-origin: center;
                }
              `}
            </style>
          </defs>
          {/* 6 evenly spaced diagonal lines */}
          <line x1="50" y1="-200" x2="50" y2="650" />
          <line x1="233" y1="-200" x2="233" y2="650" />
          <line x1="417" y1="-200" x2="417" y2="650" />
          <line x1="600" y1="-200" x2="600" y2="650" />
          <line x1="783" y1="-200" x2="783" y2="650" />
          <line x1="950" y1="-200" x2="950" y2="650" />
        </svg>

        {/* Radial glow effect */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
            filter: "blur(150px)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div className="mx-auto max-w-7xl text-center relative z-10">
          <p 
            className="font-sans text-white"
            style={{ 
              fontSize: 13, 
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
              fontWeight: 500
            }}
          >
            YRC.BD
          </p>
          <h1 
            className="font-display text-white mt-4"
            style={{ 
              fontSize: "clamp(64px, 10vw, 96px)",
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.02em"
            }}
          >
            ALL RIDES & EVENTS
          </h1>
          <div
            className="mx-auto mt-6"
            style={{
              width: 64,
              height: 3,
              backgroundColor: "#e60012"
            }}
          />
          <p 
            className="mt-6 font-sans"
            style={{ 
              fontSize: 18,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6
            }}
          >
            Every adventure starts here. Join 472,000+ riders across Bangladesh.
          </p>
        </div>
      </section>

      {/* Gradient fade to white */}
      <div
        style={{
          background: "linear-gradient(to bottom, #003087, #ffffff)",
          height: 80,
        }}
      />

      {/* Events Grid */}
      <section className="w-full bg-white px-6 py-24 lg:px-10">
        <div ref={gridRef} className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((e) => (
            <TiltCard key={e.name}>
              <div 
                className="overflow-hidden rounded-2xl bg-white"
                style={{ boxShadow: "0 4px 20px rgba(0,48,135,0.1)" }}
              >
                <div className="relative flex items-center justify-center" style={{ height: 220, backgroundColor: "#003087" }}>
                  <span
                    className="absolute left-4 top-4 rounded-full bg-[#e60012] px-4 py-1.5 font-sans text-white"
                    style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.05em" }}
                  >
                    {e.date}
                  </span>
                  <span className="font-display tracking-widest text-white" style={{ fontSize: 18, opacity: 0.7 }}>
                    EVENT PHOTO
                  </span>
                </div>
                <div style={{ padding: 24 }}>
                  <h3 className="font-display" style={{ color: "#003087", fontSize: 28, lineHeight: 1.05 }}>
                    {e.name}
                  </h3>
                  <p className="mt-2 font-sans" style={{ fontSize: 14, color: "#666" }}>
                    {e.loc}
                  </p>
                  <a
                    href="https://www.facebook.com/groups/YamahaRidersClubBD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full rounded-full border-2 border-[#003087] py-2.5 text-center font-sans text-sm font-semibold text-[#003087] transition-colors hover:bg-[#003087] hover:text-white"
                  >
                    RSVP
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
