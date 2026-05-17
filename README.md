# Personal Website

Minimal personal portfolio built with React + Vite, with an optional Python
chatbot backend that powers the in-page "Ask me" assistant.

## Stack

- React 19
- React Router 7
- Vite 6
- Flask + PyTorch chatbot (optional, in `backend/`)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

The frontend will load without the backend running — only the chatbot widget
needs the Flask service alive.

## Backend (chatbot)

The Flask app in `backend/` serves `POST /api/chat` and is consumed by the
floating chat widget that appears on every page.

### One-time setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

The first run downloads the NLTK `punkt`, `punkt_tab`, and `wordnet` corpora
automatically (no manual action required if your network allows it).

### Train the model (optional)

A pretrained `chatbot_model.pth`, `dimensions.json`, and `metadata.json` are
already checked in. Re-train them only if you edit `intents.json`:

```bash
TRAIN=1 python3 main.py
```

### Run the API

```bash
python3 server.py
```

The API listens on `http://localhost:5000` and exposes:

| Method | Path        | Body                       | Response          |
|--------|-------------|----------------------------|-------------------|
| POST   | `/api/chat` | `{ "message": "hello" }`   | `{ "reply": "…" }` |

Vite's dev server proxies `/api` to `http://localhost:5000` (configured in
`vite.config.js`). Override the target with `VITE_BACKEND_URL` when launching
`npm run dev`, e.g.:

```bash
VITE_BACKEND_URL=http://127.0.0.1:8000 npm run dev
```

For a hosted backend, set `VITE_CHAT_API_URL` to the absolute URL of the
chat endpoint at build time, e.g.:

```bash
VITE_CHAT_API_URL=https://api.example.com/api/chat npm run build
```

## Scripts

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Production build to `dist/`          |
| `npm run preview` | Preview the production build         |

## Project structure

```
src/
  components/   # Layout, Header, Footer, Chatbot, shared UI
  pages/        # Home, Projects, Experience
  data/         # Site content and project lists
  hooks/        # Reveal-on-scroll observer hook
public/
  assets/       # Images, certificates, CV
backend/
  server.py     # Flask API (POST /api/chat)
  main.py       # Chatbot model + training entry point
  intents.json  # Intents / training data
```

## Deploy

Build static files with `npm run build` and deploy the `dist/` folder to
GitHub Pages, Netlify, or Vercel. Host the Flask app separately (Fly.io,
Render, Railway, etc.) and point `VITE_CHAT_API_URL` at it at build time.
