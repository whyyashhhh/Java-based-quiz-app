Upgrade notes & local setup for Java 21
=====================================

This file documents the changes made to upgrade the backend to Java 21 and provides local installation steps you can run on Windows.

What I changed
- `pom.xml`:
  - Spring Boot parent bumped to `3.5.0` (adjustable if you prefer a different patch)
  - `<java.version>` changed from `11` to `21`
  - Added `maven-compiler-plugin` with `<release>${java.version}</release>` to compile for Java 21
- Added GitHub Actions workflow `.github/workflows/ci-java21.yml` to build the project with JDK 21 in CI.

Local setup (Windows)
---------------------
Option A — Quick (recommended) using Chocolatey

1. Open PowerShell as Administrator and run (if you don't have Chocolatey, this installs it):

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force;
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

2. Install Temurin JDK 21 and Maven:

```powershell
choco install temurin21jdk -y
choco install maven -y
refreshenv
```

3. Verify and build:

```powershell
java -version
mvn -v
cd "c:\Users\tsuya\OneDrive\Desktop\java mini project\quiz-app\backend"
mvn -DskipTests package
```

Option B — Manual install (no package manager)

1. Download JDK 21 (Temurin/Adoptium or OpenJDK) and install. Note the install path.
2. Download Apache Maven and extract to a folder.
3. Set `JAVA_HOME` and add `java\bin` and `maven\bin` to the PATH. Restart PowerShell.

Generating a Maven Wrapper (optional)
------------------------------------
If you prefer not to depend on a system Maven installation, generate the Maven Wrapper locally (requires Maven once):

```powershell
# from backend folder
mvn -N io.takari:maven:wrapper
# or, if your Maven installation provides the wrapper plugin
mvn -N io.github.maven-wrapper:maven-wrapper:wrapper
```

This creates `mvnw`, `mvnw.cmd` and the `.mvn/wrapper` directory so other contributors can run `./mvnw` without installing Maven.

CI
--
The workflow `.github/workflows/ci-java21.yml` runs on push/PR using JDK 21 and will catch compilation/test issues in CI.

If you run into build errors locally after installing JDK 21 and Maven, paste the `mvn` output here and I'll fix any compatibility issues (Jakarta namespace changes, dependency bumps, etc.).