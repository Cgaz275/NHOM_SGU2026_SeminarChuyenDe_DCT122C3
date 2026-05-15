interface AboutSectionProps {
  bio: string;
}

export function AboutSection({ bio }: AboutSectionProps) {
  return (
    <div className="rounded-[24px] bg-card border border-white/10 p-6 md:p-8">
      <h2 className="text-xl font-bold text-foreground mb-4">About</h2>
      <p className="text-text-muted leading-relaxed text-sm md:text-base">
        {bio}
      </p>
    </div>
  );
}
