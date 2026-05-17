import { certifications, hackathons, skills } from '../data/site';

export default function Experience() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">Experience</h1>
          <p className="page-hero__lede">
            Skills built through coursework, projects, hackathons, and certifications.
          </p>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container prose">
          <h2>Education</h2>
          <p>
            <strong>University of Moratuwa</strong> — B.Sc. in Computer Science and Engineering.
            Focus on AI, systems design, and software engineering.
          </p>
          <p>
            Early schooling at <strong>Maliyadeva College, Kurunegala</strong>, where an interest in
            mathematics and problem-solving first took shape.
          </p>

          <h2>Technical Skills</h2>
          {skills.map((group) => (
            <div key={group.label} className="skill-group">
              <h3>{group.label}</h3>
              <div className="skill-list">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}

          <h2>Hackathons</h2>
          <ul>
            {hackathons.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong> — {item.detail}
              </li>
            ))}
          </ul>

          <h2>Certifications</h2>
          <ul>
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
