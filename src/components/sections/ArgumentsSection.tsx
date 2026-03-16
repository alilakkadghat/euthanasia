import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useHeartbeepSound } from "@/hooks/use-ambient-audio";

const arguments_data = [
    {
        id: "ARG-01",
        title: "PATIENT AUTONOMY",
        body: "Legalising euthanasia supports an individual's right to make decisions about their own body and life, including choosing a dignified death in cases of unbearable suffering.",
        stamp: "RIGHT TO CHOOSE",
    },
    {
        id: "ARG-02",
        title: "RELIEF FROM SUFFERING",
        body: "Many terminally ill patients experience severe physical or psychological pain that cannot be relieved through treatment. Euthanasia can offer a humane way to end such suffering.",
        stamp: "HUMANE RESPONSE",
    },
    {
        id: "ARG-03",
        title: "REDUCTION OF FUTILE TREATMENT",
        body: "Euthanasia prevents unnecessary medical treatments that prolong suffering without realistic hope of recovery. Passive euthanasia is already permitted in India under strict guidelines since 2011.",
        stamp: "ALREADY BEGUN",
    },
    {
        id: "ARG-04",
        title: "IMPROVED END-OF-LIFE CARE",
        body: "Legalisation can strengthen palliative and hospice care by focusing on patient comfort and dignity. Access to palliative care in India remains severely limited.",
        stamp: "DIGNITY FIRST",
    },
    {
        id: "ARG-05",
        title: "GLOBAL PRACTICES & PRECEDENT",
        body: "Countries including the Netherlands, Belgium, and Canada have legalised euthanasia with strict safeguards. India can learn from these models to develop a balanced legal framework.",
        stamp: "THE WORLD WATCHES",
    },
];

const ArgumentRow = ({
    arg,
    index,
}: {
    arg: (typeof arguments_data)[0];
    index: number;
}) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const rowInView = useInView(rowRef, { once: false, margin: "-20%" });

    return (
        <div ref={rowRef} className="relative overflow-hidden mb-8">
            {/* Redaction overlay — slides away on reveal */}
            <motion.div
                className="absolute inset-0 z-20"
                style={{ backgroundColor: "#0a0a0a" }}
                initial={{ x: "0%" }}
                animate={rowInView ? { x: "-101%" } : { x: "0%" }}
                transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "easeOut",
                }}
            />

            {/* Argument content */}
            <div className="relative z-10 py-6">
                <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-mono text-sm text-alert">[{arg.id}]</span>
                    <h3 className="font-display text-xl font-bold text-foreground tracking-wide">
                        {arg.title}
                    </h3>
                </div>
                <div
                    className="w-full h-px mb-4"
                    style={{ backgroundColor: "hsl(var(--smoke) / 0.2)" }}
                />
                <div className="flex justify-between items-end gap-8">
                    <p className="font-light text-base leading-relaxed text-smoke max-w-3xl">
                        {arg.body}
                    </p>
                    <span className="font-mono text-xs text-smoke/60 whitespace-nowrap hidden md:block">
                        [ {arg.stamp} ]
                    </span>
                </div>
            </div>
        </div>
    );
};

const ArgumentsSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: "-20%" });
    useHeartbeepSound(inView);

    return (
        <section
            ref={ref}
            className="relative min-h-screen py-24 md:py-32 px-6 md:px-16 lg:px-24"
            style={{ background: "var(--gradient-void)" }}
            data-nav-id="arguments"
        >
            {/* Section label */}
            <p className="absolute top-8 left-6 md:left-16 font-mono text-[10px] tracking-[0.4em] text-smoke/40 uppercase">
                SECTION IV — THE ARGUMENTS
            </p>

            <div className="max-w-4xl mx-auto pt-16">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-wider mb-4">
                        THE CASE FOR MERCY
                    </h2>
                    <p className="font-mono text-xs tracking-[0.3em] text-smoke/60 uppercase">
                        FILED BEFORE: THE CONSCIENCE OF INDIA
                    </p>
                </motion.div>

                {/* Argument rows */}
                {arguments_data.map((arg, i) => (
                    <ArgumentRow key={arg.id} arg={arg} index={i} />
                ))}
            </div>
        </section>
    );
};

export default ArgumentsSection;
