import { motion } from "framer-motion";
import { BangladeshMap } from "./BangladeshMap";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

export function Hero() {
  const speedLines = [
    { top: "12%", width: 160, height: 2, duration: 1.8, delay: 0 },
    { top: "22%", width: 240, height: 3, duration: 2.2, delay: 0.6 },
    { top: "34%", width: 110, height: 2, duration: 2.6, delay: 1.2 },
    { top: "46%", width: 200, height: 3, duration: 3, delay: 0.3 },
    { top: "58%", width: 140, height: 2, duration: 2.4, delay: 1.6 },
    { top: "68%", width: 220, height: 2, duration: 1.6, delay: 0.9 },
    { top: "78%", width: 180, height: 3, duration: 2.8, delay: 0.2 },
    { top: "88%", width: 130, height: 2, duration: 2, delay: 1.4 },
  ];
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden lg:min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #f0f4ff 0%, #f8f9ff 50%, #eef2ff 100%)",
      }}
    >
      {/* subtle dot grid texture */}
      <div className="yrc-hero-dots pointer-events-none absolute inset-0" aria-hidden />

      {/* animated speed lines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {speedLines.map((l, i) => (
          <span
            key={i}
            className="yrc-speed-line"
            style={{
              position: "absolute",
              top: l.top,
              left: 0,
              width: l.width,
              height: l.height,
              background: "linear-gradient(90deg, transparent, rgba(0,31,94,0.18), transparent)",
              transform: "rotate(2deg)",
              animation: `yrcSpeedLine ${l.duration}s linear ${l.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* motorcycle easter egg */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-5 w-[24px] lg:bottom-10 lg:w-[120px]"
        style={{ zIndex: 1 }}
      >
        <div className="yrc-motorcycle relative h-[12px] w-[24px] lg:h-[60px] lg:w-[120px]">
          {/* exhaust puffs trailing behind the bike (desktop only) */}
          <div className="hidden lg:block">
          {[
            { size: 8, delay: 0, offset: 0 },
            { size: 10, delay: 0.3, offset: 4 },
            { size: 6, delay: 0.6, offset: 8 },
            { size: 9, delay: 0.9, offset: 12 },
          ].map((p, i) => (
            <span
              key={i}
              className="yrc-puff"
              style={{
                width: p.size,
                height: p.size,
                left: -6 - p.offset,
                bottom: 20,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
          </div>
          <svg
            viewBox="0 0 120 60"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            stroke="#003087"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.25 }}
          >
            <circle cx="22" cy="40" r="13" />
            <circle cx="92" cy="40" r="13" />
            <path d="M22 40 L45 40 L55 28 L75 28 L85 40 L92 40" />
            <path d="M55 28 L48 18 L35 18" />
            <path d="M35 18 L30 28 L45 40" />
            <path d="M75 28 L70 18 L95 15 L100 25" />
            <path d="M22 40 L12 40" />
          </svg>
        </div>
      </div>

      {/* large soft radial glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: "-200px",
          right: "-150px",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(0,48,135,0.06) 0%, rgba(0,48,135,0) 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          bottom: "-100px",
          left: "-100px",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(0,71,204,0.04) 0%, rgba(0,71,204,0) 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* floating ambient particles */}
      {[
        { size: 6, top: "18%", left: "60%", duration: 6 },
        { size: 4, top: "65%", left: "72%", duration: 9 },
        { size: 5, top: "30%", left: "85%", duration: 12 },
      ].map((p, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            backgroundColor: "rgba(0,48,135,0.25)",
          }}
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-[1] mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-6 py-0 lg:min-h-screen lg:grid-rows-1 lg:items-stretch lg:grid-cols-[55fr_45fr] lg:gap-10 lg:px-10">
        {/* dashed divider between columns */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 hidden h-full lg:block"
          style={{
            left: "54%",
            width: "1px",
            borderLeft: "1px dashed rgba(0,48,135,0.15)",
          }}
        />
        {/* LEFT */}
        <div className="relative order-2 flex h-full flex-col justify-center pt-6 lg:order-1 lg:pl-16 lg:pt-0">
          {/* red vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            style={{ transformOrigin: "top" }}
            className="absolute left-0 top-0 h-full w-[3px] overflow-hidden bg-[#e60012] lg:left-16"
          >
            <span className="yrc-line-shimmer" aria-hidden />
          </motion.div>

          <div className="pl-6 pt-0">
            <span aria-hidden className="mb-4 block h-[2px] w-20 bg-[#e60012] lg:hidden" />
            <motion.span
              {...fadeUp(0.1)}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e60012] px-4 py-1.5 text-[12px] font-medium text-white"
            >
              🏍 Bangladesh's #1 Riding Community
            </motion.span>

            <h1
              className="mt-4 font-display text-[52px] tracking-wide lg:text-[96px]"
              style={{ color: "#003087", lineHeight: 1.05 }}
            >
              <motion.span {...fadeUp(0.2)} className="block">
                BORN TO RIDE.
              </motion.span>
              <motion.span {...fadeUp(0.35)} className="block">
                BUILT FOR
              </motion.span>
              <motion.span
                {...fadeUp(0.5)}
                className="block"
                style={{ color: "#e60012" }}
              >
                BROTHERHOOD.
              </motion.span>
            </h1>

            <motion.p
              {...fadeUp(0.7)}
              className="mt-5 mb-8 max-w-xl font-sans text-[18px] leading-relaxed"
              style={{ color: "#555" }}
            >
              472,000+ riders. 47 branches. One family. #Yes_Yamaha
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, type: "spring", stiffness: 90, damping: 16 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#events"
                className="inline-flex items-center justify-center rounded-full bg-[#e60012] px-8 py-3 font-sans text-base font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                View Events
              </a>
              <a
                href="https://www.facebook.com/groups/YamahaRidersClubBD"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#003087] px-8 py-3 font-sans text-base font-semibold text-[#003087] transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: "rgba(0,48,135,0.05)" }}
              >
                Join Facebook Group
              </a>
            </motion.div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative order-1 flex w-full items-stretch justify-center self-stretch lg:order-2 lg:h-full lg:items-center">
          {/* soft navy radial glow behind whole column (no clip-path) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(0,48,135,0.10) 0%, rgba(0,48,135,0) 70%)",
              filter: "blur(80px)",
            }}
          />
          <div className="relative h-full max-h-[240px] min-h-[200px] w-full self-stretch lg:h-auto lg:max-h-[520px] lg:min-h-0 lg:self-center" style={{ aspectRatio: "560 / 480" }}>
            {/* rotating ring */}
            <motion.svg
              aria-hidden
              viewBox="0 0 600 600"
              className="absolute inset-0 h-full w-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              <circle
                cx="300"
                cy="300"
                r="280"
                fill="none"
                stroke="#003087"
                strokeOpacity="0.25"
                strokeWidth="1.5"
                strokeDasharray="4 10"
              />
            </motion.svg>

            <motion.div
              initial={{ opacity: 0, x: 60, scale: 1.05 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.3 }}
              className="relative h-full w-full"
            >
              <BangladeshMap />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}