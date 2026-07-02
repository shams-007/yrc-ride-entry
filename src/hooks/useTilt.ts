import { useRef, useCallback } from "react";
import anime from "animejs";

export function useTilt(max = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const rotateY = px * max * 2;
    const rotateX = -py * max * 2;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    if (innerRef.current) {
      innerRef.current.style.transform = `translateX(${-px * max * 0.3 * 2}px) translateY(${-py * max * 0.3 * 2}px)`;
    }
  }, [max]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    anime.remove(el);
    const obj = { rx: parseFloat(el.dataset.rx || "0"), ry: parseFloat(el.dataset.ry || "0") };
    // Extract current values from transform if any
    anime({
      targets: { x: 1 },
      x: 0,
      duration: 400,
      easing: "easeOutElastic(1, 0.5)",
      update: (a) => {
        const p = 1 - (a.progress / 100);
        // Not perfect but simple: fade back via CSS transition
      },
    });
    el.style.transition = "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    if (innerRef.current) {
      innerRef.current.style.transition = "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)";
      innerRef.current.style.transform = "translateX(0) translateY(0)";
    }
    window.setTimeout(() => {
      if (el) el.style.transition = "";
      if (innerRef.current) innerRef.current.style.transition = "";
    }, 420);
    void obj;
  }, []);

  const onMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "";
    if (innerRef.current) innerRef.current.style.transition = "";
  }, []);

  return { ref, innerRef, tiltProps: { onMouseMove, onMouseLeave, onMouseEnter } };
}
