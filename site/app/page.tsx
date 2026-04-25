import { Section1Hero } from "@/components/sections/Section1Hero";
import { Section2LogoMarquee } from "@/components/sections/Section2LogoMarquee";
import { Section3About } from "@/components/sections/Section3About";
import { Section4Services } from "@/components/sections/Section4Services";
import { Section5VideoReel } from "@/components/sections/Section5VideoReel";
import { Section6Gallery } from "@/components/sections/Section6Gallery";
import { Section7Testimonials } from "@/components/sections/Section7Testimonials";
import { Section8FAQ } from "@/components/sections/Section8FAQ";
import { Section9BookingCTA } from "@/components/sections/Section9BookingCTA";

export default function Home() {
  return (
    <main>
      <Section1Hero />
      <Section2LogoMarquee />
      <Section3About />
      <Section4Services />
      <Section5VideoReel />
      <Section6Gallery />
      <Section7Testimonials />
      <Section8FAQ />
      <Section9BookingCTA />
    </main>
  );
}
