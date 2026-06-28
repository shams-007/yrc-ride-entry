import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: 472000, suffix: "+", label: "COMMUNITY MEMBERS" },
  { value: 47, suffix: "", label: "REGIONAL BRANCHES" },
  { value: 70000, suffix: "+", label: "ACTIVE ENGAGERS" },
  { value: 200, suffix: "", label: "SPEED BREAKERS PAINTED" },
] as const;

function CountUp({ target, run }: { target: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const duration = 2000;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return <>{n.toLocaleString()}</>;
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <>
      {/* divider */}
      <div aria-hidden style={{ height: 1, backgroundColor: "rgba(0,48,135,0.10)" }} />
      <section
        ref={ref}
        id="stats"
        className="w-full px-6 py-20 lg:px-10"
        style={{ backgroundColor: "#eef2ff" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-7xl text-center"
        >
          <p
            className="font-sans"
            style={{
              fontSize: 13,
              letterSpacing: "0.15em",
              color: "#0047cc",
              textTransform: "uppercase",
            }}
          >
            By The Numbers
          </p>
          <h2
            className="mt-3 font-display"
            style={{ color: "#003087", fontSize: "clamp(36px, 6vw, 56px)", lineHeight: 1 }}
          >
            THE POWER OF COMMUNITY
          </h2>
        </motion.div>

        <div className="yrc-stats-grid mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.15 }}
              className="yrc-stat-block group relative flex items-center overflow-hidden"
            >
              <span
                className="yrc-stat-border"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  backgroundColor: "#e60012",
                  animationDelay: `${i * 0.5}s`,
                }}
              />
              <div
                className="pl-5 transition-transform duration-200 group-hover:scale-[1.05]"
                style={{ transformOrigin: "left center" }}
              >
                <div
                  className="yrc-stat-number font-display"
                  style={{ color: "#003087", lineHeight: 1 }}
                >
                  <CountUp target={s.value} run={inView} />
                  {s.suffix}
                </div>
                <div
                  className="yrc-stat-label mt-2 font-sans"
                  style={{
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    color: "#444",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}