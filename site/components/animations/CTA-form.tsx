// =============================================================================
// CTA FORM — Reference port (originally from "The Cleaning Foundation").
// Documents the Chrome-autofill-defeat technique. We will adapt this when we
// build Section 9 — restyled to Navy Prestige (accent bottom border, polo blue
// focus glow). Until then this lives here as the canonical reference.
// =============================================================================
//
// THE AUTOFILL PROBLEM (read this before copy-pasting)
//
// Chrome paints an "autofill preview" via :-internal-autofill-previewed which
// page CSS cannot target. Defeat it by giving the input a transparent
// background-color and a linear-gradient background-image — the gradient
// covers Chrome's preview paint.
//
// What does NOT defeat it: autocomplete="off", readonly hacks, plain
// :-webkit-autofill rules, the long transition-background-color hack.
//
// What DOES (combined): transparent background-color + linear-gradient
// background-image, plus type="text" + inputMode="email"/"tel" instead of
// type="email"/"tel" (Chrome's heuristic is keyed off the type attribute).

"use client";

import React, { useState } from "react";

interface CTAFormProps {
  phoneNumber?: string;
  phoneDisplay?: string;
  onSubmit?: (data: FormData) => Promise<void> | void;
}

export const CTAForm: React.FC<CTAFormProps> = ({
  phoneNumber = "+14165550123",
  phoneDisplay = "(416) 555-0123",
  onSubmit,
}) => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      setSubmitting(true);
      await onSubmit(new FormData(e.currentTarget));
      setSubmitting(false);
    }
  };

  // KEY PIECE: these inline styles defeat Chrome's autofill preview.
  // Do NOT replace `backgroundImage` with `background` or `backgroundColor`.
  const fieldFill: React.CSSProperties = {
    backgroundColor: "transparent",
    backgroundImage: "linear-gradient(#193060, #193060)",
  };

  return (
    <form
      className="glass-card"
      onSubmit={handleSubmit}
      aria-labelledby="cta-heading"
    >
      <h2 id="cta-heading" className="glass-headline">
        Let us take this off your list.
      </h2>
      <p className="glass-sub">
        Tell us about your home. We&rsquo;ll take it from there.
      </p>

      <div className="glass-field">
        <label className="glass-label" htmlFor="cta-name">
          Full Name
        </label>
        <input
          className="glass-input"
          id="cta-name"
          type="text"
          name="tcf-fullname"
          placeholder="Your name"
          autoComplete="off"
          required
          style={fieldFill}
        />
      </div>

      <div className="glass-field">
        <label className="glass-label" htmlFor="cta-email">
          Email
        </label>
        <input
          className="glass-input"
          id="cta-email"
          type="text"
          inputMode="email"
          name="tcf-emailaddr"
          placeholder="you@example.com"
          autoComplete="off"
          required
          style={fieldFill}
        />
      </div>

      <div className="glass-field">
        <label className="glass-label" htmlFor="cta-phone">
          Phone
        </label>
        <input
          className="glass-input"
          id="cta-phone"
          type="text"
          inputMode="tel"
          name="tcf-phonenum"
          placeholder="(416) 555-0123"
          autoComplete="off"
          style={fieldFill}
        />
      </div>

      <div className="glass-field">
        <label className="glass-label" htmlFor="cta-service">
          Service
        </label>
        <select
          className="glass-select"
          id="cta-service"
          name="service"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Select a service
          </option>
          <option value="regular">Regular Maintenance</option>
          <option value="deep">Deep Clean</option>
          <option value="move">Move-In + Move-Out</option>
          <option value="post-construction">Post-Construction</option>
          <option value="commercial">Commercial + Office</option>
          <option value="recurring">Recurring Plan</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="glass-field">
        <label className="glass-label" htmlFor="cta-message">
          Anything we should know?
        </label>
        <textarea
          className="glass-textarea"
          id="cta-message"
          name="message"
          rows={3}
          placeholder="Square footage, pets, access notes"
          style={fieldFill}
        />
      </div>

      <button className="glass-submit" type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Book a Clean →"}
      </button>
      <a href={`tel:${phoneNumber}`} className="glass-callback">
        Or call {phoneDisplay}
      </a>
    </form>
  );
};

export default CTAForm;
