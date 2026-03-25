import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [showBrand, setShowBrand] = useState(false);
  const [exit, setExit] = useState(false);

  /* ── Rapid counter: 0 → 100 ── */
  useEffect(() => {
    if (count >= 100) {
      setShowBrand(true);
      const brandTimer = setTimeout(() => setExit(true), 1400);
      return () => clearTimeout(brandTimer);
    }

    const speed = count < 30 ? 28 : count < 70 ? 18 : 12;
    const timer = setTimeout(() => setCount((c) => Math.min(c + 1, 100)), speed);
    return () => clearTimeout(timer);
  }, [count]);

  /* ── Lock scroll while preloader is visible ── */
  useEffect(() => {
    if (!exit) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [exit]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={(def) => {
            if (def?.y === "-100%") onComplete?.();
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-charcoal"
        >
          <AnimatePresence mode="wait">
            {!showBrand ? (
              /* ── Counter ── */
              <motion.span
                key="counter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="font-body text-[clamp(2rem,8vw,5rem)] font-extralight tracking-editorial text-alabaster/80 tabular-nums"
              >
                {count}%
              </motion.span>
            ) : (
              /* ── Brand reveal ── */
              <motion.div
                key="brand"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-3 text-center"
              >
                {/* Decorative rule */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-2 block h-px w-16 origin-center bg-nude/40"
                />

                <h1 className="font-heading text-[clamp(2.2rem,7vw,4.5rem)] font-light leading-none tracking-editorial text-alabaster">
                  DELTA SPMU
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                  className="font-body text-[clamp(0.7rem,1.6vw,0.95rem)] font-light uppercase tracking-wide text-nude"
                >
                  Sacred Transformation
                </motion.p>

                {/* Decorative rule */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-2 block h-px w-16 origin-center bg-nude/40"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
