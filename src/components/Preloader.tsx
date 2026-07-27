import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [show, setShow] = useState(true);
  const [speed, setSpeed] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("yrc_preloader")) {
      setShow(false);
      return;
    }

    let startTime: number | null = null;
    const duration = 1500; // 1.5 seconds to hit 100 km/h

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth deceleration easing (easeOutQuart)
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setSpeed(Math.floor(easeOut * 100));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // At 100 km/h, hold for a split second, then slide up
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setShow(false);
            sessionStorage.setItem("yrc_preloader", "true");
          }, 800); // Wait for the exit animation to finish
        }, 300);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  if (!show) return null;

  const circleRadius = 70;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeOffset = circleCircumference - (speed / 100) * circleCircumference;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} // Sleek curtain slide up
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#003087] overflow-hidden"
        >
          <div className="relative flex flex-col items-center justify-center">
            
            {/* The Speedometer Ring */}
            <svg className="w-48 h-48 -rotate-90" viewBox="0 0 160 160">
              {/* Faint Background Track */}
              <circle
                cx="80"
                cy="80"
                r={circleRadius}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3"
              />
              {/* Glowing Progress Track */}
              <circle
                cx="80"
                cy="80"
                r={circleRadius}
                fill="none"
                stroke="#00e5ff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circleCircumference}
                strokeDashoffset={strokeOffset}
                style={{ filter: "drop-shadow(0 0 8px rgba(0,229,255,0.6))" }}
              />
            </svg>

            {/* YRC Logo inside the ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://i.imgur.com/y37rOgL.png" 
                alt="YRC Logo" 
                className="w-20 object-contain"
                // This CSS trick turns your dark logo perfectly white to stand out on the blue background!
                style={{ filter: "brightness(0) invert(1)" }} 
              />
            </div>
          </div>

          {/* Speed Counter */}
          <div className="mt-8 flex flex-col items-center">
            <div className="font-display text-white text-5xl tracking-widest tabular-nums">
              {speed} <span className="text-2xl text-[#00e5ff] tracking-normal">km/h</span>
            </div>
            <div className="mt-2 font-sans text-[10px] text-white/50 tracking-[0.3em] uppercase">
              Igniting Engines
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
