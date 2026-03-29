import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import lifeBefore from "@/assets/harish-rana.jpeg";
import medicalScan from "@/assets/medical-scan.jpg";
import { useHeartbeepSound } from "@/hooks/use-ambient-audio";

const CaseStudySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20%" });
  useHeartbeepSound(inView);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const glitchOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-24 md:py-32"
      style={{ background: "var(--gradient-void)" }}
      data-nav-id="casestudy"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="font-mono text-xs tracking-[0.3em] text-clinical mb-2 uppercase">
            Section IV
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground tracking-wide">
            THE CASE STUDY
          </h2>
          <div className="mt-4 w-24 h-px bg-alert/50" />
        </motion.div>

        {/* Split dossier */}
        <div className="grid md:grid-cols-2 gap-0 border border-border">
          {/* Left - Life Before */}
          <motion.div
            className="relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-border"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-faded-gold mb-6 uppercase">
              ▎ The Life Before
            </p>

            <div className="relative aspect-[4/3] mb-8 overflow-hidden">
              <img
                src={lifeBefore}
                alt="Student on campus"
                className="w-full h-full object-cover grayscale brightness-75"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/20" />
            </div>

            <div className="space-y-3 font-mono text-sm">
              <div className="dossier-line flex justify-between">
                <span className="text-smoke">Name:</span>
                <span className="text-foreground">Harish Rana.</span>
              </div>
              <div className="dossier-line flex justify-between">
                <span className="text-smoke">Age:</span>
                <span className="text-foreground">19</span>
              </div>
              <div className="dossier-line flex justify-between">
                <span className="text-smoke">Major:</span>
                <span className="text-foreground">Engineering</span>
              </div>
              <div className="dossier-line flex justify-between">
                <span className="text-smoke">Status:</span>
                <span className="text-faded-gold">Active</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Prison Sentence */}
          <motion.div
            className="relative p-8 md:p-12"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-alert mb-6 uppercase">
              ▎ The Prison Sentence
            </p>

            <motion.div
              className="relative aspect-[4/3] mb-8 overflow-hidden"
              style={{ opacity: glitchOpacity }}
            >
              <img
                src={medicalScan}
                alt="Medical brain scan"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/10 scanlines" />
            </motion.div>

            <div className="space-y-3 font-mono text-sm">
              <div className="dossier-line flex justify-between">
                <span className="text-smoke">Incident:</span>
                <span className="text-alert">Fall from 4th Floor — Severe Traumatic Brain Injury</span>
              </div>
              <div className="dossier-line flex justify-between">
                <span className="text-smoke">New Status:</span>
                <motion.span
                  className="stamp text-alert text-xs"
                  initial={{ opacity: 0, scale: 1.5, rotate: -10 }}
                  animate={inView ? { opacity: 1, scale: 1, rotate: -3 } : {}}
                  transition={{ delay: 1, duration: 0.3, type: "spring" }}
                >
                  LOCKED IN
                </motion.span>
              </div>
            </div>

            {/* Diagnostic tags */}
            <motion.div
              className="mt-6 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              {[
                "Permanent Vegetative State (PVS)",
                "100% Quadriplegia",
                "Tracheostomy Tube Dependent",
                "Clinically Assisted Nutrition & Hydration",
                "Zero Prognosis of Recovery — Medical Board Confirmed",
              ].map((tag, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] tracking-wider text-alert border border-alert/30 bg-alert/5 px-2 py-1 uppercase"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Narrative text */}
        <motion.div
          className="mt-16 md:mt-24 max-w-3xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1.5 }}
        >
          <p className="font-mono text-sm md:text-base leading-relaxed text-secondary-foreground">
            "He wasn't sentenced by a judge. He was sentenced by gravity.
            One moment, he was studying for finals. The next, a single fall
            from the fourth floor stole 13 years from him."
          </p>
          <p className="font-mono text-sm md:text-base leading-relaxed text-smoke italic">
            "His mind still screams.His body never answers."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudySection;
