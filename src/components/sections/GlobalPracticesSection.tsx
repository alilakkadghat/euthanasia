import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useHeartbeepSound } from "@/hooks/use-ambient-audio";

const countries = [
    {
        name: "NETHERLANDS",
        since: "Legal since 2002",
        details: "Both active and passive euthanasia are legal.",
        note: "One of the first countries in the world to legalise mercy killing.",
        isIndia: false,
    },
    {
        name: "BELGIUM",
        since: "Legal since 2002",
        details: "Extended to minors in 2014 — no minimum age restriction.",
        note: "Among the most progressive frameworks globally.",
        isIndia: false,
    },
    {
        name: "CANADA",
        since: "Legal since 2016 (MAID)",
        details: "Medical Assistance in Dying expanded in 2021.",
        note: "Strict eligibility criteria with independent assessments.",
        isIndia: false,
    },
    {
        name: "INDIA",
        since: "Passive euthanasia only",
        details: "Permitted under Supreme Court guidelines since 2011.",
        note: "Active euthanasia remains illegal.",
        closing: "The button still does not exist here.",
        isIndia: true,
    },
];

const GlobalPracticesSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: "-30%" });
    useHeartbeepSound(inView);

    return (
        <section
            ref={ref}
            className="relative min-h-screen py-24 md:py-32 px-6 md:px-16 lg:px-24"
            style={{ background: "var(--gradient-void)" }}
            data-nav-id="global"
        >
            {/* Section label */}
            <p className="absolute top-8 left-6 md:left-16 font-mono text-[10px] tracking-[0.4em] text-smoke/40 uppercase">
                SECTION VI — THE WORLD
            </p>

            <div className="max-w-5xl mx-auto pt-16">
                {/* Headline */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-wider mb-2">
                        MERCY IS LEGAL HERE.
                    </h2>
                    <motion.p
                        className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-smoke tracking-wider"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.6, duration: 1.2 }}
                    >
                        AND HERE. AND HERE.
                    </motion.p>
                </motion.div>

                {/* Country Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {countries.map((country, i) => (
                        <motion.div
                            key={country.name}
                            className={`group relative p-8 border transition-all duration-500 ${country.isIndia
                                ? "border-alert/40 hover:shadow-[0_8px_40px_hsl(var(--alert)/0.15)]"
                                : "border-smoke/20 hover:shadow-[0_8px_40px_hsl(var(--alert)/0.08)]"
                                }`}
                            style={{
                                backgroundColor: country.isIndia
                                    ? "hsl(var(--alert) / 0.03)"
                                    : "hsl(var(--background))",
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                delay: 0.3 + i * 0.15,
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                            whileHover={{ y: -4 }}
                        >
                            <h3 className="font-display text-xl font-bold text-foreground tracking-wider mb-2">
                                {country.name}
                            </h3>
                            <p className="font-mono text-xs tracking-wider text-smoke/60 mb-4">
                                {country.since}
                            </p>
                            <p className="font-light text-sm leading-relaxed text-smoke mb-2">
                                {country.details}
                            </p>
                            <p className="font-light text-sm leading-relaxed text-smoke/80">
                                {country.note}
                            </p>
                            {country.closing && (
                                <p className="font-mono text-xs text-alert mt-4 tracking-wider">
                                    {country.closing}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GlobalPracticesSection;
