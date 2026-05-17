export default function HighlightBlock({ highlight, reverse = false }) {
  const hasGallery = Boolean(highlight.imageSecondary);

  if (hasGallery) {
    return (
      <article className="highlight highlight--gallery">
        <div className="highlight__split" aria-label={highlight.title}>
          <div className="highlight__media highlight__media--left">
            <div className="highlight__frame highlight__frame--side">
              <img
                src={highlight.image}
                alt={highlight.imageAlt || 'Chess competition'}
                loading="lazy"
              />
            </div>
          </div>
          <div className="highlight__content highlight__content--center">
            <h3 className="highlight__title">{highlight.title}</h3>
            <p className="highlight__desc">{highlight.description}</p>
          </div>
          <div className="highlight__media highlight__media--right">
            <div className="highlight__frame highlight__frame--side">
              <img
                src={highlight.imageSecondary}
                alt={highlight.imageAltSecondary || 'University colours award'}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`highlight highlight--single ${reverse ? 'highlight--reverse' : ''}`}>
      <div className="highlight__media">
        <div className="highlight__frame highlight__frame--single">
          <img
            src={highlight.image}
            alt={highlight.imageAlt || highlight.title}
            loading="lazy"
          />
        </div>
      </div>
      <div className="highlight__content">
        <h3 className="highlight__title">{highlight.title}</h3>
        <p className="highlight__desc">{highlight.description}</p>
      </div>
    </article>
  );
}
