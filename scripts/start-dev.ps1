# Start backend and frontend in separate PowerShell windows
# Usage: Right-click -> Run with PowerShell, or from a PowerShell console: .\scripts\start-dev.ps1

$root = Resolve-Path -Path "$PSScriptRoot\.."
$backend = Join-Path $root 'backend'
$frontend = Join-Path $root 'frontend'

Write-Host "Starting backend in a new PowerShell window..."
$backendCmd = "cd `"$backend`"; if (Test-Path 'target\quiz-backend-0.0.1-SNAPSHOT.jar') { java -jar 'target\quiz-backend-0.0.1-SNAPSHOT.jar' } else { mvn -DskipTests package; java -jar 'target\quiz-backend-0.0.1-SNAPSHOT.jar' }"
Start-Process -FilePath 'powershell.exe' -ArgumentList "-NoExit","-Command","$backendCmd"

Start-Sleep -Milliseconds 500
Write-Host "Starting frontend in a new PowerShell window..."
$frontendCmd = "cd `"$frontend`"; npm start"
Start-Process -FilePath 'powershell.exe' -ArgumentList "-NoExit","-Command","$frontendCmd"

Write-Host "Launched backend and frontend windows. Watch their consoles for status."