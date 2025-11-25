const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

// Get user data directory and data subdirectory
const userDataPath = app.getPath('userData');
const dataDir = path.join(userDataPath, 'data');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
}

// Handle navigation requests from renderer
ipcMain.handle('navigate-to', (event, file) => {
  // Get the window that sent the request
  const window = BrowserWindow.fromWebContents(event.sender);
  if (window && !window.isDestroyed()) {
    window.loadFile(file);
    return { success: true };
  }
  return { success: false, error: 'Window not found' };
});

// Generic JSON file operations
ipcMain.handle('read-json', async (event, filename) => {
  const filePath = path.join(dataDir, filename);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return { success: true, data: JSON.parse(data) };
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return default based on filename
      if (filename === 'feeds.json' || filename === 'categories.json') {
        return { success: true, data: [] };
      } else if (filename === 'read-states.json') {
        return { success: true, data: {} };
      } else if (filename === 'settings.json') {
        return { success: true, data: {} };
      }
      return { success: true, data: null };
    }
    return { success: false, error: error.message };
  }
});

ipcMain.handle('write-json', async (event, filename, data) => {
  const filePath = path.join(dataDir, filename);
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Error writing JSON file:', error);
    return { success: false, error: error.message };
  }
});

// Feeds operations
ipcMain.handle('read-feeds', async (event) => {
  const filePath = path.join(dataDir, 'feeds.json');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return { success: true, data: JSON.parse(data) };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { success: true, data: [] };
    }
    console.error('Error reading feeds:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('write-feeds', async (event, feeds) => {
  const filePath = path.join(dataDir, 'feeds.json');
  try {
    await fs.writeFile(filePath, JSON.stringify(feeds, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Error writing feeds:', error);
    return { success: false, error: error.message };
  }
});

// Categories operations
ipcMain.handle('read-categories', async (event) => {
  const filePath = path.join(dataDir, 'categories.json');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return { success: true, data: JSON.parse(data) };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { success: true, data: [] };
    }
    console.error('Error reading categories:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('write-categories', async (event, categories) => {
  const filePath = path.join(dataDir, 'categories.json');
  try {
    await fs.writeFile(filePath, JSON.stringify(categories, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Error writing categories:', error);
    return { success: false, error: error.message };
  }
});

// Read states operations
ipcMain.handle('read-read-states', async (event) => {
  const filePath = path.join(dataDir, 'read-states.json');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return { success: true, data: JSON.parse(data) };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { success: true, data: {} };
    }
    console.error('Error reading read states:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('write-read-states', async (event, readStates) => {
  const filePath = path.join(dataDir, 'read-states.json');
  try {
    await fs.writeFile(filePath, JSON.stringify(readStates, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Error writing read states:', error);
    return { success: false, error: error.message };
  }
});

// Settings operations
ipcMain.handle('read-settings', async (event) => {
  const filePath = path.join(dataDir, 'settings.json');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return { success: true, data: JSON.parse(data) };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { success: true, data: {} };
    }
    console.error('Error reading settings:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('write-settings', async (event, settings) => {
  const filePath = path.join(dataDir, 'settings.json');
  try {
    await fs.writeFile(filePath, JSON.stringify(settings, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Error writing settings:', error);
    return { success: false, error: error.message };
  }
});

app.whenReady().then(async () => {
  // Initialize data directory
  await ensureDataDir();
  
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
