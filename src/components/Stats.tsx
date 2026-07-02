import { useCountUp } from "@/hooks/useCountUp";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const STATS = [
  { value: 472000, suffix: "+", label: "COMMUNITY MEMBERS" },
  { value: 47, suffix: "", label: "REGIONAL BRANCHES" },
  { value: 70000, suffix: "+", label: "ACTIVE ENGAGERS" },
  { value: 200, suffix: "", label: "SPEED BREAKERS PAINTED" },
] as const;

function StatNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useCountUp(value, { duration: 2500, suffix });
  return <span ref={ref}>0{suffix}</span>;
}

export function Stats() {
  const ref = useSectionReveal();

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
        <div className="mx-auto max-w-7xl text-center">
          <p
            className="yrc-reveal font-sans"
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
            className="yrc-heading yrc-reveal mt-3 font-display"
            style={{ color: "#003087", fontSize: "clamp(36px, 6vw, 56px)", lineHeight: 1 }}
          >
            THE POWER OF COMMUNITY
          </h2>
        </div>

        <div className="yrc-stats-grid mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {STATS.map((s, i) => (
            <div
              key={s.label}
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
                  <StatNumber value={s.value} suffix={s.suffix} />
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
            </div>
          ))}
        </div>
      </section>
    </>
  );
}