import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// Because __dirname and __filename don't exist in ES modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;

function createWindow() {
  const preloadPath = path.join(__dirname, 'preload.cjs');

  win = new BrowserWindow({
    width: 447,
    height: 340,
    frame: true,
    alwaysOnTop: false,
    transparent: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: preloadPath
    }
  });

  win.loadURL('http://localhost:5173');
  // For production, you can do:
  // win.loadFile(path.join(__dirname, 'build', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();
});

//listener for close request
ipcMain.on('close-window', () => {
  if (win) {
    win.close();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
