# Complete Build Fix Guide

## The Problem
Electron-builder tries to download `winCodeSign` which contains macOS files with symbolic links. Windows requires special privileges to create symlinks, causing the build to fail.

## ✅ Solution: Disable Code Signing

Code signing is not needed for local builds. I've disabled it completely.

### Method 1: Use the PowerShell Script (Easiest)

```powershell
.\build-no-sign.ps1
```

This script:
- Clears the cache
- Disables code signing
- Builds the portable version
- Shows success message

### Method 2: Use Batch File

Double-click `build-simple.bat`

### Method 3: Manual Command

```powershell
# Set environment variable
$env:CSC_IDENTITY_AUTO_DISCOVERY = "false"

# Build
npm run build:win
```

### Method 4: Enable Developer Mode (One-Time Fix)

If you want to build installers later:

1. Press `Windows + I`
2. Go to **Privacy & Security** → **For developers**
3. Enable **Developer Mode**
4. Restart computer
5. Then you can use: `npm run build:win:installer`

## What Changed

✅ **Code signing completely disabled** - No more winCodeSign download  
✅ **Environment variable set** - `CSC_IDENTITY_AUTO_DISCOVERY=false`  
✅ **.npmrc file created** - Permanently disables code signing  
✅ **Helper scripts created** - Easy build commands  
✅ **Portable build by default** - No installer needed  

## Build Output

After successful build:
- **Location**: `dist/win-unpacked/Image Converter Pro.exe`
- **Type**: Portable (no installation needed)
- **Size**: ~150-200 MB (includes Electron runtime)

## Quick Commands

```powershell
# Build portable (recommended)
npm run build:win

# Or use script
.\build-no-sign.ps1

# Or use batch file
.\build-simple.bat
```

## If Still Failing

1. **Clear cache manually**:
   ```powershell
   Remove-Item -Recurse -Force "$env:LOCALAPPDATA\electron-builder\Cache"
   ```

2. **Run as Administrator** (if Developer Mode not enabled):
   - Right-click PowerShell → Run as Administrator
   - Navigate to folder
   - Run build command

3. **Check the output**: Even if there are warnings, check if `dist/win-unpacked/` folder was created. The app might still be there!

## Success Indicators

✅ You'll see:
- "packaging platform=win32"
- "appOutDir=dist\win-unpacked"
- No fatal errors
- `dist/win-unpacked/Image Converter Pro.exe` exists

The warnings about symlinks can be ignored - they're just about macOS files in the cache that aren't needed for Windows builds.

