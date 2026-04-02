import { projects } from "./projects-data";
import { ProjectCard } from "./project-card";

export function ProjectList() {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
