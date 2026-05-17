import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects, variant = 'default' }) {
  return (
    <div className={`project-grid project-grid--${variant}`}>
      {projects.map((project) => (
        <ProjectCard key={project.id || project.title} project={project} variant={variant} />
      ))}
    </div>
  );
}
