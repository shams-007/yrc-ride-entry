import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

export function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f0f4ff 0%, #f8f9ff 50%, #eef2ff 100%)",
        minHeight: "100vh",
      }}
    >
      {/* subtle dot grid texture */}
      <div className="yrc-hero-dots pointer-events-none absolute inset-0" aria-hidden />

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
        { size: 6, top: "18%", left: "12%", duration: 6 },
        { size: 4, top: "65%", left: "42%", duration: 9 },
        { size: 5, top: "30%", left: "78%", duration: 12 },
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

      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-0 lg:grid-rows-1 lg:items-stretch lg:grid-cols-[55fr_45fr] lg:gap-10 lg:px-10">
        {/* LEFT */}
        <div className="relative order-2 flex h-full flex-col justify-center lg:order-1 lg:pl-16">
          {/* red vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            style={{ transformOrigin: "top" }}
            className="absolute left-0 top-0 h-full w-[3px] overflow-hidden bg-[#e60012]"
          >
            <span className="yrc-line-shimmer" aria-hidden />
          </motion.div>

          <div className="pl-6 pt-0">
            <motion.span
              {...fadeUp(0.1)}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e60012] px-4 py-1.5 text-[12px] font-medium text-white"
            >
              🏍 Bangladesh's #1 Riding Community
            </motion.span>

            <h1
              className="mt-4 font-display text-[56px] leading-[0.95] tracking-wide lg:text-[96px]"
              style={{ color: "#003087" }}
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
              className="mt-5 max-w-xl font-sans text-[18px] leading-relaxed"
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
                href="#facebook"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#003087] px-8 py-3 font-sans text-base font-semibold text-[#003087] transition-transform hover:scale-[1.03]"
              >
                Join Facebook Group
              </a>
            </motion.div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative order-1 flex w-full items-stretch justify-center self-stretch lg:order-2 lg:h-full">
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
          <div className="relative h-full min-h-[420px] w-full self-stretch lg:min-h-0">
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
              className="yrc-hero-image relative h-full w-full overflow-hidden rounded-2xl lg:rounded-none"
              style={{ backgroundColor: "#003087" }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <svg
                  aria-hidden
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="5.5" cy="16.5" r="3.5" />
                  <circle cx="18.5" cy="16.5" r="3.5" />
                  <path d="M5.5 16.5h6l3-6h-4" />
                  <path d="M14.5 10.5l4 6" />
                  <path d="M11 7h3" />
                </svg>
                <span
                  className="font-display tracking-widest text-white"
                  style={{ fontSize: "24px", opacity: 0.6 }}
                >
                  PHOTO COMING SOON
                </span>
              </div>
              <div className="yrc-shimmer" aria-hidden />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}