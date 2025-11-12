@echo off
REM Start frontend in a new PowerShell window (safe for paths with spaces)
powershell -ExecutionPolicy Bypass -File "%~dp0scripts\run-frontend.ps1"
