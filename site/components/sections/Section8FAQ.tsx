"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, type Variants } from "motion/react";
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

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What types of events is Ray available for?",
    answer:
      "Ray performs at a wide range of events — corporate galas, product launches, award shows, trade shows, grand openings, weddings, private parties, and more. Whether it's an intimate dinner for 20 or a stage show for 1,000, the experience is tailored to fit your event perfectly.",
  },
  {
    id: 2,
    question: "How far in advance should I book?",
    answer:
      "Ray's calendar fills quickly, especially for peak seasons. We recommend reaching out at least 6–8 weeks in advance for corporate events and 3–4 months ahead for weddings. That said, don't hesitate to inquire — last-minute availability does occasionally open up.",
  },
  {
    id: 3,
    question: "What is the difference between Close-Up Magic and the Stage Show?",
    answer:
      "Close-Up Magic is performed in the middle of your guests — Ray moves through the room, performing impossible things inches from people's hands and eyes. It's perfect for cocktail hours and networking events, reaching approximately 80 guests per hour. The Stage Show is a full-production performance from a stage, combining large-scale illusions, mentalism, and comedy for a seated audience. Both are available, and many clients book both for the same event.",
  },
  {
    id: 4,
    question: "Does Ray travel outside of Toronto?",
    answer:
      "Absolutely. Ray has performed across North America and internationally — including New York, Las Vegas, Los Angeles, Paris, and beyond. Travel and accommodation are coordinated directly and factored into the booking.",
  },
  {
    id: 5,
    question: "Is Ray available as an MC for events?",
    answer:
      "Yes. Ray is an experienced and natural MC. He can host your entire event, manage transitions between segments, and weave his performance throughout the evening — keeping energy high and audiences engaged from start to finish.",
  },
  {
    id: 6,
    question: "How do I get a quote or check availability?",
    answer:
      "Use the contact form at the bottom of this page or call Ray directly at 647-286-2273. Include your event date, location, approximate guest count, and event type. You'll hear back within one business day.",
  },
];

export function Section8FAQ() {
  const [openId, setOpenId] = useState<number>(faqs[0].id);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });

  return (
    <section
      id="faq"
      className="relative w-full bg-accent-light py-20 md:py-32"
    >
      {/* Top atmospheric divider */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--surface-mid), transparent)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-6 md:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_3fr] md:gap-16 lg:gap-24">
          {/* Left column — section label, headline, subline */}
          <div ref={headerRef} className="flex flex-col">
            <div className="space-y-6">
              {/* Section label */}
              <TextEffect
                as="p"
                per="word"
                variants={fastBlurVariants}
                trigger={headerInView}
                className="font-sans text-[12px] uppercase tracking-[0.15em] text-surface-mid"
              >
                GOT QUESTIONS
              </TextEffect>

              {/* Headline */}
              <TextEffect
                as="h2"
                per="word"
                variants={fastBlurVariants}
                trigger={headerInView}
                delay={0.075}
                className="font-display text-background leading-[1.05] text-[clamp(32px,4vw,56px)]"
              >
                Frequently Asked Questions
              </TextEffect>

              {/* Subline */}
              <TextEffect
                as="p"
                per="word"
                variants={fastBlurVariants}
                trigger={headerInView}
                delay={0.15}
                className="max-w-[340px] font-sans text-[16px] leading-[1.6] text-surface"
              >
                Everything you need to know before booking Ray for your next event.
              </TextEffect>
            </div>
          </div>

          {/* Right column — accordion */}
          <div>
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  style={{
                    borderBottom: "1px solid rgba(49, 83, 129, 0.4)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? -1 : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-surface-mid"
                    style={{ padding: "20px 0" }}
                  >
                    <span
                      className="font-sans text-background"
                      style={{
                        fontWeight: 600,
                        fontSize: 17,
                        lineHeight: 1.4,
                      }}
                    >
                      {faq.question}
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-surface-mid"
                      style={{
                        fontSize: 20,
                        lineHeight: 1,
                        fontFamily: "var(--font-manrope), system-ui, sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        id={`faq-panel-${faq.id}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          className="font-sans text-surface"
                          style={{
                            fontSize: 15,
                            lineHeight: 1.7,
                            paddingBottom: 24,
                            paddingRight: 32,
                          }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom atmospheric divider */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--surface-mid), transparent)",
        }}
      />
    </section>
  );
}
