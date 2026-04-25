"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Floating, {
  FloatingElement,
} from "@/components/animations/parallax-floating-cards";
import { Marquee } from "@/components/animations/text-banner-slider";

const CLIENT_NAMES = [
  "COCA-COLA",
  "DISNEY",
  "AMAZON",
  "ROGERS",
  "MICROSOFT",
  "PORSCHE",
  "MLSE",
];

const CARD_SRC = "/images/individual-card.jpg";

type CardSpec = {
  depth: number;
  rotate: number;
  // Tailwind position class string (top/left or top/right). Must be literal
  // — Tailwind cannot pick up dynamically built class names.
  positionClass: string;
};

const LEFT_CARDS: CardSpec[] = [
  { depth: 1.8, rotate: -15, positionClass: "top-[15%] left-[3%]" },
  { depth: -1.2, rotate: -25, positionClass: "top-[55%] left-[8%]" },
];

const RIGHT_CARDS: CardSpec[] = [
  { depth: 1.2, rotate: 12, positionClass: "top-[8%] right-[5%]" },
  { depth: -1.8, rotate: 20, positionClass: "top-[35%] right-[2%]" },
  { depth: 1.6, rotate: -8, positionClass: "top-[62%] right-[9%]" },
];

export function Section1Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Cards fade out across the first 20% of section scroll progress.
  const cardsOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  // Ray's photo: small downward drift "holds" him as the section scrolls
  // away. parallax-hero default for the closest layer is yPercent: 10 — +20%
  // per spec = 12.
  const rayY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#050B1E" }}
    >
      {/* Layer 1 — background spotlight (radial gradient over #050B1E base) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(133, 159, 192, 0.22) 0%, rgba(49, 83, 129, 0.08) 40%, transparent 70%)",
        }}
      />

      {/* Layer 2a — sliding marquee text (vertical center, behind Ray) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2"
        style={{ zIndex: 10 }}
      >
        <Marquee duration={35} direction="left" fade={false}>
          <BrandStrip />
        </Marquee>
      </div>

      {/* Layer 2b — floating playing cards */}
      <motion.div
        aria-hidden
        style={{ opacity: cardsOpacity, zIndex: 15 }}
        className="pointer-events-none absolute inset-0"
      >
        <Floating sensitivity={0.12} easingFactor={0.04}>
          {LEFT_CARDS.map((card, i) => (
            <FloatingElement
              key={`left-${i}`}
              depth={card.depth}
              className={card.positionClass}
            >
              <Card rotate={card.rotate} />
            </FloatingElement>
          ))}
          {RIGHT_CARDS.map((card, i) => (
            <FloatingElement
              key={`right-${i}`}
              depth={card.depth}
              className={card.positionClass}
            >
              <Card rotate={card.rotate} />
            </FloatingElement>
          ))}
        </Floating>
      </motion.div>

      {/* Layer 3a — Ray's photo (parallax, centered, bottom-aligned) */}
      <motion.div
        style={{ y: rayY, zIndex: 20 }}
        className="pointer-events-none absolute bottom-0 left-1/2 flex -translate-x-1/2 items-end justify-center"
      >
        <div className="relative h-[95vh] w-[min(100vw,1000px)]">
          <Image
            src="/images/ray-chance-portrait.avif"
            alt="Ray Chance"
            fill
            priority
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="object-contain object-bottom"
          />
        </div>
      </motion.div>

      {/* Layer 3b — split headline at bottom: CHANCE (left) / MAGIC (right).
          Each word is absolutely positioned to its edge so the photo can
          carve the middle and the words sit flush with the viewport sides. */}
      <span
        className="font-display pointer-events-none absolute bottom-0 left-0 block leading-[0.9]"
        style={{
          zIndex: 25,
          fontSize: "clamp(30px, 9vw, 132px)",
          color: "#CEE0F4",
        }}
      >
        CHANCE
      </span>
      <span
        className="font-display pointer-events-none absolute bottom-0 right-0 block leading-[0.9]"
        style={{
          zIndex: 25,
          fontSize: "clamp(30px, 9vw, 132px)",
          color: "#CEE0F4",
        }}
      >
        MAGIC
      </span>
    </section>
  );
}

function BrandStrip() {
  return (
    <div
      className="flex shrink-0 items-center whitespace-nowrap font-sans uppercase"
      style={{
        color: "#315381",
        fontWeight: 600,
        letterSpacing: "0.15em",
        fontSize: "clamp(13px, 1.4vw, 16px)",
      }}
    >
      {CLIENT_NAMES.map((name) => (
        <span key={name} className="flex items-center">
          <span className="px-8">{name}</span>
          <span style={{ color: "#859FC0" }}>◆</span>
          <span className="px-8" aria-hidden />
        </span>
      ))}
    </div>
  );
}

function Card({ rotate }: { rotate: number }) {
  return (
    <div
      className="relative overflow-hidden rounded-card"
      style={{
        width: "clamp(64px, 9vw, 120px)",
        aspectRatio: "573 / 1024",
        transform: `rotate(${rotate}deg)`,
        filter: "brightness(0.9) saturate(1.1)",
      }}
    >
      <Image
        src={CARD_SRC}
        alt=""
        fill
        sizes="130px"
        className="object-cover"
      />
    </div>
  );
}
