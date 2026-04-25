"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  type Variants,
} from "motion/react";
import { TextEffect } from "@/components/animations/text-appear-on-scroll";

// Variants reused across sections — fast blur/fade for headline entrance.
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

const stepContentVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2, ease: "easeIn" } },
};

const STEPS = [
  { id: 0, label: "ABOUT YOU" },
  { id: 1, label: "YOUR EVENT" },
  { id: 2, label: "DETAILS" },
] as const;

type ServicePill = "Close-Up Magic" | "Stage Show" | "Corporate Entertainment";
const SERVICES: ServicePill[] = [
  "Close-Up Magic",
  "Stage Show",
  "Corporate Entertainment",
];

type FormPayload = {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  location: string;
  services: ServicePill[];
  notes: string;
};

const emptyForm: FormPayload = {
  fullName: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  guestCount: "",
  location: "",
  services: [],
  notes: "",
};

// KEY PIECE — defeats Chrome's autofill preview paint. Do NOT replace
// `backgroundImage` with `background` or `backgroundColor`. Used together
// with type="text" + inputMode (instead of type="email"/"tel") to avoid
// Chrome's autofill heuristic.
const fieldFill: CSSProperties = {
  backgroundColor: "transparent",
  backgroundImage: "linear-gradient(rgba(5, 11, 30, 0.6), rgba(5, 11, 30, 0.6))",
};

function Label({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-sans uppercase text-on-surface"
      style={{
        display: "block",
        fontSize: 11,
        letterSpacing: "0.1em",
        marginBottom: 6,
        fontWeight: 600,
      }}
    >
      {children}
    </label>
  );
}

const fieldClass =
  "w-full font-sans text-on-background placeholder:text-on-surface/60 outline-none transition-[border-color,box-shadow] duration-200 ease-out focus:border-accent focus:shadow-[0_0_0_3px_rgba(133,159,192,0.15)]";

const fieldStyle: CSSProperties = {
  border: "1px solid var(--surface-mid)",
  borderRadius: 8,
  padding: "14px 16px",
  fontSize: 15,
};

export function Section9BookingCTA() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormPayload>(emptyForm);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  const update = <K extends keyof FormPayload>(
    field: K,
    value: FormPayload[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: ServicePill) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to email backend
    console.log("Booking inquiry:", form);
    setSubmitted(true);
  };

  return (
    <section
      id="book"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Background texture — same treatment as Section 5 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-section-background.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.06, filter: "saturate(0.2)" }}
        />
      </div>

      {/* Top atmospheric divider */}
      <div className="atmospheric-divider absolute inset-x-0 top-0" />

      <div className="relative mx-auto px-6 py-24 md:px-8 md:py-40">
        <div className="mx-auto" style={{ maxWidth: 860 }}>
          {/* Header */}
          <div ref={headerRef} className="text-center">
            <TextEffect
              as="p"
              per="word"
              variants={fastBlurVariants}
              trigger={headerInView}
              className="font-sans uppercase text-on-surface text-[12px] tracking-[0.15em]"
            >
              BOOK RAY
            </TextEffect>

            <TextEffect
              as="h2"
              per="word"
              variants={fastBlurVariants}
              trigger={headerInView}
              delay={0.075}
              className="font-display mt-6 text-on-background leading-[1.05] text-[clamp(36px,5vw,64px)]"
            >
              Ready to Leave Your Guests Speechless?
            </TextEffect>

            <TextEffect
              as="p"
              per="word"
              variants={fastBlurVariants}
              trigger={headerInView}
              delay={0.15}
              className="font-sans text-on-surface text-[16px] mt-6 mb-12"
            >
              Tell Ray about your event. He&apos;ll get back to you within one
              business day.
            </TextEffect>
          </div>

          {/* Glass form panel */}
          <div
            className="relative p-7 md:p-12"
            style={{
              background: "rgba(25, 48, 96, 0.45)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid var(--surface-mid)",
              borderRadius: 20,
              boxShadow: "0 0 80px rgba(133, 159, 192, 0.07)",
            }}
          >

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                {/* Progress indicator */}
                <StepIndicator step={step} />

                <div style={{ position: "relative", marginTop: 32 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      variants={stepContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {step === 0 && (
                        <StepAboutYou form={form} update={update} />
                      )}
                      {step === 1 && (
                        <StepEvent form={form} update={update} />
                      )}
                      {step === 2 && (
                        <StepDetails
                          form={form}
                          update={update}
                          toggleService={toggleService}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div
                  className="flex items-center"
                  style={{
                    justifyContent: step === 0 ? "flex-end" : "space-between",
                    marginTop: 32,
                    gap: 12,
                  }}
                >
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="font-sans text-on-background transition-colors duration-200 hover:border-on-background"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--accent)",
                        borderRadius: 8,
                        padding: "12px 28px",
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      ← Back
                    </button>
                  )}

                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="font-sans text-on-background transition-colors duration-200 hover:bg-surface"
                      style={{
                        background: "var(--surface-mid)",
                        border: "1px solid transparent",
                        borderRadius: 8,
                        padding: "12px 28px",
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="font-sans text-on-background transition-all duration-200"
                      style={{
                        flex: 1,
                        background: "var(--surface-mid)",
                        border: "1px solid transparent",
                        borderRadius: 10,
                        padding: 16,
                        fontWeight: 700,
                        fontSize: 16,
                        cursor: "pointer",
                        boxShadow: "0 0 40px rgba(133, 159, 192, 0.12)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--surface)";
                        e.currentTarget.style.borderColor = "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "var(--surface-mid)";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                    >
                      Send My Inquiry →
                    </button>
                  )}
                </div>

                {/* Step counter */}
                <p
                  className="text-center font-sans text-on-surface"
                  style={{ fontSize: 12, marginTop: 16 }}
                >
                  Step {step + 1} of {STEPS.length}
                </p>
              </form>
            ) : (
              <SuccessState />
            )}
          </div>

          {/* Contact fallback */}
          <p
            className="text-center font-sans text-on-surface"
            style={{ fontSize: 14, marginTop: 32 }}
          >
            Prefer to talk directly? Call or text{" "}
            <a
              href="tel:6472862273"
              className="text-on-background transition-colors duration-200 hover:text-accent"
              style={{ fontWeight: 700, textDecoration: "none" }}
            >
              647-286-2273
            </a>{" "}
            or email{" "}
            <a
              href="mailto:ray@chancemagic.com"
              className="text-on-background transition-colors duration-200 hover:text-accent"
              style={{ fontWeight: 700, textDecoration: "none" }}
            >
              ray@chancemagic.com
            </a>
          </p>

          {/* Footer */}
          <footer
            className="text-center"
            style={{ marginTop: 64 }}
          >
            <p
              className="font-sans"
              style={{
                fontSize: 12,
                color: "var(--surface-mid)",
                marginBottom: 8,
              }}
            >
              © 2025 Ray Chance. All rights reserved.
            </p>
            <nav
              className="flex items-center justify-center"
              style={{ gap: 16 }}
            >
              <FooterLink href="#hero">Home</FooterLink>
              <span style={{ color: "var(--surface-mid)", fontSize: 12 }}>
                ·
              </span>
              <FooterLink href="#services">Services</FooterLink>
              <span style={{ color: "var(--surface-mid)", fontSize: 12 }}>
                ·
              </span>
              <FooterLink href="#book">Book</FooterLink>
            </nav>
          </footer>
        </div>
      </div>

      {/* Bottom atmospheric divider */}
      <div className="atmospheric-divider absolute inset-x-0 bottom-0" />
    </section>
  );
}

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="font-sans text-on-surface transition-colors duration-200 hover:text-on-background"
      style={{ fontSize: 12, textDecoration: "none" }}
    >
      {children}
    </a>
  );
}

