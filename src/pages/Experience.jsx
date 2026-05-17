import ExperienceCard from '../components/ExperienceCard';
import SectionHeader from '../components/SectionHeader';
import { certifications, experiencePreview, hackathons, skills } from '../data/site';

export default function Experience() {
  return (
    <>
      <section className="page-hero">
        <div className="container container--wide">
          <h1 className="page-hero__title">Experience</h1>
          <p className="page-hero__lede">
            Education, technical skills, competitions, and certifications that shaped how I build software.
          </p>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container container--wide">
          <SectionHeader title="Overview" id="overview-heading" />
          <div className="experience-grid">
            {experiencePreview.map((item) => (
              <ExperienceCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--wide">
          <div className="split-section">
            <div className="split-section__media">
              <div className="media-frame">
                <img src="/assets/cse.jpeg" alt="University of Moratuwa" loading="lazy" />
              </div>
            </div>
            <div className="split-section__content prose">
              <h2>Education</h2>
              <p>
                <strong>University of Moratuwa</strong> — B.Sc. in Computer Science and Engineering.
                Focus on AI, systems design, and software engineering.
              </p>
              <p>
                Early schooling at <strong>Maliyadeva College, Kurunegala</strong>, where an interest in
                mathematics and problem-solving first took shape.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--wide">
          <SectionHeader title="Technical Skills" id="skills-heading" />
          <div className="skills-grid">
            {skills.map((group) => (
              <div key={group.label} className="skill-card">
                <h3>{group.label}</h3>
                <div className="skill-list">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--wide">
          <SectionHeader title="Hackathons" id="hackathons-heading" />
          <div className="hackathon-grid">
            {hackathons.map((item) => (
              <article key={item.name} className="hackathon-card">
                <div className="media-frame media-frame--sm">
                  <img src={item.image} alt="" loading="lazy" />
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--wide">
          <SectionHeader title="Certifications" id="certs-heading" />
          <ul className="cert-list">
            {certifications.map((cert) => (
              <li key={cert.label}>
                <a href={cert.href} target="_blank" rel="noopener noreferrer">
                  {cert.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
