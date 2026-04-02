'use client';

import { Project } from "./projects-data";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const handleOpenLink = () => {
    if (project.projectUrl) {
      window.open(project.projectUrl, "_blank");
    }
  };

  return (
    <div className="project-card">
      <img
        src={project.image}
        alt={project.title}
        className="project-card-image"
      />
      <div className="project-card-content">
        <div className="project-card-header">
          <div>
            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-date">{project.dateRange}</p>
          </div>
          <button
            className="project-card-icon"
            aria-label="Open project link"
            type="button"
            onClick={handleOpenLink}
            disabled={!project.projectUrl}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </button>
        </div>
        <p className="project-card-description">{project.description}</p>
        <div className="project-card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tech-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
