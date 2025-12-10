# Windows Build Fix Guide

## Problem
Error: "Cannot create symbolic link : A required privilege is not held by the client"

This happens because electron-builder tries to extract files with symbolic links, which requires administrator privileges on Windows.

## Solutions (Try in Order)

### Solution 1: Enable Developer Mode (Recommended - No Admin Needed)

1. Open **Settings** (Windows + I)
2. Go to **Privacy & Security** → **For developers**
3. Enable **Developer Mode**
4. Restart your computer
5. Try building again: `npm run build:win`

### Solution 2: Run PowerShell as Administrator

1. Close current PowerShell
2. Right-click **PowerShell** → **Run as Administrator**
3. Navigate to project: `cd C:\Users\setup\Music\Web_App\desktop-app`
4. Run: `npm run build:win`

### Solution 3: Clear Cache and Retry

```powershell
# Clear electron-builder cache
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\electron-builder\Cache" -ErrorAction SilentlyContinue

# Try building again
npm run build:win
```

### Solution 4: Skip Code Signing (Already Applied)

The `package.json` has been updated to skip code signing, which should help. If you still get errors, try Solution 1 or 2.

### Solution 5: Use Portable Build Only

If NSIS installer fails, try building just the portable version:

```powershell
npx electron-builder --win portable
```

## Quick Fix Command

Run this in PowerShell (as Administrator if Solution 1 doesn't work):

```powershell
# Clear cache
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\electron-builder\Cache" -ErrorAction SilentlyContinue

# Build
npm run build:win
```

## Alternative: Build Without Signing

If you just want to test the app, you can run it directly:

```powershell
npm start
```

The built executable will be in `dist/win-unpacked/` folder even if the installer fails.

## Notes

- **Developer Mode** is the easiest solution (no admin needed)
- Code signing has been disabled in `package.json` (not needed for local builds)
- The error is about macOS files (darwin) in the cache - safe to ignore for Windows builds
- Your built app will still work even if the installer creation fails

