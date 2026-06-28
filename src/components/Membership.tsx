import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const CARDS = [
  {
    icon: "🏍",
    title: "SHOWROOM MEMBERSHIP",
    body: "Visit any authorized ACI Motors Yamaha showroom nationwide. Show your Yamaha ownership documents and register on the spot.",
    cta: "FIND A SHOWROOM",
    variant: "outline" as const,
  },
  {
    icon: "📱",
    title: "APP MEMBERSHIP",
    body: "Download the YRC BD App, create your profile, and connect with your nearest branch coordinator to activate your membership.",
    cta: "DOWNLOAD APP",
    variant: "filled" as const,
  },
];

export function Membership() {
  return (
    <section
      id="membership"
      className="w-full px-6 lg:px-10"
      style={{ backgroundColor: "#f8f9ff", paddingTop: 100, paddingBottom: 100 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto max-w-3xl text-center"
      >
        <p
          className="font-sans"
          style={{ fontSize: 13, letterSpacing: "0.2em", color: "#0047cc", textTransform: "uppercase" }}
        >
          Join the Family
        </p>
        <h2
          className="mt-3 font-display"
          style={{ color: "#003087", fontSize: "clamp(40px, 5.5vw, 56px)", lineHeight: 1.05 }}
        >
          BECOME A YRC MEMBER
        </h2>
        <p className="mx-auto mt-6 font-sans" style={{ fontSize: 16, lineHeight: 1.7, color: "#666" }}>
          Membership is open to all Yamaha motorcycle owners in Bangladesh. Visit your nearest authorized Yamaha showroom or download the YRC app to get started.
        </p>
      </motion.div>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.15 }}
            className="yrc-membership-card flex flex-col items-start rounded-2xl bg-white p-8"
            style={{ boxShadow: "0 4px 24px rgba(0,48,135,0.08)" }}
          >
            <div style={{ fontSize: 40 }}>{c.icon}</div>
            <h3 className="mt-4 font-display" style={{ color: "#003087", fontSize: 28, lineHeight: 1.1 }}>
              {c.title}
            </h3>
            <p className="mt-3 font-sans" style={{ fontSize: 14, lineHeight: 1.7, color: "#666" }}>
              {c.body}
            </p>
            <a
              href="#join"
              className={
                c.variant === "filled"
                  ? "mt-6 inline-flex items-center justify-center rounded-full bg-[#e60012] px-6 py-2.5 font-sans text-sm font-semibold text-white transition-transform hover:scale-105"
                  : "mt-6 inline-flex items-center justify-center rounded-full border-2 border-[#003087] px-6 py-2.5 font-sans text-sm font-semibold text-[#003087] transition-colors hover:bg-[#003087] hover:text-white"
              }
            >
              {c.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}