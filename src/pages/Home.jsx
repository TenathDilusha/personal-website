import EntryList from '../components/EntryList';
import SectionHeader from '../components/SectionHeader';
import EmailButton from '../components/EmailButton';
import { experiencePreview, featuredProjects, site } from '../data/site';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="animate-in">
            <h1 className="hero__title">{site.name}</h1>
          </div>
          <div className="hero__intro animate-in-delay-1">
            <p>
              Building reliable, human-friendly products with lean stacks and applied machine learning.
            </p>
            <p>
              Computer Science and Engineering undergraduate at the{' '}
              <a href="https://uom.lk/" target="_blank" rel="noopener noreferrer">
                University of Moratuwa
              </a>
              , focused on full-stack development, security, and AI.
            </p>
            <p>
              I turn ambiguous problems into clear, shippable solutions — from RAG-powered tools to
              role-based platforms with secure authentication.
            </p>
            <p>
              Outside code, I&apos;m a FIDE-rated chess player on the University of Moratuwa team,
              with a Colours Award in 2024.
            </p>
          </div>
          <nav className="hero__social animate-in-delay-2" aria-label="Social links">
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <EmailButton />
          </nav>
        </div>
      </section>

      <section className="section" aria-labelledby="building-heading">
        <div className="container">
          <SectionHeader title="Building" id="building-heading" viewAllTo="/projects" />
          <EntryList entries={featuredProjects} linkable />
        </div>
      </section>

      <section className="section" aria-labelledby="experience-heading">
        <div className="container">
          <SectionHeader title="Experience" id="experience-heading" viewAllTo="/experience" />
          <EntryList entries={experiencePreview} />
        </div>
      </section>
    </>
  );
}
