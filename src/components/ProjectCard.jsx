import TagList from './TagList';

export default function ProjectCard({ project, variant = 'default' }) {
  const Wrapper = project.href ? 'a' : 'article';
  const wrapperProps = project.href
    ? {
        href: project.href,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};
  const showDetails = variant === 'full' && project.details;

  return (
    <Wrapper
      className={`project-card project-card--${variant}`}
      {...wrapperProps}
    >
      <div className="project-card__media">
        <img
          src={project.image}
          alt={project.imageAlt || `${project.title} preview`}
          loading="lazy"
        />
      </div>
      <div className="project-card__body">
        <div className="project-card__head">
          <h3 className="project-card__title">{project.title}</h3>
          <span className="project-card__period">{project.period}</span>
        </div>
        <p className="project-card__desc">{project.description}</p>
        {showDetails && (
          <p className="project-card__details">{project.details}</p>
        )}
        <TagList tags={project.tags} />
      </div>
    </Wrapper>
  );
}
