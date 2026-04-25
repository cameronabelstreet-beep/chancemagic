"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        scrolled
          ? "border-b border-surface-mid"
          : "border-b border-transparent"
      )}
      style={{
        backgroundColor: scrolled ? "rgba(5, 11, 30, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-8 md:px-16">
        <a
          href="#hero"
          className="font-display text-[20px] text-on-background"
        >
          Ray Chance
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#gallery">Gallery</NavLink>
          <NavLink href="#testimonials">Press</NavLink>
        </nav>

        <Button
          variant="primary"
          onClick={() => {
            document
              .getElementById("book")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="hidden sm:inline-flex"
        >
          Book Ray
        </Button>
      </div>
    </motion.header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-on-surface transition-colors duration-200 hover:text-on-background"
    >
      {children}
    </a>
  );
}
