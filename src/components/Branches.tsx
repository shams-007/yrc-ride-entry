import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const BRANCHES = [
  { name: "DHAKA CENTRAL", coord: "Managed by Aminul Islam", desc: "The flagship hub for capital riders, weekly meets and city tours." },
  { name: "SYLHET REGIONAL", coord: "Coordinated by Farhana Akter", desc: "Tea-country trails and monsoon expeditions across the northeast." },
  { name: "CHITTAGONG HUB", coord: "Led by Mohammad Sajid", desc: "Coastal cruises, hill rides, and the largest port-city chapter." },
];

export function Branches() {
  return (
    <section id="branches" className="yrc-branches-grid relative w-full overflow-hidden bg-white px-6 lg:px-10" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: 40,
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(0,48,135,0.04) 0%, rgba(0,48,135,0) 70%)",
          filter: "blur(100px)",
        }}
      />
      <div className="relative mx-auto max-w-7xl text-center">
        <p className="font-sans" style={{ fontSize: 13, letterSpacing: "0.15em", color: "#0047cc", textTransform: "uppercase" }}>
          Nationwide Network
        </p>
        <h2 className="yrc-heading mt-3 font-display" style={{ color: "#003087", fontSize: "clamp(40px, 6vw, 56px)", lineHeight: 1.05 }}>
          47 BRANCHES NATIONWIDE
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans" style={{ fontSize: 16, color: "#666", lineHeight: 1.6 }}>
          Real rider-built hubs managed by dedicated coordinators. Connected by #Yes_Yamaha across the map.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {BRANCHES.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.15 }}
            className="yrc-branch-card rounded-xl bg-white"
            style={{
              padding: 32,
              boxShadow: "0 4px 20px rgba(0,48,135,0.1)",
              borderLeft: "4px solid #003087",
            }}
          >
            <div style={{ fontSize: 32, color: "#003087", lineHeight: 1 }}>📍</div>
            <h3 className="mt-4 font-display" style={{ color: "#003087", fontSize: 32, lineHeight: 1.05 }}>
              {b.name}
            </h3>
            <p className="mt-2 font-sans" style={{ fontSize: 13, color: "#0047cc" }}>
              {b.coord}
            </p>
            <p className="mt-3 font-sans" style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>
              {b.desc}
            </p>
            <a
              href="#branch"
              className="mt-5 inline-block font-sans text-sm font-semibold text-[#003087] hover:underline"
            >
              View Branch →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}