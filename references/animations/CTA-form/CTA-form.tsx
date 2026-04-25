// =============================================================================
// CTA FORM — The Cleaning Foundation
// =============================================================================
//
// This file documents the final CTA form pattern shipped on site/index.html,
// including the Chrome-autofill-defeat technique that took several rounds to
// land. If you build another form in this project (or any future project),
// start from this.
//
// -----------------------------------------------------------------------------
// THE AUTOFILL PROBLEM (read this before copy-pasting)
// -----------------------------------------------------------------------------
//
// When Chrome has saved profile data matching an input's heuristic signals
// (`type`, `name`, visible label, autocomplete value), it paints an "autofill
// preview" over the input on page load — a solid colored bar (usually white,
// sometimes pale yellow) that shows the value Chrome would fill if you hit
// Enter. This paint is rendered via an INTERNAL pseudo-class —
// `:-internal-autofill-previewed` — that page CSS cannot target.
//
// Things that DO NOT reliably defeat it:
//   - `autocomplete="off"` (Chrome ignores it on most forms)
//   - `readonly` + onfocus removeAttribute hack (Chrome bypasses in recent versions)
//   - `:-webkit-autofill { -webkit-box-shadow: inset ... !important }`
//       (only catches the COMMITTED autofill state, not the preview state)
//   - Long `transition: background-color 600000s` hack
//       (freezes the preview color instead of the intended color)
//   - Renaming `name` / swapping `type="email"` to `type="text"`
//       (helps, but Chrome's heuristic is surprisingly persistent)
//   - Incognito mode (Chrome Sync carries profile data into incognito)
//
// -----------------------------------------------------------------------------
// THE FIX: background-image gradient trick
// -----------------------------------------------------------------------------
//
// Chrome's autofill preview only overrides the `background-color` property.
// It does NOT override `background-image`. Rendering order:
//
//   1. background-color (painted first — Chrome paints white here)
//   2. background-image (painted on top — hides the white beneath)
//
// Therefore: set `background-color: transparent` and paint the input's visible
// fill via a single-color linear-gradient, which renders as a `background-image`.
// Chrome's white preview paint ends up buried under the gradient and is never
// visible.
//
//   background-color: transparent;
//   background-image: linear-gradient(#211E1C, #211E1C);
//
// For <select> elements that already use a background-image (e.g. chevron),
// stack both images comma-separated — the chevron on top, the fill beneath:
//
//   background-image:
//     url("data:image/svg+xml;utf8,<svg...chevron...></svg>"),
//     linear-gradient(#211E1C, #211E1C);
//   background-repeat: no-repeat, no-repeat;
//   background-position: right 14px center, center;
//   background-size: 12px 8px, 100% 100%;
//
// Keep a `:-webkit-autofill` rule with `!important` box-shadow inset as
// belt-and-suspenders for the committed-fill state after the user actually
// submits autofill from the dropdown.
//
// -----------------------------------------------------------------------------
// BRAND ALIGNMENT (The Cleaning Foundation)
// -----------------------------------------------------------------------------
//
// Card bg:       var(--color-anchor)  = #1A1817 (deep charcoal)
// Input fill:    #211E1C              (one shade lighter than card)
// Input focus:   #2A2623              (subtle lift on focus)
// Text:          #ffffff              (white)
// Placeholder:   rgba(255,255,255,0.35)
// Border:        1px solid rgba(255,255,255,0.12)
// Border focus:  rgba(255,255,255,0.40)
// Label:         Switzer 500, 0.75rem, uppercase, 0.08em tracking,
//                color rgba(255,255,255,0.75), margin-bottom 8px
// Headline:      EB Garamond 500, clamp(1.75rem, 3vw + 0.5rem, 2.5rem)
// Submit:        var(--color-olive) bg, white text, Switzer 600, 10px radius
//
// -----------------------------------------------------------------------------
// REFERENCE IMPLEMENTATION (plain HTML/CSS mirror of the site)
// -----------------------------------------------------------------------------
//
// This is the actual structure shipped on site/index.html section #contact.
// Ported below to React/TSX for reuse. The styling is in vanilla-HTML classes
// (.glass-card, .glass-label, .glass-input, etc.) — see site/index.html ~line
// 762-870 for the full CSS block.

