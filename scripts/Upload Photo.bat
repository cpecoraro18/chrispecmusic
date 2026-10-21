@echo off
rem Drag one or more photos onto this file to put them on the website.
rem They go up under their file names; to choose a name or shape, run
rem scripts\upload-photo.mjs directly (node scripts\upload-photo.mjs --help).
if "%~1"=="" (
  echo Drag photos onto this file to upload them to the website gallery.
  pause
  exit /b
)
node "%~dp0upload-photo.mjs" %*
pause
