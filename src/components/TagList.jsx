export default function TagList({ tags }) {
  if (!tags?.length) return null;

  return (
    <ul className="tag-list" aria-label="Technologies">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}
