# Run frontend dev server in a new PowerShell window. Safe to call from any folder in Windows.
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$repoRoot = Resolve-Path -Path (Join-Path $scriptRoot '..')
$frontend = Join-Path $repoRoot 'frontend'

Write-Host "Opening new PowerShell window and starting frontend in: $frontend"
$cmd = "cd `"$frontend`"; npm start"
Start-Process -FilePath 'powershell.exe' -ArgumentList '-NoExit', '-Command', $cmd
