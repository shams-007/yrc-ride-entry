import { useEffect, useRef } from "react";
import anime from "animejs";

export function useCountUp(target: number, opts?: { duration?: number; suffix?: string; threshold?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const duration = opts?.duration ?? 2500;
  const suffix = opts?.suffix ?? "";
  const threshold = opts?.threshold ?? 0.2;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = "0" + suffix;
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !done) {
            done = true;
            const obj = { v: 0 };
            anime({
              targets: obj,
              v: target,
              round: 1,
              duration,
              easing: "easeOutExpo",
              update: () => {
                if (el) el.textContent = obj.v.toLocaleString() + suffix;
              },
              complete: () => {
                if (!el) return;
                anime({
                  targets: el,
                  scale: [1, 1.05, 1],
                  duration: 400,
                  easing: "easeOutQuad",
                });
              },
            });
            if (el) {
              (el.style as CSSStyleDeclaration).display = el.style.display || "inline-block";
            }
            io.disconnect();
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration, suffix, threshold]);

  return ref;
}
