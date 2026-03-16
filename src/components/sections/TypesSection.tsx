import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useHeartbeepSound } from "@/hooks/use-ambient-audio";

const TypesSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: "-30%" });
    useHeartbeepSound(inView);

    return (
        <section
            ref={ref}
            className="relative min-h-screen py-24 md:py-32 px-6 md:px-16 lg:px-24"
            style={{ background: "var(--gradient-void)" }}
            data-nav-id="types"
        >
            {/* Section label */}
            <p className="absolute top-8 left-6 md:left-16 font-mono text-[10px] tracking-[0.4em] text-smoke/40 uppercase">
                SECTION II — TAXONOMY
            </p>

            <div className="max-w-6xl mx-auto pt-16">
                {/* Two main panels */}
                <div className="grid md:grid-cols-2 relative">
                    {/* Vertical divider */}
                    <div
                        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px"
                        style={{ backgroundColor: "hsl(var(--smoke) / 0.2)" }}
                    />

                    {/* LEFT PANEL — ACTIVE EUTHANASIA */}
                    <motion.div
                        className="relative p-8 md:p-12"
                        initial={{ opacity: 0, x: -60 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                    >
                        {/* Ambient glow */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse at center, hsl(var(--alert) / 0.05) 0%, transparent 70%)",
                            }}
                        />
                        <div className="relative z-10">
                            <p className="font-mono text-[10px] tracking-[0.4em] text-smoke/60 mb-4 uppercase">
                                ACTIVE
                            </p>
                            <span className="inline-block font-mono text-[10px] tracking-wider text-alert border border-alert/40 px-2 py-1 mb-6">
                                [ ILLEGAL IN INDIA ]
                            </span>
                            <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-wide mb-4">
                                Active Euthanasia
                            </h3>
                            <p className="font-light text-sm md:text-base leading-relaxed text-smoke">
                                Deliberately ending a patient's life through direct action —
                                such as administering a lethal injection or medication.
                                Because it involves intentionally causing death, it remains
                                illegal in India and is considered ethically controversial.
                            </p>
                        </div>
                    </motion.div>

                    {/* RIGHT PANEL — PASSIVE EUTHANASIA */}
                    <motion.div
                        className="relative p-8 md:p-12"
                        initial={{ opacity: 0, x: 60 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                    >
                        {/* Ambient glow */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse at center, hsl(var(--clinical) / 0.05) 0%, transparent 70%)",
                            }}
                        />
                        <div className="relative z-10">
                            <p className="font-mono text-[10px] tracking-[0.4em] text-smoke/60 mb-4 uppercase">
                                PASSIVE
                            </p>
                            <span className="inline-block font-mono text-[10px] tracking-wider text-clinical border border-clinical/40 px-2 py-1 mb-6">
                                [ PERMITTED UNDER SC GUIDELINES ]
                            </span>
                            <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-wide mb-4">
                                Passive Euthanasia
                            </h3>
                            <p className="font-light text-sm md:text-base leading-relaxed text-smoke">
                                Withdrawing or withholding medical treatment or life-support,
                                allowing the patient to die naturally from their illness.
                                Examples include turning off ventilators or stopping
                                artificial feeding. Permitted in India since 2011.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.div
                    className="w-full h-px my-12"
                    style={{ backgroundColor: "hsl(var(--smoke) / 0.2)" }}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: 1.0, duration: 0.8 }}
                />

                {/* Secondary Row — Voluntary vs Non-Voluntary */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-12">
                    <motion.div
                        className="p-6 md:p-8 border border-smoke/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1.3, duration: 0.8 }}
                    >
                        <p className="font-mono text-[10px] tracking-[0.4em] text-smoke/60 mb-3 uppercase">
                            VOLUNTARY
                        </p>
                        <p className="font-light text-sm leading-relaxed text-smoke">
                            The patient makes the decision themselves.
                        </p>
                    </motion.div>

                    <motion.div
                        className="p-6 md:p-8 border border-smoke/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1.5, duration: 0.8 }}
                    >
                        <p className="font-mono text-[10px] tracking-[0.4em] text-smoke/60 mb-3 uppercase">
                            NON-VOLUNTARY
                        </p>
                        <p className="font-light text-sm leading-relaxed text-smoke">
                            The patient cannot consent —
                            decision made by family/court
                            (e.g., PVS patients).
                        </p>
                        <p className="font-mono text-xs text-alert mt-4">
                            ← The category that defines the Harish Rana case.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TypesSection;
