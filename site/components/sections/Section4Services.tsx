"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "motion/react";
import {
  MagicWandIcon,
  Mic01Icon,
  Building03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { TextEffect } from "@/components/animations/text-appear-on-scroll";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  label: string;
  icon: typeof MagicWandIcon;
  image: string;
  alt: string;
  objectPosition?: string;
  body: string;
  runtime?: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    id: "close-up",
    label: "Close-Up Magic",
    icon: MagicWandIcon,
    image: "/images/ray-closeup.avif",
    alt: "Ray Chance performing close-up magic at an outdoor event",
    objectPosition: "75% center",
    body: "Ray's close-up magic is edgy, interactive, and impossible to explain. Performed inches from your guests, it creates moments of genuine astonishment that travel through a room. Perfect for cocktail hours, galas, and any event where you want your guests talking — reaches approximately 80 guests per hour.",
    tags: ["COCKTAIL HOURS", "WEDDINGS", "CORPORATE", "PRIVATE EVENTS"],
  },
  {
    id: "stage-show",
    label: "Stage Show",
    icon: Mic01Icon,
    image: "/images/ray-stage.jpg",
    alt: "Ray Chance on stage in front of a large crowd",
    body: "A full-production performance that leaves audiences bewildered. Ray combines large-scale illusions, sharp mentalism, and clean comedy into a high-energy show built on audience participation. Every moment is crafted to land — no filler, no downtime.",
    runtime: "Run time: 45 min | 30 min",
    tags: ["ILLUSIONS", "MENTALISM", "COMEDY", "AUDIENCE PARTICIPATION"],
  },
  {
    id: "corporate",
    label: "Corporate Entertainment",
    icon: Building03Icon,
    image: "/images/event-corporate.avif",
    alt: "Professional corporate audience at an indoor gala",
    body: "From product launches and award shows to trade shows and grand openings — Ray delivers customized performances that match the tone and ambition of your event. He reads the room, adapts on the fly, and leaves your guests with something they didn't expect. MC services available.",
    tags: [
      "GALAS",
      "PRODUCT LAUNCHES",
      "TRADE SHOWS",
      "AWARD SHOWS",
      "MC AVAILABLE",
    ],
  },
];

const AUTO_PLAY_INTERVAL = 5000;
const ITEM_HEIGHT = 80;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const fastBlurVariants: { container: Variants; item: Variants } = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.025 } },
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

