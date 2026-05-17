import { site } from '../data/site';
import EmailButton from './EmailButton';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__inner">
          <p>&copy; {new Date().getFullYear()}</p>
          <ul className="site-footer__links">
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <EmailButton />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
