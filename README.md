# 🖼️ Image Converter Pro

A powerful, feature-rich image conversion tool available in three formats:
- 🌐 **Web Application** - Run in any browser
- 💻 **Desktop Application** - Standalone Electron app
- 🔌 **Chrome Extension** - Convert images directly from web pages

## ✨ Features

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

### Image Editing Tools
- ✂️ **Crop**: Interactive image cropping with preview
- 🔄 **Rotate**: Rotate images 90 degrees
- ↔️ **Flip**: Flip images horizontally or vertically
- 🗜️ **Optimize**: Compression optimization with before/after comparison
- 💧 **Watermark**: Add text watermarks with customization
- 📋 **Metadata Viewer**: View and export image metadata
- ✏️ **Batch Rename**: Rename multiple images with patterns

### Chrome Extension Exclusive
- 🖱️ **Right-Click Context Menu**: Convert images directly from web pages
- 🔗 **Convert Page Images**: Extract and convert all images from any webpage
- 📥 **Native Downloads**: Uses Chrome's download API
- 🎯 **Popup Quick Access**: Quick converter access from extension icon

## 📁 Project Structure

```
image-converter-pro/
├── desktop-app/          # Electron desktop application
│   ├── main.js          # Main Electron process
│   ├── app.js           # Application logic
│   ├── index.html       # UI
│   └── package.json     # Dependencies
│
├── chrome-extension/     # Chrome browser extension
│   ├── manifest.json   # Extension configuration
│   ├── app.js          # Main application logic
│   ├── popup.html      # Extension popup UI
│   ├── background.js   # Background service worker
│   └── content.js      # Content script
│
└── (web app files)      # Web application files
```

## 🚀 Quick Start

### Web Application
1. Open `index.html` in your browser
2. Drag & drop images or click to upload
3. Configure settings and convert!

### Desktop Application
```bash
cd desktop-app
npm install
npm start
```

See `desktop-app/README.md` for detailed instructions.

### Chrome Extension
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `chrome-extension` folder

See `chrome-extension/README.md` for detailed instructions.

## 📦 Installation

### Desktop App
```bash
cd desktop-app
npm install
npm run build:win  # For Windows
```

### Chrome Extension
1. Load the `chrome-extension` folder as an unpacked extension
2. See `chrome-extension/INSTALL.md` for detailed steps

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Desktop**: Electron
- **Extension**: Chrome Extension API (Manifest V3)
- **Image Processing**: HTML5 Canvas API
- **File Handling**: FileReader API, Blob API
- **Storage**: localStorage, Chrome Storage API

## 📝 Documentation

- **Desktop App**: See `desktop-app/README.md` and `desktop-app/QUICKSTART.md`
- **Chrome Extension**: See `chrome-extension/README.md` and `chrome-extension/FEATURES.md`
- **Build Issues**: See `desktop-app/BUILD-FINAL-FIX.md` for Windows build fixes

## 🔒 Privacy

- ✅ All processing happens locally in your browser
- ✅ Images never leave your computer
- ✅ No server required
- ✅ No data collection
- ✅ Works completely offline (after first load)

## 📄 License

MIT License - Feel free to use, modify, and distribute!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for image conversion needs**