// --- Step indicator -------------------------------------------------------

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="relative" style={{ paddingTop: 4, paddingBottom: 8 }}>
      {/* Connecting line — base */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 12,
          left: "calc(100% / 6)",
          right: "calc(100% / 6)",
          height: 2,
          background: "var(--surface)",
          borderRadius: 2,
        }}
      />
      {/* Connecting line — progress */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 12,
          left: "calc(100% / 6)",
          width: `${(step / (STEPS.length - 1)) * (4 / 6) * 100}%`,
          height: 2,
          background: "var(--accent)",
          borderRadius: 2,
          transition: "width 300ms ease-out",
        }}
      />

      <div className="flex items-start justify-between">
        {STEPS.map((s, i) => {
          const isActive = i === step;
          const isComplete = i < step;
          return (
            <div
              key={s.id}
              className="flex flex-col items-center"
              style={{ flex: 1, gap: 8 }}
            >
              <div
                aria-hidden
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isComplete
                    ? "var(--accent-light)"
                    : isActive
                      ? "var(--accent)"
                      : "var(--surface-mid)",
                  transition: "background 300ms ease-out",
                }}
              >
                {isComplete && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--background)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span
                className="font-sans uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: isActive
                    ? "var(--on-background)"
                    : "var(--on-surface)",
                  transition: "color 300ms ease-out",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Steps ----------------------------------------------------------------

function StepAboutYou({
  form,
  update,
}: {
  form: FormPayload;
  update: <K extends keyof FormPayload>(field: K, value: FormPayload[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="bk-name">Full Name</Label>
        <input
          id="bk-name"
          type="text"
          name="rc-fullname"
          autoComplete="off"
          required
          placeholder="Your name"
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          className={fieldClass}
          style={{ ...fieldFill, ...fieldStyle }}
        />
      </div>

      <div>
        <Label htmlFor="bk-email">Email Address</Label>
        <input
          id="bk-email"
          type="text"
          inputMode="email"
          name="rc-emailaddr"
          autoComplete="off"
          required
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={fieldClass}
          style={{ ...fieldFill, ...fieldStyle }}
        />
      </div>

      <div>
        <Label htmlFor="bk-phone">Phone (optional)</Label>
        <input
          id="bk-phone"
          type="text"
          inputMode="tel"
          name="rc-phonenum"
          autoComplete="off"
          placeholder="Your phone number"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={fieldClass}
          style={{ ...fieldFill, ...fieldStyle }}
        />
      </div>
    </div>
  );
}

function StepEvent({
  form,
  update,
}: {
  form: FormPayload;
  update: <K extends keyof FormPayload>(field: K, value: FormPayload[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="bk-event-type">Event Type</Label>
        <select
          id="bk-event-type"
          required
          value={form.eventType}
          onChange={(e) => update("eventType", e.target.value)}
          className={fieldClass}
          style={{
            ...fieldFill,
            ...fieldStyle,
            appearance: "none",
            WebkitAppearance: "none",
            backgroundImage:
              "linear-gradient(rgba(5, 11, 30, 0.6), rgba(5, 11, 30, 0.6)), url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='%23859FC0' d='M6 8L0 0h12z'/></svg>\")",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "0 0, right 16px center",
            backgroundSize: "100% 100%, 12px 8px",
            paddingRight: 40,
          }}
        >
          <option value="" disabled>
            Select an event type
          </option>
          <option value="corporate">Corporate Event</option>
          <option value="wedding">Wedding</option>
          <option value="private">Private Party</option>
          <option value="gala">Gala / Award Show</option>
          <option value="launch">Product Launch</option>
          <option value="trade">Trade Show</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <Label htmlFor="bk-date">Event Date</Label>
        <input
          id="bk-date"
          type="date"
          required
          placeholder="When is your event?"
          value={form.eventDate}
          onChange={(e) => update("eventDate", e.target.value)}
          className={fieldClass}
          style={{
            ...fieldFill,
            ...fieldStyle,
            colorScheme: "dark",
          }}
        />
      </div>

      <div>
        <Label htmlFor="bk-guests">Estimated Guest Count</Label>
        <select
          id="bk-guests"
          required
          value={form.guestCount}
          onChange={(e) => update("guestCount", e.target.value)}
          className={fieldClass}
          style={{
            ...fieldFill,
            ...fieldStyle,
            appearance: "none",
            WebkitAppearance: "none",
            backgroundImage:
              "linear-gradient(rgba(5, 11, 30, 0.6), rgba(5, 11, 30, 0.6)), url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='%23859FC0' d='M6 8L0 0h12z'/></svg>\")",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "0 0, right 16px center",
            backgroundSize: "100% 100%, 12px 8px",
            paddingRight: 40,
          }}
        >
          <option value="" disabled>
            Select a guest count
          </option>
          <option value="under-50">Under 50</option>
          <option value="50-150">50–150</option>
          <option value="150-300">150–300</option>
          <option value="300-500">300–500</option>
          <option value="500+">500+</option>
        </select>
      </div>

      <div>
        <Label htmlFor="bk-location">Location / City</Label>
        <input
          id="bk-location"
          type="text"
          name="rc-location"
          autoComplete="off"
          required
          placeholder="Where is your event?"
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          className={fieldClass}
          style={{ ...fieldFill, ...fieldStyle }}
        />
      </div>
    </div>
  );
}

function StepDetails({
  form,
  update,
  toggleService,
}: {
  form: FormPayload;
  update: <K extends keyof FormPayload>(field: K, value: FormPayload[K]) => void;
  toggleService: (service: ServicePill) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="bk-services-group">
          Which service are you interested in?
        </Label>
        <div
          id="bk-services-group"
          className="flex flex-wrap"
          style={{ gap: 10 }}
        >
          {SERVICES.map((service) => {
            const isSelected = form.services.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                aria-pressed={isSelected}
                className="font-sans transition-all duration-200"
                style={{
                  background: isSelected
                    ? "var(--surface-mid)"
                    : "var(--surface)",
                  color: isSelected
                    ? "var(--on-background)"
                    : "var(--on-surface)",
                  border: `1px solid ${isSelected ? "var(--accent)" : "var(--surface-mid)"}`,
                  borderRadius: 999,
                  padding: "10px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                }}
              >
                {service}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label htmlFor="bk-notes">Additional notes</Label>
        <textarea
          id="bk-notes"
          name="rc-notes"
          autoComplete="off"
          placeholder="Anything else Ray should know about your event?"
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          className={fieldClass}
          style={{
            ...fieldFill,
            ...fieldStyle,
            minHeight: 120,
            resize: "vertical",
            fontFamily: "inherit",
          }}
        />
      </div>
    </div>
  );
}

// --- Success state --------------------------------------------------------

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-center"
      style={{ paddingTop: 24, paddingBottom: 24 }}
    >
      <div
        aria-hidden
        style={{
          color: "var(--accent)",
          fontSize: 48,
          lineHeight: 1,
          marginBottom: 24,
        }}
      >
        ✓
      </div>
      <h3
        className="font-display text-on-background"
        style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1 }}
      >
        We&apos;ll be in touch.
      </h3>
      <p
        className="font-sans text-on-surface"
        style={{ fontSize: 15, marginTop: 16 }}
      >
        Ray will get back to you within one business day.
      </p>
    </motion.div>
  );
}

