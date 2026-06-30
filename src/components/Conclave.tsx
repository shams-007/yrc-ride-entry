import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { num: "5000+", label: "Attendees" },
  { num: "47", label: "Branches United" },
  { num: "3", label: "Days of Celebration" },
];

export function Conclave() {
  return (
    <section className="w-full bg-white px-6 lg:px-10" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex w-full items-center justify-center rounded-2xl"
          style={{ backgroundColor: "#003087", height: 480, boxShadow: "0 20px 60px rgba(0,48,135,0.2)" }}
        >
          <span className="font-display tracking-widest text-white" style={{ fontSize: 20, opacity: 0.7 }}>
            CONCLAVE PHOTO
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          <p className="font-sans" style={{ fontSize: 12, letterSpacing: "0.2em", color: "#0047cc", textTransform: "uppercase" }}>
            Flagship Event
          </p>
          <h2 className="mt-3 font-display" style={{ color: "#003087", fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1.05 }}>
            YRC ANNUAL CONCLAVE
          </h2>
          <p className="mt-6 font-sans" style={{ fontSize: 16, color: "#666", lineHeight: 1.7, maxWidth: "65ch" }}>
            The biggest gathering of Yamaha lovers in Bangladesh. Riders from all 47 branches converge for a weekend of brotherhood, competitions, and celebration of everything YRC stands for.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display" style={{ color: "#003087", fontSize: 40, lineHeight: 1 }}>
                  {s.num}
                </div>
                <div
                  className="mt-1 font-sans"
                  style={{ fontSize: 11, color: "#666", letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <a
            href="#conclave-2026"
            className="mt-8 inline-flex items-center justify-center rounded-full px-8 py-3 font-sans text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "#e60012" }}
          >
            VIEW CONCLAVE 2026 HIGHLIGHTS
          </a>
        </motion.div>
      </div>
    </section>
  );
}