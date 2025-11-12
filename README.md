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

## Notes
- This is starter code. For production, add CORS handling, validation, testing, build scripts, and security.
