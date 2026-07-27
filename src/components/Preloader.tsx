// src/components/Preloader.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function RPMCounter() {
  const [rpm, setRpm] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1600; // 1.6 seconds to hit redline
    const target = 14000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-in: starts slow, accelerates violently at the end
      const easeInCubic = progress * progress * progress;
      setRpm(Math.floor(easeInCubic * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, []);

  return <span>{rpm.toLocaleString()} RPM</span>;
}

export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only show the preloader once per session
    if (sessionStorage.getItem("yrc_preloader")) {
      setShow(false);
      return;
    }
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("yrc_preloader", "true");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#09090b] overflow-hidden"
        >
          {/* Red Flash at redline */}
          <motion.div
            className="absolute inset-0 bg-[#e60012] mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 0] }}
            transition={{ duration: 2, times: [0, 0.85, 0.9, 1] }}
          />

          <div className="relative flex flex-col items-center z-10">
            <motion.div
              className="font-display text-[#e60012] text-7xl md:text-9xl italic tracking-tighter"
              initial={{ opacity: 0, scale: 0.8, x: -80, skewX: 25, filter: "blur(15px)" }}
              animate={{ opacity: 1, scale: 1, x: 0, skewX: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              IGNITION
            </motion.div>
            
            {/* Rapid RPM Counter */}
            <motion.div
              className="mt-2 font-display text-white text-4xl md:text-6xl tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <RPMCounter />
            </motion.div>
            
            <motion.div 
              className="mt-4 h-1.5 bg-[#e60012]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: "easeIn" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
