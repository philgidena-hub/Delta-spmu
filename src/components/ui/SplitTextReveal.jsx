import { useMemo } from "react";
import { motion } from "framer-motion";

const wrapperVariants = {
  hidden: {},
  visible: (stagger) => ({
    transition: { staggerChildren: stagger },
  }),
};

const unitVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * SplitTextReveal
 *
 * @param {string}  text          – The string to animate
 * @param {"words"|"chars"} split – Split strategy (default: "words")
 * @param {string}  as            – Wrapper element tag (default: "h2")
 * @param {number}  stagger       – Seconds between each unit (default: 0.08)
 * @param {string}  className     – Classes on the outer wrapper
 * @param {object}  viewport      – Framer `whileInView` viewport options
 * @param {boolean} once          – Animate only once (default: true)
 */
export default function SplitTextReveal({
  text,
  split = "words",
  as: Tag = "h2",
  stagger = 0.08,
  className = "",
  viewport = { once: true, margin: "-80px" },
  once = true,
}) {
  const MotionTag = motion[Tag] ?? motion.h2;

  const units = useMemo(() => {
    if (split === "chars") {
      // Split into words, then chars — preserves word spacing
      return text.split(" ").map((word, wi, arr) => ({
        key: `w${wi}`,
        chars: [...word].concat(wi < arr.length - 1 ? ["\u00A0"] : []),
      }));
    }
    // Default: word split
    return text.split(" ").map((word) => word);
  }, [text, split]);

  return (
    <MotionTag
      variants={wrapperVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewport, once }}
      custom={stagger}
      className={className}
    >
      {split === "chars"
        ? units.map((wordGroup) => (
            <span key={wordGroup.key} className="inline-block whitespace-nowrap">
              {wordGroup.chars.map((char, ci) => (
                <span key={ci} className="inline-block overflow-hidden">
                  <motion.span variants={unitVariants} className="inline-block">
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
          ))
        : units.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span variants={unitVariants} className="inline-block">
                {word}
              </motion.span>
              {i < units.length - 1 && <>&nbsp;</>}
            </span>
          ))}
    </MotionTag>
  );
}
