# Start frontend in the current PowerShell window. Use when you want to see logs in the same terminal.
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$repoRoot = Resolve-Path -Path (Join-Path $scriptRoot '..')
$frontend = Join-Path $repoRoot 'frontend'

Set-Location -Path $frontend
Write-Host "Starting frontend in: $frontend"
npm start
