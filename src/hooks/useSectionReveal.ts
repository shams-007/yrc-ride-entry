import { useEffect, useRef } from "react";
import anime from "animejs";

/**
 * Reveals children with class `yrc-reveal` inside container on scroll into view.
 * Applies translateY:50->0, opacity:0->1, stagger 100ms.
 */
export function useSectionReveal(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".yrc-reveal");
    if (!targets.length) return;
    targets.forEach((t) => {
      t.style.opacity = "0";
      t.style.transform = "translateY(50px)";
    });
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !done) {
            done = true;
            anime({
              targets: Array.from(targets),
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 600,
              easing: "easeOutQuart",
              delay: anime.stagger(100),
            });
            io.disconnect();
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}
