import ProjectGrid from '../components/ProjectGrid';
import SectionHeader from '../components/SectionHeader';
import { allProjects, utilityProjects } from '../data/site';

export default function Projects() {
  return (
    <>
      <section className="page-hero">
        <div className="container container--wide">
          <h1 className="page-hero__title">Projects</h1>
          <p className="page-hero__lede">
            Full-stack applications, AI tools, and utilities — each with a focus on clear
            architecture and shippable outcomes.
          </p>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container container--wide">
          <SectionHeader title="Applications" id="apps-heading" />
          <ProjectGrid projects={allProjects} variant="full" />
        </div>
      </section>

      <section className="section">
        <div className="container container--wide">
          <SectionHeader title="Utilities &amp; Experiments" id="utilities-heading" />
          <div className="utility-grid">
            {utilityProjects.map((project) => (
              <a
                key={project.id}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="utility-card"
              >
                <div className="media-frame">
                  <img src={project.image} alt="" loading="lazy" />
                </div>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="section-cta">
            <a href="https://github.com/TenathDilusha?tab=repositories" target="_blank" rel="noopener noreferrer">
              Browse all repositories on GitHub →
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
