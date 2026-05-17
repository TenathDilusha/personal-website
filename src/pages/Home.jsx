import { Link } from 'react-router-dom';
import ExperienceCard from '../components/ExperienceCard';
import HeroBento from '../components/HeroBento';
import HighlightBlock from '../components/HighlightBlock';
import ProjectGrid from '../components/ProjectGrid';
import SectionHeader from '../components/SectionHeader';
import {
  about,
  experiencePreview,
  featuredProjects,
  highlights,
} from '../data/site';

export default function Home() {
  return (
    <>
      <HeroBento />

      <section id="about" className="section section--after-landing" aria-labelledby="about-heading">
        <div className="container container--wide">
          <SectionHeader title="About" id="about-heading" />
          <div className="about-block">
            <div className="about-block__media">
              <div className="media-frame media-frame--portrait">
                <img src={about.image} alt="Dilusha at university" loading="lazy" />
              </div>
            </div>
            <div className="about-block__text">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="projects-heading">
        <div className="container container--wide">
          <SectionHeader title="Selected Projects" id="projects-heading" viewAllTo="/projects" />
          <ProjectGrid projects={featuredProjects} variant="featured" />
        </div>
      </section>

      <section className="section" aria-labelledby="highlights-heading">
        <div className="container container--wide">
          <SectionHeader title="Beyond Code" id="highlights-heading" />
          <div className="highlights">
            {highlights.map((item, index) => (
              <HighlightBlock key={item.id} highlight={item} reverse={index % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="experience-heading">
        <div className="container container--wide">
          <SectionHeader title="Experience" id="experience-heading" viewAllTo="/experience" />
          <div className="experience-grid">
            {experiencePreview.map((item) => (
              <ExperienceCard key={item.title} item={item} />
            ))}
          </div>
          <p className="section-cta">
            <Link to="/experience">View full experience &amp; skills →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
