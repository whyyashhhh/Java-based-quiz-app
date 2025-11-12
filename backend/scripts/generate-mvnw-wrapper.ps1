<#
Downloads Maven Wrapper artifacts (maven-wrapper.jar and maven-wrapper.properties)
and creates simple `mvnw`/`mvnw.cmd` bootstrap scripts.

Run from the `backend` directory in PowerShell (non-admin is fine):
  .\scripts\generate-mvnw-wrapper.ps1

This fetches the maven-wrapper jar from Maven Central (io.github.maven-wrapper:maven-wrapper:0.5.6).
If you have a working Maven locally, generating the wrapper with Maven is preferred:
  mvn -N io.takari:maven:wrapper
#>

param()

$wrapperVersion = '0.5.6'
$groupPath = 'io/github/maven-wrapper/maven-wrapper'
$baseUrl = "https://repo1.maven.org/maven2/$groupPath/$wrapperVersion"

$targetDir = Join-Path -Path (Get-Location) -ChildPath '.mvn\wrapper'
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
}

$jarUrl = "$baseUrl/maven-wrapper-$wrapperVersion.jar"
$propertiesUrl = "$baseUrl/maven-wrapper-$wrapperVersion.properties"

Write-Host "Downloading maven-wrapper jar from $jarUrl"
Invoke-WebRequest -Uri $jarUrl -OutFile (Join-Path $targetDir 'maven-wrapper.jar') -UseBasicParsing

Write-Host "Downloading maven-wrapper properties from $propertiesUrl"
Invoke-WebRequest -Uri $propertiesUrl -OutFile (Join-Path $targetDir 'maven-wrapper.properties') -UseBasicParsing

# Create unix mvnw script
$unixScript = @'
#!/usr/bin/env bash
MAVEN_WRAPPER_DIR="$(dirname "$0")/.mvn/wrapper"
java -jar "$MAVEN_WRAPPER_DIR/maven-wrapper.jar" "$@"
'@
Set-Content -Path (Join-Path (Get-Location) 'mvnw') -Value $unixScript -Encoding UTF8

# Create windows mvnw.cmd script
$winScript = @'
@ECHO OFF
set MAVEN_WRAPPER_DIR=%~dp0\.mvn\wrapper
java -jar "%MAVEN_WRAPPER_DIR%\maven-wrapper.jar" %*
'@
Set-Content -Path (Join-Path (Get-Location) 'mvnw.cmd') -Value $winScript -Encoding ASCII

# Attempt to make mvnw executable (best-effort)
try {
    icm -ErrorAction Stop -Command { chmod +x ./mvnw } | Out-Null
} catch {}

Write-Host "Maven Wrapper files created. You can now run './mvnw -v' or 'mvnw.cmd -v'."
