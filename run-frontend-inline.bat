@echo off
REM Start frontend inline in current window (runs the PowerShell inline helper)
powershell -ExecutionPolicy Bypass -File "%~dp0scripts\run-frontend-inline.ps1"
