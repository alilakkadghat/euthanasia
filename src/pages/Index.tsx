import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SceneSection from "@/components/sections/SceneSection";
import IntroductionSection from "@/components/sections/IntroductionSection";
import TypesSection from "@/components/sections/TypesSection";
import EthicalDilemmaSection from "@/components/sections/EthicalDilemmaSection";
import CaseStudySection from "@/components/sections/CaseStudySection";
import PrisonSection from "@/components/sections/PrisonSection";
import ArgumentsSection from "@/components/sections/ArgumentsSection";
import LegalTimelineSection from "@/components/sections/LegalTimelineSection";
import GlobalPracticesSection from "@/components/sections/GlobalPracticesSection";
import VerdictSection from "@/components/sections/VerdictSection";
import ConclusionSection from "@/components/sections/ConclusionSection";
import PatientJourneyNav from "@/components/sections/PatientJourneyNav";
import CoinTossPreloader from "@/components/sections/CoinTossPreloader";
import { useAmbientHum } from "@/hooks/use-ambient-audio";

const Index = () => {
  const { startAudio, isActive } = useAmbientHum();
  const [showPreloader, setShowPreloader] = useState(
    () => !sessionStorage.getItem("preloader-seen")
  );

  return (
    <>
      {/* Coin Toss Preloader */}
      {showPreloader && (
        <CoinTossPreloader onComplete={() => setShowPreloader(false)} />
      )}

      <main className="bg-background" onClick={!isActive ? startAudio : undefined}>
        {/* Audio prompt */}
        <AnimatePresence>
          {!isActive && !showPreloader && (
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

        {/* Patient Journey Progress Nav */}
        <PatientJourneyNav />

        {/* 1. Hero */}
        <SceneSection />
        {/* 2. Introduction */}
        <IntroductionSection />
        {/* 3. Types of Euthanasia */}
        <TypesSection />
        {/* 4. Ethical Dilemma */}
        <EthicalDilemmaSection />
        {/* 5. Case Study */}
        <CaseStudySection />
        {/* 6. Prison Section */}
        <PrisonSection />
        {/* 7. Key Arguments */}
        <ArgumentsSection />
        {/* 8. Legal Timeline */}
        <LegalTimelineSection />
        {/* 9. Global Practices */}
        <GlobalPracticesSection />
        {/* 10. Verdict + RELEASED */}
        <VerdictSection />
        {/* 11. Conclusion */}
        <ConclusionSection />
      </main>
    </>
  );
};

export default Index;
