import { Section1Hero } from "@/components/sections/Section1Hero";

export default function Home() {
  return (
    <main>
      <Section1Hero />

      {/* Section 2 — Logo bar (placeholder) */}
      <section
        id="logos-marquee"
        className="border-t border-surface-mid/50 bg-background py-12 text-center"
      >
        <p className="font-sans text-label-sm text-on-surface">
          Section 2 — Logo bar (placeholder)
        </p>
      </section>

      {/* Section 3 — About Ray (placeholder) */}
      <section id="about" className="py-32 text-center">
        <p className="font-sans text-label-sm text-on-surface">
          Section 3 — About Ray (placeholder)
        </p>
      </section>

      {/* Section 4 — Services (placeholder) */}
      <section
        id="services"
        className="bg-surface py-32 text-center"
      >
        <p className="font-sans text-label-sm text-on-surface">
          Section 4 — Services (placeholder)
        </p>
      </section>

      {/* Section 5 — Video reel (placeholder) */}
      <section
        id="video"
        className="bg-background py-32 text-center"
      >
        <p className="font-sans text-label-sm text-on-surface">
          Section 5 — Video reel (placeholder)
        </p>
      </section>

      {/* Section 6 — Gallery (placeholder) */}
      <section id="gallery" className="py-32 text-center">
        <p className="font-sans text-label-sm text-on-surface">
          Section 6 — Gallery (placeholder)
        </p>
      </section>

      {/* Section 7 — Testimonials (placeholder) */}
      <section
        id="testimonials"
        className="bg-surface py-32 text-center"
      >
        <p className="font-sans text-label-sm text-on-surface">
          Section 7 — Testimonials (placeholder)
        </p>
      </section>

      {/* Section 8 — Client logos (placeholder) */}
      <section id="clients" className="py-32 text-center">
        <p className="font-sans text-label-sm text-on-surface">
          Section 8 — Client logos (placeholder)
        </p>
      </section>

      {/* Section 9 — Booking CTA (placeholder) */}
      <section
        id="book"
        className="bg-background py-32 text-center"
      >
        <p className="font-sans text-label-sm text-on-surface">
          Section 9 — Booking CTA (placeholder)
        </p>
      </section>
    </main>
  );
}
