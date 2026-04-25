"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "motion/react";
import { TextEffect } from "@/components/animations/text-appear-on-scroll";

// 2× speed override of the reference "blur" preset — matches Section3About convention.
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

type GalleryItem = {
  src: string;
  label: string;
  alt: string;
  objectPosition?: string;
};

const items: GalleryItem[] = [
  {
    src: "/images/ray-stage.jpg",
    label: "Stage Performance",
    alt: "Ray Chance performing on stage",
    objectPosition: "center",
  },
  {
    src: "/images/ray-closeup.avif",
    label: "Close-Up Magic",
    alt: "Ray Chance performing close-up magic",
    objectPosition: "center",
  },
  {
    src: "/images/event-corporate.avif",
    label: "Corporate Event",
    alt: "Ray Chance at a corporate event",
    objectPosition: "75% center",
  },
  {
    src: "/images/event-gala.png",
    label: "Private Gala",
    alt: "Ray Chance at a private gala",
    objectPosition: "center",
  },
  {
    src: "/images/ray-chance-portrait.avif",
    label: "Ray Chance",
    alt: "Portrait of Ray Chance",
    objectPosition: "center top",
  },
];

const EXPAND_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function Section6Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });

  return (
    <section
      id="gallery"
      className="relative w-full bg-background py-20 md:py-32"
    >
      {/* Top atmospheric divider */}
      <div className="atmospheric-divider absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-[1400px] px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center">
          <TextEffect
            as="p"
            per="word"
            variants={fastBlurVariants}
            trigger={headerInView}
            className="font-sans uppercase text-on-surface text-[12px] tracking-[0.15em]"
          >
            SELECTED PERFORMANCES
          </TextEffect>

          <TextEffect
            as="h2"
            per="word"
            variants={fastBlurVariants}
            trigger={headerInView}
            delay={0.075}
            className="font-display mt-6 text-on-background leading-[1.05] text-[clamp(36px,5vw,64px)]"
          >
            The Work Speaks.
          </TextEffect>
        </div>

        {/* Gallery — desktop interactive selector */}
        <div
          className="relative mt-16 hidden gap-1 md:flex"
          style={{ height: "clamp(480px, 60vh, 700px)" }}
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                aria-label={`Show ${item.label}`}
                aria-pressed={isActive}
                className="group relative h-full overflow-hidden rounded-[12px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{
                  flexGrow: isActive ? 7 : 1,
                  flexBasis: 0,
                  transition: `flex-grow 500ms ${EXPAND_EASE}`,
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={
                    isActive
                      ? "(min-width: 1400px) 900px, 65vw"
                      : "(min-width: 1400px) 110px, 9vw"
                  }
                  className="object-cover"
                  style={{
                    objectPosition: item.objectPosition ?? "center",
                    filter: isActive
                      ? "none"
                      : "brightness(0.5) saturate(0.6)",
                    transition: `filter 500ms ${EXPAND_EASE}`,
                  }}
                  priority={index === 0}
                  draggable={false}
                />

                {/* Bottom gradient veil — only on featured image */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(5, 11, 30, 0.85) 0%, transparent 50%)",
                    opacity: isActive ? 1 : 0,
                    transition: `opacity 500ms ${EXPAND_EASE}`,
                  }}
                />

                {/* Label — only visible on featured image */}
                <div
                  className="pointer-events-none absolute bottom-6 left-6 right-6 text-left font-display text-on-background"
                  style={{
                    fontSize: "20px",
                    letterSpacing: "-0.01em",
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? "translateY(0)"
                      : "translateY(8px)",
                    transition: `opacity 300ms ${EXPAND_EASE} 100ms, transform 300ms ${EXPAND_EASE} 100ms`,
                  }}
                >
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Gallery — mobile stacked rows, labels always visible */}
        <div className="mt-12 flex flex-col gap-3 md:hidden">
          {items.map((item) => (
            <div
              key={item.src}
              className="relative h-[140px] w-full overflow-hidden rounded-[12px]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: item.objectPosition ?? "center" }}
                draggable={false}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5, 11, 30, 0.85) 0%, transparent 50%)",
                }}
              />
              <div
                className="pointer-events-none absolute bottom-4 left-5 right-5 text-left font-display text-on-background"
                style={{ fontSize: "18px", letterSpacing: "-0.01em" }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom atmospheric divider */}
      <div className="atmospheric-divider absolute inset-x-0 bottom-0" />
    </section>
  );
}
