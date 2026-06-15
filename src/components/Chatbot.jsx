import { useEffect, useRef, useState } from 'react';
import {
  about,
  experiencePreview,
  featuredProjects,
  site,
  skills,
} from '../data/site';

const API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat';
const PROMPT = 'visitor@dilusha:~$ ';

const WELCOME_LINES = [
  "Welcome to Dilusha's portfolio terminal.",
  "Type 'help' to see available commands.",
];

function createWelcomeLines() {
  return WELCOME_LINES.map((text, index) => ({
    id: `welcome-${index}`,
    type: 'welcome',
    text,
  }));
}

function formatProjects(list) {
  return list
    .map((project) => `  ${project.title.padEnd(22)} ${project.period}`)
    .join('\n');
}

function runCommand(input) {
  const trimmed = input.trim();
  if (!trimmed) return { lines: [] };

  const [cmd, ...args] = trimmed.split(/\s+/);
  const argStr = args.join(' ');
  const lower = cmd.toLowerCase();

  switch (lower) {
    case 'help':
      return {
        lines: [
          {
            type: 'output',
            text: `Available commands:
  help        Show this help message
  whoami      About Dilusha
  ls          List portfolio sections
  projects    List featured projects
  skills      Show technical skills
  experience  Education & certifications
  contact     Email and social links
  ask         Ask AI a question (e.g. ask what is DocuMind?)
  clear       Clear the terminal
  date        Show current date
  echo        Print text (e.g. echo hello world)`,
          },
        ],
      };

    case 'whoami':
      return {
        lines: [
          {
            type: 'output',
            text: `${site.name} — ${site.title}
${site.tagline}

${about.paragraphs[0]}`,
          },
        ],
      };

    case 'ls':
      return {
        lines: [
          {
            type: 'output',
            text: `about/  contact/  experience/  projects/  skills/  cv.pdf`,
          },
        ],
      };

    case 'projects':
      return {
        lines: [
          {
            type: 'output',
            text: `Featured projects:\n${formatProjects(featuredProjects)}\n\nRun 'ask <project name>' for details.`,
          },
        ],
      };

    case 'skills':
      return {
        lines: skills.map((group) => ({
          type: 'output',
          text: `${group.label}: ${group.items.join(', ')}`,
        })),
      };

    case 'experience':
      return {
        lines: experiencePreview.map((item) => ({
          type: 'output',
          text: `${item.title} (${item.period})\n  ${item.description}`,
        })),
      };

    case 'contact':
      return {
        lines: [
          {
            type: 'output',
            text: `email:    ${site.email}
linkedin: ${site.linkedin}
github:   ${site.github}
cv:       ${site.cv}`,
          },
        ],
      };

    case 'date':
      return {
        lines: [
          {
            type: 'output',
            text: new Date().toString(),
          },
        ],
      };

    case 'echo':
      if (!argStr) {
        return { lines: [{ type: 'error', text: 'echo: missing operand' }] };
      }
      return { lines: [{ type: 'output', text: argStr }] };

    case 'clear':
      return { clear: true, lines: [] };

    case 'ask':
      if (!argStr) {
        return {
          lines: [{ type: 'error', text: "ask: usage: ask <your question>" }],
        };
      }
      return { ask: argStr, lines: [] };

    default:
      return {
        lines: [
          {
            type: 'error',
            text: `${lower}: command not found. Type 'help' for available commands.`,
          },
        ],
      };
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState(createWelcomeLines);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [idle, setIdle] = useState(false);

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);

  function dismissHint() {
    setHintDismissed(true);
  }

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
    const INITIAL_DELAY = 800;
    const IDLE_DELAY = 1600;

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
  }, [lines, loading, error]);

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape' && open) {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  async function askAi(question) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question }),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const data = await response.json();
      const reply = (data && data.reply) || "Hmm, I didn't catch that. Try again?";

      setLines((prev) => [
        ...prev,
        { id: `out-${Date.now()}`, type: 'output', text: reply },
      ]);
    } catch {
      setError(
        'Backend offline. Start it with `cd backend && python3 server.py`, or try local commands like help, whoami, projects.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function executeCommand(rawCommand) {
    const command = rawCommand.trim();
    if (!command || loading) return;

    setError(null);
    historyRef.current = [command, ...historyRef.current.filter((item) => item !== command)].slice(
      0,
      50,
    );
    historyIndexRef.current = -1;

    const commandLine = {
      id: `cmd-${Date.now()}`,
      type: 'command',
      text: command,
    };

    const result = runCommand(command);

    if (result.clear) {
      setLines([commandLine, ...createWelcomeLines()]);
      return;
    }

    const outputLines = result.lines.map((line, index) => ({
      id: `out-${Date.now()}-${index}`,
      ...line,
    }));

    setLines((prev) => [...prev, commandLine, ...outputLines]);

    if (result.ask) {
      await askAi(result.ask);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const command = input;
    setInput('');
    executeCommand(command);
  }

  function handleInputKeyDown(event) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const history = historyRef.current;
      if (!history.length) return;
      const nextIndex = Math.min(historyIndexRef.current + 1, history.length - 1);
      historyIndexRef.current = nextIndex;
      setInput(history[nextIndex]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndexRef.current <= 0) {
        historyIndexRef.current = -1;
        setInput('');
        return;
      }
      const nextIndex = historyIndexRef.current - 1;
      historyIndexRef.current = nextIndex;
      setInput(historyRef.current[nextIndex]);
    }
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
              Psst — try the
              <br />
              terminal!
            </p>
            <svg
              className="chatbot-hint__arrow"
              viewBox="0 0 160 130"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M14 18 C 30 10, 54 16, 74 32 C 94 48, 116 78, 140 110"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
        aria-label={open ? 'Close terminal' : 'Open terminal'}
      >
        <span className="chatbot-fab__icon" aria-hidden="true">
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6 18 18" strokeLinecap="round" />
              <path d="M18 6 6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 17l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 19h8" strokeLinecap="round" />
            </svg>
          )}
        </span>
        <span className="chatbot-fab__label">{open ? 'Close' : 'Ask me'}</span>
        {!open && <span className="chatbot-fab__pulse" aria-hidden="true" />}
      </button>

      <section
        id="chatbot-panel"
        className={`chatbot-panel terminal-panel${open ? ' chatbot-panel--open' : ''}`}
        aria-label="Portfolio terminal"
        aria-hidden={!open}
      >
        <header className="terminal-panel__head">
          <div className="terminal-panel__dots" aria-hidden="true">
            <span className="terminal-panel__dot terminal-panel__dot--close" />
            <span className="terminal-panel__dot terminal-panel__dot--minimize" />
            <span className="terminal-panel__dot terminal-panel__dot--maximize" />
          </div>
          <p className="terminal-panel__title">dilusha@portfolio — bash</p>
          <button
            type="button"
            className="terminal-panel__close"
            onClick={() => setOpen(false)}
            aria-label="Close terminal"
          >
            ×
          </button>
        </header>

        <div className="terminal-panel__body" ref={listRef} role="log" aria-live="polite">
          {lines.map((line) => (
            <div
              key={line.id}
              className={`terminal-line terminal-line--${line.type}`}
            >
              {line.type === 'command' ? (
                <>
                  <span className="terminal-line__prompt">{PROMPT}</span>
                  <span className="terminal-line__command">{line.text}</span>
                </>
              ) : (
                <span className="terminal-line__text">{line.text}</span>
              )}
            </div>
          ))}

          {loading && (
            <div className="terminal-line terminal-line--output">
              <span className="terminal-line__text terminal-line__text--loading">
                thinking<span className="terminal-cursor" />
              </span>
            </div>
          )}

          {error && (
            <p className="terminal-panel__error" role="alert">
              {error}
            </p>
          )}

          <form className="terminal-prompt" onSubmit={handleSubmit}>
            <label className="terminal-prompt__row" htmlFor="terminal-input">
              <span className="terminal-line__prompt">{PROMPT}</span>
              <input
                id="terminal-input"
                ref={inputRef}
                type="text"
                className={`terminal-prompt__input${input ? ' terminal-prompt__input--active' : ''}`}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                disabled={loading}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal command"
              />
              {!loading && !input && (
                <span className="terminal-cursor terminal-cursor--input" aria-hidden="true" />
              )}
            </label>
          </form>
        </div>
      </section>
    </>
  );
}
