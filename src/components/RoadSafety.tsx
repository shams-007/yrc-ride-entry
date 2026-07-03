import { useCountUp } from "@/hooks/useCountUp";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const STATS: Array<{ value: number; suffix: string; label: string }> = [
  { value: 200, suffix: "", label: "Speed Breakers" },
  { value: 17, suffix: "", label: "Locations" },
  { value: 10, suffix: "+", label: "Campaigns" },
];

function SafetyNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useCountUp(value, { duration: 1800, suffix });
  return <span ref={ref}>0{suffix}</span>;
}

export function RoadSafety() {
  const ref = useSectionReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      id="road-safety"
      className="relative w-full overflow-hidden px-6 lg:px-10"
      style={{ backgroundColor: "#003087", paddingTop: 100, paddingBottom: 100 }}
    >
      {/* headlight beam sweep */}
      <svg
        aria-hidden
        className="yrc-beam pointer-events-none absolute"
        style={{ top: "20%", left: "10%", zIndex: 0 }}
        width="600"
        height="300"
        viewBox="0 0 600 300"
      >
        <polygon
          points="0,150 600,0 600,300"
          fill="#ffffff"
          fillOpacity="0.04"
        />
      </svg>
      <div className="relative z-[1] mx-auto max-w-4xl text-center">
        <p
          className="yrc-reveal font-sans"
          style={{ fontSize: 13, letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}
        >
          Our Mission
        </p>
        <h2 className="yrc-heading yrc-reveal mt-3 font-display text-white" style={{ fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1.05 }}>
          SAVING LIVES, ONE SPEED BREAKER AT A TIME
        </h2>
        <p
          className="mx-auto mt-6 font-sans"
          style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", maxWidth: 720 }}
        >
          We started with a simple belief — riders should look out for riders. Today our teams across 17 locations actively lead road safety campaigns, painting speed breakers and conducting group ride training.
        </p>
      </div>

      <div className="relative z-[1] mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-6 text-center">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="font-display text-white" style={{ fontSize: "clamp(48px, 7vw, 72px)", lineHeight: 1 }}>
              <SafetyNumber value={s.value} suffix={s.suffix} />
            </div>
            <div
              className="mt-2 font-sans"
              style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-[1] mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {[0, 1].map((i) => (
          <div
            key={i}
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
          </div>
        ))}
      </div>

      <div className="relative z-[1] mx-auto mt-12 flex max-w-5xl justify-center">
        <a
          href="/road-safety"
          className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#003087]"
        >
          LEARN ABOUT OUR SAFETY WORK
        </a>
      </div>
    </section>
  );
}