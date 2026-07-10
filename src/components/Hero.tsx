// src/components/Hero.tsx
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
      className="relative w-full overflow-hidden pt-20 lg:pt-0 lg:min-h-screen"
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

      {/* motorcycle easter egg - SIZES INCREASED FOR MOBILE */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-8 w-[80px] lg:bottom-10 lg:w-[120px]"
        style={{ zIndex: 1 }}
      >
        <div className="yrc-motorcycle relative h-[40px] w-[80px] lg:h-[60px] lg:w-[120px]">
          {/* exhaust puffs trailing behind the bike - UNHIDDEN FOR MOBILE */}
          <div className="block">
          {[
            { size: 6, delay: 0, offset: 0 },
            { size: 8, delay: 0.3, offset: 2 },
            { size: 5, delay: 0.6, offset: 4 },
            { size: 7, delay: 0.9, offset: 6 },
          ].map((p, i) => (
            <span
              key={i}
              className="yrc-puff"
              style={{
                width: p.size,
                height: p.size,
                left: -2 - p.offset,
                bottom: "20%",
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
          </div>
          <svg
            viewBox="0 0 80 80"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            fill="#003087"
            style={{ opacity: 0.35 }}
          >
            <path d="M71,48a7.91,7.91,0,0,0-2.08.28l-13-31.66A1,1,0,0,0,55,16H43a1,1,0,0,0,0,2H54.33L67.06,49A8,8,0,1,0,71,48Zm0,14a6,6,0,0,1-3.17-11.09l2.24,5.47A1,1,0,0,0,71,57a.84.84,0,0,0,.38-.08,1,1,0,0,0,.55-1.3l-2.25-5.47A5.81,5.81,0,0,1,71,50a6,6,0,0,1,0,12ZM10.5,46h42a7.5,7.5,0,0,0,0-15h-12a7.48,7.48,0,0,0-3.73,1H12.6A3.61,3.61,0,0,0,9,35.6v1.68A4.49,4.49,0,0,0,10.5,46Zm30-13h12a5.5,5.5,0,0,1,0,11h-12a5.5,5.5,0,0,1,0-11ZM11,35.6A1.6,1.6,0,0,1,12.6,34H34.51a7.6,7.6,0,0,0-1.36,3H11ZM10.5,39H33a7.45,7.45,0,0,0,2.39,5H10.5a2.5,2.5,0,0,1,0-5ZM2,60H7.09a8,8,0,0,0,13.82,0H25a1,1,0,0,0,1-1V57h2.39a3.61,3.61,0,0,0,3.21,2H48.4A3.61,3.61,0,0,0,52,55.4V49a1,1,0,0,0-1-1H29a1,1,0,0,0-1,1v6H26V53a1,1,0,0,0-1-1H20.91A8,8,0,0,0,7.09,52H2a1,1,0,0,0-1,1v6A1,1,0,0,0,2,60ZM49,50h1v5.4a1.59,1.59,0,0,1-1,1.48Zm-4,0h2v7H45Zm-5,0h3v7H40Zm-5,0h3v7H35Zm-5,0h3v7H31.6A1.6,1.6,0,0,1,30,55.4ZM14,62a6,6,0,0,1-4.47-2h8.94A6,6,0,0,1,14,62Zm0-12a6,6,0,0,1,4.47,2H9.53A6,6,0,0,1,14,50ZM3,54H24v4H3Z"/>
          </svg>
        </div>
      </div>

      {/* large soft radial glows - BLUR REMOVED TO FIX LAG */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: "-200px",
          right: "-150px",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(0,48,135,0.06) 0%, rgba(0,48,135,0) 70%)",
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
          background: "radial-gradient(circle, rgba(0,71,204,0.04) 0%, rgba(0,71,204,0) 70%)",
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

      <div className="relative z-[1] mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:min-h-screen lg:grid-rows-1 lg:items-stretch lg:grid-cols-[55fr_45fr] lg:gap-10 lg:px-10">
        
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

        {/* LEFT COLUMN (Text) */}
        <div className="relative order-2 flex h-full w-full flex-col justify-center py-12 lg:order-1 lg:py-0">
          {/* red vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            style={{ transformOrigin: "top" }}
            className="absolute left-0 top-12 bottom-12 w-[3px] overflow-hidden bg-[#e60012] lg:top-0 lg:bottom-0 lg:left-0"
          >
            <span className="yrc-line-shimmer" aria-hidden />
          </motion.div>

          <div className="pl-8 sm:pl-10 lg:pl-16">
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

        {/* RIGHT COLUMN (Map) */}
        <div className="relative order-1 flex w-full items-center justify-center pt-8 pb-4 lg:order-2 lg:h-full lg:py-0">
          {/* soft navy radial glow behind whole column - BLUR REMOVED */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(0,48,135,0.10) 0%, rgba(0,48,135,0) 70%)",
            }}
          />
          
          <div className="relative w-full max-w-[400px] min-h-[420px] lg:min-h-0 lg:max-w-none lg:h-auto lg:max-h-[520px] lg:aspect-[560/480]">
            {/* rotating ring */}
            <motion.svg
              aria-hidden
              viewBox="0 0 600 600"
              className="absolute inset-0 h-full w-full pointer-events-none"
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
              className="relative h-full w-full flex flex-col justify-center"
            >
              <BangladeshMap height="100%" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
