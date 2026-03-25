import { useState, useCallback } from "react";

/* ── UI chrome ── */
import Preloader from "./components/ui/Preloader";
import NoiseOverlay from "./components/ui/NoiseOverlay";
import SmoothScroll from "./components/ui/SmoothScroll";
import CustomCursor from "./components/ui/CustomCursor";

/* ── Sections ── */
import Hero from "./components/Hero";
import About from "./components/About";
import BusinessEdge from "./components/BusinessEdge";
import HowItWorks from "./components/HowItWorks";
import Programs from "./components/Programs";
import Certification from "./components/Certification";
import Safety from "./components/Safety";
import Admissions from "./components/Admissions";
import FooterCTA from "./components/FooterCTA";

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), []);

  return (
    <>
      {/* ── Preloader: self-unmounts, then fires onComplete ── */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* ── Persistent overlays ── */}
      <NoiseOverlay />
      <CustomCursor />

      {/* ── Main content: Lenis mounts only after preloader exits ── */}
      {preloaderDone ? (
        <SmoothScroll>
          <main>
            <Hero />
            <About />
            <BusinessEdge />
            <HowItWorks />
            <Programs />
            <Certification />
            <Safety />
            <Admissions />
            <FooterCTA />
          </main>
        </SmoothScroll>
      ) : (
        <main aria-hidden="true" className="invisible">
          <Hero />
          <About />
          <BusinessEdge />
          <HowItWorks />
          <Programs />
          <Certification />
          <Safety />
          <Admissions />
          <FooterCTA />
        </main>
      )}
    </>
  );
}

export default App;
