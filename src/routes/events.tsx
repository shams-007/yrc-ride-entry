import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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

const EASE = [0.16, 1, 0.3, 1] as const;

const EVENTS = [
  { date: "DEC 15, 2025", name: "TOUR DE CHITTAGONG", loc: "📍 Pahartali, Chittagong" },
  { date: "JAN 8, 2026", name: "SYLHET WINTER RIDE", loc: "📍 Sylhet City" },
  { date: "FEB 2, 2026", name: "DHAKA CONCLAVE 2026", loc: "📍 Dhaka Central" },
  { date: "MAR 15, 2026", name: "BANDARBAN HILL RIDE", loc: "📍 Bandarban" },
  { date: "APR 5, 2026", name: "CHITTAGONG COASTAL CRUISE", loc: "📍 Cox's Bazar Road" },
  { date: "MAY 20, 2026", name: "YRC BIRTHDAY BASH", loc: "📍 Dhaka" },
];

function EventsPage() {
  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#f8f9ff", color: "#0d0d0d" }}>
      <Navbar />
      <section className="w-full px-6 pt-32 pb-20 lg:px-10" style={{ backgroundColor: "#003087" }}>
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="yrc-heading font-display text-white" style={{ fontSize: "clamp(48px, 8vw, 72px)", lineHeight: 1.05 }}>
            ALL RIDES & EVENTS
          </h1>
          <p className="mt-4 font-sans" style={{ color: "rgba(255,255,255,0.75)", fontSize: 18 }}>
            Every adventure starts here
          </p>
        </div>
      </section>

      <section className="w-full bg-[#fbfbfd] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((e, i) => (
            <motion.div
              key={e.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.1 }}
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
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}