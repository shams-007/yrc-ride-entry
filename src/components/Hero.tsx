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
      className="relative w-full"
      style={{ backgroundColor: "#f8f9ff", minHeight: "100vh" }}
    >
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-24 pb-16 lg:grid-cols-[55fr_45fr] lg:gap-10 lg:px-10 lg:pt-16">
        {/* LEFT */}
        <div className="relative order-2 lg:order-1">
          {/* red vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            style={{ transformOrigin: "top" }}
            className="absolute left-0 top-0 h-full w-[3px] bg-[#e60012]"
          />

          <div className="pl-6">
            <motion.span
              {...fadeUp(0.1)}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e60012] px-4 py-1.5 text-[12px] font-medium text-white"
            >
              🏍 Bangladesh's #1 Riding Community
            </motion.span>

            <h1
              className="mt-6 font-display text-[56px] leading-[0.95] tracking-wide lg:text-[96px]"
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
              className="mt-6 max-w-xl font-sans text-[18px] leading-relaxed"
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
        <div className="relative order-1 flex items-center justify-center lg:order-2">
          <div className="relative w-full max-w-[560px]" style={{ aspectRatio: "560 / 480" }}>
            {/* glow */}
            <div
              className="absolute -inset-10 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,48,135,0.25) 0%, rgba(0,48,135,0) 70%)",
                opacity: 0.6,
              }}
            />

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
              className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-200 lg:rounded-none"
              style={{
                clipPath:
                  typeof window !== "undefined" && window.innerWidth >= 1024
                    ? "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)"
                    : undefined,
              }}
            >
              <div
                className="h-full w-full bg-gray-200 hidden lg:block"
                style={{ clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
              />
              <div className="h-full w-full bg-gray-200 lg:hidden rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}