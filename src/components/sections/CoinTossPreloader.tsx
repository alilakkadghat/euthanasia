import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CoinTossPreloader = ({ onComplete }: { onComplete: () => void }) => {
    const [screen, setScreen] = useState(0); // 0: intro, 1: coin, 2: result
    const [flipping, setFlipping] = useState(false);
    const [result, setResult] = useState<"heads" | "tails" | null>(null);

    const handleFlip = () => {
        if (flipping) return;
        setFlipping(true);
        const outcome = Math.random() < 0.5 ? "heads" : "tails";
        setTimeout(() => {
            setResult(outcome);
            setFlipping(false);
            setTimeout(() => setScreen(2), 300);
        }, 1200);
    };

    const handleEnter = () => {
        const el = document.getElementById("preloader-overlay");
        if (el) {
            el.style.transition = "opacity 1.5s ease";
            el.style.opacity = "0";
            setTimeout(() => {
                sessionStorage.setItem("preloader-seen", "true");
                onComplete();
            }, 1500);
        }
    };

    return (
        <div
            id="preloader-overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
            <AnimatePresence mode="wait">
                {/* Screen 0: Intro */}
                {screen === 0 && (
                    <motion.div
                        key="intro"
                        className="text-center px-6 max-w-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="font-mono text-sm md:text-base text-foreground leading-relaxed mb-8">
                            Before we begin.
                        </p>
                        <p className="font-mono text-sm md:text-base text-smoke leading-relaxed mb-4">
                            Imagine a patient suffering from an incurable disease.
                        </p>
                        <p className="font-mono text-sm md:text-base text-smoke leading-relaxed mb-12">
                            They face a choice.
                        </p>
                        <button
                            onClick={() => setScreen(1)}
                            className="font-mono text-xs tracking-widest text-foreground border border-smoke/30 px-6 py-3 hover:border-foreground/50 transition-colors duration-300"
                        >
                            [ CONTINUE ]
                        </button>
                    </motion.div>
                )}

                {/* Screen 1: Coin */}
                {screen === 1 && (
                    <motion.div
                        key="coin"
                        className="text-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Coin SVG */}
                        <div className="flex justify-center mb-8" style={{ perspective: "600px" }}>
                            <motion.div
                                className="w-40 h-40 md:w-48 md:h-48 relative"
                                animate={flipping ? { rotateY: 1080 } : {}}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Front — Rupee */}
                                <div
                                    className="absolute inset-0 rounded-full border-2 border-smoke/40 flex items-center justify-center"
                                    style={{
                                        backgroundColor: "hsl(var(--void))",
                                        backfaceVisibility: "hidden",
                                    }}
                                >
                                    <div className="text-center">
                                        <span className="font-display text-4xl text-foreground">₹</span>
                                        <p className="font-mono text-[8px] text-smoke/50 mt-2 tracking-widest">
                                            CONTINUE LIVING
                                        </p>
                                    </div>
                                </div>
                                {/* Back — Caduceus */}
                                <div
                                    className="absolute inset-0 rounded-full border-2 border-smoke/40 flex items-center justify-center"
                                    style={{
                                        backgroundColor: "hsl(var(--void))",
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                    }}
                                >
                                    <div className="text-center">
                                        <span className="font-display text-4xl text-foreground">☤</span>
                                        <p className="font-mono text-[8px] text-smoke/50 mt-2 tracking-widest">
                                            END THE SUFFERING
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Labels */}
                        <div className="flex justify-center gap-12 mb-8 font-mono text-xs text-smoke/60">
                            <span>HEADS → Continue living.</span>
                            <span>TAILS → End the suffering.</span>
                        </div>

                        {!result && (
                            <button
                                onClick={handleFlip}
                                disabled={flipping}
                                className="font-mono text-xs tracking-widest text-foreground border border-smoke/30 px-6 py-3 hover:border-foreground/50 transition-colors duration-300 disabled:opacity-30"
                            >
                                [ CLICK TO FLIP ]
                            </button>
                        )}
                    </motion.div>
                )}

                {/* Screen 2: Resolution */}
                {screen === 2 && (
                    <motion.div
                        key="result"
                        className="text-center px-6 max-w-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.p
                            className="font-mono text-sm text-foreground mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            {result === "heads"
                                ? "You chose to continue."
                                : "You chose to end it."}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1.2 }}
                            className="space-y-4 mb-12"
                        >
                            <p className="font-mono text-sm text-foreground leading-relaxed">
                                This decision should not depend on chance.
                            </p>
                            <p className="font-mono text-sm text-smoke leading-relaxed">
                                Yet in India — for most patients — it barely differs from one.
                            </p>
                        </motion.div>

                        <motion.button
                            onClick={handleEnter}
                            className="font-mono text-xs tracking-widest text-foreground border border-smoke/30 px-6 py-3 hover:border-foreground/50 transition-colors duration-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3.5, duration: 1 }}
                        >
                            [ ENTER THE CASE FILE ]
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CoinTossPreloader;
