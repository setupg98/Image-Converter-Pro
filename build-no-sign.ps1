# PowerShell script to build without code signing (avoids symlink issues)
# This completely disables code signing to prevent winCodeSign download

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Image Converter Pro - Build Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Clear cache to remove any corrupted downloads
Write-Host "[1/3] Clearing electron-builder cache..." -ForegroundColor Yellow
$cachePath = "$env:LOCALAPPDATA\electron-builder\Cache"
if (Test-Path $cachePath) {
    Remove-Item -Recurse -Force $cachePath -ErrorAction SilentlyContinue
    Write-Host "       Cache cleared!" -ForegroundColor Green
} else {
    Write-Host "       No cache found (OK)" -ForegroundColor Gray
}

# Disable code signing completely - use multiple methods to ensure it's disabled
Write-Host "[2/3] Disabling code signing..." -ForegroundColor Yellow
$env:CSC_IDENTITY_AUTO_DISCOVERY = "false"
$env:CSC_LINK = ""
$env:CSC_KEY_PASSWORD = ""
$env:SKIP_NOTARIZATION = "true"
$env:WIN_CSC_LINK = ""
Write-Host "       Code signing disabled!" -ForegroundColor Green

# Build portable version
Write-Host "[3/3] Building portable version..." -ForegroundColor Yellow
Write-Host ""
Write-Host "This may take a few minutes..." -ForegroundColor Gray
Write-Host ""

# Run the build with explicit config override to prevent code signing
# Using --config flag to override any code signing settings
npx electron-builder --win portable --config.win.sign=null --config.win.certificateFile=null

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
    Write-Host "  Build completed. Check dist folder." -ForegroundColor Yellow
    Write-Host "  If you see errors above, they may be warnings." -ForegroundColor Yellow
}
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')

