import { useEffect, useRef, useState } from 'react';
import {
  about,
  experiencePreview,
  featuredProjects,
  projects,
  site,
  skills,
} from '../data/site';

const PROMPT = 'visitor@dilusha:~$ ';
const COMMAND_NOT_FOUND = (cmd) =>
  `${cmd}: command not found. Type 'help' for available commands.`;

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

function findProject(query) {
  const needle = query.trim().toLowerCase();
  return projects.find(
    (project) =>
      project.id === needle ||
      project.title.toLowerCase() === needle ||
      project.title.toLowerCase().replace(/\s+/g, '-') === needle,
  );
}

function formatProject(project) {
  return `${project.title} (${project.period})
${project.description}

${project.details}

stack: ${project.tags.join(', ')}
url:   ${project.href}`;
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
  cat         Read a project (e.g. cat DocuMind)
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
            text: `Featured projects:\n${formatProjects(featuredProjects)}\n\nRun 'cat <project>' for details.`,
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

    case 'cat':
      if (!argStr) {
        return { lines: [{ type: 'error', text: 'cat: missing operand' }] };
      }
      {
        const project = findProject(argStr);
        if (!project) {
          return {
            lines: [{ type: 'error', text: COMMAND_NOT_FOUND('cat') }],
          };
        }
        return { lines: [{ type: 'output', text: formatProject(project) }] };
      }

    case 'clear':
      return { clear: true, lines: [] };

    default:
      return {
        lines: [{ type: 'error', text: COMMAND_NOT_FOUND(lower) }],
      };
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState(createWelcomeLines);
  const [input, setInput] = useState('');
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
  }, [lines]);

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape' && open) {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  function executeCommand(rawCommand) {
    const command = rawCommand.trim();
    if (!command) return;

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

          <form className="terminal-prompt" onSubmit={handleSubmit}>
            <label className="terminal-prompt__row" htmlFor="terminal-input">
              <span className="terminal-line__prompt">{PROMPT}</span>
              <span className="terminal-prompt__entry">
                <span className="terminal-prompt__display" aria-hidden="true">
                  <span className="terminal-prompt__value">{input}</span>
                  <span className="terminal-cursor" />
                </span>
                <input
                  id="terminal-input"
                  ref={inputRef}
                  type="text"
                  className="terminal-prompt__input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal command"
                />
              </span>
            </label>
          </form>
        </div>
      </section>
    </>
  );
}
