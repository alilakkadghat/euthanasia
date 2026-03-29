import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useVentilatorSound, useHeartbeepSound } from "@/hooks/use-ambient-audio";

const breathingLines = [
  { text: "I want to graduate.", type: "inhale" },
  { text: "I want to scream.", type: "exhale" },
  { text: "I am 19 years old.", type: "inhale" },
  { text: "I am 32 years old.", type: "exhale" },
  { text: "I want to choose.", type: "inhale" },
];

const PrisonSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40%" });
  const [currentLine, setCurrentLine] = useState(0);
  useVentilatorSound(inView);
  useHeartbeepSound(inView);
  const [lockScroll, setLockScroll] = useState(false);
  const [hasLocked, setHasLocked] = useState(false);
  const [showRestored, setShowRestored] = useState(false);

  // Scroll lock effect
  const preventScroll = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (inView && !hasLocked) {
      setLockScroll(true);
      setHasLocked(true);
      document.body.classList.add("cursor-none");

      // Lock scroll
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });

      // Unlock after 4 seconds
      const timer = setTimeout(() => {
        setLockScroll(false);
        setShowRestored(true);
        setTimeout(() => setShowRestored(false), 1500);
        document.body.classList.remove("cursor-none");
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
      }, 4000);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
        document.body.classList.remove("cursor-none");
      };
    }
  }, [inView, hasLocked, preventScroll]);

  // Cycle through breathing lines
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % breathingLines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
      data-nav-id="prison"
    >
      {/* Pitch black with subtle clinical glow */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-void)" }} />

      {/* Ventilator text */}
      <div className="relative z-10 text-center px-6">
        {/* Ventilator indicator */}
        <motion.div
          className="mb-16 flex items-center justify-center gap-4 font-mono text-xs text-clinical/60"
          animate={inView ? { opacity: [0.3, 0.8, 0.3] } : {}}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span>HISS</span>
          <span className="text-alert">●</span>
          <span>CLICK</span>
          <span className="text-alert">●</span>
          <span>SILENCE</span>
        </motion.div>

        {/* Breathing text */}
        <div className="h-32 flex items-center justify-center">
          {breathingLines.map((line, i) => (
            <motion.p
              key={i}
              className={`absolute font-display text-3xl md:text-6xl font-light tracking-wide ${line.type === "inhale" ? "text-foreground" : "text-smoke"
                }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                currentLine === i
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        {/* Breathing label */}
        <motion.p
          className="mt-16 font-mono text-[10px] tracking-[0.5em] uppercase"
          animate={{
            color: breathingLines[currentLine]?.type === "inhale"
              ? "hsl(var(--clinical))"
              : "hsl(var(--alert))",
          }}
          transition={{ duration: 1 }}
        >
          {breathingLines[currentLine]?.type === "inhale" ? "[ INHALE ]" : "[ EXHALE ]"}
        </motion.p>

        {/* Scroll lock indicator */}
        {lockScroll && (
          <motion.p
            className="mt-12 font-mono text-[10px] text-alert/70 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: 1 }}
          >
            AUTONOMY REVOKED — PLEASE WAIT
          </motion.p>
        )}

        {showRestored && (
          <motion.p
            className="mt-4 font-mono text-[10px] tracking-widest"
            style={{ color: "#4CAF50" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, times: [0, 0.2, 0.8, 1] }}
          >
            [ AUTONOMY RESTORED ]
          </motion.p>
        )}
      </div>

      {/* Edge glow */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default PrisonSection;
