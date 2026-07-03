import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bikeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const max =
        (document.documentElement.scrollHeight || 0) - window.innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      if (bikeRef.current) {
        bikeRef.current.style.top = `calc(${pct * 100}vh - 16px)`;
      }
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed right-6 top-0 z-40 hidden h-screen lg:block"
      style={{ width: 32 }}
    >
      <div
        className="absolute left-1/2 top-0 h-full"
        style={{
          width: 0,
          borderLeft: "1px dashed rgba(0,48,135,0.2)",
          transform: "translateX(-0.5px)",
        }}
      />
      <div
        ref={bikeRef}
        className="absolute left-0"
        style={{ top: 0, width: 32, height: 32, transition: "top 80ms linear" }}
      >
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="none"
          stroke="#003087"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: "rotate(90deg)" }}
        >
          <circle cx="5.5" cy="16.5" r="3.5" />
          <circle cx="18.5" cy="16.5" r="3.5" />
          <path d="M5.5 16.5h6l3-6h-4" />
          <path d="M14.5 10.5l4 6" />
          <path d="M11 7h3" />
        </svg>
      </div>
    </div>
  );
}