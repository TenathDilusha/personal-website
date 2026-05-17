import { NavLink } from 'react-router-dom';
import { site } from '../data/site';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container container--wide">
        <nav className="site-nav" aria-label="Primary">
          <NavLink className="site-logo" to="/">
            {site.shortName}
          </NavLink>
          <ul className="site-nav__links">
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : undefined)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/experience"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                Experience
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                Projects
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
