import { useEffect, useRef } from "react";
import anime from "animejs";
import { AppBadges } from "./AppBadges";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useTilt } from "@/hooks/useTilt";

type CardVariant = "outline" | "filled";
type Card = {
  icon: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  external?: boolean;
  variant: CardVariant;
  withBadges?: boolean;
};
const CARDS: Card[] = [
  {
    icon: "🏍",
    title: "SHOWROOM MEMBERSHIP",
    body: "Visit any authorized ACI Motors Yamaha showroom nationwide. Show your Yamaha ownership documents and register on the spot.",
    cta: "FIND A SHOWROOM",
    href: "https://www.facebook.com/YamahaRidersClubBD",
    external: true,
    variant: "outline",
  },
  {
    icon: "📱",
    title: "APP MEMBERSHIP",
    body: "Download the YRC BD App, create your profile, and connect with your nearest branch coordinator to activate your membership.",
    cta: "DOWNLOAD APP",
    href: "https://play.google.com/store/apps/details?id=com.ridersclubyrcbd.app",
    external: true,
    variant: "filled",
    withBadges: true,
  },
];

function MembershipCard({ c, index }: { c: Card; index: number }) {
  const { ref, innerRef, tiltProps } = useTilt(15);
  return (
    <div
      ref={ref}
      {...tiltProps}
      data-mship-index={index}
      className="yrc-membership-card flex flex-col items-start rounded-2xl bg-white p-8"
      style={{ boxShadow: "0 4px 20px rgba(0,48,135,0.1)", transformStyle: "preserve-3d", opacity: 0 }}
    >
      <div ref={innerRef} style={{ width: "100%" }}>
        <div style={{ fontSize: 40 }}>{c.icon}</div>
        <h3 className="mt-4 font-display" style={{ color: "#003087", fontSize: 28, lineHeight: 1.1 }}>
          {c.title}
        </h3>
        <p className="mt-3 font-sans" style={{ fontSize: 14, lineHeight: 1.7, color: "#666" }}>
          {c.body}
        </p>
        <a
          href={c.href}
          {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={
            c.variant === "filled"
              ? "mt-6 inline-flex items-center justify-center rounded-full bg-[#e60012] px-6 py-2.5 font-sans text-sm font-semibold text-white transition-transform hover:scale-105"
              : "mt-6 inline-flex items-center justify-center rounded-full border-2 border-[#003087] px-6 py-2.5 font-sans text-sm font-semibold text-[#003087] transition-colors hover:bg-[#003087] hover:text-white"
          }
        >
          {c.cta}
        </a>
        {c.withBadges && <AppBadges />}
      </div>
    </div>
  );
}

export function Membership() {
  const sectionRef = useSectionReveal<HTMLElement>();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-mship-index]"));
    cards.forEach((c) => {
      const idx = Number(c.dataset.mshipIndex);
      c.style.opacity = "0";
      c.style.transform = `translateX(${idx === 0 ? -60 : 60}px)`;
    });
    let done = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !done) {
          done = true;
          anime({
            targets: cards,
            translateX: (_el: HTMLElement, i: number) => [i === 0 ? -60 : 60, 0],
            opacity: [0, 1],
            duration: 700,
            easing: "easeOutQuart",
          });
          io.disconnect();
        }
      }
    }, { threshold: 0.2 });
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="membership"
      className="w-full px-6 lg:px-10"
      style={{ backgroundColor: "#f8f9ff", paddingTop: 100, paddingBottom: 100 }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p
          className="yrc-reveal font-sans"
          style={{ fontSize: 13, letterSpacing: "0.2em", color: "#0047cc", textTransform: "uppercase" }}
        >
          Join the Family
        </p>
        <h2
          className="yrc-heading yrc-reveal mt-3 font-display"
          style={{ color: "#003087", fontSize: "clamp(40px, 5.5vw, 56px)", lineHeight: 1.05 }}
        >
          BECOME A YRC MEMBER
        </h2>
        <p className="mx-auto mt-6 font-sans" style={{ fontSize: 16, lineHeight: 1.7, color: "#666" }}>
          Membership is open to all Yamaha motorcycle owners in Bangladesh. Visit your nearest authorized Yamaha showroom or download the YRC app to get started.
        </p>
      </div>

      <div ref={gridRef} className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {CARDS.map((c, i) => (
          <MembershipCard key={c.title} c={c} index={i} />
        ))}
      </div>
    </section>
  );
}