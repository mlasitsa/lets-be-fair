// electron-main/preload.js (this file was created by AI)
const { contextBridge, ipcRenderer } = require('electron');

// expose only what the renderer truly needs
contextBridge.exposeInMainWorld('electronAPI', {
  /** send "start-python" with role + room */
  startPython: (role, roomCode) =>
    ipcRenderer.send('start-python', { role, roomCode }),
});
