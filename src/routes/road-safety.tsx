import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/road-safety")({
  head: () => ({
    meta: [
      { title: "Road Safety — YRC.BD" },
      { name: "description", content: "How Yamaha Riders Club Bangladesh saves lives on every road." },
    ],
  }),
  component: RoadSafetyPage,
});

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { num: "200", label: "Speed Breakers" },
  { num: "17", label: "Locations" },
  { num: "10+", label: "Campaigns" },
];

const MILESTONES = [
  { year: "2018", title: "First safety campaign" },
  { year: "2020", title: "50 speed breakers painted" },
  { year: "2022", title: "100 speed breakers milestone" },
  { year: "2024", title: "200 speed breakers across Bangladesh" },
];

// Add as many photos here as you like (4 or 6 looks best!)
const SAFETY_GALLERY = [
  "/images/safety-1.jpg",
  "/images/safety-2.jpg",
  "/images/safety-3.jpg",
  "/images/safety-4.jpg",
  "/images/safety-5.jpg",
  "/images/safety-6.jpg",
];

function RoadSafetyPage() {
  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#f8f9ff", color: "#0d0d0d" }}>
      <Navbar />

      <section className="w-full px-6 pt-32 pb-20 lg:px-10" style={{ backgroundColor: "#003087" }}>
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="yrc-heading font-display text-white" style={{ fontSize: "clamp(48px, 8vw, 72px)", lineHeight: 1.05 }}>
            SAVING LIVES ON EVERY ROAD
          </h1>
          <p className="mx-auto mt-4 font-sans" style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, maxWidth: 720 }}>
            Our teams across Bangladesh work every weekend so riders — and everyone who shares the road — get home safe.
          </p>
        </div>
      </section>

      <section className="w-full bg-[#fbfbfd] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="font-sans" style={{ fontSize: 13, letterSpacing: "0.15em", color: "#0047cc", textTransform: "uppercase" }}>
            Our Story
          </p>
          <h2 className="yrc-heading mt-3 font-display" style={{ color: "#003087", fontSize: "clamp(36px, 5vw, 48px)", lineHeight: 1.05 }}>
            RIDERS LOOKING OUT FOR RIDERS
          </h2>
          <p className="mt-6 font-sans" style={{ fontSize: 16, color: "#666", lineHeight: 1.8, maxWidth: "65ch" }}>
            It started in 2018 with a can of reflective paint and a single unmarked speed breaker on a highway outside Dhaka. Six years later, YRC volunteers have painted over 200 speed breakers across 17 locations, trained thousands of new riders on group-ride safety, and turned local safety campaigns into a nationwide movement.
          </p>
          <p className="mt-4 font-sans" style={{ fontSize: 16, color: "#666", lineHeight: 1.8, maxWidth: "65ch" }}>
            Every campaign is rider-led, self-funded, and coordinated through our 47 branches. We work with local authorities, hand out reflective gear, and run helmet-fit clinics — because a safer road starts with a safer rider.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-3 gap-6 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.15 }}
              className="rounded-2xl bg-white"
              style={{ padding: 32, boxShadow: "0 4px 20px rgba(0,48,135,0.1)" }}
            >
              <div className="font-display" style={{ color: "#003087", fontSize: "clamp(48px, 6vw, 64px)", lineHeight: 1 }}>
                {s.num}
              </div>
              <div
                className="mt-2 font-sans"
                style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", color: "#666", textTransform: "uppercase" }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* DYNAMIC PHOTO GRID */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAFETY_GALLERY.map((src, i) => (
            <div
              key={i}
              className="group relative flex items-center justify-center rounded-2xl overflow-hidden bg-[#001f5e]"
              style={{ height: 260 }}
            >
              <img 
                src={src} 
                alt="Campaign" 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
          ))}
        </div>
        
        {/* BUTTON TO VIEW MORE ON FACEBOOK */}
        <div className="mx-auto mt-10 flex justify-center">
          <a
            href="https://www.facebook.com/YamahaRidersClubBD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#003087] px-8 py-3 font-sans text-sm font-semibold text-[#003087] transition-colors hover:bg-[#003087] hover:text-white"
          >
            VIEW ALL PHOTOS ON FACEBOOK
          </a>
        </div>
      </section>

      <section className="w-full bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="font-sans text-center" style={{ fontSize: 13, letterSpacing: "0.15em", color: "#0047cc", textTransform: "uppercase" }}>
            Milestones
          </p>
          <h2 className="yrc-heading mt-3 text-center font-display" style={{ color: "#003087", fontSize: "clamp(36px, 5vw, 48px)", lineHeight: 1.05 }}>
            SIX YEARS OF SAFER ROADS
          </h2>

          <ol className="relative mx-auto mt-14 max-w-2xl" style={{ borderLeft: "2px solid rgba(0,48,135,0.15)" }}>
            {MILESTONES.map((m) => (
              <li key={m.year} className="relative pl-6" style={{ paddingBottom: 32 }}>
                <span
                  className="absolute -left-[9px] top-1 rounded-full"
                  style={{ width: 16, height: 16, backgroundColor: "#e60012", boxShadow: "0 0 0 4px #fff" }}
                />
                <div className="font-display" style={{ color: "#003087", fontSize: 28, lineHeight: 1 }}>
                  {m.year}
                </div>
                <div className="mt-1 font-sans" style={{ fontSize: 15, color: "#666" }}>
                  {m.title}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Footer />
    </div>
  );
}
