import { site } from '../data/site';

export default function HeroBento() {
  return (
    <section className="landing" aria-label="Introduction">
      <div className="landing__inner animate-in">
        <div className="landing__portrait">
          <img
            src={site.profileImage}
            alt={site.name}
            width={280}
            height={280}
          />
        </div>
        <div className="landing__intro">
          <h1 className="landing__display">Hello</h1>
          <p className="landing__lede">
            I&apos;m {site.name} — {site.title}
            <br />
            {site.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
