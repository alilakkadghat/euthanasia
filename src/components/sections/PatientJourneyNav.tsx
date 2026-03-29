import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const stations = [
    { id: "hero", label: "ADMISSION" },
    { id: "introduction", label: "DEFINITION" },
    { id: "types", label: "TAXONOMY" },
    { id: "dilemma", label: "DILEMMA" },
    { id: "casestudy", label: "THE CASE" },
    { id: "prison", label: "SENTENCE" },
    { id: "arguments", label: "ARGUMENTS" },
    { id: "timeline", label: "THE RECORD" },
    { id: "global", label: "THE WORLD" },
    { id: "conclusion", label: "CONCLUSION" },
    { id: "verdict", label: "RELEASE" },
];

const PatientJourneyNav = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const sections = document.querySelectorAll<HTMLElement>("section[data-nav-id]");
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = (entry.target as HTMLElement).dataset.navId;
                        const idx = stations.findIndex((s) => s.id === id);
                        if (idx !== -1) setActiveIndex(idx);
                    }
                });
            },
            { rootMargin: "-40% 0px -40% 0px" }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const progress = activeIndex / (stations.length - 1);

    return (
        <nav
            className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end"
            style={{ height: "70vh" }}
            aria-label="Patient journey progress"
        >
            {/* Background line */}
            <div
                className="absolute right-[5px] top-0 bottom-0 w-px"
                style={{ backgroundColor: "hsl(var(--smoke) / 0.2)" }}
            />

            {/* Progress fill */}
            <motion.div
                className="absolute right-[5px] top-0 w-px origin-top"
                style={{ backgroundColor: "hsl(var(--alert) / 0.6)" }}
                animate={{ height: `${progress * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Nodes */}
            <div className="relative flex flex-col justify-between h-full">
                {stations.map((station, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <div
                            key={station.id}
                            className="group relative flex items-center justify-end gap-2"
                        >
                            <span
                                className={`font-mono text-[8px] tracking-widest transition-opacity duration-300 text-smoke ${isActive
                                    ? "opacity-60"
                                    : "opacity-0 group-hover:opacity-40"
                                    }`}
                                aria-label={station.label}
                            >
                                {station.label}
                            </span>
                            <div
                                className={`rounded-full transition-all duration-300 ${isActive
                                    ? "w-2.5 h-2.5 bg-alert"
                                    : "w-1.5 h-1.5 border border-smoke/40"
                                    }`}
                                aria-label={`${station.label} ${isActive ? "(current)" : ""}`}
                            />
                        </div>
                    );
                })}
            </div>
        </nav>
    );
};

export default PatientJourneyNav;
