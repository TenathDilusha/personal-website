import { useEffect, useRef, useState } from 'react';

const API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat';

const INTRO_MESSAGE = {
  id: 'intro',
  role: 'bot',
  text:
    "Hi! I'm Dilusha's portfolio bot. Ask me about projects, experience, skills, or how to get in touch.",
};

const SUGGESTIONS = [
  'Who are you?',
  'What projects have you built?',
  'How can I contact you?',
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INTRO_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Hint stays in memory only — it reappears on every fresh page load and
  // only hides during the current session once the user has opened the chat.
  const [hintDismissed, setHintDismissed] = useState(false);
  // The hint only appears when the visitor is *idle* — i.e. not moving the
  // mouse or scrolling for a short period. The class on the wrapper handles
  // a smooth fade either way.
  const [idle, setIdle] = useState(false);

  const listRef = useRef(null);
  const inputRef = useRef(null);

  function dismissHint() {
    setHintDismissed(true);
  }

  // Clean up the legacy persistent dismissal flag — the hint now reappears
  // on every page load.
  useEffect(() => {
    try {
      window.localStorage.removeItem('chatbot-hint-dismissed');
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (hintDismissed) return undefined;

    let activityTimer = null;
    const INITIAL_DELAY = 800; // wait briefly for the page to settle
    const IDLE_DELAY = 1600; // ms of no activity before showing again

    const handleActivity = () => {
      setIdle(false);
      if (activityTimer) clearTimeout(activityTimer);
      activityTimer = setTimeout(() => setIdle(true), IDLE_DELAY);
    };

    const entranceTimer = setTimeout(() => setIdle(true), INITIAL_DELAY);

    window.addEventListener('mousemove', handleActivity, { passive: true });
    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('touchmove', handleActivity, { passive: true });
    window.addEventListener('wheel', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity);

    return () => {
      clearTimeout(entranceTimer);
      if (activityTimer) clearTimeout(activityTimer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchmove', handleActivity);
      window.removeEventListener('wheel', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [hintDismissed]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape' && open) {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  async function sendMessage(rawMessage) {
    const message = rawMessage.trim();
    if (!message || loading) return;

    setError(null);
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', text: message },
    ]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const data = await response.json();
      const reply = (data && data.reply) || "Hmm, I didn't catch that. Try again?";

      setMessages((prev) => [
        ...prev,
        { id: `b-${Date.now()}`, role: 'bot', text: reply },
      ]);
    } catch (err) {
      setError(
        'The chatbot is offline right now. Start the backend with `cd backend && python3 server.py` and try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  const showHint = !open && !hintDismissed;
  const hintVisible = showHint && idle;

  return (
    <>
      {showHint && (
        <div
          className={`chatbot-hint${hintVisible ? ' chatbot-hint--visible' : ''}`}
          aria-hidden="true"
        >
          <div className="chatbot-hint__inner">
            <p className="chatbot-hint__text">
              Psst — ask me
              <br />
              anything!
            </p>
            <svg
              className="chatbot-hint__arrow"
              viewBox="0 0 160 130"
              fill="none"
              aria-hidden="true"
            >
              {/* Hand-drawn curve from the text down to the chat button */}
              <path
                d="M14 18 C 30 10, 54 16, 74 32 C 94 48, 116 78, 140 110"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Arrowhead V — the apex sits on the curve's tip */}
              <path
                d="M124 92 L 140 110 L 120 104"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
      <button
        type="button"
        className={`chatbot-fab${open ? ' chatbot-fab--open' : ''}`}
        onClick={() => {
          dismissHint();
          setOpen((value) => !value);
        }}
        aria-expanded={open}
        aria-controls="chatbot-panel"
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
      >
        <span className="chatbot-fab__icon" aria-hidden="true">
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6 18 18" strokeLinecap="round" />
              <path d="M18 6 6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path
                d="M21 12a8 8 0 0 1-11.6 7.15L4 20l.85-5.4A8 8 0 1 1 21 12z"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
        <span className="chatbot-fab__label">{open ? 'Close' : 'Ask me'}</span>
        {!open && <span className="chatbot-fab__pulse" aria-hidden="true" />}
      </button>

      <section
        id="chatbot-panel"
        className={`chatbot-panel${open ? ' chatbot-panel--open' : ''}`}
        aria-label="Chat assistant"
        aria-hidden={!open}
      >
        <header className="chatbot-panel__head">
          <div>
            <p className="chatbot-panel__title">Portfolio Bot</p>
            <p className="chatbot-panel__sub">Ask anything about Dilusha</p>
          </div>
          <button
            type="button"
            className="chatbot-panel__close"
            onClick={() => setOpen(false)}
            aria-label="Close chat assistant"
          >
            ×
          </button>
        </header>

        <div className="chatbot-panel__messages" ref={listRef} role="log" aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chatbot-msg chatbot-msg--${message.role}`}
            >
              <span className="chatbot-msg__bubble">{message.text}</span>
            </div>
          ))}
          {loading && (
            <div className="chatbot-msg chatbot-msg--bot">
              <span className="chatbot-msg__bubble chatbot-msg__bubble--typing">
                <span />
                <span />
                <span />
              </span>
            </div>
          )}
          {error && (
            <p className="chatbot-panel__error" role="alert">
              {error}
            </p>
          )}
        </div>

        {messages.length === 1 && !loading && (
          <div className="chatbot-suggestions">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="chatbot-suggestions__item"
                onClick={() => sendMessage(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <form className="chatbot-input" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type a message..."
            aria-label="Type a message"
            disabled={loading}
            autoComplete="off"
          />
          <button
            type="submit"
            className="chatbot-input__send"
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14" strokeLinecap="round" />
              <path d="m12 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </section>
    </>
  );
}
