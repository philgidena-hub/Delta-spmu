import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.07,
        duration: 1.4,
        smoothTouch: false,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
