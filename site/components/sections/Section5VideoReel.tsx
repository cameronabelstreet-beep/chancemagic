"use client";

import { useRef } from "react";
import Image from "next/image";

export function Section5VideoReel() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handlePlay = () => {
    // TODO: replace with video embed (YouTube/Vimeo iframe) when source is provided.
    dialogRef.current?.showModal();
  };

  const handleClose = () => {
    dialogRef.current?.close();
  };

  return (
    <section
      id="video"
      className="relative w-full overflow-hidden py-24 md:py-40"
      style={{
        background:
          "linear-gradient(180deg, var(--accent-light) 0%, var(--accent) 100%)",
      }}
    >
      {/* Background texture — subtle, behind everything */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-section-background.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.05, filter: "saturate(0.3)" }}
          priority={false}
        />
      </div>

      {/* Top atmospheric divider */}
      <div className="atmospheric-divider absolute inset-x-0 top-0" />

      <div className="relative mx-auto max-w-[900px] px-6 md:px-8">
        {/* Section label */}
        <p
          className="text-center font-sans uppercase text-surface-mid text-[12px]"
          style={{ letterSpacing: "0.15em" }}
        >
          WATCH THE SHOW
        </p>

        {/* Headline */}
        <h2 className="font-display mt-6 text-center text-background text-[clamp(36px,5vw,64px)] leading-[1.05]">
          See It To Believe It.
        </h2>

        {/* Subline */}
        <p className="mt-6 mb-12 text-center font-sans text-surface-mid text-[16px]">
          One performance. Zero explanations.
        </p>

        {/* Video frame */}
        {/* TODO: Replace thumbnail and wire video — swap next/image for <iframe> with YouTube/Vimeo src */}
        <div
          className="relative aspect-video w-full overflow-hidden rounded-card border border-surface-mid"
          style={{ boxShadow: "0 0 60px rgba(133, 159, 192, 0.08)" }}
        >
          <Image
            src="/images/event-gala.png"
            alt="Ray Chance performing at a gala — video thumbnail"
            fill
            sizes="(min-width: 900px) 900px, 100vw"
            className="object-cover"
            style={{ filter: "brightness(0.6)" }}
            priority={false}
          />

          {/* Play button overlay */}
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Play video reel"
            className="group absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent transition-all duration-200 ease-out hover:scale-[1.08] hover:border-on-background"
            style={{ background: "rgba(5, 11, 30, 0.7)" }}
          >
            <span
              aria-hidden
              className="ml-1 text-on-background text-[28px] leading-none transition-colors duration-200"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              &#9654;
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ background: "rgba(25, 48, 96, 0.8)" }}
            />
          </button>
        </div>
      </div>

      {/* Bottom atmospheric divider */}
      <div className="atmospheric-divider absolute inset-x-0 bottom-0" />

      {/* Lightbox — placeholder until a real video embed is wired */}
      <dialog
        ref={dialogRef}
        onClick={handleClose}
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-[rgba(5,11,30,0.92)]"
      >
        <div
          className="flex h-full w-full items-center justify-center p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-card border border-surface-mid"
            style={{ boxShadow: "0 0 60px rgba(133, 159, 192, 0.18)" }}
          >
            <div className="relative aspect-video w-full">
              <Image
                src="/images/event-gala.png"
                alt="Ray Chance performing at a gala"
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close video"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-accent text-on-background transition-colors duration-200 hover:border-on-background"
            style={{ background: "rgba(5, 11, 30, 0.7)" }}
          >
            <span aria-hidden className="text-[18px] leading-none">
              &#10005;
            </span>
          </button>
        </div>
      </dialog>
    </section>
  );
}
