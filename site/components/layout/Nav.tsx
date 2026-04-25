"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
        scrolled
          ? "backdrop-blur-xl border-b border-surface-mid"
          : "backdrop-blur-0 bg-transparent border-b border-transparent"
      )}
      style={
        scrolled
          ? { backgroundColor: "rgba(5, 11, 30, 0.75)" }
          : undefined
      }
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-8 md:px-16">
        <a
          href="#hero"
          className="font-display text-[20px] text-on-background"
        >
          Ray Chance
        </a>

        <nav className="hidden md:flex items-center gap-10">
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
    </header>
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
      className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-on-surface hover:text-on-background transition-colors duration-200"
    >
      {children}
    </a>
  );
}
