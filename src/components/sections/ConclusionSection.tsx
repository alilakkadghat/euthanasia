import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useHeartbeepSound } from "@/hooks/use-ambient-audio";

const lines = [
    {
        text: "Euthanasia remains one of the most complex ethical issues in modern healthcare.",
        className: "font-light text-lg text-smoke",
    },
    {
        text: "While the protection of life is an important principle, the suffering of terminally ill patients cannot be ignored.",
        className: "font-light text-lg text-foreground",
    },
    {
        text: "Allowing euthanasia under strict legal and medical guidelines may provide patients with dignity and relief when recovery is no longer possible.",
        className: "font-light text-xl text-foreground",
    },
    {
        text: "It is important for society to continue discussing this issue with empathy, responsibility, and ethical awareness.",
        className: "font-light text-lg text-smoke",
    },
];

const ConclusionSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: "-30%" });
    useHeartbeepSound(inView);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Gradually lighten background from #0a0a0a to #141414
    const bgColor = useTransform(
        scrollYProgress,
        [0.1, 0.7],
        ["#0a0a0a", "#141414"]
    );

    return (
        <motion.section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 py-24 md:py-32"
            style={{ backgroundColor: bgColor }}
            data-nav-id="conclusion"
        >
            {/* Section label */}
            <p className="absolute top-8 left-6 md:left-16 font-mono text-[10px] tracking-[0.4em] text-smoke/40 uppercase">
                SECTION VII — THE VERDICT
            </p>

            <div className="max-w-3xl mx-auto text-center space-y-10">
                {/* Lines 1-4 staggered */}
                {lines.map((line, i) => (
                    <motion.p
                        key={i}
                        className={`leading-relaxed ${line.className}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                            delay: i * 0.4,
                            duration: 1.2,
                            ease: "easeInOut",
                        }}
                    >
                        {line.text}
                    </motion.p>
                ))}

                {/* Closing question — large, after pause */}
                <motion.h2
                    className="font-display text-4xl md:text-6xl text-foreground tracking-wide pt-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                        delay: 3.1,
                        duration: 1.8,
                        ease: "easeInOut",
                    }}
                >
                    Should India allow this button to exist?
                </motion.h2>

                {/* Status tags */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 pt-8"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 5.1, duration: 1.5 }}
                >
                    <span className="font-mono text-[10px] tracking-wider text-clinical border border-clinical/30 px-3 py-1">
                        [ PASSIVE EUTHANASIA — PERMITTED ]
                    </span>
                    <span className="font-mono text-[10px] tracking-wider text-alert border border-alert/30 px-3 py-1">
                        [ ACTIVE EUTHANASIA — ILLEGAL ]
                    </span>
                    <span className="font-mono text-[10px] tracking-wider text-smoke border border-smoke/30 px-3 py-1">
                        [ CHOICE — PENDING ]
                    </span>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ConclusionSection;
