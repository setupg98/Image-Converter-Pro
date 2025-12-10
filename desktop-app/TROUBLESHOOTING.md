# Troubleshooting Build Issues

## Windows Build Errors

### Error: "Cannot create symbolic link : A required privilege is not held by the client"

This is a common Windows issue. Here are solutions:

#### ✅ Solution 1: Enable Developer Mode (Easiest)

1. Press `Windows + I` to open Settings
2. Go to **Privacy & Security** → **For developers**
3. Toggle **Developer Mode** ON
4. Restart your computer
5. Try building again

**Why this works**: Developer Mode allows creating symbolic links without administrator privileges.

#### ✅ Solution 2: Use Portable Build (No Installer)

The default build command now creates a portable version that doesn't require symlinks:

```bash
npm run build:win
```

This creates a folder with the executable - no installer needed!

#### ✅ Solution 3: Run as Administrator

1. Close PowerShell
2. Right-click PowerShell → **Run as Administrator**
3. Navigate to project folder
4. Run: `npm run build:win`

#### ✅ Solution 4: Clear Cache

```bash
npm run clean:cache
npm run build:win
```

#### ✅ Solution 5: Use Batch Files

We've created helper batch files:
- `build-simple.bat` - Portable build (recommended)
- `build-installer.bat` - Full installer (requires admin/dev mode)

Just double-click the batch file!

## Common Issues

### "default Electron icon is used"
**Solution**: Create icon files in `assets/` folder:
- `icon.ico` for Windows
- `icon.icns` for macOS
- `icon.png` for Linux

### Build takes too long
**Solution**: First build downloads Electron (~100MB). Subsequent builds are faster.

### "Cannot find module" errors
**Solution**: 
```bash
npm install
```

### App won't start after build
**Solution**: Check `dist/win-unpacked/` folder - the executable is there. Run it directly.

## Quick Fixes

### Clear Everything and Rebuild
```bash
# Remove node_modules and cache
rmdir /s /q node_modules
npm run clean:cache
npm install
npm run build:win
```

### Test Without Building
```bash
# Just run the app directly
npm start
```

## Build Output Locations

- **Portable**: `dist/win-unpacked/Image Converter Pro.exe`
- **Installer**: `dist/Image Converter Pro Setup.exe`
- **Portable ZIP**: `dist/Image Converter Pro-1.0.0-win.zip`

## Still Having Issues?

1. Check Node.js version: `node --version` (should be 16+)
2. Check npm version: `npm --version`
3. Try clearing all caches: `npm run clean:cache`
4. Reinstall dependencies: `npm install`
5. Check error messages carefully - they often point to the solution

## Success Indicators

When build succeeds, you'll see:
- ✅ Packaging complete
- ✅ Files created in `dist/` folder
- ✅ No error messages

The app is ready to use!

