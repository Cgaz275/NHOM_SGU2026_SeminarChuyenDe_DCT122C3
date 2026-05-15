interface SkillsSectionProps {
  skills: string[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="rounded-[24px] bg-card border border-white/10 p-6 md:p-8 mt-6">
      <h2 className="text-xl font-bold text-foreground mb-4">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-text-muted hover:text-white hover:border-brand-blue/50 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
