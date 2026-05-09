const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  version: process.versions.electron,
  onNavigate: (callback) => ipcRenderer.on('navigate', (_, page) => callback(page)),
});
