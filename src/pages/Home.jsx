import { Link } from 'react-router-dom';
import ArrowIcon from '../components/ArrowIcon';
import EmailButton from '../components/EmailButton';
import useReveal from '../hooks/useReveal';
import {
  about,
  experiencePreview,
  featuredProjects,
  highlights,
  site,
} from '../data/site';

export default function Home() {
  const revealRef = useReveal();

  return (
    <div className="home" ref={revealRef}>
      <section className="hero hero--screen" aria-label="Introduction">
        <div className="hero__inner">
          <div className="hero__portrait-wrap" data-reveal data-reveal-direction="up">
            <div className="hero__portrait">
              <img
                src={site.profileImage}
                alt={site.name}
                width={440}
                height={440}
                loading="eager"
              />
            </div>
          </div>
          <div className="hero__body" data-reveal data-reveal-delay="1">
            <p className="hero__eyebrow">Hi, my name is</p>
            <h1 className="hero__title">{site.name}.</h1>
            <h2 className="hero__subtitle">I build human-friendly software.</h2>
            <p className="hero__lede">{site.tagline}</p>
            <nav className="hero__actions" aria-label="Social and resume">
              <a
                className="hero__action"
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="hero__action"
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a className="hero__action" href={site.cv} download>
                Résumé
              </a>
              <EmailButton className="hero__action hero__action--email" />
            </nav>
          </div>
        </div>
        <a className="hero__scroll" href="#about" aria-label="Scroll to about section">
          <span>Scroll</span>
          <span className="hero__scroll-line" aria-hidden="true" />
        </a>
      </section>

      <section id="about" className="home-section" aria-labelledby="about-heading">
        <div className="home-section__inner">
          <header className="home-section__head" data-reveal>
            <span className="home-section__num">01.</span>
            <h2 id="about-heading" className="home-section__title">
              About me
            </h2>
            <span className="home-section__rule" aria-hidden="true" />
          </header>

          <div className="about-layout">
            <div className="about-layout__text" data-reveal>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              <p>
                A few things I currently enjoy working with:{' '}
                <span className="about-layout__chips">
                  <span>TypeScript</span>
                  <span>React</span>
                  <span>NestJS</span>
                  <span>FastAPI</span>
                  <span>PostgreSQL</span>
                  <span>RAG / LLMs</span>
                </span>
              </p>
            </div>

            <a
              className="about-layout__media zoom-card"
              href={highlights[1]?.image || about.image}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              data-reveal-delay="1"
              aria-label="Photo at University of Moratuwa"
            >
              <span className="zoom-card__frame">
                <img
                  src={about.image}
                  alt="Dilusha at University of Moratuwa"
                  loading="lazy"
                />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="experience" className="home-section" aria-labelledby="experience-heading">
        <div className="home-section__inner">
          <header className="home-section__head" data-reveal>
            <span className="home-section__num">02.</span>
            <h2 id="experience-heading" className="home-section__title">
              Where I've been
            </h2>
            <span className="home-section__rule" aria-hidden="true" />
          </header>

          <ul className="timeline" role="list">
            {experiencePreview.map((item) => (
              <li
                key={item.title}
                className="timeline__row"
                data-reveal
              >
                <span className="timeline__period">{item.period}</span>
                <div className="timeline__body">
                  <h3 className="timeline__title">{item.title}</h3>
                  <p className="timeline__desc">{item.description}</p>
                </div>
                <span className="timeline__thumb zoom-card">
                  <span className="zoom-card__frame">
                    <img src={item.image} alt="" loading="lazy" />
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <p className="home-section__cta" data-reveal>
            <Link to="/experience">
              View full experience
              <span className="home-section__cta-icon" aria-hidden="true">
                <ArrowIcon />
              </span>
            </Link>
          </p>
        </div>
      </section>

      <section id="projects" className="home-section" aria-labelledby="projects-heading">
        <div className="home-section__inner">
          <header className="home-section__head" data-reveal>
            <span className="home-section__num">03.</span>
            <h2 id="projects-heading" className="home-section__title">
              Things I've built
            </h2>
            <span className="home-section__rule" aria-hidden="true" />
          </header>

          <ul className="project-list" role="list">
            {featuredProjects.map((project) => (
              <li key={project.id} className="project-list__item" data-reveal>
                <a
                  className="project-row"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="project-row__media zoom-card">
                    <span className="zoom-card__frame">
                      <img src={project.image} alt="" loading="lazy" />
                    </span>
                  </span>
                  <div className="project-row__body">
                    <div className="project-row__head">
                      <h3 className="project-row__title">
                        {project.title}
                        <span className="project-row__icon" aria-hidden="true">
                          <ArrowIcon />
                        </span>
                      </h3>
                      <span className="project-row__period">{project.period}</span>
                    </div>
                    <p className="project-row__desc">{project.details || project.description}</p>
                    <ul className="project-row__tags" role="list">
                      {project.tags?.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <p className="home-section__cta" data-reveal>
            <Link to="/projects">
              See the full archive
              <span className="home-section__cta-icon" aria-hidden="true">
                <ArrowIcon />
              </span>
            </Link>
          </p>
        </div>
      </section>

      <section id="contact" className="home-section home-section--contact" aria-labelledby="contact-heading">
        <div className="home-section__inner home-section__inner--narrow">
          <header className="home-section__head home-section__head--center" data-reveal>
            <span className="home-section__num">04.</span>
            <h2 id="contact-heading" className="home-section__title">
              Get in touch
            </h2>
          </header>
          <p className="home-section__contact-lede" data-reveal>
            My inbox is open whether you have a question, a project idea, or just want to say hi —
            I&apos;ll get back to you as soon as I can.
          </p>
          <p className="home-section__contact-action" data-reveal>
            <EmailButton className="hero__action hero__action--email home-section__contact-btn" />
          </p>
        </div>
      </section>
    </div>
  );
}
