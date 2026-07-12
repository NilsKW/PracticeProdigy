@echo off
setlocal
cd /d "%~dp0"

echo ================================
echo   Mise a jour Practice Prodigy -^> GitHub
echo ================================
echo.

git add -A

set /p MSG="Message de commit (decris ce que tu as change) : "
if "%MSG%"=="" set MSG=Mise a jour

git commit -m "%MSG%"

echo.
echo Envoi vers GitHub...
git push origin main

echo.
echo ================================
echo   Termine.
echo ================================
pause
