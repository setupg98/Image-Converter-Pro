# Desktop App Icon Setup Guide

## Quick Setup

1. **Open the Icon Generator:**
   - Open `generate-desktop-icon.html` in your browser
   - The icon will be generated automatically based on the design

2. **Download Required Sizes:**
   - Click "Download PNG (512x512)" - This will be used as the base
   - Optionally download other sizes for different uses

3. **Convert to Required Formats:**
   
   **For Windows (.ico):**
   - Use an online converter like https://convertio.co/png-ico/ or https://www.icoconverter.com/
   - Upload the 512x512 PNG
   - Download as `icon.ico`
   - Place it in the `assets/` folder

   **For macOS (.icns):**
   - Use https://cloudconvert.com/png-to-icns or https://iconverticons.com/online/
   - Upload the 512x512 PNG
   - Download as `icon.icns`
   - Place it in the `assets/` folder

   **For Linux (.png):**
   - Use the 512x512 PNG directly
   - Rename it to `icon.png`
   - Place it in the `assets/` folder

4. **Verify Configuration:**
   - Check `package.json` - it should reference:
     - Windows: `"icon": "assets/icon.ico"`
     - macOS: `"icon": "assets/icon.icns"`
     - Linux: `"icon": "assets/icon.png"`

## Icon Design

The icon features:
- **Purple rounded square background** (#8b5cf6)
- **White line graph/trend line** - representing growth and data
- **Light grey geometric shapes** - rectangle and circle
- **Green dot** - indicating success/active status

This design represents:
- Image processing and conversion
- Data visualization and analytics
- Modern, professional appearance

## Alternative: Using Online Icon Generators

If you prefer, you can also use:
- https://www.favicon-generator.org/
- https://realfavicongenerator.net/
- https://www.icoconverter.com/

Just upload the generated PNG and download the required formats.

## Notes

- The icon will appear in:
  - Windows: Taskbar, window title bar, file explorer
  - macOS: Dock, menu bar, Finder
  - Linux: Application launcher, window decorations

- After adding icons, rebuild the app:
  ```bash
  npm run build:win    # For Windows
  npm run build:mac    # For macOS
  npm run build:linux  # For Linux
  ```

