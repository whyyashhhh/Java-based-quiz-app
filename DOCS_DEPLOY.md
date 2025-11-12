Vercel deployment
=================

This repository is prepared to deploy the frontend (Create React App) and a small serverless backend on Vercel.

What was added for Vercel
- `api/` — serverless Node endpoints: `api/quiz/[category].js` and `api/quiz/submit.js` using `api/questions.json` as data.
- `vercel.json` — instructs Vercel how to build the frontend and serverless functions.

How it works
- The frontend (in `frontend/`) is built with `npm run build` and served as a static site.
- Serverless functions under `api/` are deployed at `/api/*`. The frontend calls `/api/quiz/:category` and `/api/quiz/submit`.

Deploy steps (recommended)
1. Push your branch to GitHub (already done on `upgrade-java21`).
2. Sign in to https://vercel.com and create a new project "Import Git Repository". Select your GitHub repo.
3. Vercel will detect the `vercel.json` configuration. Verify build settings:
   - Framework Preset: Other / Static Build
   - Build Command: (auto-detected) `npm run build` (executed in `frontend` via vercel config)
   - Output Directory: `build` (handled by `vercel.json`)
4. Deploy. After the build completes, the frontend will be available at your Vercel URL and the serverless API at `<your-url>/api/quiz/...`.

Local verification (before deploying)
- Build frontend locally:
  - cd frontend
  - npm ci
  - npm run build
- You can test the serverless functions locally using the Vercel CLI (optional):
  - npm i -g vercel
  - vercel dev

Notes and limitations
- The original Java Spring Boot backend cannot run as-is on Vercel. Instead, a small Node serverless implementation was added which reuses the project's `questions.json` and replicates the scoring logic. If you need the full Spring Boot backend, deploy it somewhere that supports Java (e.g., Render, Fly, Railway, AWS, GCP) and update the frontend to point to that backend's URL (or proxy it through Vercel).

If you want, I can:
- Open a PR with these changes, or
- Help you connect the repo to Vercel and verify the first deployment, or
- Containerize the full Spring Boot backend and prepare deployment instructions for providers that support Java containers.
