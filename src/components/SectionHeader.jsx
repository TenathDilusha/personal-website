import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';

export default function SectionHeader({ title, id, viewAllTo }) {
  return (
    <div className="section__header">
      <h2 id={id} className="section__title">
        {title}
      </h2>
      {viewAllTo && (
        <Link className="section__link" to={viewAllTo}>
          View all
          <ArrowIcon />
        </Link>
      )}
    </div>
  );
}
