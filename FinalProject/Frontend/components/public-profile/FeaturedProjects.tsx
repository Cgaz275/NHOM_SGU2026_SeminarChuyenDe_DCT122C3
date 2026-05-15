import { Project } from '../../types/public-profile';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="rounded-[24px] bg-card border border-white/10 p-6 md:p-8 mt-6">
      <h2 className="text-xl font-bold text-foreground mb-4">Featured Projects</h2>
      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <div key={project.id} className="group relative border-l-2 border-white/10 pl-4 hover:border-brand-blue transition-colors">
            <h3 className="text-lg font-semibold text-white group-hover:text-electric-blue transition-colors">
              {project.title}
            </h3>
            <span className="text-xs font-medium text-brand-blue/80 mb-2 block">
              {project.dateRange}
            </span>
            <p className="text-sm text-text-muted mb-3 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white/5 rounded text-xs font-medium text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
