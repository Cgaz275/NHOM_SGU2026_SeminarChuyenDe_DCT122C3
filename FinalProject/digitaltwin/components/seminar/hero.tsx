type FloatingCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
  reverse?: boolean;
};

function FloatingCard({
  title,
  description,
  imageSrc,
  imageAlt,
  className = "",
  reverse = false,
}: FloatingCardProps) {
  return (
    <article
      className={`w-[17rem] overflow-hidden rounded-[1.75rem] bg-[var(--seminar-card)] shadow-[0_24px_70px_rgba(0,0,0,0.45)] ${className}`.trim()}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#b3c0ce]">
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`h-full w-full object-cover object-top ${reverse ? "scale-x-[-1]" : ""}`.trim()}
        />
        <div className="absolute inset-x-4 bottom-4 -rotate-3 rounded-2xl bg-white p-4 text-left text-black shadow-[0_16px_35px_rgba(0,0,0,0.24)]">
          <p className="text-[0.95rem] font-bold uppercase tracking-[0.14em]">
            {title}
          </p>
          <p className="mt-2 text-[0.7rem] leading-5 text-black/75">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Hero() {
  return (
    <section id="top" className="section-shell pb-16 pt-10 sm:pb-20 lg:pb-28 lg:pt-12">
      <div className="relative mx-auto max-w-6xl">
        <div className="relative z-10 text-center">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden -translate-x-1/2 items-start gap-6 lg:flex">
            <FloatingCard
              title="Creative"
              description="A digital experience shaped with strong visuals and a flexible foundation."
              imageSrc="https://api.builder.io/api/v1/image/assets/TEMP/19cafb30dc51fbddf5f9628f4b9fabb6a88debff?width=431"
              imageAlt="Creative portrait"
              className="-translate-x-2 rotate-[-12deg]"
            />
            <FloatingCard
              title="Commitment"
              description="Reliable delivery built for the long term, with detail and precision at every step."
              imageSrc="https://api.builder.io/api/v1/image/assets/TEMP/26c3b0690957592c8dfedcdaed7bc4bb715de442?width=231"
              imageAlt="Commitment portrait"
              className="mt-10 translate-x-2 rotate-[14deg]"
              reverse
            />
          </div>

          <h1 className="mx-auto max-w-5xl text-[clamp(4rem,18vw,8.3rem)] font-bold leading-[0.88] tracking-[-0.09em] text-white uppercase sm:text-[clamp(5rem,16vw,8.8rem)] lg:pt-16">
            Project
            <br />
            Seminar
          </h1>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-[0.65rem] font-bold tracking-[0.16em] text-white uppercase sm:flex-row sm:items-end sm:justify-between lg:mt-10">
          <p className="max-w-xs text-left leading-5 text-white/85">
            Project 1: A feature-rich personal website with an AI digital twin
            without writing a line of code
          </p>
          <p className="text-left sm:text-right">Since 2026</p>
        </div>

        <div className="mt-10 grid gap-5 lg:hidden">
          <FloatingCard
            title="Creative"
            description="A digital experience shaped with strong visuals and a flexible foundation."
            imageSrc="https://api.builder.io/api/v1/image/assets/TEMP/19cafb30dc51fbddf5f9628f4b9fabb6a88debff?width=431"
            imageAlt="Creative portrait"
            className="mx-auto max-w-[22rem] -rotate-3 lg:hidden"
          />
          <FloatingCard
            title="Commitment"
            description="Reliable delivery built for the long term, with detail and precision at every step."
            imageSrc="https://api.builder.io/api/v1/image/assets/TEMP/26c3b0690957592c8dfedcdaed7bc4bb715de442?width=231"
            imageAlt="Commitment portrait"
            className="mx-auto max-w-[22rem] rotate-3 lg:hidden"
            reverse
          />
        </div>
      </div>
    </section>
  );
}
