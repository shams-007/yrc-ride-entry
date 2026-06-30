import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const POINTS = [
  { icon: "🏍", text: "Born from organic social media roots" },
  { icon: "🤝", text: "Official ACI Motors Partner" },
  { icon: "🛡", text: "200 Safety Markers Painted Nationwide" },
];

export function About() {
  return (
    <section id="about" className="w-full bg-[#fbfbfd] px-6 lg:px-10" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex items-center justify-center"
          style={{ transform: "rotate(-2deg)" }}
        >
          <div
            className="flex w-full items-center justify-center rounded-2xl"
            style={{
              backgroundColor: "#003087",
              height: 520,
              boxShadow: "0 20px 60px rgba(0,48,135,0.2)",
            }}
          >
            <span className="font-display tracking-widest text-white" style={{ fontSize: 20, opacity: 0.7 }}>
              PHOTO COMING SOON
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        >
          <div style={{ width: 3, height: 60, backgroundColor: "#e60012", marginBottom: 20 }} />
          <p
            className="font-sans"
            style={{ fontSize: 12, letterSpacing: "0.2em", color: "#0047cc", textTransform: "uppercase" }}
          >
            Since 2018
          </p>
          <h2 className="mt-3 font-display" style={{ color: "#003087", fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1.05 }}>
            THE HEART OF YAMAHA BIKING
          </h2>
          <p className="mt-6 font-sans" style={{ fontSize: 16, lineHeight: 1.7, color: "#444", maxWidth: "65ch" }}>
            Born from organic social media roots, Yamaha Riders Club Bangladesh is more than just a club — it's the best and biggest biking community in Bangladesh. From Chittagong to Dhaka, we are a family of 472,000+ members across 47 branches, fueled by the official support of ACI Motors. We ride for the thrill, but we work for the community.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            {POINTS.map((p) => (
              <div key={p.text} className="flex items-center gap-3">
                <span
                  className="flex shrink-0 items-center justify-center rounded-full text-white"
                  style={{ width: 40, height: 40, backgroundColor: "#003087", fontSize: 18 }}
                >
                  {p.icon}
                </span>
                <span className="font-sans" style={{ fontSize: 14, color: "#333" }}>
                  {p.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}