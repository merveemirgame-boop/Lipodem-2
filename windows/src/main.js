const { app, BrowserWindow, Menu, shell, ipcMain, nativeTheme } = require('electron');
const path = require('path');

let mainWindow;
const isDev = process.argv.includes('--dev');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'Lipödem Rehberi',
    backgroundColor: '#F9FAFB',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    show: false,
  });

  mainWindow.loadFile(path.join(__dirname, '..', '..', 'web', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) mainWindow.webContents.openDevTools();
  });

  mainWindow.on('closed', () => { mainWindow = null; });
}

function buildMenu() {
  const template = [
    {
      label: 'Lipödem Rehberi',
      submenu: [
        { label: 'Hakkında', click: () => mainWindow?.webContents.executeJavaScript("show('info')") },
        { type: 'separator' },
        { label: 'Çıkış', accelerator: 'CmdOrCtrl+Q', role: 'quit' },
      ],
    },
    {
      label: 'Görünüm',
      submenu: [
        { label: 'Yenile', accelerator: 'CmdOrCtrl+R', role: 'reload' },
        { label: 'Yakınlaştır', accelerator: 'CmdOrCtrl+Plus', role: 'zoomIn' },
        { label: 'Uzaklaştır', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
        { label: 'Gerçek Boyut', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
        { type: 'separator' },
        { label: 'Tam Ekran', accelerator: 'F11', role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Bölümler',
      submenu: [
        { label: '🏠 Ana Sayfa', accelerator: 'CmdOrCtrl+1', click: () => mainWindow?.webContents.executeJavaScript("show('home')") },
        { label: '🥗 Beslenme', accelerator: 'CmdOrCtrl+2', click: () => mainWindow?.webContents.executeJavaScript("show('nutrition')") },
        { label: '🚴 Egzersiz', accelerator: 'CmdOrCtrl+3', click: () => mainWindow?.webContents.executeJavaScript("show('exercise')") },
        { label: '💊 Takviyeler', accelerator: 'CmdOrCtrl+4', click: () => mainWindow?.webContents.executeJavaScript("show('supplements')") },
        { label: '💆 Bakım', accelerator: 'CmdOrCtrl+5', click: () => mainWindow?.webContents.executeJavaScript("show('care')") },
        { label: '📋 Günlük Rutin', accelerator: 'CmdOrCtrl+6', click: () => mainWindow?.webContents.executeJavaScript("show('routine')") },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  createWindow();
  buildMenu();
  app.on('activate', () => { if (!mainWindow) createWindow(); });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
