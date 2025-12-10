# Quick Start Guide

## First Time Setup

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/
   - Version 16 or higher required

2. **Open Terminal/Command Prompt**
   - Navigate to the `desktop-app` folder

3. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install Electron and all required packages.

4. **Run the Application**
   ```bash
   npm start
   ```

## Using the App

1. **Add Images**
   - Click the upload area OR
   - Drag and drop images onto the upload area
   - Select multiple images at once

2. **Choose Settings**
   - Select a preset (Logo, Favicon, Android, iOS, etc.) OR
   - Use custom dimensions and settings

3. **Convert**
   - Click "Convert All Images"
   - Wait for processing to complete

4. **Download**
   - Click individual download buttons OR
   - Click "Download All as ZIP" for batch download

## Building Executable

To create a standalone executable:

### ⚠️ Important: Build Fix for Windows

If you encounter symlink errors during build, use the PowerShell script:

**Easiest Method (Recommended):**
```powershell
.\build-no-sign.ps1
```

This script:
- Clears the cache
- Disables code signing (prevents symlink errors)
- Builds the portable version
- Shows success message

### Windows (Recommended - Portable Version)

**Option 1: Use PowerShell Script (Best)**
```powershell
.\build-no-sign.ps1
```

**Option 2: Manual Build (PowerShell)**
```powershell
# Set environment variable first
$env:CSC_IDENTITY_AUTO_DISCOVERY = "false"

# Then build
npm run build:win
```

**Option 3: Manual Build (Command Prompt)**
```bash
# Portable version (no installer, fastest, no admin needed)
npm run build:win

# Or use the batch file
build-simple.bat
```

### Windows (With Installer - Requires Developer Mode or Admin)
```bash
# NSIS installer version
npm run build:win:installer

# Or use the batch file
build-installer.bat
```

**Note**: If you get symlink errors, enable Developer Mode in Windows Settings or run PowerShell as Administrator.

### Clear Cache (If Build Fails)
```bash
npm run clean:cache
```

### Other Platforms
```bash
# For macOS  
npm run build:mac

# For Linux
npm run build:linux
```

The executable will be in the `dist` folder:
- **Portable**: `dist/win-unpacked/Image Converter Pro.exe`
- **Installer**: `dist/Image Converter Pro Setup.exe`

## Troubleshooting

**App won't start?**
- Make sure you ran `npm install` first
- Check Node.js version: `node --version` (should be 16+)

**Can't select files?**
- Make sure you're clicking the upload area
- Try drag and drop instead

**Conversion not working?**
- Check that images are valid formats
- Try with smaller images first

## Need Help?

Check the main README.md for more detailed information.

