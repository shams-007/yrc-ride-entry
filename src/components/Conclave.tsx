import { useCountUp } from "@/hooks/useCountUp";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const STATS: Array<{ value: number; suffix: string; label: string }> = [
  { value: 5000, suffix: "+", label: "Attendees" },
  { value: 47, suffix: "", label: "Branches United" },
  { value: 3, suffix: "", label: "Days of Celebration" },
];

function ConclaveNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useCountUp(value, { duration: 2000, suffix });
  return <span ref={ref}>0{suffix}</span>;
}

export function Conclave() {
  const ref = useSectionReveal<HTMLElement>();
  return (
    <section ref={ref} className="w-full bg-[#eef2ff] px-6 lg:px-10" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div
          className="flex w-full items-center justify-center rounded-2xl"
          style={{ backgroundColor: "#003087", height: 480, boxShadow: "0 20px 60px rgba(0,48,135,0.2)" }}
        >
          <span className="font-display tracking-widest text-white" style={{ fontSize: 20, opacity: 0.7 }}>
            CONCLAVE PHOTO
          </span>
        </div>

        <div>
          <p className="yrc-reveal font-sans" style={{ fontSize: 12, letterSpacing: "0.2em", color: "#0047cc", textTransform: "uppercase" }}>
            Flagship Event
          </p>
          <h2 className="yrc-heading yrc-reveal mt-3 font-display" style={{ color: "#003087", fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1.05 }}>
            YRC ANNUAL CONCLAVE
          </h2>
          <p className="mt-6 font-sans" style={{ fontSize: 16, color: "#666", lineHeight: 1.7, maxWidth: "65ch" }}>
            The biggest gathering of Yamaha lovers in Bangladesh. Riders from all 47 branches converge for a weekend of brotherhood, competitions, and celebration of everything YRC stands for.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display" style={{ color: "#003087", fontSize: 40, lineHeight: 1 }}>
                  <ConclaveNumber value={s.value} suffix={s.suffix} />
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
            href="https://www.facebook.com/YamahaRidersClubBD"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full px-8 py-3 font-sans text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "#e60012" }}
          >
            VIEW CONCLAVE 2026 HIGHLIGHTS
          </a>
        </div>
      </div>
    </section>
  );
}