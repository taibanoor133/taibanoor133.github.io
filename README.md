# Taiba Jamil — AI Portfolio & T-JAY Assistant

## Structure
- `index.html`, `css/styles.css`, `js/main.js`, `assets/` — Static portfolio + T-JAY floating chat widget
- `backend/` — Optional FastAPI backend (`main.py`, `requirements.txt`, `.env.example`) powered by T-JAY's system prompt

## Run Locally (VS Code)
Open this folder in VS Code and click **Open with Live Server** on `index.html`, or run:
```bash
python -m http.server 8000
```

## Connect Live AI Backend (Optional)
1. Deploy `backend/` to Render (`uvicorn main:app --host 0.0.0.0 --port $PORT`) with `GEMINI_API_KEY` in Environment Variables.
2. Paste your Render `/chat` URL into `window.T_JAY_API` in `js/main.js`.
