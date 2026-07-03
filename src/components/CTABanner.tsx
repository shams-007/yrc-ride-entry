import { useEffect, useRef } from "react";
import anime from "animejs";
import { AppBadges } from "./AppBadges";

const HEADING = "READY TO RIDE WITH US?";

export function CTABanner() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const h = headingRef.current;
    if (!h) return;
    const letters = h.querySelectorAll<HTMLElement>(".yrc-letter");
    letters.forEach((l) => { l.style.opacity = "0"; l.style.transform = "translateY(50px)"; });
    let done = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !done) {
          done = true;
          anime({
            targets: Array.from(letters),
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 500,
            easing: "easeOutQuart",
            delay: anime.stagger(40),
          });
          io.disconnect();
        }
      }
    }, { threshold: 0.2 });
    io.observe(h);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="join"
      className="relative w-full overflow-hidden px-6 lg:px-10"
      style={{ backgroundColor: "#eef2ff", paddingTop: 100, paddingBottom: 100 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 600,
          height: 600,
          background: "rgba(0,48,135,0.05)",
          filter: "blur(150px)",
        }}
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 ref={headingRef} className="yrc-heading font-display" style={{ color: "#003087", fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1.05 }} aria-label={HEADING}>
          {HEADING.split("").map((ch, i) =>
            ch === " " ? (
              <span key={i}>&nbsp;</span>
            ) : (
              <span key={i} className="yrc-letter" style={{ display: "inline-block" }}>
                {ch}
              </span>
            ),
          )}
        </h2>
        <p className="mx-auto mt-5 font-sans" style={{ fontSize: 18, color: "#666", lineHeight: 1.6 }}>
          Join 472,000+ riders across Bangladesh. Download the YRC app or connect with us on Facebook.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://play.google.com/store/apps/details?id=com.ridersclubyrcbd.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-10 py-4 font-sans text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: "#e60012" }}
          >
            DOWNLOAD YRC APP
          </a>
          <a
            href="https://www.facebook.com/groups/YamahaRidersClubBD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border-2 px-10 py-4 font-sans text-sm font-semibold transition-transform hover:scale-[1.03]"
            style={{ borderColor: "#003087", color: "#003087", backgroundColor: "rgba(0,48,135,0.05)" }}
          >
            JOIN FACEBOOK GROUP
          </a>
        </div>
        <div className="mt-4 flex justify-center">
          <AppBadges />
        </div>
      </div>
    </section>
  );
}