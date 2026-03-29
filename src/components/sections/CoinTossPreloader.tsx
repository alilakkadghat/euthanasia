import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ================================================================
   3-D COIN FACE  — renders text onto a canvas texture
   ================================================================ */

function useCoinTexture(symbol: string, label: string) {
    return useMemo(() => {
        const size = 512;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d")!;

        // Background — very dark
        ctx.fillStyle = "#0d0d0d";
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();

        // Inner decorative ring
        ctx.strokeStyle = "#333333";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size * 0.47, 0, Math.PI * 2);
        ctx.stroke();

        // Inner circle
        ctx.strokeStyle = "#2a2a2a";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size * 0.35, 0, Math.PI * 2);
        ctx.stroke();

        // Symbol
        ctx.fillStyle = "#d9d9d9";
        ctx.font = `bold ${size * 0.3}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(symbol, size / 2, size / 2 - 10);

        // Label
        ctx.fillStyle = "#808080";
        ctx.font = `${size * 0.05}px monospace`;
        ctx.letterSpacing = "3px";
        ctx.fillText(label, size / 2, size / 2 + size * 0.22);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }, [symbol, label]);
}

/* ================================================================
   3-D COIN MESH
   ================================================================ */

const COIN_RADIUS = 1.8;
const COIN_THICKNESS = 0.15;

function CoinMesh({
    flipping,
    result,
    onFlipComplete,
}: {
    flipping: boolean;
    result: "heads" | "tails" | null;
    onFlipComplete: () => void;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const flipProgress = useRef(0);
    const isFlipping = useRef(false);
    const flipDone = useRef(false);
    const initialY = 0;
    const idleTime = useRef(0);

    const frontTexture = useCoinTexture("₹", "CONTINUE LIVING");
    const backTexture = useCoinTexture("☤", "END THE SUFFERING");

    useEffect(() => {
        if (flipping && !isFlipping.current) {
            isFlipping.current = true;
            flipProgress.current = 0;
            flipDone.current = false;
        }
    }, [flipping]);

    useFrame((_, delta) => {
        if (!groupRef.current) return;

        if (isFlipping.current) {
            const duration = 3.5;
            flipProgress.current += delta / duration;
            const t = Math.min(flipProgress.current, 1);

            // Ease-out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - t, 3);

            // Parabolic arc
            const arcHeight = 3.0;
            const yPos = initialY + arcHeight * 4 * t * (1 - t);

            // Rotation: 7 full rotations + land on correct face
            const totalRotations = 7;
            const endAngle = result === "tails" ? Math.PI : 0;
            const totalAngle = totalRotations * Math.PI * 2 + endAngle;
            const currentAngle = eased * totalAngle;

            groupRef.current.rotation.x = currentAngle;
            // Slight wobble
            groupRef.current.rotation.z =
                Math.sin(eased * Math.PI * 6) * 0.15 * (1 - eased);
            groupRef.current.position.y = yPos;

            if (t >= 1 && !flipDone.current) {
                flipDone.current = true;
                isFlipping.current = false;
                groupRef.current.rotation.x = endAngle;
                groupRef.current.rotation.z = 0;
                groupRef.current.position.y = initialY;
                onFlipComplete();
            }
        } else {
            // Gentle idle float
            idleTime.current += delta;
            groupRef.current.position.y =
                initialY + Math.sin(idleTime.current * 1.2) * 0.08;
        }
    });

    return (
        <group ref={groupRef} rotation={[Math.PI / 2.5, 0, 0]}>
            {/* Coin edge (cylinder) */}
            <mesh>
                <cylinderGeometry
                    args={[COIN_RADIUS, COIN_RADIUS, COIN_THICKNESS, 64]}
                />
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.8}
                    roughness={0.25}
                />
            </mesh>

            {/* Front face — textured circle */}
            <mesh position={[0, COIN_THICKNESS / 2 + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[COIN_RADIUS - 0.01, 64]} />
                <meshStandardMaterial
                    map={frontTexture}
                    metalness={0.5}
                    roughness={0.4}
                />
            </mesh>

            {/* Back face — textured circle */}
            <mesh position={[0, -(COIN_THICKNESS / 2 + 0.001), 0]} rotation={[Math.PI / 2, 0, 0]}>
                <circleGeometry args={[COIN_RADIUS - 0.01, 64]} />
                <meshStandardMaterial
                    map={backTexture}
                    metalness={0.5}
                    roughness={0.4}
                />
            </mesh>

            {/* Rim highlight rings */}
            <mesh position={[0, COIN_THICKNESS / 2 + 0.002, 0]}>
                <ringGeometry args={[COIN_RADIUS - 0.06, COIN_RADIUS, 64]} />
                <meshStandardMaterial
                    color="#3a3a3a"
                    metalness={0.9}
                    roughness={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh
                position={[0, -(COIN_THICKNESS / 2 + 0.002), 0]}
                rotation={[Math.PI, 0, 0]}
            >
                <ringGeometry args={[COIN_RADIUS - 0.06, COIN_RADIUS, 64]} />
                <meshStandardMaterial
                    color="#3a3a3a"
                    metalness={0.9}
                    roughness={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}

/* ================================================================
   3-D SCENE
   ================================================================ */

function CoinScene({
    flipping,
    result,
    onFlipComplete,
}: {
    flipping: boolean;
    result: "heads" | "tails" | null;
    onFlipComplete: () => void;
}) {
    return (
        <Canvas
            camera={{ position: [0, 2, 5.5], fov: 45 }}
            style={{ width: "100%", height: "100%" }}
            gl={{ antialias: true, alpha: true }}
        >
            {/* Lighting — bright enough to see the dark coin */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 5, 4]} intensity={1.2} color="#e8e8ff" />
            <directionalLight
                position={[-2, 3, -3]}
                intensity={0.5}
                color="#aaaacc"
            />
            <pointLight position={[0, 4, 2]} intensity={0.8} color="#ffffff" />
            <pointLight position={[0, -3, 2]} intensity={0.3} color="#6666aa" />

            <CoinMesh
                flipping={flipping}
                result={result}
                onFlipComplete={onFlipComplete}
            />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enabled={!flipping}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={(5 * Math.PI) / 6}
                rotateSpeed={0.6}
                dampingFactor={0.1}
                enableDamping
            />
        </Canvas>
    );
}

/* ================================================================
   MAIN PRELOADER  (intro → coin → result)
   ================================================================ */

const CoinTossPreloader = ({ onComplete }: { onComplete: () => void }) => {
    const [screen, setScreen] = useState(0);
    const [flipping, setFlipping] = useState(false);
    const [result, setResult] = useState<"heads" | "tails" | null>(null);
    const [showResultFace, setShowResultFace] = useState(false);

    const handleFlip = useCallback(() => {
        if (flipping) return;
        const outcome = Math.random() < 0.5 ? "heads" : "tails";
        setResult(outcome);
        setFlipping(true);
    }, [flipping]);

    const handleFlipComplete = useCallback(() => {
        setFlipping(false);
        setShowResultFace(true);
        // Show result face for 2s, then transition to result screen
        setTimeout(() => {
            setScreen(2);
        }, 2000);
    }, []);

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

                {/* Screen 1: 3-D Coin */}
                {screen === 1 && (
                    <motion.div
                        key="coin"
                        className="text-center px-6 flex flex-col items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Three.js Canvas */}
                        <div className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] mb-4">
                            <CoinScene
                                flipping={flipping}
                                result={result}
                                onFlipComplete={handleFlipComplete}
                            />
                        </div>

                        {/* Drag hint */}
                        {!flipping && !showResultFace && (
                            <motion.p
                                className="font-mono text-[10px] text-smoke/50 tracking-widest mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                DRAG TO INSPECT · CLICK FLIP TO DECIDE
                            </motion.p>
                        )}

                        {/* Labels */}
                        <div className="flex justify-center gap-12 mb-6 font-mono text-xs text-smoke/60">
                            <span>HEADS → Continue living.</span>
                            <span>TAILS → End the suffering.</span>
                        </div>

                        {/* Flip button */}
                        {!result && (
                            <button
                                onClick={handleFlip}
                                disabled={flipping}
                                className="font-mono text-xs tracking-widest text-foreground border border-smoke/30 px-6 py-3 hover:border-foreground/50 transition-colors duration-300 disabled:opacity-30"
                            >
                                [ CLICK TO FLIP ]
                            </button>
                        )}

                        {/* Result settled indicator */}
                        {showResultFace && (
                            <motion.p
                                className="font-mono text-sm text-foreground/80 mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                {result === "heads"
                                    ? "Heads — Continue Living"
                                    : "Tails — End the Suffering"}
                            </motion.p>
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
