import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import horizonImg from "@/assets/horizon.jpg";
import { playReleaseSound } from "@/hooks/use-ambient-audio";

const VerdictSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-30%" });
  const [released, setReleased] = useState(false);

  const handleRelease = () => {
    setReleased(true);
    playReleaseSound();
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hospital bed with horizon background */}
      <div className="absolute inset-0">
        <motion.img
          src={horizonImg}
          alt="Endless horizon"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={inView ? { opacity: 0.3, scale: 1 } : {}}
          transition={{ duration: 2 }}
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {!released ? (
          <motion.div
            key="verdict"
            className="relative z-10 text-center px-6 max-w-4xl"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="font-mono text-xs tracking-[0.3em] text-clinical mb-4 uppercase"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Section IV — The Verdict
            </motion.p>

            <motion.h2
              className="font-display text-5xl md:text-8xl font-bold text-foreground tracking-wider mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 1 }}
            >
              MERCY IS NOT
              <br />
              <span className="text-faded-gold">A CRIME.</span>
            </motion.h2>

            <motion.p
              className="font-mono text-sm md:text-base text-secondary-foreground leading-relaxed max-w-2xl mx-auto mb-16"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 1.5 }}
            >
              "For a 21-year-old trapped in a broken vessel, the cruelest
              punishment is forcing them to exist without living."
            </motion.p>

            <motion.button
              className="pump-button"
              onClick={handleRelease}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              AUTHORIZE RELEASE [ENTER]
            </motion.button>

            <motion.p
              className="mt-6 font-mono text-[10px] text-smoke/50 tracking-widest"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 2.2 }}
            >
              MORPHINE PUMP CONTROL // PATIENT 21-B
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="release"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            {/* White flood */}
            <motion.div
              className="absolute inset-0"
              initial={{ backgroundColor: "hsl(0 0% 2%)" }}
              animate={{ backgroundColor: "hsl(45 30% 95%)" }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />

            {/* Flatline to peace */}
            <motion.div
              className="relative z-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 2 }}
            >
              <p className="font-display text-2xl md:text-4xl font-light tracking-[0.3em] text-background/60">
                RELEASED
              </p>
              <motion.div
                className="mt-8 w-32 h-px bg-background/30 mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 3, duration: 2 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VerdictSection;
