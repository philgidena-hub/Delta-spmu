import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SPRING = { damping: 25, stiffness: 300, mass: 0.5 };

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const x = useSpring(cursorX, SPRING);
  const y = useSpring(cursorY, SPRING);

  useEffect(() => {
    /* ── Hide on touch devices ── */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [cursorX, cursorY, visible]);

  /* ── Track hover over interactive elements ── */
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onOver = (e) => {
      if (e.target.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']")) {
        setHovered(true);
      }
    };
    const onOut = (e) => {
      if (e.target.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']")) {
        setHovered(false);
      }
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  /* Don't render on touch devices */
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9997] rounded-full bg-nude"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: hovered ? "difference" : "normal",
      }}
      animate={{
        width: hovered ? 48 : 12,
        height: hovered ? 48 : 12,
        opacity: visible ? (hovered ? 0.5 : 1) : 0,
      }}
      transition={{ type: "spring", ...SPRING }}
    />
  );
}
