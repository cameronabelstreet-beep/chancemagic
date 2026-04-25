"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export function Section1Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background image holds position as the section scrolls away — drifts
  // down 13.8% (parallax-hero closest layer + 15%).
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "13.8%"]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#050B1E" }}
    >
      {/* Layer 1 — full-bleed hero background image (Ray + spotlight baked in) */}
      <motion.div
        aria-hidden
        style={{ y: bgY, zIndex: 0 }}
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Layer 2 — split headline at bottom: CHANCE (left) / MAGIC (right). */}
      <span
        className="font-display pointer-events-none absolute bottom-0 block leading-[0.9]"
        style={{
          left: "4%",
          zIndex: 25,
          fontSize: "clamp(28px, 8vw, 116px)",
          color: "#CEE0F4",
        }}
      >
        CHANCE
      </span>
      <span
        className="font-display pointer-events-none absolute bottom-0 block leading-[0.9]"
        style={{
          right: "4%",
          zIndex: 25,
          fontSize: "clamp(28px, 8vw, 116px)",
          color: "#CEE0F4",
        }}
      >
        MAGIC
      </span>
    </section>
  );
}
