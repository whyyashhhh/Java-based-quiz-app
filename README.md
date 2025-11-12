# IntelliQuiz

Simple quiz app with a Spring Boot backend and a React frontend.

## Structure

quiz-app/
 ├── backend/ (Spring Boot app)
 └── frontend/ (React app)

## Backend

Requirements: Java 21, Maven

To build and run backend locally (recommended):

```powershell
cd "C:\Users\tsuya\OneDrive\Desktop\java mini project\quiz-app\backend"
# Build (skips tests for speed)
mvn -DskipTests package
# Run the generated Spring Boot jar
java -jar target\quiz-backend-0.0.1-SNAPSHOT.jar
```

API:
- GET /api/quiz/{category} -> returns list of questions for that category (includes `answer` in resource but the frontend should not display it in the UI)
- POST /api/quiz/submit -> accepts JSON array of `{question, answer}` and returns `{score, total}`

## Frontend

Requirements: Node 16+, npm

To run frontend:

```powershell
cd quiz-app\frontend
npm install
npm start
```
Helper scripts
- `scripts\run-frontend.ps1` — opens a new PowerShell window and runs the frontend with correct quoting (useful when your current path has spaces).
- `scripts\run-frontend-inline.ps1` — runs the frontend in the current PowerShell window and sets the correct location.
Additionally, for Windows you can run the batch wrappers directly by double-clicking or from cmd/powershell:

- `start-dev.bat` — opens two windows and starts backend + frontend (uses `scripts\start-dev.ps1`).
- `run-frontend.bat` — opens a new PowerShell window and starts the frontend (uses `scripts\run-frontend.ps1`).
- `run-frontend-inline.bat` — starts the frontend in the current window (uses `scripts\run-frontend-inline.ps1`).

The frontend expects the backend to be available at the same host (so running frontend development server with a proxy or running compiled frontend behind the backend is recommended). For local dev you can configure a proxy in package.json or use full URLs.

## Quickstart (Windows PowerShell) — complete dev flow

These commands start both apps locally and show recommended options (PowerShell-friendly).

1) Build backend (creates the runnable jar):

```powershell
cd "C:\Users\tsuya\OneDrive\Desktop\java mini project\quiz-app\backend"
mvn -DskipTests package
```

2) Start backend (if port 8080 is taken, run on 8081):

```powershell
# Default (port 8080)
java -jar target\quiz-backend-0.0.1-SNAPSHOT.jar

# Or run on alternate port 8081 (useful if 8080 is already in use):
java -jar target\quiz-backend-0.0.1-SNAPSHOT.jar --server.port=8081
```

3) Start frontend (dev server, hot reload):

```powershell
cd "C:\Users\tsuya\OneDrive\Desktop\java mini project\quiz-app\frontend"
npm install
npm start
# open the app in the browser
start http://localhost:3000
```

4) Production build for frontend (ready to deploy):

```powershell
cd "C:\Users\tsuya\OneDrive\Desktop\java mini project\quiz-app\frontend"
npm run build
# serve locally (optional)
npm install -g serve
serve -s build
```

Notes:
- During this session the backend was started on port 8081 to avoid a local conflict on 8080. If you want the backend on 8080, stop the process using that port first.
- The frontend dev server runs on port 3000 and proxies API calls to the backend when configured in `package.json`.

## How to push changes and open a PR (quick)

If you want to push the current changes to GitHub and open a PR, from the repo root run (PowerShell):

```powershell
cd "C:\Users\tsuya\OneDrive\Desktop\java mini project\quiz-app"
# create and switch to a branch (if you haven't already)
git checkout -b upgrade-java21
# add remote if needed (replace with your repo URL)
git remote add origin https://github.com/whyyashhhh/Java-based-quiz-app.git
# push branch
git push -u origin upgrade-java21
# open PR page in browser:
start 'https://github.com/whyyashhhh/Java-based-quiz-app/pull/new/upgrade-java21'
```

If you prefer I open the PR for you, provide a GitHub Personal Access Token (PAT) with repo permissions and I can create the PR programmatically.

## PR title/body suggestion

Title: chore: upgrade backend to Java 21, add frontend design and dev helpers

Body (paste into PR description):
- Upgraded backend to target Java 21 and ensured the project builds with Maven.
- Polished the frontend with a modern design: header, hero, responsive cards, persisted theme toggle, and improved option visuals.
- Added Windows-friendly helper scripts and verified local dev/build flow.

How to test locally:
1. Build and run backend (see above).
2. Start frontend and confirm UI at http://localhost:3000. The frontend calls the backend API at the configured port (default 8080 or 8081 if started that way).

---

If you want, I can also add this README content as a small `docs/` page or extend it with a troubleshooting section (common port conflicts, how to install Maven/Node on Windows, etc.).

## Notes
- This is starter code. For production, add CORS handling, validation, testing, build scripts, and security.
