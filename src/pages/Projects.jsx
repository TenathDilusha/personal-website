import EntryList from '../components/EntryList';
import { allProjects } from '../data/site';

export default function Projects() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">Projects</h1>
          <p className="page-hero__lede">
            Selected builds spanning full-stack apps, applied AI, and utilities.
          </p>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          <EntryList entries={allProjects} linkable />
        </div>
      </section>
    </>
  );
}