"use client";

import React, { useState } from "react";

interface CTAFormProps {
  phoneNumber?: string; // e.g. "+14165550123"
  phoneDisplay?: string; // e.g. "(416) 555-0123"
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

  // KEY PIECE: these inline styles are what defeat Chrome's autofill preview.
  // Do NOT replace `backgroundImage` with `background` or `backgroundColor`.
  // The linear-gradient is a background-image; Chrome's preview paint hits
  // background-color (which we set to transparent) and ends up buried beneath.
  const fieldFill: React.CSSProperties = {
    backgroundColor: "transparent",
    backgroundImage: "linear-gradient(#211E1C, #211E1C)",
  };
  const fieldFillFocus: React.CSSProperties = {
    backgroundImage: "linear-gradient(#2A2623, #2A2623)",
  };

  return (
    <form className="glass-card" onSubmit={handleSubmit} aria-labelledby="cta-heading">
      <h2 id="cta-heading" className="glass-headline">Let us take this off your list.</h2>
      <p className="glass-sub">Tell us about your home. We&rsquo;ll take it from there.</p>

      <div className="glass-field">
        <label className="glass-label" htmlFor="cta-name">Full Name</label>
        <input
          className="glass-input"
          id="cta-name"
          type="text"
          name="tcf-fullname"                // obfuscated to dampen Chrome heuristic
          placeholder="Your name"
          autoComplete="off"
          required
          style={fieldFill}
        />
      </div>

      <div className="glass-field">
        <label className="glass-label" htmlFor="cta-email">Email</label>
        <input
          className="glass-input"
          id="cta-email"
          type="text"                        // NOT "email" — triggers Chrome autofill heuristic
          inputMode="email"                  // still gives mobile users the @ keyboard
          name="tcf-emailaddr"
          placeholder="you@example.com"
          autoComplete="off"
          required
          style={fieldFill}
        />
      </div>

      <div className="glass-field">
        <label className="glass-label" htmlFor="cta-phone">Phone</label>
        <input
          className="glass-input"
          id="cta-phone"
          type="text"                        // NOT "tel"
          inputMode="tel"
          name="tcf-phonenum"
          placeholder="(416) 555-0123"
          autoComplete="off"
          style={fieldFill}
        />
      </div>

      <div className="glass-field">
        <label className="glass-label" htmlFor="cta-service">Service</label>
        <select
          className="glass-select"
          id="cta-service"
          name="service"
          required
          defaultValue=""
        >
          <option value="" disabled>Select a service</option>
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
        <label className="glass-label" htmlFor="cta-message">Anything we should know?</label>
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
      <a href={`tel:${phoneNumber}`} className="glass-callback">Or call {phoneDisplay}</a>
    </form>
  );
};

export default CTAForm;

