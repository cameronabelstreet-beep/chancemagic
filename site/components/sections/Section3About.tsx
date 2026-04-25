"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { TextEffect } from "@/components/animations/text-appear-on-scroll";

// 2× speed override of the reference "blur" preset:
// stagger 0.05 → 0.025, per-word duration ~0.3s default → 0.15s.
const fastBlurVariants: { container: Variants; item: Variants } = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.025 },
    },
    exit: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
  },
  item: {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.15 },
    },
    exit: { opacity: 0, filter: "blur(12px)" },
  },
};

export function Section3About() {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const textInView = useInView(textRef, { once: true, amount: 0.3 });
  const imageInView = useInView(imageRef, { once: true, amount: 0.3 });

  return (
    <section
      id="about"
      className="relative w-full bg-background px-6 py-32 md:px-16 md:py-40"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
        {/* Text — left */}
        <div ref={textRef}>
          <TextEffect
            as="p"
            per="word"
            variants={fastBlurVariants}
            trigger={textInView}
            className="font-sans text-label-sm text-on-surface"
          >
            ABOUT
          </TextEffect>

          <TextEffect
            as="h2"
            per="word"
            variants={fastBlurVariants}
            trigger={textInView}
            delay={0.075}
            className="font-display text-headline-xl mt-6 text-on-background"
          >
            THE MAGICIAN
          </TextEffect>

          <TextEffect
            as="p"
            per="word"
            variants={fastBlurVariants}
            trigger={textInView}
            delay={0.225}
            className="font-sans text-body-lg mt-8 text-on-surface"
          >
            Illusionist Street Magician Ray Chance has been featured on the largest networks and performed for countless Fortune and Forbes corporations worldwide. Ray is a member of the famous Academy of Magical Arts at the Magic Castle in Hollywood, California. From Paris, New York City, Las Vegas, Florida and everywhere in between he never ceases to amaze.
          </TextEffect>
        </div>

        {/* Image — right. One-shot slow blur reveal on enter; static after. */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0.3, filter: "blur(16px)" }}
          animate={
            imageInView
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0.3, filter: "blur(16px)" }
          }
          transition={{ duration: 2.2, ease: "easeOut" }}
          className="relative overflow-hidden rounded-card border border-surface-mid"
        >
          <img
            src="/images/event-corporate.avif"
            alt="Ray Chance performing for a corporate audience"
            className="aspect-[4/5] w-full object-cover"
            style={{ filter: "saturate(0.7)", objectPosition: "75% center" }}
            loading="lazy"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
