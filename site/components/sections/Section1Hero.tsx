"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Floating, {
  FloatingElement,
} from "@/components/animations/parallax-floating-cards";
import { HeroBackground } from "@/components/animations/HeroBackground";
import { Button } from "@/components/ui/Button";

type CardSpec = {
  depth: number;
  src: "/images/individual-card-1.jpg" | "/images/individual-card-2.jpg";
  position: string;
  rotate: number;
  opacity?: number;
};

const DEEP_CARDS: CardSpec[] = [
  {
    depth: -0.5,
    src: "/images/individual-card-2.jpg",
    position: "top-[8%] left-[20%] w-[170px] h-[238px]",
    rotate: 24,
    opacity: 0.55,
  },
  {
    depth: -1,
    src: "/images/individual-card-1.jpg",
    position: "top-[10%] right-[22%] w-[160px] h-[224px]",
    rotate: -22,
    opacity: 0.5,
  },
];

const NEAR_CARDS: CardSpec[] = [
  {
    depth: 1,
    src: "/images/individual-card-1.jpg",
    position: "top-[18%] left-[3%] w-[230px] h-[322px]",
    rotate: -12,
    opacity: 0.95,
  },
  {
    depth: 1.5,
    src: "/images/individual-card-2.jpg",
    position: "top-[56%] left-[7%] w-[200px] h-[280px]",
    rotate: 14,
    opacity: 0.92,
  },
  {
    depth: 0.8,
    src: "/images/individual-card-2.jpg",
    position: "top-[22%] right-[3%] w-[250px] h-[350px]",
    rotate: 8,
    opacity: 0.95,
  },
  {
    depth: 2,
    src: "/images/individual-card-1.jpg",
    position: "top-[60%] right-[9%] w-[215px] h-[300px]",
    rotate: -16,
    opacity: 0.95,
  },
];

export function Section1Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const cardsOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const shaderOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 50 },
        { layer: "3", yPercent: 32 },
        { layer: "4", yPercent: 8 },
      ];

      layers.forEach((l, idx) => {
        tl.to(
          section.querySelectorAll(`[data-parallax-layer="${l.layer}"]`),
          { yPercent: l.yPercent, ease: "none" },
          idx === 0 ? undefined : "<"
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      data-parallax-layers
      className="relative min-h-screen w-full overflow-hidden bg-background"
    >
      {/* Layer 0 — silver shader background (locked to section, fades on scroll) */}
      <motion.div
        aria-hidden
        style={{ opacity: shaderOpacity }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <HeroBackground className="absolute inset-0" />
      </motion.div>

      {/* Layer 1 — focused spotlight halo on top of shader */}
      <motion.div
        aria-hidden
        data-parallax-layer="1"
        style={{ opacity: haloOpacity }}
        className="pointer-events-none absolute inset-0 z-[5]"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 60%, rgba(133,159,192,0.18) 0%, rgba(133,159,192,0.06) 38%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Floating cards — single mouse-parallax context, split into 2 scroll-parallax layers */}
      <motion.div
        aria-hidden
        style={{ opacity: cardsOpacity }}
        className="pointer-events-none absolute inset-0 z-10"
      >
        <Floating sensitivity={1} easingFactor={0.05}>
          <div data-parallax-layer="2" className="absolute inset-0">
            {DEEP_CARDS.map((card, i) => (
              <FloatingElement
                key={`deep-${i}`}
                depth={card.depth}
                className={card.position}
              >
                <CardImage spec={card} />
              </FloatingElement>
            ))}
          </div>
          <div data-parallax-layer="3" className="absolute inset-0">
            {NEAR_CARDS.map((card, i) => (
              <FloatingElement
                key={`near-${i}`}
                depth={card.depth}
                className={card.position}
              >
                <CardImage spec={card} />
              </FloatingElement>
            ))}
          </div>
        </Floating>
      </motion.div>

      {/* Vignette — bleeds card edges into background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at center, transparent 32%, rgba(5,11,30,0.65) 72%, var(--background) 100%)",
        }}
      />

      {/* Focal column. Portrait is OUTSIDE layer 4 — locked to section.
          Title and tagline/CTAs are inside layer 4 — barely shift on scroll. */}
      <div className="relative z-30 flex min-h-screen flex-col items-center justify-center px-8 py-20 text-center">
        <div data-parallax-layer="4" className="flex flex-col items-center">
          <h1 className="font-display text-[52px] sm:text-[64px] md:text-[72px] leading-[1.05] text-on-background">
            RAY CHANCE
          </h1>
          <div className="atmospheric-divider mt-7 w-48" />
        </div>

        {/* Portrait — STATIC. New asset is a brushstroke composition; let it bleed naturally. */}
        <div className="relative my-6 h-[360px] w-[560px] sm:h-[420px] sm:w-[680px] md:h-[460px] md:w-[760px] max-w-[92vw]">
          <Image
            src="/images/ray-chance-portrait-2.png"
            alt="Ray Chance"
            fill
            priority
            sizes="(min-width: 768px) 760px, (min-width: 640px) 680px, 92vw"
            className="object-contain"
            style={{
              filter: "saturate(0.92) contrast(1.04)",
            }}
          />
        </div>

        <div data-parallax-layer="4" className="flex flex-col items-center">
          <p className="max-w-xl font-sans text-body-lg text-on-surface">
            Illusionist. Mentalist. Unforgettable.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Button
              variant="primary"
              onClick={() =>
                document
                  .getElementById("book")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book Ray
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                document
                  .getElementById("video")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Watch the Show
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ScrollCue />
        </div>
      </div>
    </section>
  );
}

function CardImage({ spec }: { spec: CardSpec }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-card border border-surface-mid"
      style={{
        transform: `rotate(${spec.rotate}deg)`,
        opacity: spec.opacity ?? 1,
      }}
    >
      <Image
        src={spec.src}
        alt=""
        fill
        sizes="260px"
        className="object-cover"
        style={{
          filter: "saturate(0.85) brightness(0.92)",
        }}
      />
    </div>
  );
}

function ScrollCue() {
  return (
    <div className="flex flex-col items-center gap-3 opacity-60">
      <span className="font-sans text-label-sm text-on-surface">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="h-8 w-px bg-accent/60"
      />
    </div>
  );
}
