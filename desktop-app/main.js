// Electron Main Process - Image Converter Pro Desktop
const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 700,
        backgroundColor: '#0f172a',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: true
        },
        icon: path.join(__dirname, 'assets', 'icon.png'),
        titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
        show: false
    });

    // Load the app
    mainWindow.loadFile('index.html');

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        
        // Open DevTools in development
        if (process.env.NODE_ENV === 'development') {
            mainWindow.webContents.openDevTools();
        }
    });

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Handle external links
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
}

// App event handlers
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC Handlers for native file operations
ipcMain.handle('open-file-dialog', async (event, options) => {
    const result = await dialog.showOpenDialog(mainWindow, {
        title: 'Select Images',
        filters: [
            { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif', 'tiff', 'svg', 'avif', 'heic', 'ico'] },
            { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile', 'multiSelections', ...(options?.allowFolders ? ['openDirectory'] : [])]
    });

    if (result.canceled) {
        return { canceled: true, files: [] };
    }

    const files = result.filePaths.map(filePath => ({
        path: filePath,
        name: path.basename(filePath)
    }));

    return { canceled: false, files };
});

ipcMain.handle('open-folder-dialog', async (event) => {
    const result = await dialog.showOpenDialog(mainWindow, {
        title: 'Select Folder',
        properties: ['openDirectory']
    });

    if (result.canceled) {
        return { canceled: true, path: null };
    }

    // Read all image files from the folder
    const folderPath = result.filePaths[0];
    const files = [];
    
    try {
        const entries = fs.readdirSync(folderPath, { withFileTypes: true });
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.bmp', '.gif', '.tiff', '.svg', '.avif', '.heic', '.ico'];
        
        for (const entry of entries) {
            if (entry.isFile()) {
                const ext = path.extname(entry.name).toLowerCase();
                if (imageExtensions.includes(ext)) {
                    files.push({
                        path: path.join(folderPath, entry.name),
                        name: entry.name
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error reading folder:', error);
    }

    return { canceled: false, files };
});

ipcMain.handle('save-file-dialog', async (event, defaultPath) => {
    const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Save Image',
        defaultPath: defaultPath,
        filters: [
            { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif', 'tiff', 'svg', 'avif', 'ico'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    });

    if (result.canceled) {
        return { canceled: true, path: null };
    }

    return { canceled: false, path: result.filePath };
});

ipcMain.handle('save-zip-dialog', async (event, defaultName) => {
    const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Save ZIP Archive',
        defaultPath: defaultName || 'converted_images.zip',
        filters: [
            { name: 'ZIP Archive', extensions: ['zip'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    });

    if (result.canceled) {
        return { canceled: true, path: null };
    }

    return { canceled: false, path: result.filePath };
});

ipcMain.handle('read-file', async (event, filePath) => {
    try {
        const buffer = fs.readFileSync(filePath);
        return {
            success: true,
            data: buffer,
            name: path.basename(filePath)
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
});

ipcMain.handle('write-file', async (event, filePath, buffer) => {
    try {
        // Ensure directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        // Handle both Buffer and Uint8Array
        let dataToWrite = buffer;
        if (buffer instanceof Uint8Array && !Buffer.isBuffer(buffer)) {
            dataToWrite = Buffer.from(buffer);
        } else if (!Buffer.isBuffer(buffer)) {
            // If it's not a Buffer, try to convert it
            dataToWrite = Buffer.from(buffer);
        }
        
        fs.writeFileSync(filePath, dataToWrite);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
});

ipcMain.handle('show-message-box', async (event, options) => {
    const result = await dialog.showMessageBox(mainWindow, {
        type: options.type || 'info',
        title: options.title || 'Image Converter Pro',
        message: options.message || '',
        buttons: options.buttons || ['OK'],
        defaultId: options.defaultId || 0
    });
    return result;
});

// Handle app protocol for better security
app.setAsDefaultProtocolClient('image-converter-pro');

// Prevent new window creation
app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (event, navigationUrl) => {
        event.preventDefault();
        shell.openExternal(navigationUrl);
    });
});