// =============================================================================
// CSS (mirror of site/index.html — keep in your global stylesheet)
// =============================================================================
/*
.glass-card {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 560px;
  padding: clamp(2rem, 4vw + 0.5rem, 3rem);
  background: #1A1817;
  border-radius: 20px;
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04);
}

.glass-headline {
  font-family: 'EB Garamond', Georgia, serif;
  font-weight: 500;
  font-size: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
  line-height: 1.1;
  color: #ffffff;
  letter-spacing: -0.01em;
  margin: 0 0 1rem;
}
.glass-sub {
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 1.5rem;
}

.glass-field { margin-bottom: 1rem; }
.glass-label {
  display: block;
  font-family: 'Switzer', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 8px;
}

.glass-input,
.glass-textarea,
.glass-select {
  width: 100%;
  padding: 12px 14px;
  // ⬇ THE FIX — background-color transparent + background-image gradient
  background-color: transparent;
  background-image: linear-gradient(#211E1C, #211E1C);
  // ⬆ Chrome's autofill preview overrides background-color only;
  //   background-image renders on top and hides the preview paint.
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border-radius: 10px;
  font-family: 'Switzer', sans-serif;
  line-height: 1.4;
  transition: border-color 200ms, background-image 200ms;
  -webkit-appearance: none;
  appearance: none;
}
.glass-select {
  background-image:
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path d='M1 1.5L6 6.5L11 1.5' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>"),
    linear-gradient(#211E1C, #211E1C);
  background-repeat: no-repeat, no-repeat;
  background-position: right 14px center, center;
  background-size: 12px 8px, 100% 100%;
  padding-right: 38px;
}
.glass-textarea { resize: vertical; min-height: 92px; }
.glass-input::placeholder,
.glass-textarea::placeholder { color: rgba(255, 255, 255, 0.35); }

.glass-input:focus,
.glass-textarea:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background-image: linear-gradient(#2A2623, #2A2623);
}
.glass-select:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background-image:
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path d='M1 1.5L6 6.5L11 1.5' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>"),
    linear-gradient(#2A2623, #2A2623);
}

// Belt-and-suspenders for the COMMITTED autofill state (after user picks a
// suggestion from Chrome's dropdown). The base rule above handles preview.
.glass-input:-webkit-autofill,
.glass-input:-webkit-autofill:hover,
.glass-input:-webkit-autofill:focus,
.glass-input:-webkit-autofill:active,
.glass-textarea:-webkit-autofill,
.glass-select:-webkit-autofill {
  -webkit-text-fill-color: #ffffff !important;
  -webkit-box-shadow: 0 0 0 1000px #211E1C inset !important;
  box-shadow: 0 0 0 1000px #211E1C inset !important;
  caret-color: #ffffff;
  transition: background-color 9999s ease-in-out 0s;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
}

.glass-submit {
  width: 100%;
  background: #8A9A7B;  // var(--color-olive) — The Cleaning Foundation sage accent
  color: #ffffff;
  border: 0;
  border-radius: 10px;
  padding: 14px;
  font-family: 'Switzer', sans-serif;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: filter 150ms, transform 150ms;
  margin-top: 1rem;
}
.glass-submit:hover { filter: brightness(1.1); }

.glass-callback {
  display: block;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
}
.glass-callback:hover { color: #ffffff; }
*/

// =============================================================================
// CHECKLIST FOR FUTURE FORMS (paste this into any new form you build)
// =============================================================================
//
// [ ] Inputs use `background-color: transparent` + `background-image:
//     linear-gradient(<fill>, <fill>)`.  Never `background` or `background-color`
//     alone for the visible fill.
//
// [ ] Select elements stack the chevron SVG above the gradient fill
//     (comma-separated, chevron first) with matched `background-repeat`,
//     `background-position`, `background-size`.
//
// [ ] Focus state also uses `background-image: linear-gradient(...)` — don't
//     revert to `background-color` on focus or Chrome will repaint.
//
// [ ] `transition` animates `background-image`, not `background`.
//
// [ ] Keep a `:-webkit-autofill` rule with `!important -webkit-box-shadow: 0 0 0
//     1000px <fill> inset` for the committed-fill state.
//
// [ ] For email/tel fields: use `type="text"` + `inputMode="email"` /
//     `inputMode="tel"` — same mobile keyboard, no Chrome autofill heuristic.
//
// [ ] Obfuscate `name` attributes: `name="tcf-emailaddr"`, not `name="email"`.
//
// [ ] Set `autocomplete="off"` on every input (lowest-level defense, cheap to add).
//
// [ ] Visible labels above inputs (brand: Switzer 500 uppercase, 0.08em tracking).
//     Placeholders show format examples, not field repetition.
//
// [ ] Solid dark card (anchor #1A1817), not translucent glass — glass cards on
//     photo backgrounds fight the inputs' contrast and reveal the autofill paint.
