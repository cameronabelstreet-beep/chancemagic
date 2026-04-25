"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, type Variants } from "motion/react";
import { Star } from "lucide-react";
import { TextEffect } from "@/components/animations/text-appear-on-scroll";

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

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Head of Events",
    company: "Coca-Cola Canada",
    rating: 5,
    content:
      "Ray performed at our annual leadership summit and completely transformed the energy in the room. Three hundred executives, and he had every single one of them on their feet. We've worked with entertainment acts before — none came close to this. We'll be booking him again.",
  },
  {
    id: 2,
    name: "David Park",
    role: "Senior Producer",
    company: "Walt Disney Pictures",
    rating: 5,
    content:
      "We brought Ray in for a private industry event in Los Angeles and the reaction was unlike anything we'd seen. He performed impossible things inches from people's faces and not one person could explain it. Truly world-class. The kind of talent that makes your event unforgettable.",
  },
  {
    id: 3,
    name: "Jennifer Rousseau",
    role: "Director of Corporate Relations",
    company: "Thomson Reuters",
    rating: 5,
    content:
      "Ray headlined our client appreciation gala and the feedback we received afterward was overwhelming. Guests were still talking about it weeks later. He's polished, professional, and absolutely astonishing. Exactly what a high-profile event needs.",
  },
];

const AUTO_ROTATE_MS = 6000;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

export function Section7Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(interval);
  }, [isPaused]);

  const active = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="relative w-full bg-background py-20 md:py-32"
    >
      {/* Top atmospheric divider */}
      <div className="atmospheric-divider absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left column — heading + dot indicators */}
          <div
            ref={headerRef}
            className="flex flex-col justify-center"
          >
            <div className="space-y-6">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, filter: "blur(12px)" }}
                animate={
                  headerInView
                    ? { opacity: 1, filter: "blur(0px)" }
                    : { opacity: 0, filter: "blur(12px)" }
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-accent bg-surface px-[14px] py-[6px] font-sans text-[12px] text-on-background"
              >
                <Star
                  aria-hidden
                  style={{
                    width: 14,
                    height: 14,
                    color: "var(--accent)",
                    fill: "var(--accent)",
                  }}
                />
                Trusted by the world&apos;s best
              </motion.div>

              {/* Headline */}
              <TextEffect
                as="h2"
                per="word"
                variants={fastBlurVariants}
                trigger={headerInView}
                delay={0.075}
                className="font-display text-on-background leading-[1.05] text-[clamp(36px,5vw,64px)]"
              >
                Leaving Crowds Speechless.
              </TextEffect>

              {/* Subline */}
              <TextEffect
                as="p"
                per="word"
                variants={fastBlurVariants}
                trigger={headerInView}
                delay={0.15}
                className="max-w-[420px] font-sans text-[16px] leading-[1.6] text-on-surface"
              >
                Don&apos;t take our word for it. See what some of the world&apos;s most recognized brands have to say.
              </TextEffect>

              {/* Dot indicators */}
              <div className="flex items-center gap-3 pt-4">
                {testimonials.map((t, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`View testimonial ${index + 1}`}
                      aria-pressed={isActive}
                      className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      style={{
                        height: 8,
                        width: isActive ? 24 : 8,
                        background: isActive
                          ? "var(--accent)"
                          : "var(--surface-mid)",
                        transition:
                          "width 300ms ease-out, background-color 300ms ease-out",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column — animated testimonial card */}
          <div
            className="relative min-h-[380px] md:min-h-[440px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.article
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative flex h-full flex-col rounded-card border border-surface-mid bg-surface p-6 md:p-10"
                style={{ boxShadow: "0 0 40px rgba(133, 159, 192, 0.06)" }}
              >
                {/* Decorative opening quote */}
                <span
                  aria-hidden
                  className="font-display pointer-events-none absolute select-none text-surface-mid"
                  style={{
                    top: 16,
                    left: 24,
                    fontSize: 72,
                    lineHeight: 1,
                  }}
                >
                  &ldquo;
                </span>

                {/* Stars */}
                <div className="relative z-10 mb-6 flex items-center gap-1">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star
                      key={i}
                      aria-hidden
                      style={{
                        width: 20,
                        height: 20,
                        color: "var(--accent)",
                        fill: "var(--accent)",
                      }}
                    />
                  ))}
                </div>

                {/* Quote body */}
                <p
                  className="relative z-10 flex-1 font-sans italic text-on-background"
                  style={{
                    fontSize: "clamp(16px, 1.8vw, 20px)",
                    lineHeight: 1.7,
                  }}
                >
                  {active.content}
                </p>

                {/* Atmospheric divider inside card */}
                <div
                  aria-hidden
                  className="my-6 h-px w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--surface-mid), transparent)",
                  }}
                />

                {/* Attribution */}
                <div className="relative z-10 flex items-center gap-4">
                  <div
                    aria-hidden
                    className="flex shrink-0 items-center justify-center rounded-full"
                    style={{
                      width: 48,
                      height: 48,
                      background: "var(--surface-mid)",
                      color: "var(--on-background)",
                      fontFamily: "var(--font-manrope), system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: 15,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {getInitials(active.name)}
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="font-sans text-on-background"
                      style={{ fontWeight: 700, fontSize: 15 }}
                    >
                      {active.name}
                    </h3>
                    <p
                      className="font-sans text-on-surface"
                      style={{ fontSize: 13 }}
                    >
                      {active.role}, {active.company}
                    </p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
