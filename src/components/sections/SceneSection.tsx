import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import hospitalScene from "@/assets/hospital-scene.jpg";

const SceneSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-20%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.6], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[200vh] overflow-hidden"
    >
      <div className="sticky top-0 h-screen overflow-hidden vignette scanlines">
        {/* Background image */}
        <motion.div
          className="absolute inset-0"
          style={{ scale, opacity }}
        >
          <img
            src={hospitalScene}
            alt="Hospital bed in darkness"
            className="w-full h-full object-cover flicker"
            loading="eager"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-background/40" />
        </motion.div>

        {/* Case file text overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.p
            className="font-mono text-xs tracking-[0.4em] text-clinical mb-6 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
          >
            Classified Document // Eyes Only
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-8xl font-bold tracking-wider text-foreground glitch-text"
            data-text="THE INTERRUPTED DEGREE"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          >
            THE INTERRUPTED DEGREE
          </motion.h1>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
          >
            <span className="stamp text-alert text-sm">
              CASE FILE: 21-B. THE SCHOLAR.
            </span>
          </motion.div>

          <motion.p
            className="mt-12 font-mono text-xs text-smoke tracking-widest animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            [ SCROLL TO PROCEED ]
          </motion.p>
        </motion.div>

        {/* EKG line at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-alert/30 z-10"
          style={{ opacity }}
        />
      </div>
    </section>
  );
};

export default SceneSection;
