@echo off
echo Building Image Converter Pro Desktop App...
echo.

REM Clear electron-builder cache to avoid symlink issues
echo Clearing cache...
if exist "%LOCALAPPDATA%\electron-builder\Cache" (
    rmdir /s /q "%LOCALAPPDATA%\electron-builder\Cache"
)

REM Disable code signing to avoid symlink issues
set CSC_IDENTITY_AUTO_DISCOVERY=false

REM Build portable version (no installer, avoids symlink issues)
echo Building portable version...
call npx electron-builder --win portable

echo.
if exist "dist\win-unpacked\Image Converter Pro.exe" (
    echo SUCCESS! Build complete!
    echo Executable location: dist\win-unpacked\Image Converter Pro.exe
) else (
    echo Build may have issues. Check errors above.
)
pause

