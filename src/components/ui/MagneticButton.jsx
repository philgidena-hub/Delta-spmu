import { useRef, useState } from "react";
import { motion } from "framer-motion";

const STRENGTH = 0.35; // how far the element follows the cursor (0–1)
const SPRING = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 };

export default function MagneticButton({
  children,
  strength = STRENGTH,
  className = "",
  as = "div",
  ...props
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={pos}
      transition={SPRING}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ── Pre-styled example button ── */
export function MagneticCTA({ children = "Enroll Now", ...props }) {
  return (
    <MagneticButton strength={0.4} className="inline-block" {...props}>
      <button
        className="group relative overflow-hidden rounded-none border border-charcoal bg-charcoal
                   px-10 py-4 font-body text-xs font-semibold uppercase tracking-wide text-alabaster
                   transition-colors duration-500 hover:bg-transparent hover:text-charcoal"
      >
        {/* Sliding fill layer */}
        <span
          className="absolute inset-0 origin-left scale-x-0 bg-nude transition-transform
                     duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"
        />
        <span className="relative z-10">{children}</span>
      </button>
    </MagneticButton>
  );
}
