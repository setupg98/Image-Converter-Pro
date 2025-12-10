# Image Converter Pro - Chrome Extension

A powerful Chrome extension for converting, compressing, and batch processing images directly from your browser. Right-click any image on the web to convert it instantly!

## Features

### Core Features
- 🖼️ **Multiple Format Support**: PNG, JPG, JPEG, WebP, BMP, TIFF, GIF, SVG, AVIF, HEIC, ICO
- 📦 **Batch Processing**: Convert multiple images at once
- 🎯 **Preset Sizes**: Logo packs, favicon packs, Android/iOS icons, social media sizes
- 📏 **Custom Sizes**: Build your own custom size lists
- 🔄 **Multiple Formats**: Convert to multiple formats simultaneously
- 🎨 **Advanced Options**: Quality control, DPI settings, auto-padding, sharpening
- 💾 **ZIP Export**: Organize converted images in ZIP archives
- 🌓 **Dark/Light Theme**: Beautiful UI with theme support
- 📜 **History**: Track your conversion history
- 💾 **Custom Presets**: Save and reuse your favorite settings

### Chrome Extension Specific Features
- 🖱️ **Right-Click Context Menu**: Convert images directly from web pages
- 🔗 **Convert Page Images**: Extract and convert all images from any webpage
- 📥 **Native Downloads**: Uses Chrome's download API for better file management
- 💾 **Chrome Storage**: Settings and history saved in Chrome storage
- 🎯 **Popup Quick Access**: Quick converter access from extension icon
- 🔄 **URL Parameter Support**: Load images from URLs passed via context menu

## Installation

### From Source (Developer Mode)

1. **Download/Clone** this repository

2. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/`
   - Or: Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" switch in top right

4. **Load Extension**
   - Click "Load unpacked"
   - Select the `chrome-extension` folder

5. **Done!** The extension is now installed

### From Chrome Web Store (Coming Soon)
- Will be available on Chrome Web Store soon

## Usage

### Method 1: Right-Click Context Menu
1. Right-click any image on a webpage
2. Select "Convert Image with Image Converter Pro"
3. The converter opens with the image loaded

### Method 2: Extension Popup
1. Click the extension icon in Chrome toolbar
2. Click "Open Full Converter" or "Convert All Images on Page"

### Method 3: Direct Access
1. Right-click anywhere on a page
2. Select "Open Image Converter Pro"
3. Upload images manually

### Method 4: Convert All Images on Page
1. Click extension icon
2. Click "Convert All Images on Page"
3. All images from the current page will be loaded

## How to Use

1. **Add Images**
   - Right-click images on web pages
   - Or drag & drop images
   - Or click upload area

2. **Select Preset**
   - Choose a preset (Logo, Favicon, Android, iOS, etc.)
   - Or use custom settings

3. **Configure Settings**
   - Adjust format, quality, resize options
   - Set advanced options

4. **Convert**
   - Click "Convert All Images"
   - Wait for processing

5. **Download**
   - Save individual files
   - Or download all as ZIP

## Keyboard Shortcuts

- `Ctrl/Cmd + U` - Upload files
- `Ctrl/Cmd + Enter` - Convert all
- `Ctrl/Cmd + Z` - Clear all
- `Ctrl/Cmd + D` - Download all
- `Ctrl/Cmd + H` - View history
- `Esc` - Close modals

## Extension Permissions

The extension requires these permissions:

- **storage**: Save your presets and history
- **contextMenus**: Add right-click menu options
- **activeTab**: Access images on current page
- **downloads**: Download converted images
- **host_permissions**: Access images from any website

## File Structure

```
chrome-extension/
├── manifest.json       # Extension manifest
├── background.js       # Service worker (context menus, messaging)
├── content.js          # Content script (extract images from pages)
├── popup.html          # Extension popup UI
├── popup.js            # Popup script
├── index.html          # Main converter interface
├── styles.css          # Styles
├── app.js              # Main application logic
├── icons/              # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md           # This file
```

## Building Icons

You need to create icon files:
- `icons/icon16.png` - 16x16 pixels
- `icons/icon32.png` - 32x32 pixels
- `icons/icon48.png` - 48x48 pixels
- `icons/icon128.png` - 128x128 pixels

You can use any image editor or online icon generator.

## Development

### Testing Locally

1. Make changes to files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

### Debugging

- **Background Script**: Go to `chrome://extensions/` → Details → Service Worker
- **Content Script**: Use Chrome DevTools on any webpage
- **Popup**: Right-click extension icon → Inspect popup
- **Main App**: Open `index.html` and use DevTools

## Differences from Web/Desktop Versions

| Feature | Web | Desktop | Chrome Extension |
|---------|-----|---------|------------------|
| File Selection | Browser input | Native dialog | Browser input + Context menu |
| Right-click Convert | ❌ | ❌ | ✅ |
| Convert Page Images | ❌ | ❌ | ✅ |
| Storage | localStorage | localStorage | chrome.storage |
| Downloads | Browser download | Native save dialog | chrome.downloads API |
| Offline Support | Service Worker | Native | chrome.storage |

## Troubleshooting

### Extension not loading
- Check `chrome://extensions/` for errors
- Ensure all files are in the correct folder
- Check manifest.json syntax

### Context menu not appearing
- Reload the extension
- Check if context menu permissions are granted
- Try right-clicking on an image (not just anywhere)

### Images not loading from URLs
- Check if the website allows cross-origin requests
- Some images may be blocked by CORS
- Try downloading the image first, then uploading

### Downloads not working
- Check Chrome download permissions
- Ensure download folder is accessible
- Check Chrome's download settings

## Privacy & Security

- ✅ All processing happens locally in your browser
- ✅ Images are never uploaded to any server
- ✅ Settings stored locally in Chrome storage
- ✅ No tracking or analytics
- ✅ Open source code

## License

MIT License

## Support

For issues and feature requests, please refer to the main project repository.

## Changelog

### Version 1.0.0
- Initial release
- All core features from web version
- Context menu integration
- Page image extraction
- Chrome storage support
- Native download API

