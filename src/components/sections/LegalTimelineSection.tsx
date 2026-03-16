import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useHeartbeepSound } from "@/hooks/use-ambient-audio";

const timelineData = [
    {
        year: "2011",
        title: "ARUNA SHANBAUG CASE",
        body: "Supreme Court of India permits passive euthanasia for the first time. Defined legal guidelines for withdrawal of life support.",
        active: false,
    },
    {
        year: "2018",
        title: "COMMON CAUSE vs UNION OF INDIA",
        body: "Supreme Court recognises the \"Right to Die with Dignity\" under Article 21. Living wills and advance medical directives made legally valid.",
        active: false,
    },
    {
        year: "2026",
        title: "HARISH RANA CASE",
        body: "Supreme Court approves passive euthanasia for Harish Rana at AIIMS, New Delhi. A 32-year-old engineering student. 13 years in a permanent vegetative state.",
        closing: "Finally allowed to go.",
        active: true,
    },
];

const LegalTimelineSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: "-20%" });
    useHeartbeepSound(inView);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const lineHeight = useTransform(scrollYProgress, [0.15, 0.6], ["0%", "100%"]);

    return (
        <section
            ref={ref}
            className="relative min-h-screen py-24 md:py-32 px-6 md:px-16 lg:px-24"
            style={{ background: "var(--gradient-void)" }}
            data-nav-id="timeline"
        >
            {/* Section label */}
            <p className="absolute top-8 left-6 md:left-16 font-mono text-[10px] tracking-[0.4em] text-smoke/40 uppercase">
                SECTION V — THE RECORD
            </p>

            <div className="max-w-3xl mx-auto pt-16">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-wider mb-4">
                        THE RECORD
                    </h2>
                    <p className="font-mono text-xs tracking-[0.3em] text-smoke/60 uppercase">
                        HOW INDIA ARRIVED HERE
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative pl-12 md:pl-20">
                    {/* Background line */}
                    <div
                        className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px]"
                        style={{ backgroundColor: "hsl(var(--smoke) / 0.15)" }}
                    />
                    {/* Animated fill line */}
                    <motion.div
                        className="absolute left-4 md:left-8 top-0 w-[2px]"
                        style={{
                            height: lineHeight,
                            backgroundColor: "hsl(var(--smoke) / 0.3)",
                        }}
                    />

                    {timelineData.map((item, i) => (
                        <motion.div
                            key={item.year}
                            className="relative mb-16 last:mb-0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.3 + i * 0.4, duration: 1.0, ease: "easeOut" }}
                        >
                            {/* Node */}
                            <div
                                className="absolute -left-12 md:-left-20 top-1"
                                style={{ left: "-2rem", ...(window.innerWidth >= 768 ? { left: "-3rem" } : {}) }}
                            >
                                <div className="absolute left-4 md:left-8 -translate-x-1/2 top-0">
                                    {item.active ? (
                                        <motion.div
                                            className="w-3 h-3 rounded-full bg-alert"
                                            animate={{
                                                boxShadow: [
                                                    "0 0 0 0 hsl(var(--alert) / 0.4)",
                                                    "0 0 20px 8px hsl(var(--alert) / 0.2)",
                                                    "0 0 0 0 hsl(var(--alert) / 0.4)",
                                                ],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    ) : (
                                        <div
                                            className="w-2.5 h-2.5 rounded-full border-2"
                                            style={{ borderColor: "hsl(var(--smoke))" }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Year */}
                            <p
                                className={`font-mono text-4xl font-bold mb-2 ${item.active ? "text-alert" : "text-smoke"
                                    }`}
                            >
                                {item.year}
                            </p>

                            {/* Title */}
                            <h3 className="font-display text-xl text-foreground mb-3 tracking-wide">
                                {item.title}
                            </h3>

                            {/* Body */}
                            <p className="font-light text-sm text-smoke leading-relaxed">
                                {item.body}
                            </p>

                            {/* Closing line for 2026 */}
                            {item.closing && (
                                <motion.p
                                    className="mt-4 text-base text-foreground italic"
                                    initial={{ opacity: 0 }}
                                    animate={inView ? { opacity: 1 } : {}}
                                    transition={{ delay: 1.8, duration: 1.5 }}
                                >
                                    {item.closing}
                                </motion.p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LegalTimelineSection;
