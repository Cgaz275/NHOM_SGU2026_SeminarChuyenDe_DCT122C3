import { Experience } from '../../types/public-profile';

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  if (!experience || experience.length === 0) return null;

  return (
    <div className="rounded-[24px] bg-card border border-white/10 p-6 md:p-8 mt-6">
      <h2 className="text-xl font-bold text-foreground mb-4">Kinh nghiệm</h2>
      <div className="flex flex-col gap-6">
        {experience.map((exp) => (
          <div key={exp.id} className="relative border-l-2 border-white/10 pl-4">
            <div className="absolute w-2 h-2 rounded-full bg-brand-blue -left-[5px] top-2" />
            <h3 className="text-lg font-semibold text-white">
              {exp.company}
            </h3>
            <span className="text-xs font-medium text-text-muted mb-2 block">
              {exp.dateRange}
            </span>
            <p className="text-sm text-text-muted leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
