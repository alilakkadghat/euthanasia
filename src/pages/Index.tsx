import { AnimatePresence, motion } from "framer-motion";
import SceneSection from "@/components/sections/SceneSection";
import CaseStudySection from "@/components/sections/CaseStudySection";
import PrisonSection from "@/components/sections/PrisonSection";
import VerdictSection from "@/components/sections/VerdictSection";
import { useAmbientHum } from "@/hooks/use-ambient-audio";

const Index = () => {
  const { startAudio, isActive } = useAmbientHum();

  return (
    <main className="bg-background" onClick={!isActive ? startAudio : undefined}>
      {/* Audio prompt */}
      <AnimatePresence>
        {!isActive && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 font-mono text-[10px] tracking-[0.3em] text-clinical/70 uppercase bg-background/80 border border-border px-4 py-2 backdrop-blur-sm cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={startAudio}
          >
            ● CLICK ANYWHERE FOR AUDIO ●
          </motion.div>
        )}
      </AnimatePresence>
      <SceneSection />
      <CaseStudySection />
      <PrisonSection />
      <VerdictSection />
    </main>
  );
};

export default Index;
