import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useHeartbeepSound } from "@/hooks/use-ambient-audio";

const EthicalDilemmaSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: "-30%" });
    useHeartbeepSound(inView);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Map scroll progress to scale tip rotation: -8deg to 8deg
    const scaleRotation = useTransform(scrollYProgress, [0.2, 0.6], [-8, 8]);

    return (
        <section
            ref={ref}
            className="relative min-h-[200vh] py-24 md:py-32 px-6 md:px-16 lg:px-24"
            style={{ backgroundColor: "#0e0b08" }}
            data-nav-id="dilemma"
        >
            {/* Section label */}
            <p className="absolute top-8 left-6 md:left-16 font-mono text-[10px] tracking-[0.4em] text-smoke/40 uppercase">
                SECTION III — THE DILEMMA
            </p>

            <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center">
                {/* Beat 1 — The Scale */}
                <motion.div
                    className="relative w-full max-w-lg mx-auto mb-20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    {/* Scale SVG */}
                    <svg viewBox="0 0 400 280" className="w-full" fill="none">
                        {/* Pivot / fulcrum */}
                        <polygon
                            points="200,240 185,270 215,270"
                            fill="hsl(var(--smoke))"
                            opacity="0.5"
                        />
                        {/* Base */}
                        <line x1="160" y1="270" x2="240" y2="270" stroke="hsl(var(--smoke))" strokeWidth="2" opacity="0.3" />

                        {/* Beam — rotates */}
                        <motion.g style={{ rotate: scaleRotation, transformOrigin: "200px 240px" }}>
                            {/* Beam bar */}
                            <line x1="60" y1="240" x2="340" y2="240" stroke="hsl(var(--smoke))" strokeWidth="2" opacity="0.6" />

                            {/* Left pan */}
                            <line x1="60" y1="240" x2="60" y2="180" stroke="hsl(var(--smoke))" strokeWidth="1" opacity="0.4" />
                            <line x1="30" y1="180" x2="90" y2="180" stroke="hsl(var(--clinical))" strokeWidth="2" />
                            <path d="M30,180 Q60,210 90,180" stroke="hsl(var(--clinical))" strokeWidth="1.5" fill="hsl(var(--clinical))" fillOpacity="0.05" />

                            {/* Right pan */}
                            <line x1="340" y1="240" x2="340" y2="180" stroke="hsl(var(--smoke))" strokeWidth="1" opacity="0.4" />
                            <line x1="310" y1="180" x2="370" y2="180" stroke="hsl(var(--alert))" strokeWidth="2" />
                            <path d="M310,180 Q340,210 370,180" stroke="hsl(var(--alert))" strokeWidth="1.5" fill="hsl(var(--alert))" fillOpacity="0.05" />
                        </motion.g>
                    </svg>

                    {/* Labels */}
                    <div className="flex justify-between px-4 mt-4">
                        <p className="font-mono text-[10px] md:text-xs tracking-widest text-clinical">
                            RIGHT TO LIFE
                        </p>
                        <p className="font-mono text-[10px] md:text-xs tracking-widest text-alert">
                            RIGHT TO DIE WITH DIGNITY
                        </p>
                    </div>
                </motion.div>

                {/* Beat 2 — Patient Suffering vs Human Dignity */}
                <motion.div
                    className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto mb-20"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 1.5 }}
                >
                    <div>
                        <p className="font-mono text-[10px] tracking-[0.4em] text-smoke/60 mb-4 uppercase">
                            PATIENT SUFFERING
                        </p>
                        <p className="font-light text-sm md:text-base leading-relaxed text-smoke">
                            Advanced cancer. Severe neurological conditions. Extreme pain. Total loss of independence.
                        </p>
                    </div>
                    <div>
                        <p className="font-mono text-[10px] tracking-[0.4em] text-smoke/60 mb-4 uppercase">
                            HUMAN DIGNITY
                        </p>
                        <p className="font-light text-sm md:text-base leading-relaxed text-foreground">
                            When a person cannot live independently and faces constant suffering — should they not have the right to choose a peaceful death?
                        </p>
                    </div>
                </motion.div>

                {/* Beat 3 — Central Question */}
                <motion.h2
                    className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-foreground text-center tracking-wide"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.5, duration: 1.8, ease: "easeInOut" }}
                >
                    When recovery is impossible — who decides?
                </motion.h2>
            </div>
        </section>
    );
};

export default EthicalDilemmaSection;
