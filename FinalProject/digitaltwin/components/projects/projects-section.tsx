import { ProjectList } from './project-list';

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative bg-black py-12 md:py-16 lg:py-20"
    >
      <div className="section-shell">
        <h2 className="section-heading mb-12">OUR WORK</h2>
        <ProjectList />
      </div>
    </section>
  );
}
