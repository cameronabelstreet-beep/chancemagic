import { Section1Hero } from "@/components/sections/Section1Hero";
import { Section2LogoMarquee } from "@/components/sections/Section2LogoMarquee";
import { Section3About } from "@/components/sections/Section3About";
import { Section4Services } from "@/components/sections/Section4Services";
import { Section5VideoReel } from "@/components/sections/Section5VideoReel";
import { Section6Gallery } from "@/components/sections/Section6Gallery";

export default function Home() {
  return (
    <main>
      <Section1Hero />
      <Section2LogoMarquee />
      <Section3About />
      <Section4Services />
      <Section5VideoReel />
      <Section6Gallery />

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
