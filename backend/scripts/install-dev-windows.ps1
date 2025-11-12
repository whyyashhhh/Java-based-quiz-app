<#
Automated helper to install Temurin JDK 21 and Maven on Windows using Chocolatey.
Run in an elevated (Administrator) PowerShell session.

This script will:
- install Chocolatey if missing
- install temurin21jdk
- install maven
- refresh environment for the current session (if refreshenv is available)

Use at your own discretion. See README_UPGRADE_JAVA21.md for manual steps.
#>

# Check for Chocolatey
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Chocolatey not found. Installing Chocolatey..."
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
} else {
    Write-Host "Chocolatey found."
}

Write-Host "Installing Temurin JDK 21 and Maven..."
choco install temurin21jdk -y
choco install maven -y

# Attempt to refresh environment variables if refreshenv exists
if (Get-Command refreshenv -ErrorAction SilentlyContinue) {
    refreshenv
} else {
    Write-Host "refreshenv not found — please restart PowerShell to pick up environment changes."
}

Write-Host "Installation finished. Verify with: java -version ; mvn -v"
