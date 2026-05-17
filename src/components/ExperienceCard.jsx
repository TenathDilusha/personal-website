export default function ExperienceCard({ item }) {
  return (
    <article className="experience-card">
      {item.image && (
        <div
          className={`experience-card__media media-frame media-frame--sm${
            item.imageFit === 'contain' ? ' media-frame--contain' : ''
          }`}
        >
          <img src={item.image} alt={item.title} loading="lazy" />
        </div>
      )}
      <div className="experience-card__body">
        <div className="experience-card__head">
          <h3>{item.title}</h3>
          <span>{item.period}</span>
        </div>
        <p>{item.description}</p>
      </div>
    </article>
  );
}
