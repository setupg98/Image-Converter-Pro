@echo off
echo Building Image Converter Pro Desktop App with Installer...
echo.
echo NOTE: This requires Developer Mode enabled or Administrator privileges
echo.

REM Clear electron-builder cache
echo Clearing cache...
if exist "%LOCALAPPDATA%\electron-builder\Cache" (
    rmdir /s /q "%LOCALAPPDATA%\electron-builder\Cache"
)

REM Disable code signing
set CSC_IDENTITY_AUTO_DISCOVERY=false

REM Build with NSIS installer
echo Building NSIS installer...
call npx electron-builder --win nsis

echo.
if exist "dist\Image Converter Pro Setup.exe" (
    echo SUCCESS! Installer created!
    echo Location: dist\Image Converter Pro Setup.exe
) else (
    echo Build may have issues. Check errors above.
)
pause

