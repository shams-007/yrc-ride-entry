import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { num: "200", label: "Speed Breakers" },
  { num: "17", label: "Locations" },
  { num: "10+", label: "Campaigns" },
];

export function RoadSafety() {
  return (
    <section
      id="road-safety"
      className="w-full px-6 lg:px-10"
      style={{ backgroundColor: "#003087", paddingTop: 100, paddingBottom: 100 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto max-w-4xl text-center"
      >
        <p
          className="font-sans"
          style={{ fontSize: 13, letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}
        >
          Our Mission
        </p>
        <h2 className="mt-3 font-display text-white" style={{ fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1.05 }}>
          SAVING LIVES, ONE SPEED BREAKER AT A TIME
        </h2>
        <p
          className="mx-auto mt-6 font-sans"
          style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", maxWidth: 720 }}
        >
          We started with a simple belief — riders should look out for riders. Today our teams across 17 locations actively lead road safety campaigns, painting speed breakers and conducting group ride training.
        </p>
      </motion.div>

      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-6 text-center">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.15 }}
          >
            <div className="font-display text-white" style={{ fontSize: "clamp(48px, 7vw, 72px)", lineHeight: 1 }}>
              {s.num}
            </div>
            <div
              className="mt-2 font-sans"
              style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}
            >
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.15 }}
            className="flex items-center justify-center rounded-xl"
            style={{
              height: 280,
              border: "1px solid rgba(255,255,255,0.2)",
              backgroundColor: "rgba(255,255,255,0.04)",
            }}
          >
            <span className="font-display tracking-widest text-white" style={{ fontSize: 18, opacity: 0.7 }}>
              PHOTO
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-5xl justify-center">
        <a
          href="#safety-more"
          className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#003087]"
        >
          LEARN ABOUT OUR SAFETY WORK
        </a>
      </div>
    </section>
  );
}