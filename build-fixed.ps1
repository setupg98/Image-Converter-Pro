# Fixed PowerShell build script - Completely disables code signing
# This prevents electron-builder from downloading winCodeSign

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Image Converter Pro - Build Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clear cache
Write-Host "[1/4] Clearing electron-builder cache..." -ForegroundColor Yellow
$cachePath = "$env:LOCALAPPDATA\electron-builder\Cache"
if (Test-Path $cachePath) {
    Remove-Item -Recurse -Force $cachePath -ErrorAction SilentlyContinue
    Write-Host "       Cache cleared!" -ForegroundColor Green
} else {
    Write-Host "       No cache found (OK)" -ForegroundColor Gray
}

# Step 2: Remove winCodeSign cache specifically
Write-Host "[2/4] Removing winCodeSign cache..." -ForegroundColor Yellow
$winCodeSignPath = "$env:LOCALAPPDATA\electron-builder\Cache\winCodeSign"
if (Test-Path $winCodeSignPath) {
    Remove-Item -Recurse -Force $winCodeSignPath -ErrorAction SilentlyContinue
    Write-Host "       winCodeSign cache removed!" -ForegroundColor Green
} else {
    Write-Host "       No winCodeSign cache (OK)" -ForegroundColor Gray
}

# Step 3: Set ALL code signing environment variables to false/empty
Write-Host "[3/4] Disabling ALL code signing..." -ForegroundColor Yellow
$env:CSC_IDENTITY_AUTO_DISCOVERY = "false"
$env:CSC_LINK = ""
$env:CSC_KEY_PASSWORD = ""
$env:SKIP_NOTARIZATION = "true"
$env:WIN_CSC_LINK = ""
$env:APPLE_ID = ""
$env:APPLE_APP_SPECIFIC_PASSWORD = ""
Write-Host "       All code signing disabled!" -ForegroundColor Green

# Step 4: Build with explicit overrides
Write-Host "[4/4] Building portable version..." -ForegroundColor Yellow
Write-Host ""
Write-Host "This may take a few minutes..." -ForegroundColor Gray
Write-Host ""

# Use explicit config overrides to prevent any code signing
try {
    npx electron-builder --win portable --config.win.sign=null --config.win.certificateFile=null --config.win.signDlls=false
    $buildSuccess = $true
} catch {
    Write-Host ""
    Write-Host "Build command failed, but checking if executable was created..." -ForegroundColor Yellow
    $buildSuccess = $false
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
if (Test-Path "dist\win-unpacked\Image Converter Pro.exe") {
    Write-Host "  ✓ SUCCESS! Build complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Executable location:" -ForegroundColor White
    Write-Host "  dist\win-unpacked\Image Converter Pro.exe" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  You can run it directly from there!" -ForegroundColor Gray
} else {
    Write-Host "  ⚠ Build may have issues." -ForegroundColor Yellow
    Write-Host "  Check the errors above." -ForegroundColor Yellow
    Write-Host "  Even if there are symlink warnings, the build might have succeeded." -ForegroundColor Yellow
}
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')

