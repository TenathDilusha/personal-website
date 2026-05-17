import { useState } from 'react';
import { site } from '../data/site';

export default function EmailButton({ className = '' }) {
  const [revealed, setRevealed] = useState(false);

  const handleClick = () => {
    if (!revealed) {
      setRevealed(true);
      return;
    }
    window.location.href = `mailto:${site.email}`;
  };

  return (
    <button
      type="button"
      className={`email-btn ${revealed ? 'revealed' : ''} ${className}`.trim()}
      onClick={handleClick}
      aria-label={revealed ? site.email : 'Click to reveal email address'}
    >
      {revealed ? site.email : site.emailObfuscated}
    </button>
  );
}