export function Section4Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % SERVICES.length) + SERVICES.length) % SERVICES.length;

  const nextStep = useCallback(() => setStep((s) => s + 1), []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + SERVICES.length) % SERVICES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(t);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = SERVICES.length;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;
    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <section
      id="services"
      className="relative w-full bg-background py-20 md:py-32"
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="mx-auto mb-16 max-w-4xl px-6 text-center md:mb-20 md:px-8"
      >
        <TextEffect
          as="p"
          per="word"
          variants={fastBlurVariants}
          trigger={headerInView}
          className="font-sans font-semibold uppercase text-on-surface text-[12px] tracking-[0.15em]"
        >
          OUR SERVICES
        </TextEffect>
        <TextEffect
          as="h2"
          per="word"
          variants={fastBlurVariants}
          trigger={headerInView}
          delay={0.1}
          className="font-display mt-6 text-on-background text-[clamp(40px,5vw,64px)] leading-[1.05]"
        >
          WHAT RAY DOES BEST
        </TextEffect>
      </div>

      {/* Carousel */}
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <div
          className="relative flex min-h-[600px] flex-col overflow-hidden rounded-card border border-surface-mid bg-surface lg:aspect-video lg:min-h-0 lg:flex-row"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left panel — chip stack */}
          <div className="relative z-30 flex min-h-[300px] w-full items-center justify-start overflow-hidden bg-surface px-8 md:min-h-[380px] md:px-16 lg:h-full lg:w-[40%] lg:pl-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-40 h-12 md:h-20 lg:h-16"
              style={{
                background:
                  "linear-gradient(to bottom, var(--surface) 0%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-12 md:h-20 lg:h-16"
              style={{
                background:
                  "linear-gradient(to top, var(--surface) 0%, transparent 100%)",
              }}
            />

            <div className="relative z-20 flex h-full w-full items-center justify-center lg:justify-start">
              {SERVICES.map((service, index) => {
                const isActive = index === currentIndex;
                const distance = index - currentIndex;
                const wrappedDistance = wrap(
                  -(SERVICES.length / 2),
                  SERVICES.length / 2,
                  distance,
                );

                return (
                  <motion.div
                    key={service.id}
                    style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                    animate={{
                      y: wrappedDistance * ITEM_HEIGHT,
                      opacity: 1 - Math.abs(wrappedDistance) * 0.45,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 22,
                      mass: 1,
                    }}
                    className="absolute flex items-center justify-start"
                  >
                    <button
                      type="button"
                      onClick={() => handleChipClick(index)}
                      aria-label={`Show ${service.label}`}
                      aria-current={isActive}
                      className={cn(
                        "relative flex items-center gap-4 rounded-full border px-6 py-3.5 text-left transition-all duration-700 md:px-8 md:py-4",
                        isActive
                          ? "z-10 border-accent bg-accent text-background"
                          : "border-surface-mid bg-surface text-on-surface hover:border-accent hover:text-on-background hover:[box-shadow:0_0_40px_rgba(133,159,192,0.12)]",
                      )}
                    >
                      <HugeiconsIcon
                        icon={service.icon}
                        size={18}
                        strokeWidth={2}
                        className={cn(
                          "shrink-0 transition-colors duration-500",
                          isActive ? "text-background" : "text-on-surface",
                        )}
                      />
                      <span className="whitespace-nowrap font-sans text-[13px] font-semibold uppercase tracking-tight md:text-[14px]">
                        {service.label}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right panel — image stack */}
          <div className="relative flex min-h-[560px] flex-1 items-center justify-center overflow-hidden border-t border-surface-mid bg-background px-6 py-10 md:min-h-[680px] md:px-12 md:py-16 lg:h-full lg:border-l lg:border-t-0 lg:px-10 lg:py-12">
            <div className="relative flex aspect-[4/5.6] w-full max-w-[460px] items-center justify-center">
              {SERVICES.map((service, index) => {
                const status = getCardStatus(index);
                const isActive = status === "active";
                const isPrev = status === "prev";
                const isNext = status === "next";

                return (
                  <motion.div
                    key={service.id}
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                      rotate: isPrev ? -3 : isNext ? 3 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 origin-center overflow-hidden rounded-card border-4 border-background bg-background md:border-[6px]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image}
                      alt={service.alt}
                      className={cn(
                        "h-full w-full object-cover transition-all duration-700",
                        isActive ? "" : "grayscale brightness-75 blur-[2px]",
                      )}
                      style={{
                        filter: isActive ? "saturate(0.7)" : undefined,
                        objectPosition: service.objectPosition ?? "center",
                      }}
                      draggable={false}
                    />

                    {/* "Now Showing" indicator (top-left) */}
                    <div
                      className={cn(
                        "absolute left-6 top-6 flex items-center gap-3 transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-on-background">
                        Now Showing
                      </span>
                    </div>

                    {/* Bottom overlay — pill, body, runtime, tags */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{
                            duration: 0.45,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 pt-32 md:p-8"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(5,11,30,0.95) 0%, rgba(5,11,30,0.78) 45%, transparent 100%)",
                          }}
                        >
                          <div className="mb-3 inline-flex items-center gap-2 self-start rounded-full border border-accent bg-background px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-on-background">
                            {String(index + 1).padStart(2, "0")}
                            <span className="text-accent">•</span>
                            {service.label}
                          </div>

                          <p className="font-sans text-[13px] leading-[1.55] text-on-background">
                            {service.body}
                          </p>

                          {service.runtime && (
                            <p className="mt-3 font-sans text-[12px] text-on-surface">
                              {service.runtime}
                            </p>
                          )}

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-accent bg-surface px-2.5 py-1 font-sans text-[9px] uppercase tracking-[0.12em] text-on-background"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
