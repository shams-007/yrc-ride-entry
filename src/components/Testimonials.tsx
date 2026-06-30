import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  {
    quote: "YRC isn't just a club, it's family. Every ride feels like coming home.",
    initial: "S",
    name: "Sajid Rahman",
    role: "Chittagong Hub Member",
  },
  {
    quote: "From my first ride to my hundredth, this community has never let me down. #Yes_Yamaha",
    initial: "F",
    name: "Farhana Akter",
    role: "Sylhet Regional Coordinator",
  },
  {
    quote: "The road safety work YRC does makes every rider's family sleep easier at night.",
    initial: "A",
    name: "Aminul Islam",
    role: "Dhaka Central Lead",
  },
];

export function Testimonials() {
  return (
    <section className="w-full px-6 lg:px-10" style={{ backgroundColor: "#eef2ff", paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto max-w-7xl text-center">
        <p className="font-sans" style={{ fontSize: 13, letterSpacing: "0.15em", color: "#0047cc", textTransform: "uppercase" }}>
          Member Voices
        </p>
        <h2 className="mt-3 font-display" style={{ color: "#003087", fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1.05 }}>
          WHAT RIDERS SAY
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.15 }}
            className="yrc-testimonial-card relative rounded-2xl bg-white"
            style={{ padding: 32, boxShadow: "0 4px 24px rgba(0,48,135,0.08)" }}
          >
            <div
              className="font-display"
              style={{ position: "absolute", top: 16, left: 20, fontSize: 72, lineHeight: 1, color: "rgba(0,48,135,0.2)" }}
            >
              “
            </div>
            <p className="relative font-sans italic" style={{ fontSize: 16, color: "#333", lineHeight: 1.6, paddingTop: 24 }}>
              {t.quote}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span
                className="flex items-center justify-center rounded-full font-display text-white"
                style={{ width: 48, height: 48, backgroundColor: "#003087", fontSize: 20 }}
              >
                {t.initial}
              </span>
              <div>
                <div className="font-display" style={{ color: "#003087", fontSize: 18, lineHeight: 1.1 }}>
                  {t.name}
                </div>
                <div className="font-sans" style={{ fontSize: 12, color: "#666" }}>
                  {t.role}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}