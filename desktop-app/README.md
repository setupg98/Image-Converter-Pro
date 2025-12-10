# Image Converter Pro - Desktop Application

A powerful desktop image converter application built with Electron. Convert, compress, and batch process images with all the features from the web version, now running natively on your desktop.

## Features

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

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Navigate to the desktop-app directory:
```bash
cd desktop-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the application:
```bash
npm start
```

## Building for Distribution

### Build for Windows
```bash
npm run build:win
```

### Build for macOS
```bash
npm run build:mac
```

### Build for Linux
```bash
npm run build:linux
```

### Build for All Platforms
```bash
npm run build
```

Built applications will be in the `dist` directory.

## Usage

1. **Open Images**: Click the upload area or drag & drop images
2. **Select Preset**: Choose a preset (Logo, Favicon, Android, iOS, etc.) or use custom settings
3. **Configure Settings**: Adjust format, quality, resize options, and advanced settings
4. **Convert**: Click "Convert All Images" to start processing
5. **Download**: Save individual files or download all as ZIP

## Keyboard Shortcuts

- `Ctrl/Cmd + U` - Open file dialog
- `Ctrl/Cmd + Enter` - Convert all images
- `Ctrl/Cmd + Z` - Clear all
- `Ctrl/Cmd + D` - Download all
- `Ctrl/Cmd + H` - View history
- `Esc` - Close modals

## Differences from Web Version

- **Native File Dialogs**: Uses system file dialogs instead of browser file inputs
- **Direct File Access**: Can read/write files directly to your file system
- **No Browser Required**: Runs as a standalone desktop application
- **Better Performance**: Native performance without browser limitations
- **Offline by Default**: Works completely offline

## Technical Details

- **Framework**: Electron
- **Frontend**: HTML, CSS, JavaScript (same as web version)
- **File System**: Node.js fs module via Electron IPC
- **Image Processing**: HTML5 Canvas API

## Development

### Running in Development Mode

```bash
npm run dev
```

This will open the app with DevTools enabled.

### Project Structure

```
desktop-app/
├── main.js          # Electron main process
├── preload.js       # Preload script (IPC bridge)
├── index.html       # Main HTML file
├── styles.css       # Styles
├── app.js           # Application logic
├── package.json     # Dependencies and build config
└── assets/          # Icons and resources
```

## Troubleshooting

### Images not loading
- Make sure you're selecting valid image files
- Check that the file paths are accessible

### ZIP download not working
- Ensure JSZip library is loaded (check console for errors)
- Try downloading individual files instead

### App won't start
- Make sure all dependencies are installed: `npm install`
- Check Node.js version (requires v16+)
- Try deleting `node_modules` and reinstalling

## License

MIT License - Same as the web version

## Support

For issues and feature requests, please refer to the main project repository.

