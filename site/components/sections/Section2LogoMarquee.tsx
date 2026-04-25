const LOGOS = [
  { src: "/images/logos/disney-white.png", alt: "Disney" },
  { src: "/images/logos/google-white.png", alt: "Google" },
  { src: "/images/logos/microsoft-white.png", alt: "Microsoft" },
  { src: "/images/logos/coca-cola-white.png", alt: "Coca-Cola" },
  { src: "/images/logos/deloitte-white.png", alt: "Deloitte" },
  { src: "/images/logos/raptors-white.png", alt: "Toronto Raptors" },
  { src: "/images/logos/toronto-white.png", alt: "City of Toronto" },
] as const;

export function Section2LogoMarquee() {
  const track = [...LOGOS, ...LOGOS];

  return (
    <section
      id="logos-marquee"
      className="relative w-full overflow-hidden bg-background py-20"
    >
      <div className="atmospheric-divider absolute inset-x-0 top-0" />

      <p
        className="mb-12 text-center font-sans text-on-surface"
        style={{
          fontSize: "19.2px",
          lineHeight: 1.4,
          fontWeight: 600,
          letterSpacing: "0.12em",
        }}
      >
        As seen with
      </p>

      <div className="relative w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
          style={{
            background:
              "linear-gradient(to right, var(--background) 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
          style={{
            background:
              "linear-gradient(to left, var(--background) 0%, transparent 100%)",
          }}
        />

        <div className="flex w-max animate-marquee-x items-center gap-x-24">
          {track.map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className="flex h-12 w-44 shrink-0 items-center justify-center"
              aria-hidden={i >= LOGOS.length}
            >
              <img
                src={logo.src}
                alt={i < LOGOS.length ? logo.alt : ""}
                className="max-h-12 w-auto max-w-full object-contain"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="atmospheric-divider absolute inset-x-0 bottom-0" />
    </section>
  );
}
