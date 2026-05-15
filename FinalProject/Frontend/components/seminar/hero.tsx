type FloatingCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
};

function FloatingCard({
  title,
  description,
  imageSrc,
  imageAlt,
  className = "",
}: FloatingCardProps) {
  return (
    <article
      className={`floating-card ${className}`}
    >
      <div className="floating-card-image-area">
        <img src={imageSrc} alt={imageAlt} className="floating-card-img" />
      </div>
      <div className="floating-card-body">
        <p className="floating-card-title">{title}</p>
        <p className="floating-card-desc">{description}</p>
      </div>
    </article>
  );
}

export function Hero() {
  return (
    <section id="top" className="hero-section">
      {/* Full-width hero text wrapper with overlaid cards */}
      <div className="hero-text-wrapper">
        {/* Desktop: Creative card — left side */}
        <div
          className="hero-card-anchor hero-card-anchor--creative"
          aria-hidden="true"
        >
          <FloatingCard
            title="CREATIVE"
            description="We don't just follow trends; we create them. We transform abstract ideas into vibrant, high-impact digital experiences"
            imageSrc="/team_members/D.jpeg"
            imageAlt="Creative portrait"
            className="rotate-[12deg]"
          />
        </div>

        {/* Desktop: Commitment card — right side */}
        <div
          className="hero-card-anchor hero-card-anchor--commitment"
          aria-hidden="true"
        >
          <FloatingCard
            title="COMMITMENT"
            description="Our commitment is rooted in precision and long-term reliability, ensuring that every solution we build is not only functional today but resilient."
            imageSrc="/team_members/mun.jpeg"
            imageAlt="Commitment portrait"
            className="rotate-[-19deg]"
          />
        </div>

        <h1 className="hero-title">
          <span className="block">Project</span>
          <span className="block">Seminar</span>
        </h1>
      </div>

      {/* Footer info row */}
      <div className="section-shell hero-footer-row">
        <p className="hero-footer-desc">
          Project 1: A feature-rich personal website with an AI digital twin
          without writing a line of code
        </p>
        <p className="hero-footer-since">Since 2026</p>
      </div>

      {/* Mobile cards — shown below text on small screens */}
      <div className="hero-mobile-cards">
        <FloatingCard
          title="CREATIVE"
          description="We don't just follow trends; we create them. We transform abstract ideas into vibrant, high-impact digital experiences"
          imageSrc="/team_members/D.jpeg"
          imageAlt="Creative portrait"
          className="-rotate-3"
        />
        <FloatingCard
          title="COMMITMENT"
          description="Our commitment is rooted in precision and long-term reliability, ensuring that every solution we build is not only functional today but resilient."
          imageSrc="/team_members/mun.jpeg"
          imageAlt="Commitment portrait"
          className="rotate-3"
        />
      </div>
    </section>
  );
}