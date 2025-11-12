Upgrade to Java 21 — Summary and next steps
===========================================

What I changed in this repository (done)
- Updated `pom.xml`:
  - Spring Boot parent bumped to `3.5.0` (you can change to a specific patch if desired)
  - `<java.version>` set to `21`
  - Added `maven-compiler-plugin` with `<release>${java.version}</release>`
- Migrated code:
  - Replaced `javax.annotation.PostConstruct` with `jakarta.annotation.PostConstruct` in `QuizService.java`
- CI:
  - Added `.github/workflows/ci-java21.yml` to build/test on JDK 21 in GitHub Actions
- Local tooling & helpers:
  - `backend/scripts/install-dev-windows.ps1` — installs Chocolatey, Temurin JDK 21 and Maven (Admin PowerShell)
  - `backend/scripts/generate-mvnw-wrapper.ps1` — downloads maven-wrapper artifacts and creates `mvnw`/`mvnw.cmd`
  - `backend/mvnw.cmd` — bootstrapper that will run the wrapper or attempt to generate it
  - `backend/README_UPGRADE_JAVA21.md` — instructions for local setup and notes

What I could not do from here (requires your machine or GitHub push)
- Run `mvn -DskipTests package` locally — I don't have access to run commands on your PC.
- Push and run GitHub Actions CI — you need to push the branch to GitHub to trigger CI.
- Add the binary `maven-wrapper.jar` into the repository — I provided a generator script to download it locally.

Exact local steps to finish and verify the upgrade
-------------------------------------------------
Option 1 — recommended (no full Maven install required):

1. Open PowerShell in the backend folder (normal user is fine):

```powershell
cd "C:\Users\tsuya\OneDrive\Desktop\java mini project\quiz-app\backend"
.\mvnw.cmd -v
.\mvnw.cmd -DskipTests package
```

The first invocation will cause the bootstrapper to run `generate-mvnw-wrapper.ps1` and download the wrapper artifacts. If successful, `.\mvnw.cmd -v` will print Maven and Java details.

Option 2 — install Java 21 + Maven system-wide (Admin)

1. Run installer (Admin PowerShell):

```powershell
cd "C:\Users\tsuya\OneDrive\Desktop\java mini project\quiz-app\backend\scripts"
.\install-dev-windows.ps1
```

2. Restart PowerShell or run `refreshenv`, then verify:

```powershell
java -version
mvn -v
where.exe java
where.exe mvn
```

3. Build:

```powershell
cd "C:\Users\tsuya\OneDrive\Desktop\java mini project\quiz-app\backend"
mvn -DskipTests package
```

If the build fails, paste the first ~100 lines of the Maven output into an issue or here and I'll fix the problems (dependency compatibility, code changes, etc.).

CI verification
---------------
- Push this branch to GitHub and open the Actions tab; `.github/workflows/ci-java21.yml` will run a build on JDK 21 and report errors. This is useful if you cannot install locally.

Notes & troubleshooting
-----------------------
- If `mvn` still isn't recognized after installing Maven, restart PowerShell.
- If `java -version` shows a different Java than JDK 21, adjust `JAVA_HOME` and ensure JDK21\bin appears before other Java paths in PATH.
- If `generate-mvnw-wrapper.ps1` fails to download due to network restrictions, download `maven-wrapper-0.5.6.jar` and properties manually into `.mvn/wrapper`.

If you want, I can also:
- Add the Maven Wrapper binary files to the repo for you (I didn't include them automatically to avoid binary downloads in this environment). If you want me to, I can provide the exact files as base64 that you can decode locally.
- Run an OpenRewrite plan locally (instructions) or add scripts to run automated Jakarta refactors.

Contact me with the terminal output from any of the verification commands above and I'll proceed to fix any remaining issues.
