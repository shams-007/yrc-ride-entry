import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import anime from "animejs";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useTilt } from "@/hooks/useTilt";

const BRANCHES = [
  { name: "DHAKA CENTRAL", coord: "Managed by Aminul Islam", desc: "The flagship hub for capital riders, weekly meets and city tours." },
  { name: "SYLHET REGIONAL", coord: "Coordinated by Farhana Akter", desc: "Tea-country trails and monsoon expeditions across the northeast." },
  { name: "CHITTAGONG HUB", coord: "Led by Mohammad Sajid", desc: "Coastal cruises, hill rides, and the largest port-city chapter." },
];

function BranchCard({ b, i }: { b: (typeof BRANCHES)[number]; i: number }) {
  const { ref, innerRef, tiltProps } = useTilt(15);
  const onEnter = () => {
    tiltProps.onMouseEnter();
    const el = ref.current;
    if (!el) return;
    anime({
      targets: el,
      borderLeftColor: "#e60012",
      translateY: -8,
      boxShadow: [
        "0 4px 20px rgba(0,48,135,0.1)",
        "0 8px 30px rgba(230,0,18,0.3), 0 0 20px rgba(230,0,18,0.3)",
      ],
      duration: 250,
      easing: "easeOutQuad",
    });
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) {
      anime({
        targets: el,
        borderLeftColor: "#003087",
        translateY: 0,
        boxShadow: [
          "0 8px 30px rgba(230,0,18,0.3), 0 0 20px rgba(230,0,18,0.3)",
          "0 4px 20px rgba(0,48,135,0.1)",
        ],
        duration: 250,
        easing: "easeOutQuad",
      });
    }
    tiltProps.onMouseLeave();
  };
  return (
    <div
      ref={ref}
      onMouseMove={tiltProps.onMouseMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="yrc-branch-card rounded-xl bg-white"
      style={{
        padding: 32,
        boxShadow: "0 4px 20px rgba(0,48,135,0.1)",
        borderLeft: "4px solid #003087",
        transformStyle: "preserve-3d",
        opacity: 0,
        transform: "translateY(30px)",
      }}
      data-branch-idx={i}
    >
      <div ref={innerRef}>
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
      </div>
    </div>
  );
}

export function Branches() {
  const sectionRef = useSectionReveal<HTMLElement>();
  const gridRef = useRef<HTMLDivElement>(null);

  // Reveal cards once on scroll
  useRevealCards(gridRef);

  return (
    <section ref={sectionRef} id="branches" className="yrc-branches-grid relative w-full overflow-hidden bg-white px-6 lg:px-10" style={{ paddingTop: 100, paddingBottom: 100 }}>
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
        <p className="yrc-reveal font-sans" style={{ fontSize: 13, letterSpacing: "0.15em", color: "#0047cc", textTransform: "uppercase" }}>
          Nationwide Network
        </p>
        <h2 className="yrc-heading yrc-reveal mt-3 font-display" style={{ color: "#003087", fontSize: "clamp(40px, 6vw, 56px)", lineHeight: 1.05 }}>
          47 BRANCHES NATIONWIDE
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans" style={{ fontSize: 16, color: "#666", lineHeight: 1.6 }}>
          Real rider-built hubs managed by dedicated coordinators. Connected by #Yes_Yamaha across the map.
        </p>
      </div>

      <div ref={gridRef} className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {BRANCHES.map((b, i) => (
          <BranchCard key={b.name} b={b} i={i} />
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-7xl text-center">
        <Link
          to="/branches"
          className="inline-flex items-center justify-center rounded-full bg-[#003087] px-8 py-3 font-sans text-base font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          View All Branches →
        </Link>
      </div>
    </section>
  );
}

function useRevealCards(gridRef: React.RefObject<HTMLDivElement | null>) {
  useRefEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-branch-idx]"));
    let done = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !done) {
          done = true;
          anime({
            targets: cards,
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 600,
            easing: "easeOutQuart",
            delay: anime.stagger(150),
          });
          io.disconnect();
        }
      }
    }, { threshold: 0.2 });
    io.observe(grid);
    return () => io.disconnect();
  });
}

// tiny alias to avoid another import block
import { useEffect as useRefEffect } from "react";