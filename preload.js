// Preload script for secure IPC communication between main and renderer processes
// This file runs in the renderer process before the page loads

const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to communicate
// with the main process securely. Add IPC channels here as needed.
contextBridge.exposeInMainWorld('electronAPI', {
  // Navigate to a different HTML file
  navigateTo: (file) => ipcRenderer.invoke('navigate-to', file)
});
