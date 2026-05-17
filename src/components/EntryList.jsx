export default function EntryList({ entries, linkable = false }) {
  return (
    <div className="entries">
      {entries.map((entry) => (
        <article key={entry.title} className="entry">
          {linkable && entry.href ? (
            <a
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              className="entry__row"
            >
              <EntryContent entry={entry} />
            </a>
          ) : (
            <div className="entry__row">
              <EntryContent entry={entry} />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function EntryContent({ entry }) {
  return (
    <>
      <div>
        <h3 className="entry__title">{entry.title}</h3>
        <p className="entry__desc">{entry.description}</p>
      </div>
      <span className="entry__meta">{entry.period}</span>
    </>
  );
}
