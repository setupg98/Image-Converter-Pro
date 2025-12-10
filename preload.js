// Preload script - Bridge between main process and renderer
const { contextBridge, ipcRenderer } = require('electron');
const { Buffer } = require('buffer');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    // File operations
    openFileDialog: (options) => ipcRenderer.invoke('open-file-dialog', options),
    openFolderDialog: () => ipcRenderer.invoke('open-folder-dialog'),
    saveFileDialog: (defaultPath) => ipcRenderer.invoke('save-file-dialog', defaultPath),
    saveZipDialog: (defaultName) => ipcRenderer.invoke('save-zip-dialog', defaultName),
    readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
    writeFile: (filePath, buffer) => ipcRenderer.invoke('write-file', filePath, buffer),
    
    // UI operations
    showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
    
    // Platform info
    platform: process.platform,
    isElectron: true,
    
    // Buffer utility
    Buffer: Buffer
});

