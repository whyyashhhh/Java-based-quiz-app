@echo off
REM Start backend and frontend using the PowerShell helper (bypasses script execution policy)
powershell -ExecutionPolicy Bypass -File "%~dp0scripts\start-dev.ps1"
