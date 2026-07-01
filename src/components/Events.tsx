import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const EVENTS = [
  { date: "DEC 15, 2025", name: "TOUR DE CHITTAGONG", loc: "📍 Pahartali, Chittagong" },
  { date: "JAN 8, 2026", name: "SYLHET WINTER RIDE", loc: "📍 Sylhet City" },
  { date: "FEB 2, 2026", name: "DHAKA CONCLAVE 2026", loc: "📍 Dhaka Central" },
];

function TiltCard({ delay, children }: { delay: number; children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      className="yrc-event-card"
    >
      {children}
    </motion.div>
  );
}

export function Events() {
  return (
    <section id="events" className="w-full bg-[#fbfbfd] px-6 lg:px-10" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto max-w-7xl text-center">
        <p className="font-sans" style={{ fontSize: 13, letterSpacing: "0.15em", color: "#0047cc", textTransform: "uppercase" }}>
          What's Happening
        </p>
        <h2 className="mt-3 font-display" style={{ color: "#003087", fontSize: "clamp(40px, 6vw, 56px)", lineHeight: 1.05 }}>
          UPCOMING RIDES & EVENTS
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map((e, i) => (
          <TiltCard key={e.name} delay={i * 0.15}>
            <div className="overflow-hidden rounded-2xl bg-white" style={{ boxShadow: "0 4px 24px rgba(0,48,135,0.08)" }}>
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