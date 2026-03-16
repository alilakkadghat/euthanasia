import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import hospitalScene from "@/assets/hospital-scene.jpg";
import { useHeartbeepSound } from "@/hooks/use-ambient-audio";

// EKG heartbeat path data — heartbeat pattern followed by flatline
const EKG_HEARTBEAT_PATH =
  "M0,50 L30,50 L35,50 L40,30 L45,70 L50,20 L55,80 L60,50 L90,50 " +
  "L120,50 L125,50 L130,30 L135,70 L140,20 L145,80 L150,50 L180,50 " +
  "L210,50 L215,50 L220,35 L225,65 L230,30 L235,70 L240,50 L270,50 " +
  "L300,50 L310,50 L315,42 L320,55 L325,48 L330,50 L400,50";

const EKGAnimation = () => {
  const [phase, setPhase] = useState<"beat" | "flat" | "done">("beat");
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    // At ~3s, start flatlining
    const t1 = setTimeout(() => setPhase("flat"), 3000);
    // At ~5s, fade everything out
    const t2 = setTimeout(() => setPhase("done"), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex items-center">
      <svg
        viewBox="0 0 400 100"
        className="w-full h-24 md:h-32"
        preserveAspectRatio="none"
      >
        {/* Heartbeat waveform */}
        <motion.path
          ref={pathRef}
          d={EKG_HEARTBEAT_PATH}
          fill="none"
          stroke="hsl(var(--clinical))"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={pathLength || 800}
          initial={{ strokeDashoffset: pathLength || 800, opacity: 0.2 }}
          animate={
            phase === "beat"
              ? { strokeDashoffset: 0, opacity: 0.2 }
              : { opacity: 0 }
          }
          transition={
            phase === "beat"
              ? { strokeDashoffset: { duration: 3, ease: "linear" }, opacity: { duration: 0.5 } }
              : { opacity: { duration: 1.5 } }
          }
        />

        {/* Flatline */}
        {phase === "flat" && (
          <motion.line
            x1="0"
            y1="50"
            x2="400"
            y2="50"
            stroke="hsl(var(--clinical))"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0.2, 0] }}
            transition={{ duration: 2, times: [0, 0.2, 0.7, 1] }}
          />
        )}
      </svg>
    </div>
  );
};

const SceneSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-30%" });
  useHeartbeepSound(inView);

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
      data-nav-id="hero"
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

        {/* EKG Animation */}
        <EKGAnimation />

        {/* Case file text overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.p
            className="font-mono text-xs tracking-[0.4em] text-clinical mb-6 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 25 }}
            transition={{ delay: 1, duration: 2 }}
          >
            CASE FILE — MINISTRY OF HEALTH & FAMILY WELFARE
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
