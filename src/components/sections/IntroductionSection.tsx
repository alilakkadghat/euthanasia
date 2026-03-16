import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useHeartbeepSound } from "@/hooks/use-ambient-audio";

const IntroductionSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: "-30%" });
    useHeartbeepSound(inView);

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 overflow-hidden"
            style={{ background: "var(--gradient-void)" }}
            data-nav-id="introduction"
        >
            {/* Section label */}
            <p className="absolute top-8 left-6 md:left-16 font-mono text-[10px] tracking-[0.4em] text-smoke/40 uppercase">
                SECTION I — DEFINITION
            </p>

            <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
                {/* Beat 1 — Etymology Animation */}
                <div className="flex items-center justify-center gap-4 md:gap-8 mb-8">
                    <motion.div
                        className="text-right"
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    >
                        <span className="font-display text-5xl md:text-8xl lg:text-9xl font-bold tracking-wider text-clinical">
                            EU
                        </span>
                        <motion.p
                            className="font-mono text-xs tracking-[0.3em] text-clinical/70 mt-2"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            [ GOOD ]
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="text-left"
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    >
                        <span className="font-display text-5xl md:text-8xl lg:text-9xl font-bold tracking-wider text-alert">
                            THANATOS
                        </span>
                        <motion.p
                            className="font-mono text-xs tracking-[0.3em] text-alert/70 mt-2"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            [ DEATH ]
                        </motion.p>
                    </motion.div>
                </div>

                {/* Divider line */}
                <motion.div
                    className="w-full h-px mx-auto mb-16"
                    style={{ backgroundColor: "hsl(var(--smoke) / 0.3)" }}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: 1.6, duration: 1.2, ease: "easeInOut" }}
                />

                {/* Beat 2 — Body Copy */}
                <div className="max-w-[640px] mx-auto space-y-8">
                    <motion.p
                        className="font-light text-lg md:text-xl leading-relaxed text-foreground"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 2.8, duration: 1.5, ease: "easeInOut" }}
                    >
                        Euthanasia refers to the practice of intentionally ending a person's life
                        to relieve them from incurable illness or unbearable suffering.
                    </motion.p>

                    <motion.p
                        className="text-base md:text-lg leading-relaxed text-smoke"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 3.4, duration: 1.5, ease: "easeInOut" }}
                    >
                        The topic raises important ethical, medical, and legal questions across the world.
                    </motion.p>

                    {/* Thesis line */}
                    <motion.p
                        className="text-xl md:text-2xl leading-relaxed text-foreground italic pt-8 pb-8"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 4.0, duration: 1.8, ease: "easeInOut" }}
                    >
                        This is not a question of death. It is a question of dignity.
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

export default IntroductionSection;
